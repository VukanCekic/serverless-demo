const AWS = require("aws-sdk");

const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const updateTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { completed } = event.body;
  const { id } = event.pathParameters;

  if (completed == null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Request is missing status of todo" }),
    };
  }
  let todo;

  try {
    todo = await dynamodb
      .update({
        TableName: "TodoTable",
        Key: { id },
        UpdateExpression: "set completed = :completed",
        ExpressionAttributeValues: {
          ":completed": completed,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ todo }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = {
  handler: middy(updateTodo).use(httpJsonBodyParser()),
};
