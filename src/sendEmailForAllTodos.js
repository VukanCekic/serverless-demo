const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const AWS = require("aws-sdk");
const SES = new AWS.SES();

const sendEmailForAllTodos = async (event) => {
  const { email } = event.body;
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Request is missing params" }),
    };
  }

  const params = {
    Destination: {
      /* required */ ToAddresses: [email],
    },
    Message: {
      /* required */
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: "",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "My todos report",
      },
    },
    Source: email /* required */,
  };

  try {
    const results = await dynamodb.scan({ TableName: "TodoTable" }).promise();
    todos = results.Items;

    params.Message.Body.Text.Data = JSON.stringify(todos, null, 4);

    await SES.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email has been sent" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = {
  handler: middy(sendEmailForAllTodos).use(httpJsonBodyParser()),
};
