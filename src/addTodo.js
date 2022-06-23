const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const createTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  if (!todo) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Request is missing todo" }),
    };
  }

  const todoToBeAdded = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  try {
    await dynamodb
      .put({
        TableName: "TodoTable",
        Item: todoToBeAdded,
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Todo with ${id}, has been created` }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = {
  handler: middy(createTodo).use(httpJsonBodyParser()),
};
