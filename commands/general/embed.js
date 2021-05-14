const commands = require('../../commands.js')

const lang = require('../../util.js').getLanguage();
module.exports = class EmbedCommand extends commands.Command {
  constructor(){
    super({
      name: 'embed',
      aliases: ['data', 'em'],
      args: [
        new commands.Argument({
          optional: true,
          missingError: lang.error.noArgs.mention,
          invalidError: lang.error.incoArgs.text
        })
      ],
      category: 'general',
      priority: 9,
      permLvl: 3
    });
  }
  execute(msg, args, discord){
   
    let TITLE = args[0];
    let CONTENT = args.slice(1).join(" ");
    
    msg.delete({ timeout: 5000, reason: 'Opciones embed.' });
    
    let embed = new discord.MessageEmbed()
      .setColor(0x30EDB5)
      .setTitle(TITLE)
      .setDescription(CONTENT)
      .setFooter('portalmybot.com', msg.guild.iconURL())

    msg.channel.send(embed);

  }
}