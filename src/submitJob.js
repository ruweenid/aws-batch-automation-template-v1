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

// AWS Batch client
const batchClient = new BatchClient({ region: 'eu-west-2' });

async function submitBatchJob() {
    try {
        const randomSuffix = crypto.randomBytes(4).toString('hex'); // Generate a random 8-character string

        const environmentVariables = envVars.environmentVariables;

        const params = {
            jobDefinition: jobInfo.jobDefinitionName,
            jobName: `${jobInfo.jobDefinitionName}-job-${randomSuffix}`,
            jobQueue: defaults.jobQueue,
            containerOverrides: {
              environment: environmentVariables.map((env) => ({
                name: env.name,
                value: env.value,
              })),
            }
          };
    // Create the job name
    const command = new SubmitJobCommand(params);
    const response = await batchClient.send(command);
    console.log(`Job Name ARN: ${response.jobArn}`);
    } catch (err) {
        console.error('Error deploying job:', err);
      }
    }

module.exports = { submitBatchJob };
