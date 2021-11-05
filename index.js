const BybitBot = require("./bot");

const telegramConfig = {
  telegramBotToken: "",
  telegramChatId: "",
};

const coins = ["BTCUSD", "ETHUSD"];

const time = {
  hr: 0,
  min: 1,
};

const ratioToWatch = {
  long: 50,
  short: 30,
};

const bot = BybitBot(coins, time, ratioToWatch, telegramConfig);

bot.start();
