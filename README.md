

# Serverless Framework Node Express API on AWS

This template demonstrates how to develop and deploy a simple Node  API service running on AWS Lambda using the traditional Serverless Framework.


## Dependencies
### https://www.npmjs.com/package/aws-cli - npm install -g aws-cli
### https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html - Configuring AWS USER and Credentials
### https://github.com/serverless/serverless/blob/main/README.md - npm install -g serverless

## aws configure
AWS Access Key ID [None]: xxxxxxxxxxxxxxxxxxx
AWS Secret Access Key [None]: xxxxxxxxxxxxxxxx
Default region name [None]: us-west-2
Default output format [None]: json

REQUIRED FOR SERVERLESS !
When testing via POSTMAN and using the provided collection, change the URL to the URL you get after deploying with serverless in the VARIABLES part of the collection

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```


### Local development

It is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
