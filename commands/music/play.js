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

    const queue = client.queue;

    let station = msg.guild.channels.cache.find(c => c.type === 'voice');

    if (!station) return msg.channel.send('No se encontro el canal indicado.')

    async function handleMusic() {
    
      try {
        
        station.join()
          .then(async (conn) => {
            msg.channel.send(`Conectado en ${conn.channel.name}`);

            let SPlayList = await getPlaylist();
            playNum[msg.guild.id] = 0;

            await play(conn)
            await queue.set(msg.guild.id, conn)
            
            await setPresence((playNum[msg.guild.id] + 1) + ' - ' + SPlayList[playNum[msg.guild.id]])

          })
          
      } catch (error) {
        msg.channel.send('Hubo un error de reproducción.')

      }
    }

    async function play(conn) {
      // test
     
      const SPlayList = await getPlaylist();
      let song = SPlayList[playNum[msg.guild.id]];
      console.log('Canción Spotify: '+song);
      let videos = await youtube.searchVideos(song, 7)
      if (!videos.length) return msg.channel.send('No se encontraron resultados de la canción requerida.')
      let videosLog = videos.map((vi, i) => i === 0 ? vi.title +` <===` : vi.title)
      // log test
      console.log(videosLog);

      const stream = ytdl(videos[0].url, {
        filter: 'audioonly',
        highWaterMark: 1 << 25,
        quality: "highestaudio"
      })

     await conn.play(stream)
         .on('finish', async () => {
           await nextSong(conn)
            await setPresence((playNum[msg.guild.id] + 1) + ' - ' + SPlayList[playNum[msg.guild.id]])
            

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
      const listTracks = tracks.map((track) => `${track.track.name} - ${track.track.album.artists[0].name === 'Various Artists' ? track.track.album.name : track.track.album.artists[0].name}`);

      return listTracks;
    }
    
    handleMusic()

  }
  
  

}