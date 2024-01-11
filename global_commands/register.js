require('dotenv').config();
const axios = require('axios').default;

const applicationId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;
const botToken = process.env.BOT_TOKEN;

const url = `https://discord.com/api/v10/applications/${applicationId}/commands`; // GLOBAL COMMANDS / Update the API version if needed
// const url = `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`; // GUILDS COMMANDS / Update the API version if needed

const headers = {
  "Authorization": `Bot ${botToken}`,
  "Content-Type": "application/json",
};

// Define an array of command data objects
const commands = [
  {
    "name": "hello", // hello command
    "type": 1,
    "description": "Greets the user with a friendly hello message.",
  },
  // Greet command with options
  {
    "name": "greet",
    "type": 1,
    "description": "Greet a user with a message.",
    "options": [
      {
        "name": "user",
        "description": "The user to greet.",
        "type": 6, // User option type
        "required": true
      },
      {
        "name": "message",
        "description": "The greeting message.",
        "type": 3, // String option type
        "required": false
      }
    ]
  },
  // 8Ball command with options  
  {
    "name": "8ball", // 8ball command with just a question
    "type": 1,
    "description": "Ask the Magic 8-Ball a question.",
    "options": [
      {
        "name": "question",
        "description": "Your question for the Magic 8-Ball.",
        "type": 3, // String option type
        "required": true
      }
    ]
  },  
];

// Loop through the commands array and register each command
commands.forEach((commandData) => {
  axios.post(url, JSON.stringify(commandData), {
    headers: headers,
  })
  .then((response) => {
    console.log(`Command "${commandData.name}" has been registered.`);
  })
  .catch((error) => {
    console.error(`Error registering the command "${commandData.name}": ${error}`);
  });
});

