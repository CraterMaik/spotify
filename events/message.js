const config = require('../util.js').getConfig()[1];
const commands = require('../commands.js');
let prefix = config.prefix;
const Discord = require("discord.js");

module.exports = async (client, message) => {
  if(message.author.bot) return;

  let cmd = message.content.slice(prefix.length);
 
  if(cmd != undefined){
    cmd = cmd.split(' ');

  }
  
  let result = await commands.checkValidCmd(message, cmd, prefix);
  
  if(result){
    commands.executeCmd(message, cmd, Discord, client);

  }
}