const commands = require('../../commands.js')

module.exports = class joinCommand extends commands.Command {
  constructor(){
    super({
      name: 'join',
      aliases: [],
      category: 'music',
      priority: 9,
      permLvl: 0
    });
  }
  async execute(msg, args, discord){
  
      if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
      } else {
        msg.reply('You need to join a voice channel first!');
      }
    
  
  }

}
