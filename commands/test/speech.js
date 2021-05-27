const { Command } = require('../../commands.js')
require('dotenv').config();

const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const IBM_API_KEY = process.env.IBM_API_KEY;

const IBM_SERVICE_URL = process.env.IBM_URL;

module.exports = class speechCommand extends Command {
  constructor(){
    super({
      name: 'speech',
      aliases: [],
      category: 'test',
      priority: 9,
      permLvl: 0
    });
  }
  execute(msg){
    const connection = await message.member.voice.channel.join();
    
    msg.channel.send('pong');
    IBM_API_KEY
    IBM_SERVICE_URL
    
  }
}