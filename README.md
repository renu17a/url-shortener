# Serverless url shortner 

## How to deploy on AWS Lambda
```
$ npm install serverless -g
$ cd url-shortner
$ vim serverless.yml # Add configuration of mongoDB
$ vim .env # Add configuration for mongoDB
$ vim ~/.aws/credentials # Add aws credentials for deploying Lambda
$ serverless deploy # This will create serverless deployment on AWS Lambda with URL to hit
```

## How to run test cases
NOTE: I am using docker to mimic mongoDB for test case please install docker using (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)
```
cd url-shortner
npm test
```

## Demo
Use this 'https://6reihs2lw8.execute-api.eu-west-1.amazonaws.com/dev/' deployed on AWS Lambda for testing endpoints listed in serverless.yaml
NOTE: This uses a seperate hosted mongoDB cluster.
