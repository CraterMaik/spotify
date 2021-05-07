
module.exports = async (client, reaction, user) => {
  const message = reaction.message;
  if (user.bot) return;

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      return;
    }
  }
 
  if (reaction.emoji.name === "⚪") {
      const member = message.guild.members.cache.get(user.id);
  
      message.guild.channels.cache.get(message.channel.id).send(`${member.user.username} (${member.user.id})`)
  }
}