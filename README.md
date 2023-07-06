<br/>
<p align="center">
  <a href="https://github.com/Velaris-CSM/aws-batch-automation-template-v1">
    <img src="https://miro.medium.com/v2/resize:fit:300/1*XqBIQEFqrIQifJFX37cyMA.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">AWS Batch Automation Templates</h3>

  <p align="center">
    A collection of nodejs scripts to create and submit AWS Batch jobs
    <br/>
    <br/>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/Velaris-CSM/aws-batch-automation-template-v1/total) ![Contributors](https://img.shields.io/github/contributors/Velaris-CSM/aws-batch-automation-template-v1?color=dark-green) ![Forks](https://img.shields.io/github/forks/Velaris-CSM/aws-batch-automation-template-v1?style=social) ![Stargazers](https://img.shields.io/github/stars/Velaris-CSM/aws-batch-automation-template-v1?style=social) ![Issues](https://img.shields.io/github/issues/Velaris-CSM/aws-batch-automation-template-v1) ![License](https://img.shields.io/github/license/Velaris-CSM/aws-batch-automation-template-v1) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)

## About The Project

![Screen Shot](https://res.cloudinary.com/hevo/image/upload/f_auto,q_auto/v1652330479/hevo-learn/AWS-Batch-Scheduling-AWS-Batch-Components.png?_i=AA)

This project provides a set of scripts for submitting AWS Batch jobs. It includes a script for deploying job definitions using the AWS SDK for JavaScript, along with additional scripts to submit different types of jobs.

The main script, deployJobDefinition.js, utilizes the @aws-sdk/client-batch package to create and register job definitions on AWS Batch. It reads configuration details from JSON files, such as the job definition name, ECR repository name, and execution command. Once the job definition is created, it writes the job definition name and revision to a JSON file for further reference.

The additional scripts demonstrate how to submit different types of jobs, such as containerized jobs, AWS Fargate jobs, and more. Each script utilizes the AWS SDK and appropriate parameters to submit jobs with the specified configuration.

This project aims to provide a reusable codebase and example scripts to simplify the process of deploying and submitting AWS Batch jobs. It can serve as a starting point for building custom workflows, automating job submission, or integrating AWS Batch into existing systems.

## Built With



* [Node JS](https://nodejs.org/en)
* [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-javascript/)

## Getting Started

Ensure you have configured AWS CLI. Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

### Prerequisites

Run the following command to configure the AWS credentials on the active session.

```sh
export AWS_PROFILE={add environment name here}
```

### Installation

1. Clone the repo

```sh
$ git clone git@github.com:Velaris-CSM/aws-batch-automation-template-v1.git
```

2. Install NPM packages

```sh
$ npm install
```

3. Update the Job Definition configurations in `configs/config.json`

```JSON
{
    "jobDefinitionName": "<Name for the job definition>",
    "ecrRepoName": "AWS_ACCOUNT_ID.dkr.ecr.eu-west-2.amazonaws.com/your-repo-name",
    "executionCommand": [
      "command-1", 
      "command-2",
      "command-3"
    ]
  }
```
4. Add any environment variables to be used in `configs/vars.json`
```JSON
{
    "environmentVariables": [
        {
          "name": "ENV_VARIABLE_1",
          "value": "value1"
        },
        {
          "name": "ENV_VARIABLE_2",
          "value": "value2"
        },
        {
          "name": "SCHEMA_NAME",
          "value": "value3"
        }
      ]
}
```
5. *(Optional)* For bulk executions, include a list of schemas needed for the batch jobs to execute on in the `schema_list` file.

## Usage

1. To create a new Job Definition
```sh
$ node run.js createjobdef
```

2. To submit a job
```sh
$ node run.js submit
```

3. To run a single job on all schemas
```sh
$ node run.js allschemas
```

## Roadmap

See the [open issues](https://github.com/Velaris-CSM/aws-batch-automation-template-v1/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/Velaris-CSM/aws-batch-automation-template-v1/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/Velaris-CSM/aws-batch-automation-template-v1/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/Velaris-CSM/aws-batch-automation-template-v1/blob/main/LICENSE.md) for more information.

## Authors

* **Ruween Iddagoda** - *DevOps Engineer* - [git](https://github.com/ruweenid) - *Initial Codebase*
