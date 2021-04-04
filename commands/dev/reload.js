
const { Command } = require('../../commands.js')
module.exports = class reloadCommand extends Command {
  constructor(){
    super({
      name: 'reload',
      aliases: [],
      category: 'dev',
      priority: 9,
      permLvl: 3
    });
  }
  async execute(msg, args, discord, client){
   

    msg.channel.send('Listo')

    client.destroy()
    process.exit();
    
    
  }
}