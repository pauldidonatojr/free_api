require('dotenv').config()
const {TOKEN, SERVER_URL} = process.env
const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env.TOKEN);
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function callback(err, obj) {


  if (err) {
    // handle error
    console.log(err);
  }
  // handle returned object
  console.log(obj);
};

const store = []


slimbot.on('message', message => {
  const url = `https://tokenfomo.io/api/tokens/eth?limit=1&apikey=0e14821c9127c495bf15d690dc02a96386980392`
  const res = new XMLHttpRequest()
  res.open('GET', url)
  res.send()
  res.addEventListener('load', function () {
    const data = JSON.parse(this.responseText)
    const {network, addr, name, symbol, timestamp } = data
    data.forEach((d => {
      store.push(d)

      const url_1 = (`https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=eth&token=${store[0].addr}`)
      const res_1 = new XMLHttpRequest()
      res_1.open('GET', url_1)
      res_1.send()
      res_1.addEventListener('load', function () {
        const data_1 = JSON.parse(this.responseText)
        const pot = data_1.IsHoneypot
        const BuyTax = data_1.BuyTax
        const SellTax = data_1.SellTax
        const NoLiq = data_1.NoLiquidity
        console.log(data_1)

        setInterval(() => {
        slimbot.sendMessage(message.chat.id, `<b><em>New Coin Listing</em></b>\n\n<b>Token:</b> <i>${d.name}</i>\n<b>Network: </b><i>${d.network}</i>\n<b>Address: </b><i>${d.addr}</i>\n<b>Symbol:</b> <i>${d.symbol}</i>\n\n<b><em>Rug Checker</em></b>\n\n<b>Liquidity: </b><i>${NoLiq || 'Check Back Later'}</i>\n<b>Honey Pot: </b> <i>${pot.toString()}</i>\n<b>Buy Tax: </b><i>${BuyTax} %</i>\n<b>Sell Tax: </b><i>${SellTax} %</i>`
         ,{parse_mode : "HTML"}, callback)
         clearInterval()
      },950000)
    })
    }))


})
});


setTimeout(() => {
    slimbot.startPolling();

  }, 5000);