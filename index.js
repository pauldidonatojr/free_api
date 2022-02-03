require('dotenv').config()
const express = require('express')
const moment =  require('moment')
// const bodyParser = require('body-parser')
// const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



const {TOKEN, SERVER_URL} = process.env
const app = express();
// parse the updates to JSON
app.use(express.json());
// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${SERVER_URL}/bot${TOKEN}`)
// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(process.env.PORT || 5000,  () => {
  console.log(`Express server is listening`, process.env.PORT || 5000);

});


// const store = []

bot.onText(/\/run/, (msg) => {
  const url = `https://tokenfomo.io/api/tokens/eth?limit=8&apikey=0e14821c9127c495bf15d690dc02a96386980392`
  const res = new XMLHttpRequest()
  res.open('GET', url)
  res.send()
  res.addEventListener('load', function () {
    const data = JSON.parse(this.responseText)
    const {network, addr, name, symbol, timestamp } = data
    console.log(data)
    // store.push(tok)
    // console.log(store)

    data.forEach((d => {
      bot.sendMessage(msg.chat.id,  `|------------------------| \n Token: ${d.name}\n \n Network: ${d.network}\n \n Address: ${d.addr}\n \n Symbol: ${d.symbol}\n \n Timestamp: ${moment(d.timestamp.createdAt).format("YYYY-MMM-DD, h:mm:ss a")}
      \n |------------------------|`, {parse_mode : "HTML"})
    }))
})

    // bot.sendMessage(msg.chat.id,  `Token: ${name.toString()}\n \n Network: ${network.toString()}\n \n Address: ${addr.toString()}\n \n Symbol: ${symbol.toString()}\n \n Timestamp: ${moment(timestamp.createdAt).format("YYYY-MMM-DD, h:mm:ss a")}
    // `, {parse_mode : "HTML"})
    // })




  //

})


