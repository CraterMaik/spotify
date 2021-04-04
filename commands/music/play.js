const { Utils: { urlParse } } = require('spotify-manager')

const { id } = urlParse("https://open.spotify.com/playlist/0YcgZpU7ZNvHz2EfIja8Pz")

const commands = require('../../commands.js')

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

    if(!station) return msg.channel.send('No se encontro el canal inidicado.')

    station.join()
      .then((conn) => {
        msg.channel.send(`Conectado en ${conn.channel.name}`);
        
      })
    
    async function play(guild, song) {
      const serverQueue = await queue.get(guid.id)
    }



    const PlayList = await manager.getPlaylist(id)
    const tracks = await PlayList.tracks.items;

    //name, duration_ms, popularity
    const listTracks = tracks.map((track) => track.track.name)

 //   console.log(listTracks);
 
  }

}