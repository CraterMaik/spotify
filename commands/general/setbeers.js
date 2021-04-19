const commands = require('../../commands.js')
const db = require("../../database/database.js");

const lang = require('../../util.js').getLanguage();

module.exports = class setWinsCommand extends commands.Command {
  constructor() {
    super({
      name: "setwins",
      aliases: ['sw'],
      category: "levels",
      priority: 9,
      permLvl: 3
    });
  }
  async execute(msg, args) {

    let members = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);

    if (!members) return msg.channel.send('Debe mencionar a un usuario.')
    //#comando @user, add, '22'
    let exists = await db.cards.exists(members.id);
    if (exists !== true)
      return msg.channel.send(
        "Usuario mencionado no tiene una tarjeta de entrenador registrada."
      );
    if (!args[1]) return msg.channel.send('Debe ingresar una de las siguientes opciones:\n`setwins @user add <puntos>` ó `setwins @user remove <puntos>`')

    if (args[1] === 'add') {

      if (!isNaN(args[2])) {
        let cantidad = parseInt(args[2]);
        let cantidadWins = Math.round(cantidad)

        await db.cards.addWins(members.id, cantidadWins)
        return msg.channel.send('Se ha agregado **' + cantidadWins + '** punto(s) de victoria a ' + members.username)

      } else {
        return msg.channel.send('Debes ingresar un numero como parametro.')

      }

    } else if (args[1] === 'remove') {
      if (!isNaN(args[2])) {
        let cantidad = parseInt(args[2]);
        let cantidadWins = Math.round(cantidad)

        await db.cards.removeWins(members.id, cantidadWins)
        return msg.channel.send('Se ha eliminado **' + cantidadWins + '** punto(s) de victoria a ' + members.username)

      } else {
        return msg.channel.send('Debes ingresar un numero como parametro.')

      }

    }


  }
};