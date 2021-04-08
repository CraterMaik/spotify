const {
  Command
} = require('../../commands')

module.exports = class skipCommand extends Command {
  constructor() {
    super({
      name: 'skip',
      aliases: ['next'],
      category: 'music',
      priority: 7,
      permLvl: 0
    })
  }
  async execute(msg, args, discord, manager, client) {
    const queue = client.queue;

    const serverQueue = await queue.get(msg.guild.id);

    if (!msg.member.voice.channel) return msg.channel.send('No estas conectando en un canal de voz.')
 
    await serverQueue.dispatcher.end();
    
   
    return msg.channel.send('La canción en reproducción fue omitida.');
    

  }
}