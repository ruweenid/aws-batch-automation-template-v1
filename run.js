const { deployJobDefinition } = require('./src/createJobDefinition');
const { submitBatchJob } = require('./src/submitJob');
const { submitBatchJobAllSchemas } = require('./src/submitJobAllSchemas');

function executeScript(parameter) {
    if (parameter === 'createjobdef') {
      deployJobDefinition();
    }
    else if (parameter == 'allschemas'){
        submitBatchJobAllSchemas();
    }
    else if (parameter == 'submit'){
        submitBatchJob();
    }  
    else {
      console.log('Invalid parameter.');
    }
  }


const parameter = process.argv[2]; // pass the parameter as a command-line argument
executeScript(parameter);
