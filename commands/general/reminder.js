const commands = require('../../commands.js')

module.exports = class helpCommand extends commands.Command {
  constructor() {
    super({
      name: 'reminder',
      aliases: ['rem'],
      category: 'general',
      priority: 9,
      permLvl: 3
    });
  }
  execute(msg, args, discord) {
    msg.channel.send('Reacciona este mensaje para el recordatorio.').then((message) => {
       message.react(`⚪`)
       
    })
  }
}