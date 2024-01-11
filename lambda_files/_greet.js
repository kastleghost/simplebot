// greetCommandHandler.js

module.exports = function (body) {
  // Extract options from the interaction
  const userOption = body.data.options.find((option) => option.name === 'user');
  const messageOption = body.data.options.find((option) => option.name === 'message');

  if (userOption) {
    const targetUser = userOption.value;
    const greetingMessage = messageOption ? messageOption.value : 'Your presence brightens the day.';

    // Customize the response message based on the options
    const responseMessage = `Greetings, <@${targetUser}>! ${greetingMessage}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 4,
        data: { content: responseMessage },
      }),
    };
  }
};