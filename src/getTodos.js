const AWS = require("aws-sdk");

const getTodos = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let todos;

  try {
    const results = await dynamodb.scan({ TableName: "TodoTable" }).promise();
    todos = results.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = {
  handler: getTodos,
};
