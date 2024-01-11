// helloCommandHandler.js

module.exports = function (body) {
  // Define an array of random hello messages with placeholders for user mentions
  const helloMessages = [
    "Hello there, <@userid>!",
    "Hi <@userid>, hope you are having a great day!",
    "Hey <@userid>, good to see you!",
    "Hiya <@userid>, thanks for being part of the community."
  ];

  // Get a random index from the helloMessages array
  const randomIndex = Math.floor(Math.random() * helloMessages.length);

  // Get the random hello message
  const randomMessage = helloMessages[randomIndex];

  // Replace <@userid> with the actual user mention
  const mentionUserMessage = randomMessage.replace('<@userid>', `<@${body.member.user.id}>`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      type: 4,
      data: { content: mentionUserMessage },
    }),
  };
};