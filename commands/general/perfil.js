const { Canvas } = require("canvas-constructor");
/* const fsn = require("fs-nextra"); */
const snekfetch = require("node-superfetch");
const db = require("../../database/database.js");
const commands = require("../../commands.js");
module.exports = class perfilCommand extends commands.Command {
  constructor() {
    super({
      name: "perfil",
      aliases: ['me'],
      category: "general",
      priority: 9,
      permLvl: 0
    });
  }
  async execute(msg) {
    let mentions = msg.mentions.users.first() || msg.author;
    let ID_USER = mentions.id;

    let exists = await db.beers.exists(ID_USER)

    if (exists !== true) await db.beers.registerUsers(ID_USER)

    let result = await db.beers.getBeers(ID_USER);
 
    const { body: cardIMG } = await snekfetch.get(
      "https://media.discordapp.net/attachments/697641982784438272/829827449063735377/Card_Beer.jpg?width=332&height=436"
    );
    const { body: avatarIMG } = await snekfetch.get(
       mentions.displayAvatarURL({ format: "jpg", size: 1024 })
    );
    
    const card = new Canvas(302, 406)
      .addImage(cardIMG, 0, 0, 302, 406)
      .setColor('#7289DA')
      .addCircle(150, 90, 63)
      .addCircularImage(avatarIMG, 150, 90, 60)
      .setColor('#23272A')
      .setTextFont('38px Impact')
      .addResponsiveText(mentions.username, 78, 190, 150)
      .setTextFont('75px Impact')
      .addText(result.beers, 165, 325)
      .toBuffer();

    await msg.channel.send({files:[{attachment: card, name: `${ID_USER}-profile.png`}]});

  }
};


