const commands = require('../../commands.js')
const db = require("../../database/database.js");

module.exports = class beersCommand extends commands.Command {
  constructor() {
    super({
      name: "beers",
      aliases: ['cervezas', 'beer', 'birras'],
      category: "general",
      priority: 9,
      permLvl: 0
    });
  }
  async execute(msg, args) {

    let mentions = msg.mentions.users.first();
    if(!mentions) return msg.channel.send('Debes mencionar a un usuario.')

    let users = msg.author.id;

    let ID_USER = mentions.id;

    let exists = await db.beers.exists(ID_USER)

    if (exists !== true) await db.beers.registerUsers(ID_USER)

    let result = await db.beers.getBeers(ID_USER);
    
    if (!args[1]) return msg.channel.send('Debe ingresar una de las siguientes opciones:\n`beers @user dar <cantidad>`')

    if (args[1] === 'dar') {

      if (!isNaN(args[2])) {
        let cantidad = parseInt(args[2]);
        let cantidadWins = Math.round(cantidad)

        await db.cards.addWins(members.id, cantidadWins)
        return msg.channel.send('Se ha agregado **' + cantidadWins + '** punto(s) de victoria a ' + members.username)

      } else {
        return msg.channel.send('Debes ingresar un numero como parametro.')

      }

    } 


  }
};