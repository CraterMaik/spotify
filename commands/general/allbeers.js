const commands = require('../../commands.js')
const db = require("../../database/database.js");
module.exports = class allBeersCommand extends commands.Command {
  constructor() {
    super({
      name: "allbeers",
      aliases: ['ab'],
      category: "general",
      priority: 9,
      permLvl: 3
    });
  }
  async execute(msg, args) {

    let cantidad = parseInt(args[0]);
    let cantidadBeers = Math.round(cantidad)
    if (!Number.isInteger(cantidadBeers)) return msg.channel.send('Debes ingresar un numero como parametro. `allbeers <cantidad>`')
    
    msg.guild.members.cache.filter(m => !m.user.bot).map(async member => {
      console.log(member.id);
      let exists = await db.beers.exists(member.id)
      if (exists !== true) await db.beers.registerUsers(member.id)
      await db.beers.addBeers(member.id, cantidadBeers)
      
    })
    let m = await msg.channel.send('Actualizando datos..')
    setTimeout(() => {
      return m.edit('Nuevas cervezas dados a todos los usuarios.')
      
    }, 5000);
 
  }
};