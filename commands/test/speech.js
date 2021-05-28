const { Command } = require('../../commands.js')
require('dotenv').config()
let fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const ffmpeg = require('fluent-ffmpeg');

const { Readable } = require('stream'); //streams
const { OpusEncoder } = require('@discordjs/opus');

const IBM_API_KEY = process.env.IBM_API_KEY;

const IBM_SERVICE_URL = process.env.IBM_URL;

 const speechToText = new SpeechToTextV1({
   authenticator: new IamAuthenticator({
     apikey: IBM_API_KEY,
   }),
   serviceUrl: IBM_SERVICE_URL,
 })
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
  async execute(message, args, discord, manager, client) {
    if (!message.member.voice.channel) return message.reply('Please join a voice channel first!');
    if ((message.member.voice.channel.members.filter((e) => client.user.id === e.user.id).size > 0)) return message.reply(`I'm already in your voice channel!`);

    if (!message.member.voice.channel.joinable) return message.reply(`I don't have permission to join that voice channel!`);
    if (!message.member.voice.channel.speakable) return message.reply(`I don't have permission to speak in that voice channel!`);

    const connection = await message.member.voice.channel.join();

    if (connection) message.channel.send("successfully started speech to text/already in VC")
    let stream;

    connection.on('speaking', (user, speaking) => {
       // console.log(speaking);
       if (speaking.bitfield == 0 || user.bot) return;
     // console.log(speaking);
          if (speaking.bitfield) {
              let audio = connection.receiver.createStream(user, {
                mode: 'pcm',
                end: 'silence'
              });
             console.log(`Hablando: ${user.tag}`);
             console.log(audio);
          }
       
/* 
       if(speaking) {
         console.log(`Hablando: ${user.tag}`);
         let talking = user.username
         stream = ffmpeg(audio).fromFormat('s32le').toFormat('wav').pipe();

         stream.pipe(speechToText.recognizeUsingWebSocket({
           objectMode: true
         }).on('error', e => console.log(e)).on('data', (d) => {
           let result = d.results.map(result => result.alternatives.map(alternative => alternative.transcript).join(' ')).join(' ');
           if (result.length > 1 && result !== '%HESIATION')
             message.channel.send(`${talking}: ${result.replace(/%HESITATION/g, '')}`);

         }));

       } */


    })
    /* 
    connection.on('speaking', (user, speaking) => {
      if (!user) return;
      if (user.bot) return;
      if (!speaking) {
        console.log("tyst");
        return;
      }   
      const audio = connection.receiver.createStream(user, {
        mode: 'pcm'
      }); */
      //const audioFileName = './' + user.id + '_' + Date.now() + '.pcm';

      //audio.pipe(fs.createWriteStream(audioFileName));

    //  audio.on('end', async () => {
      //  console.log('ENTRO EN AUDIO END')
        /* fs.stat(audioFileName, async (err, stat) => {
          if (!err && stat.size) {
            const speechToText = new SpeechToTextV1({
              authenticator: new IamAuthenticator({
                apikey: IBM_API_KEY,
              }),
                serviceUrl: IBM_SERVICE_URL,
            })

            let params = {
              content_type: 'audio/wav',
              objectMode: true,
              profanityFilter: false
            }

          //  const file = fs.readFileSync(audioFileName);
            const recognizeStream = speechToText.recognizeUsingWebSocket(params);

            fs.createReadStream('output.wav').pipe(recognizeStream);

            recognizeStream.on('data', function (event) {
              if (!event.results.length == 0) {
                console.log("FUNKAR");
                let result = event.results[0].alternatives[0].transcript;
                //let firstWord = result.split(" ")[0];
                if(result) {
                  console.log(result);
                }
              }
           // })


          }
        }) */
      //})


   // })

  }
}