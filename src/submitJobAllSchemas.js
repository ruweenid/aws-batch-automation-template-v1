const { BatchClient, SubmitJobCommand } = require("@aws-sdk/client-batch");
const fs = require('fs');
const crypto = require('crypto');

// Load the JSON configuration file
const defaultsFilePath = './configs/defaults.json'; 
const jobInfoFilePath = './configs/jobinfo.json'
const envVarsFilePath = './configs/vars.json'
const defaults = JSON.parse(fs.readFileSync(defaultsFilePath, 'utf8'))
const jobInfo = JSON.parse(fs.readFileSync(jobInfoFilePath, 'utf8'))
const envVars = JSON.parse(fs.readFileSync(envVarsFilePath, 'utf8'))

// Create a schema_list file and include all schemas
const schemaNamesFilePath = './schema_list';
const schemaNames = fs.readFileSync(schemaNamesFilePath, 'utf8').split('\n').filter(Boolean);

// AWS Batch client
const batchClient = new BatchClient({ region: 'eu-west-2' });

async function submitBatchJobAllSchemas() {
    try {
        const randomSuffix = crypto.randomBytes(4).toString('hex'); // Generate a random 8-character string

        const environmentVariables = envVars.environmentVariables;

        for (const schemaName of schemaNames) {
            const modifiedEnvironmentVariables = environmentVariables.map((env) => {
                if (env.name === 'SCHEMA_NAME') {
                    return {
                        name: env.name,
                        value: schemaName,
                    };
                }
                return env;
            });

            const params = {
                jobDefinition: jobInfo.jobDefinitionName,
                jobName: `${jobInfo.jobDefinitionName}-${schemaName}-${randomSuffix}`,
                jobQueue: defaults.jobQueue,
                containerOverrides: {
                    environment: modifiedEnvironmentVariables,
                },
            };

            // Submit the Job
            const command = new SubmitJobCommand(params);
            const response = await batchClient.send(command);
            console.log(`Job Name ARN: ${response.jobArn}`);
        }
    } catch (err) {
        console.error('Error submitting job:', err);
    }
}

module.exports = { submitBatchJobAllSchemas };
