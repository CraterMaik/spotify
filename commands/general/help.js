const commands = require('../../commands.js')

const lang = require('../../util.js').getLanguage();
module.exports = class helpCommand extends commands.Command {
  constructor(){
    super({
      name: 'help',
      aliases: ['ayuda'],
      category: 'general',
      priority: 9,
      permLvl: 6
    });
  }
  execute(msg, args, discord){

  
    let embed = new discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription('Sistema de tarjeta de entrenador.\nPrefix: `k!`\n\n**COMANDOS:**')
      .addField("empezar", 'Comando de inicio para crear tu tarjeta de entrenador y empezar en esta aventura.')
      .addField("perfil", 'Comando para visualizar tu tarjeta de entrenador.\nUso: `perfil` o `perfil @user`')
      .addField("medals", 'Comando para visualizar la lista de medallas y sus códigos disponibles.')
      .addField('\u200b', '\u200b')
      .addField("setmedals", 'Comando para configurar la medallas de los entrenadores.\nUso: `setmedals @user add/remove <código>`.')
      .addField("setwins", 'Comando para configurar la cantidad de victorias de los entrenadores.\nUso: `setwins @user add/remove <cantidad>`.')
    msg.channel.send(embed);

  }
}