const { Utils: { urlParse } } = require('spotify-manager')

const { id } = urlParse("https://open.spotify.com/playlist/0YcgZpU7ZNvHz2EfIja8Pz")

const commands = require('../../commands.js')

module.exports = class listCommand extends commands.Command {
  constructor(){
    super({
      name: 'list',
      aliases: [],
      category: 'general',
      priority: 9,
      permLvl: 0
    });
  }
  async execute(msg, args, discord, manager){

    const PlayList = await manager.getPlaylist(id)
    const tracks = await PlayList.tracks.items;
    const listTracks = tracks.map((track) => track.track.name)

    let embed = new discord.MessageEmbed()
      .setColor('random')
      .setTitle(`Playlist **${PlayList.name}**`)
      .setDescription(listTracks.join('\n'))
      .setFooter('portalmybot.com', msg.guild.iconURL())

    msg.channel.send(embed);
  }

}