const axios = require("axios");

exports.sendMessageTelegram = async (
  { telegramBotToken, telegramChatId },
  message
) => {
  console.log(message);
  await axios.get(
    `https://api.telegram.org/${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${message}`
  );
};

exports.getCronExpressionFromTimeObject = (time) => {
  let expression = "* * *";

  if (time.hr != 0) {
    expression = `${time.hr} ` + expression;
  } else {
    expression = `* ` + expression;
  }

  if (time.min != 0) {
    expression = `${time.min} ` + expression;
  } else {
    expression = `* ` + expression;
  }

  return expression;
  // return "* * * * * *";
};
