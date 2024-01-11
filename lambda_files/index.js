const nacl = require('tweetnacl');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

const helloCommandHandler = require('./_hello'); // Import the helloCommandHandler module
const greetCommandHandler = require('./_greet'); // Import the greetCommandHandler module
const mballCommandHandler = require('./_8ball'); // Import the mballCommandHandler module

exports.handler = async (event, context, callback) => {
// Checking signature (requirement 1.)
// Your public key can be found on your application in the Developer Portal
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const signature = event.headers['x-signature-ed25519']
  const timestamp = event.headers['x-signature-timestamp'];
  const strBody = event.body; // should be string, for successful sign

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    return {
      statusCode: 401,
      body: JSON.stringify('invalid request signature'),
    };
  }

// Replying to ping (requirement 2.)
  const body = JSON.parse(strBody)
  if (body.type == 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ "type": 1 }),
    }
  }

// Handle /hello Command using the helloCommandHandler module
  if (body.data.name == 'hello') {
    return helloCommandHandler(body);
  }  

// Handle /greet Command using the greetCommandHandler module
  if (body.data.name == 'greet') {
    return greetCommandHandler(body);
  }

// Handle /8ball Command using the 8ballCommandHandler module
  if (body.data.name == '8ball') {
    return mballCommandHandler(body);
  }

// END OF FILE
  return {
    statusCode: 404, // If no handler implemented for Discord's request
    body: JSON.stringify('Not Found'),
  };
};