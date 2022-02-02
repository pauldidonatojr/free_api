var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = `https://tokenfomo.io/api/tokens/eth?limit=1&apikey=0e14821c9127c495bf15d690dc02a96386980392`
const res = new XMLHttpRequest()
res.open('GET', url)
res.send()

res.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText)
    console.log(data)
})