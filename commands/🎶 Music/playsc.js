const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `playsc`,
  category: `🎶 Music`,
  aliases: [`psc`, `playsoundcloud`],
  description: `Plays a song from soundcloud`,
  usage: `playsc <Song / URL>`,
  parameters: {"type":"music", "activeplayer": false, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if no args return error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | You need to give me a URL or a search term.`)
        );
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Searching**`)
        .setDescription(`\`\`\`${text}\`\`\``)
        ).then(msg=>{
          msg.delete({timeout: 5000}).catch(e=>console.log("Could not delete, this prevents a bug"))
        })
      //play the song as SOUNDCLOUD
      playermanager(client, message, args, `song:soundcloud`);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} เอะะะ แย่แล้วและเกิดข้อผิดพลาดที่เราไม่รู้นะ`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
