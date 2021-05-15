const commands = require('../../commands.js')
const cmc_api = require("cmc-info");
require('dotenv').config();

const cmc = new cmc_api(process.env.COIN_MARKET);
module.exports = class cryptoCommand extends commands.Command {
  constructor() {
    super({
      name: 'crypto',
      aliases: [],
      category: 'general',
      priority: 9,
      permLvl: 0
    });
  }
  execute(msg, args, discord) {
    if (!args[0]) return msg.channel.send('Debes ingresar un parametro como simbolo.')

    cmc.requestCoinBySymbol(args[0])
      .then(data => {

        let id = data['id'];
        let name = data['name'];
        let rank = data['cmc_rank'];
        let symbol = data['symbol'];
        let supply = numberFormat(data['circulating_supply'], 2);
        let price = numberFormat(data['quote']['USD']['price'], 4);

        let percent_change_24h = numberFormat(data['quote']['USD']['percent_change_24h'], 2);
        let percent_change_7d = numberFormat(data['quote']['USD']['percent_change_7d'], 2);
        let market_cap = numberFormat(data['quote']['USD']['market_cap'], 2);

        let price24 = (Math.abs(percent_change_24h) * Math.trunc(data['quote']['USD']['price'])) / 100;
        let price7d = (Math.abs(percent_change_7d) * Math.trunc(data['quote']['USD']['price'])) / 100;

        msg.channel.send({
          embed: {
            title: `${name} | ${symbol} | (#${rank})`,
            color: 0x0099ff,
            thumbnail: {
              url: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`
            },
            fields: [
              {
                name: 'Precio',
                value: `▸ $${price}`,
              },
              {
                name: 'Precio de cambio (24h)',
                value: `▸ $${numberFormat(price24, 2)} (${percent_change_24h}%)`,
                
              },
              {
                name: 'Precio de cambio (7d)',
                value: `▸ $${numberFormat(price7d, 2)} (${percent_change_7d}%)`,
                inline: true
              },
              {
                name: 'Market Cap',
                value: `▸ $${market_cap}`
                
              },
              {
                name: 'Suministro circulante',
                value: `▸ $${supply}`,
                inline: true
              },
              {
                name: 'Estadísticas detalladas',
                value: `[CoinMarketCap](https://coinmarketcap.com/currencies/${name.toLocaleLowerCase().split(' ').join('-')}/)`,
              },
            ],
            image: {
              url: `https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/${id}.png`
            },
            timestamp: new Date(),
            footer: {
              text: `${msg.guild.name}`,
              icon_url: msg.guild.iconURL()
            }
          },
        });
      })
      .catch(error => {
        msg.channel.send(`Error: not found.`);
        console.error(error);
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