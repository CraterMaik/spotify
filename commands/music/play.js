const { Utils: { urlParse } } = require('spotify-manager')
const ytdl = require('ytdl-core');

const { id } = urlParse("https://open.spotify.com/playlist/0YcgZpU7ZNvHz2EfIja8Pz")

const commands = require('../../commands.js')
const list = [
        'https://www.youtube.com/watch?v=papuvlVeZg8',
        'https://www.youtube.com/watch?v=PMivT7MJ41M',
        'https://www.youtube.com/watch?v=qPTfXwPf_HM'
      ];
module.exports = class playCommand extends commands.Command {
  constructor(){
    super({
      name: 'play',
      aliases: [],
      category: 'general',
      priority: 9,
      permLvl: 0
    });
  }
  async execute(msg, args, discord, manager){

    let station = msg.guild.channels.cache.find(c => c.type === 'voice');

    if (!station) return msg.channel.send('No se encontro el canal inidicado.')

    async function play(song, conn) {
      const stream = ytdl(song, {
        filter: 'audioonly',
        highWaterMark: 1 << 25,
        quality: "highestaudio"
      })

     await conn.play(stream)
         .on('finish', async () => {
            await play(song, conn)

           })
           .on('error', (error) => console.log(error));
    }

    async function handleVideo(song) {
      try {
        station.join()
          .then(async (conn) => {
            msg.channel.send(`Conectado en ${conn.channel.name}`);
            
            /* PlayList Spotify */
            const PlayList = await manager.getPlaylist(id)
            const tracks = await PlayList.tracks.items;
            
            //name, duration_ms, popularity
            const listTracks = tracks.map((track) => track.track.name)

            
            await play(song, conn)
            //   console.log(listTracks);

          })
          
      } catch (error) {
        msg.channel.send('Hubo un error de reproducción.')

      }
    }

    handleVideo('https://www.youtube.com/watch?v=rwkoXft0dXU')

  }

}