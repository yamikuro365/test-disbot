const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `rewind`,
  category: `🎶 Music`,
  aliases: [`seekbackwards`, `rew`],
  description: `Seeks a specific amount of Seconds backwards`,
  usage: `rewind <Duration in Seconds>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{

      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Error | You may rewind for \`1\` - \`${player.queue.current.duration}\``)
        );
      let seektime = player.position - Number(args[0]) * 1000;
      if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
        seektime = 0;
      }
      //seek to the right time
      player.seek(Number(seektime));
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.rewind} Rewinded the song for \`${args[0]} Seconds\` to: ${format(Number(player.position))}`)
        .addField(`${emoji.msg.time} Progress: `, createBar(player))
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      );
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
