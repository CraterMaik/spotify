const {
  Command
} = require('../../commands')

module.exports = class stopCommand extends Command {
  constructor() {
    super({
      name: 'stop',
      aliases: ['parar'],
      category: 'music',
      priority: 7,
      permLvl: 3
    })
  }
  async execute(msg, args, discord, manager, client) {
    const queue = client.queue;

    const serverQueue = await queue.get(msg.guild.id);

    if (!msg.member.voice.channel) return msg.channel.send('No estas conectando en un canal de voz.')

    await serverQueue.disconnect();

    return msg.channel.send('Bot desconectado del canal de voz.');


  }
}