const nodeCron = require("node-cron");
const axios = require("axios");
const {
  getCronExpressionFromTimeObject,
  sendMessageTelegram,
} = require("./helper");

const request = axios.create({
  baseURL: "https://api.bybit.com/v2",
});

const BybitBot = (coins, time, ratioToWatch, telegramConfig) => {
  console.log("bot running");
  const sendMessage = sendMessageTelegram.bind(null, telegramConfig);

  const task = nodeCron.schedule(
    getCronExpressionFromTimeObject(time),
    async () => {
      for (let i = 0; i < coins.length; i++) {
        const c = coins[i];

        console.log(`making request for ${c}`);
        try {
          const { data } = await request.get(
            `/public/account-ratio?symbol=${c}&period=5min&limit=1`
          );
          const result = data.result[0];
          const long = parseFloat(result?.buy_ratio) * 100;
          const short = parseFloat(result?.sell_ratio) * 100;

          if (long >= ratioToWatch.long) {
            await sendMessage(
              `Long is now currently at ${long} for symbol ${c}`
            );
          }

          if (short >= ratioToWatch.short) {
            await sendMessage(
              `Short is now currently at ${short} for symbol ${c}`
            );
          }
        } catch (error) {
          console.log(error?.response?.data);
        }
      }
    },
    {
      scheduled: false,
    }
  );

  return task;
};

module.exports = BybitBot;
