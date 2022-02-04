require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf')
const express = require('express')
const app = express();
const {TOKEN, SERVER_URL} = process.env
// const bot = new TelegramBot(TOKEN);
const bot = new Telegraf(process.env.TOKEN)
// bot.setWebHook(`${SERVER_URL}/bot${TOKEN}`);
app.use(express.json());


// app.post(`/bot${TOKEN}`, (req, res) => {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);

// });
// https://cf8e-2601-83-8101-3120-304a-6472-111c-fe04.ngrok.io:88/bot$5275275582:AAHu3yKZNQ5ij08zacQD9OvbIWZNdt-Fl8w
// Just to ping!
// bot.on('message', msg => {
//   bot.sendMessage(msg.chat.id, 'I am alive!');
//   console.log('test')
// });

bot.use(async (ctx, next) => {
  console.time(`Processing update ${ctx.update.update_id}`)
  await next() // runs next middleware
  // runs after next middleware finishes
  console.timeEnd(`Processing update ${ctx.update.update_id}`)
})

bot.on('text', (ctx) => ctx.reply('Hello World'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
// bot.onText(/\/run/, (msg) => {
//   const url = `https://tokenfomo.io/api/tokens/eth?limit=1&apikey=0e14821c9127c495bf15d690dc02a96386980392`
//   const res = new XMLHttpRequest()
//   res.open('GET', url)
//   res.send()
//   res.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText)
//     const {network, addr, name, symbol, timestamp } = data
//     data.forEach((d => {
//       store.push(d)

//       const url_1 = (`https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=eth&token=${store[0].addr}`)
//       const res_1 = new XMLHttpRequest()
//       res_1.open('GET', url_1)
//       res_1.send()
//       res_1.addEventListener('load', function () {
//         const data_1 = JSON.parse(this.responseText)
//         const pot = data_1.IsHoneypot
//         const BuyTax = data_1.BuyTax
//         const SellTax = data_1.SellTax
//         const NoLiq = data_1.NoLiquidity
//         console.log(data_1)

//         bot.sendMessage(msg.chat.id, `<b><em>New Coin Listing</em></b>\n\n<b>Token:</b> <i>${d.name}</i>\n<b>Network: </b><i>${d.network}</i>\n<b>Address: </b><i>${d.addr}</i>\n<b>Symbol:</b> <i>${d.symbol}</i>\n\n<b><em>Rug Checker</em></b>\n\n<b>Liquidity: </b><i>${NoLiq || 'Check Back Later'}</i>\n<b>Honey Pot: </b> <i>${pot.toString()}</i>\n<b>Buy Tax: </b><i>${BuyTax} %</i>\n<b>Sell Tax: </b><i>${SellTax} %</i>`
//          ,{parse_mode : "HTML"})

//       })
//     }))
//     console.log(data)

// })})