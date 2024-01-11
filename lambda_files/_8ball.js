// eightBallCommandHandler.js

const eightBallResponses = [
  "*It is certain.*",
  "*It is decidedly so.*",
  "*Without a doubt.*",
  "*Yes – definitely.*",
  "*You may rely on it.*",
  "*As I see it, yes.*",
  "*Most likely.*",
  "*Outlook good.*",
  "*Yes.*",
  "*Signs point to yes.*",
  "*Reply hazy, try again.*",
  "*Ask again later.*",
  "*Better not tell you now.*",
  "*Cannot predict now.*",
  "*Concentrate and ask again.*",
  "*Don't count on it.*",
  "*My reply is no.*",
  "*My sources say no.*",
  "*Outlook not so good.*",
  "*Very doubtful.*"
];

module.exports = async function (interaction) {
  if (interaction.data.name === '8ball') {
    const questionOption = interaction.data.options.find((option) => option.name === 'question');

    if (!questionOption) {
      // No question provided, prompt the user for a question
      return {
        type: 1, // ACKNOWLEDGE_WITH_SOURCE
      };
    }

    const randomResponse = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
    const responseMessage = `${randomResponse}`;
    //const responseMessage = `**You asked:** ${userQuestion}\n**Magic 8-Ball says:** ${randomResponse}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 4,
        data: { content: responseMessage },
      }),
    };
  }
};