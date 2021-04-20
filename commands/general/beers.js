const commands = require('../../commands.js')
const db = require("../../database/database.js");

module.exports = class beersCommand extends commands.Command {
  constructor() {
    super({
      name: "beers",
      aliases: ['cervezas', 'cerveza', 'beer', 'birras'],
      category: "general",
      priority: 9,
      permLvl: 0
    });
  }
  async execute(msg, args) {

    let mentions = msg.mentions.users.first();
    if (!mentions) return msg.channel.send('Para ver tus cervezas usa el comando `perfil`\no bebes mencionar a un usuario para regalar usando: `beers @user dar <cantidad>`')
    
    let ID_USER = msg.author.id;

    let ID_USERM = mentions.id;

    let exists = await db.beers.exists(ID_USER)

    if (exists !== true) await db.beers.registerUsers(ID_USER)

   
   // if (!args[1]) return msg.channel.send('Debe ingresar una de las siguientes opciones:\n`beers @user dar <cantidad>`')

    if (args[1] === 'dar' || args[1] === 'regalar') {
      let result = await db.beers.getBeers(ID_USER);
      let BEERS_USER = result.beers;
      
      if (!isNaN(args[2])) {
        let cantidad = parseInt(args[2]);
        let cantidadInt = Math.round(cantidad)
        if (cantidadInt > BEERS_USER) return msg.channel.send('No tienes la cantidad suficiente para regalar una cerveza.')
        
        let existsM = await db.beers.exists(ID_USERM)
        if (existsM !== true) await db.beers.registerUsers(ID_USERM)

        await db.beers.giftBeers(ID_USER, ID_USERM, cantidadInt)

        return msg.channel.send({embed: {
          description: `Has regalado **${cantidadInt}** cerveza('s) a <@${ID_USERM}>. Salud 🍺!`,
          color: '#2c2c2c'
        }})

      } else {
        return msg.channel.send('Debes ingresar un numero como parametro.')

      }

    } 


  }
};