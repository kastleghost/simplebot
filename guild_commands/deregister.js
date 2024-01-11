require('dotenv').config();
const axios = require('axios').default;

const applicationId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;
const botToken = process.env.BOT_TOKEN;

const commandNameToDelete = "test1"; // Name of the command to delete

const headers = {
  "Authorization": `Bot ${botToken}`,
  "Content-Type": "application/json",
};

// Get the list of commands first
axios.get(`https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`, {
  headers: headers,
})
.then((response) => {
  const commands = response.data;
  const commandToDelete = commands.find((command) => command.name === commandNameToDelete);

  if (commandToDelete) {
    const commandId = commandToDelete.id;
    // Delete the command using the command ID
    axios.delete(`https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`, {
      headers: headers,
    })
    .then(() => {
      console.log(`Command "${commandNameToDelete}" has been deleted.`);
    })
    .catch((error) => {
      console.error(`Error deleting the command "${commandNameToDelete}": ${error}`);
    });
  } else {
    console.log(`Command "${commandNameToDelete}" not found.`);
  }
})
.catch((error) => {
  console.error('Error retrieving commands:', error);
});