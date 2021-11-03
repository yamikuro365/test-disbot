const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `reset`,
  aliases: [`hardreset`],
  category: `⚙️ Settings`,
  description: `Resets / Deletes all of the Setups as well as the prefix!`,
  usage: `reset`,
  run: async (client, message, args) => {
    try {
      //if not enough permissions aka not the guild owner, return error
      if (!config.ownerIDS.includes(message.author.id))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} ขอโทษคะแกกกไม่มีสิทธิใช้คำสั่งนี้เพราะไม่ใช่ Developer ยังไงละชิ !!!*`)
        );
      //ask for second yes
      let themsg = message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`คุณต้องการรีเซ็ตระบบทั้งหมดใช่หรือไม่คะคุณ Developer`)
        .setDescription(`*'งั้นท่าใช่ก็พิมพ์ตามนี้นะ :* **__\`yes\`__**`)
      ).then((msg) => {
        //wait for answer of the right user
        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 30 * 1000,
            errors: ['time']
          })
          //after right user answered
          .then(async collected => {
            //and if its yes
            if (collected.first().content.toLowerCase() === `yes`) {
              //reset the database of the setup
              client.setups.set(message.guild.id, {
                textchannel: `0`,
                voicechannel: `0`,
                category: `0`,
                message_cmd_info: `0`,
                message_queue_info: `0`,
                message_track_info: `0`
              });
              //reset the settings like prefix djroles and botchannels
              client.settings.set(message.guild.id, {
                prefix: config.prefix,
                djroles: [],
                botchannel: [],
              });
              //send the success message
              return message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.SUCCESS} เอาและทำการรีเซ็ตระบบทั้งหมดให้และนะคะ`)
                .setDescription(`ทุกคำสั่งต้องขึ้นต้นด้วยเครื่องหมายนี้นะ : \`${config.prefix}\`\n`)
              );
            }
            //if an error happens, reply
          }).catch(e => {
            console.log(String(e.stack).yellow)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} อุ่ยยพิมพ์ผิดหรือเปล่านะหรือพิมพ์ช้าเกินไปนะงั้นไปใช้คำสั่งมาใหม่สะนะ`)
            );
          })
      });
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
