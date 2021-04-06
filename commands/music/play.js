const { Utils: { urlParse } } = require('spotify-manager')
const ytdl = require('ytdl-core');
require('dotenv').config();
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.YT_API_KEY)

const { id } = urlParse(process.env.PLAYLIST)

const commands = require('../../commands.js')

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

    async function handleMusic() {
      try {
        station.join()
          .then(async (conn) => {
            msg.channel.send(`Conectado en ${conn.channel.name}`);

            let SPlayList = await getPlaylist();
            playNum[msg.guild.id] = 0;

            await play(conn)
            await setPresence(SPlayList[playNum[msg.guild.id]])

          })
          
      } catch (error) {
        msg.channel.send('Hubo un error de reproducción.')

      }
    }

    async function play(conn) {
      // test
      const SPlayList = await getPlaylist();
      let song = SPlayList[playNum[msg.guild.id]];

      let video = await youtube.searchVideos(song, 1)
      if (!video.length) return msg.channel.send('No se encontraron resultados de la canción requerida.')
      console.log('Titulo: '+ video[0].title);
      let songURL = `https://www.youtube.com/watch?v=${video[0].id}`;

      const stream = ytdl(songURL, {
        filter: 'audioonly',
        highWaterMark: 1 << 25,
        quality: "highestaudio"
      })

     await conn.play(stream)
         .on('finish', async () => {
           await nextSong(conn)
            await setPresence(SPlayList[playNum[msg.guild.id]])

           })
           .on('error', (error) => console.log(error));
    }

    async function nextSong(conn) {
      const SPlayList = await getPlaylist();

      playNum[msg.guild.id] = playNum[msg.guild.id] < SPlayList.length - 1 ? playNum[msg.guild.id] + 1 : 0;

      await play(conn)

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
      const listTracks = tracks.map((track) => `${track.track.album.artists[0].name} ${track.track.name}`);
      
      return listTracks;
    }
    
    handleMusic()

  }
  
  

}