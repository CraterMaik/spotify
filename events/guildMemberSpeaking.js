module.exports = async (client, member, speaking) => {

   
   if (speaking.bitfield) {
     const voiceChannel = member.voice.channel;
     voiceChannel.join().then(connection => {
       console.log('Estas hablando ' + speaking.bitfield)
      
     })
   } else {
     member.voice.channel.join().then(connection => {
      console.log('No estas hablando ' + speaking.bitfield)

     })
   }

}