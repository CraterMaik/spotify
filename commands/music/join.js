const commands = require('../../commands.js')

module.exports = class joinCommand extends commands.Command {
  constructor(){
    super({
      name: 'join',
      aliases: [],
      category: 'general',
      priority: 9,
      permLvl: 0
    });
  }
  async execute(msg, args, discord){

  }

}
