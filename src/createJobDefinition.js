const { BatchClient, RegisterJobDefinitionCommand } = require("@aws-sdk/client-batch");
const fs = require('fs');

// Load the JSON configuration file
const defaultsFilePath = './configs/defaults.json'; 
const configFilePath = './configs/config.json'; 
const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
const defaults = JSON.parse(fs.readFileSync(defaultsFilePath, 'utf8'))

// AWS Batch client
const batchClient = new BatchClient({ region: 'eu-west-2' });

// Deploy the job definition
async function deployJobDefinition() {
  try {
    // Retrieve the ECR repository name from the config
    const ecrRepoName = config.ecrRepoName;

    // Retrieve the execution command from the config
    const executionCommand = config.executionCommand;

    // Create the job definition parameters
    const params = {
      jobDefinitionName: config.jobDefinitionName,
      type: 'container',
      platformCapabilities: ['FARGATE'],
      containerProperties: {
        image: ecrRepoName,
        command: executionCommand,
        resourceRequirements: [{
          type: "VCPU",
          value: defaults.vcpu
        },
        {
          type: "MEMORY",
          value: defaults.memory
        }],
        logConfiguration:{
          logDriver: "awslogs"
        },
        executionRoleArn: defaults.executionRoleArn,
        jobRoleArn: defaults.executionRoleArn,
        fargatePlatformConfiguration: { 
          platformVersion: 'LATEST'
       }
      }
    };

    // Create the job definition
    const command = new RegisterJobDefinitionCommand(params);
    const response = await batchClient.send(command);
    console.log(`Job definition ARN: ${response.jobDefinitionArn}`);
    // Write job definition name and revision to a JSON file
    const jobDefinitionData = {
      jobDefinitionName: response.jobDefinitionName,
      revision: response.revision
    };
    const outputFile = './configs/jobinfo.json';
    fs.writeFileSync(outputFile, JSON.stringify(jobDefinitionData));   
    console.log(`Job definition name and revision written to: ${outputFile}`);
  } catch (err) {
    console.error('Error deploying job definition:', err);
  }
}

module.exports = { deployJobDefinition };

