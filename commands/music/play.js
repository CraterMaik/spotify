const { Utils: { urlParse } } = require('spotify-manager')
const ytdl = require('ytdl-core');
require('dotenv').config();
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.YT_API_KEY)

const { id } = urlParse("https://open.spotify.com/playlist/0YcgZpU7ZNvHz2EfIja8Pz")

const commands = require('../../commands.js')

const playlist = [
        'https://www.youtube.com/watch?v=papuvlVeZg8',
        'https://www.youtube.com/watch?v=PMivT7MJ41M',
        'https://www.youtube.com/watch?v=qPTfXwPf_HM'
      ];

let playNum = {};
module.exports = class playCommand extends commands.Command {
  constructor(){
    super({
      name: 'play',
      aliases: [],
      category: 'music',
      priority: 9,
      permLvl: 0
    });
  }
  async execute(msg, args, discord, manager, client){

    let station = msg.guild.channels.cache.find(c => c.type === 'voice');

    if (!station) return msg.channel.send('No se encontro el canal inidicado.')

    async function handleMusic(playlist) {
      try {
        station.join()
          .then(async (conn) => {
            msg.channel.send(`Conectado en ${conn.channel.name}`);
            let SPlayList = await getPlaylist();
            playNum[msg.guild.id] = 0;
            await play(playlist, conn)
            await setPresence(SPlayList[playNum[msg.guild.id]])

          })
          
      } catch (error) {
        msg.channel.send('Hubo un error de reproducción.')

      }
    }

    async function play(playlist, conn) {
      // test
      const SPlayList = await getPlaylist();
 
      console.log(SPlayList[playNum[msg.guild.id]]);
      
      const stream = ytdl(playlist[playNum[msg.guild.id]], {
        filter: 'audioonly',
        highWaterMark: 1 << 25,
        quality: "highestaudio"
      })

     await conn.play(stream)
         .on('finish', async () => {
           await nextSong(playlist, conn)
            await setPresence(SPlayList[playNum[msg.guild.id]])

           })
           .on('error', (error) => console.log(error));
    }

    async function nextSong(playlist, conn) {

      playNum[msg.guild.id] = playNum[msg.guild.id] < playlist.length - 1 ? playNum[msg.guild.id] + 1 : 0;

      await play(playlist, conn)

    }

    async function setPresence(song) {
       client.user.setPresence({
         activity: {
           name: `${song}`,
           type: 'LISTENING'
         }
       })

    }
    async function getPlaylist() {
      /* PlayList Spotify */
      const SplayList = await manager.getPlaylist(id)
      const tracks = await SplayList.tracks.items;

      //name, duration_ms, popularity
      const listTracks = tracks.map((track) => `${track.track.album.artists[0].name} - ${track.track.name} `);
      
      return listTracks;
    }

    handleMusic(playlist)

  }
  
  

}