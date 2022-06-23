const AWS = require("aws-sdk");

const getTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  try {
    const result = await dynamodb
      .get({ TableName: "TodoTable", Key: { id } })
      .promise();
    todo = result.Item;
    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = {
  handler: getTodo,
};
