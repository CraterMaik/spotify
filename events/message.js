const Discord = require("discord.js");
const { SpotifyManager } = require('spotify-manager')

const config = require('../util.js').getConfig()[1];
const commands = require('../commands.js');
let prefix = config.prefix;

require('dotenv').config();

const Manager = new SpotifyManager({
  clientId: process.env.CLIENT_ID_SPY,
  clientSecret: process.env.CLIENT_SECRET_SPY
})

module.exports = async (client, message) => {
  if(message.author.bot) return;

  let cmd = message.content.slice(prefix.length);
 
  if(cmd != undefined){
    cmd = cmd.split(' ');

  }
  
  let result = await commands.checkValidCmd(message, cmd, prefix);
  
  if(result){
    commands.executeCmd(message, cmd, Discord, Manager, client);

  }
}