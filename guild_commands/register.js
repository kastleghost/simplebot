require('dotenv').config();
const axios = require('axios').default;

const applicationId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;
const botToken = process.env.BOT_TOKEN;

const url = `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`; // Update the API version if needed

const headers = {
  "Authorization": `Bot ${botToken}`,
  "Content-Type": "application/json",
};

// Define an array of command data objects
const commands = [
  {
    "name": "test1", // help command
    "type": 1,
    "description": "having some problems?",
  },
  {
    "name": "test2", // about command
    "type": 1,
    "description": "details about this server.",
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