const { Canvas } = require("canvas-constructor");
/* const fsn = require("fs-nextra"); */
const snekfetch = require("node-superfetch");
const db = require("../../database/database.js");
const commands = require("../../commands.js");
/* const moment = require("moment"); */
/* const { get } = require("snekfetch"); */

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

async function createCanvas() {
  /* const { body: imageCard } = await snekfetch.get(
    "https://i.imgur.com/6FCSyFc.png"
  );

  const { body: imgMale } = await snekfetch.get(
    "https://i.imgur.com/azavTAL.png"
  );
  const { body: imgFemale } = await snekfetch.get(
    "https://i.imgur.com/ndnI7mE.png"
  );

  const { body: imgBarra } = await snekfetch.get(
    "https://i.imgur.com/YF5eKsP.png"
  );
  const { body: imgLinea } = await snekfetch.get(
    "https://i.imgur.com/t4NyLcu.png"
  ); */


 /*  const { body: imgMedal_1 } = await snekfetch.get(
    "https://cdn.discordapp.com/emojis/699664828897296495.png?v=1"
  );
  const { body: imgMedal_2 } = await snekfetch.get(
    "https://cdn.discordapp.com/emojis/699664828167356476.png?v=1"
  );
  const { body: imgMedal_3 } = await snekfetch.get(
    "https://cdn.discordapp.com/emojis/699664829396418660.png?v=1"
  );
  const { body: imgMedal_4 } = await snekfetch.get(
    "https://cdn.discordapp.com/emojis/699664829652140112.png?v=1"
  );
  const { body: imgMedal_5 } = await snekfetch.get(
    "https://cdn.discordapp.com/emojis/699664819619627079.png?v=1"
  );
  const { body: imgMedal_6 } = await snekfetch.get(
    "https://cdn.discordapp.com/emojis/699664828612214854.png?v=1"
  );
  const { body: imgMedal_7 } = await snekfetch.get(
    "https://cdn.discordapp.com/emojis/699664829757128775.png?v=1"
  );
  const { body: imgMedal_8 } = await snekfetch.get(
    "https://cdn.discordapp.com/emojis/699664828553363476.png?v=1"
  ); */


  return (
    new Canvas(721, 436)
      .save()
      .setColor('#AEFD54')
      .printRectangle(5, 5, 290, 290)
      .setColor('#FFAE23')
      .setTextFont('28px Impact')
      .printText('Hello World!', 130, 150)
      .toBufferAsync()
      /* .addImage(imageCard, 0, 0, 720, 436)
      .setColor("#000000")
      .setTextFont("36px Impact")
      .setTextAlign("start")
      .addText("IDNo." + IDLobby, 460, 70)
      .setTextFont("36px Impact")
      .setTextAlign("start")
      .addText(result.username, 230, 129)
      .setTextAlign("right")
      .addText(result.wins, 475, 205)
      .setTextAlign("right")
      .addText(result.favorite, 475, 250)
      .addText(result.created, 475, 298)
      .addImage(imdGener, 480, 130, 190, 380)
      .addImage(imgBarra, 0, 335, 720, 79)
      //medal
      // 1
      .addImage(dataMedal_1, 85, 363, 45, 46)
      // 2
      .addImage(dataMedal_2, 168, 364, 31, 45)
      // 3
      .addImage(dataMedal_3, 237, 363, 45, 46)
      // 4
      .addImage(dataMedal_4, 313, 363, 45, 46)
      // 5
      .addImage(dataMedal_5, 389, 363, 50, 50)
      // 6
      .addImage(dataMedal_6, 465, 363, 50, 50)
      // 7
      .addImage(dataMedal_7, 538, 362, 50, 50)
      // 8
      .addImage(dataMedal_8, 615, 363, 50, 50)

      //
      .addImage(imgLinea, 470, 432, 174, 4) */
      
  );
}
