const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs')

require('dotenv').config();

client.queue = new Map();

client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error(err);
  process.exitCode = 1;
  process.exit();
  
});

for (let file of fs.readdirSync("./events/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./events/${file}`);

    client.on(fileName, fileContents.bind(null, client));

    delete require.cache[require.resolve(`./events/${file}`)];
  }
}
