const commands = require('../../commands.js')

const lang = require('../../util.js').getLanguage();
module.exports = class helpCommand extends commands.Command {
  constructor(){
    super({
      name: 'help',
      aliases: ['ayuda'],
      category: 'general',
      priority: 9,
      permLvl: 0
    });
  }
  execute(msg, args, discord){

    let embed = new discord.MessageEmbed()
      .setColor("GREEN")
    
    msg.channel.send(embed);

  }
}