require('dotenv').config()
const express = require('express')
// const bodyParser = require('body-parser')
// const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



const {TOKEN, SERVER_URL} = process.env
// const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
// const URI = `/webhook/${TOKEN}`
// const WEBHOOK_URL = SERVER_URL+URI

const app = express();
// parse the updates to JSON
app.use(express.json());

// const init = async () => {
//     const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//     console.log(res.data)
// }



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

// Just to ping!
// bot.on('message', msg => {
//   bot.sendMessage(msg.chat.id, 'I am alive!');
// });


const fetch = () => {
    const url = `https://tokenfomo.io/api/tokens/eth?limit=1&apikey=0e14821c9127c495bf15d690dc02a96386980392`
    const res = new XMLHttpRequest()
    if (true) {
    res.open('GET', url)
    res.send()
    res.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText)
        console.log(data)

        })
    }
}

bot.on('message', (msg) => {
    fetch()

    bot.sendMessage(msg.chat.id, )

})
