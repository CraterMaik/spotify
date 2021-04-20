const commands = require('../../commands.js')
const db = require("../../database/database.js");

const lang = require('../../util.js').getLanguage();

module.exports = class setBeertsCommand extends commands.Command {
  constructor() {
    super({
      name: "setbeers",
      aliases: ['sb'],
      category: "general",
      priority: 9,
      permLvl: 3
    });
  }
  async execute(msg, args) {

    let members = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);

    if (!members) return msg.channel.send('Debe mencionar a un usuario.')
    //#comando @user, add, '22'
    let exists = await db.beers.exists(members.id)

    if (exists !== true) await db.beers.registerUsers(members.id)

    if (!args[1]) return msg.channel.send('Debe ingresar una de las siguientes opciones:\n`setbeers @user add <puntos>` ó `setbeers @user remove <puntos>`')

    if (args[1] === 'add') {

      if (!isNaN(args[2])) {
        let cantidad = parseInt(args[2]);
        let cantidadBeers = Math.round(cantidad)

        await db.beers.addBeers(members.id, cantidadBeers)
        return msg.channel.send('Se ha agregado **' + cantidadBeers + '** cerveza(s) a ' + members.username)

      } else {
        return msg.channel.send('Debes ingresar un numero como parametro.')

      }

    } else if (args[1] === 'remove') {
      if (!isNaN(args[2])) {
        let cantidad = parseInt(args[2]);
        let cantidadBeers = Math.round(cantidad)

        await db.beers.removeBeers(members.id, cantidadWins)
        return msg.channel.send('Se ha eliminado **' + cantidadBeers + '** cerveza(s)  ' + members.username)

      } else {
        return msg.channel.send('Debes ingresar un numero como parametro.')

      }

    }


  }
};