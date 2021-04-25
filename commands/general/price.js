const commands = require('../../commands.js')
const cmc_api = require("cmc-info");
const cmc = new cmc_api("bd448243-c2d4-4f1c-8791-573cec562e1d");

module.exports = class priceCommand extends commands.Command {
  constructor() {
    super({
      name: 'price',
      aliases: [],
      category: 'general',
      priority: 9,
      permLvl: 0
    });
  }
  execute(msg, args, discord) {
    if (!args[0]) return msg.channel.send('Debes ingresar un parametro para el valor.')

    cmc.requestCoinBySymbol(args[0], 'price')
      .then(data => {
        msg.channel.send(`${args[0].toUpperCase()}: $${numberFormat(data, 4)}`);
        console.log(data);

      })
      .catch(error => {
        msg.channel.send(`Valor no válido.`);

      });
  }
}

function numberFormat(x, precision) {
  x = Math.round(x * Math.pow(10, precision)) / Math.pow(10, precision);
  let arr = x.toString().split(".");
  let formatted = arr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (arr.length == 2) {
    formatted += "." + arr[1];
  }
  return formatted;
}