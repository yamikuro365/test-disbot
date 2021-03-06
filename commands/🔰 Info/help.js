const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "help",
  category: "đ° Info",
  aliases: ["h", "commandinfo"],
  cooldown: 4,
  usage: "help [Command]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, user, text, prefix) => {
    let emojis = ["đ°", "đšī¸", "đļ", "đ"]
    try {
      if (args[0]) {
        const embed = new MessageEmbed();
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.channel.send(embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const n = 3;
          const result = [
            [],
            [],
            []
          ];
          const wordsPerLine = Math.ceil(items.length / 3);
          for (let line = 0; line < n; line++) {
            for (let i = 0; i < wordsPerLine; i++) {
              const value = items[i + line * wordsPerLine];
              if (!value) continue;
              result[line].push(value);
            }
          }

          const embed = new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`MENU đ° **${category.toUpperCase()} [${items.length}]**`)
            .setFooter(`To see command Descriptions and Inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.addField(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
            } catch {}
          } else {
            try {
              embed.addField(`\u200b`, `> ${result[0].join("\n> ")}`, true);
            } catch {}
            try {
              embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);
            } catch {}
            try {
              embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);
            } catch {}
          }
          return message.channel.send(embed)
        }
        if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
        if (cmd.description) embed.addField("**Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch {}
        if (cmd.cooldown) embed.addField("**Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField("**Cooldown**", `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**Usage**", `\`\`\`${config.prefix}${cmd.usage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", ee.footericon);
        }
        if (cmd.useage) {
          embed.addField("**Useage**", `\`\`\`${config.prefix}${cmd.useage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", ee.footericon);
        }
        return message.channel.send(embed);
      } else {
        let userperms = message.member.hasPermission("ADMINISTRATOR");
        let owner = config.ownerIDS.includes(message.author.id);
        let cmduser = message.author.id;

        const baseembed = new MessageEmbed()
          .setColor(ee.color)
          .setFooter("ā¸ā¸Ĩā¸´ā¸ā¸ā¸ĩāš emoji! āšā¸ā¸ˇāšā¸­ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸āšā¸āšāšā¸Ĩā¸ĸā¸ā¸°ā¸ā¸°āšā¸­ā¸ā¸§ā¸āšā¸§ā¸Ŗ", ee.footericon)
          .setTitle("āšā¸­ā¸˛āšā¸Ĩā¸°āš ā¸Ąā¸˛ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸ā¸ā¸ąāšā¸ā¸Ģā¸Ąā¸ā¸ā¸ąā¸āšā¸Ĩā¸ĸā¸ĸā¸ĸ !!!")
          .setDescription(`

đ°  **==>** ā¸ā¸āšā¸ā¸ˇāšā¸­ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸ **ā¸ā¸ąāšā¸§āšā¸** ā¸ā¸°

đšī¸  **==>** ā¸ā¸āšā¸ā¸ˇāšā¸­ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸ **ā¸Ĩā¸šā¸āšā¸Ĩāšā¸** ā¸ā¸­ā¸āšā¸Ŗā¸˛ā¸ā¸ąāšā¸ā¸Ģā¸Ąā¸ā¸ā¸°

đļ  **==>** ā¸ā¸āšā¸ā¸ˇāšā¸­ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸āšā¸ā¸ĩāšā¸ĸā¸§ā¸ā¸ąā¸ **ā¸ā¸˛ā¸Ŗāšā¸Ĩāšā¸āšā¸ā¸Ĩā¸** ā¸ā¸ąāšā¸ā¸Ģā¸Ąā¸āšā¸āšā¸˛āšā¸ā¸Ģā¸Ŗā¸ˇā¸­ā¸āšā¸˛ā¸§ā¸§!!!

đ  **==>** ā¸ā¸āšā¸ā¸ˇāšā¸­ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸āšā¸ā¸ĩāšā¸ĸā¸§ā¸ā¸ąā¸ **ā¸Ŗā¸°ā¸ā¸ā¸ā¸˛ā¸Ŗā¸ā¸ąā¸ā¸ā¸Ŗā¸­ā¸āšā¸ā¸Ĩā¸** ā¸ā¸ąāšā¸ā¸Ģā¸Ąā¸ā¸Žā¸ļāšā¸Ąā¸Ąā¸ĸā¸ąā¸ā¸ĸā¸ąā¸āšā¸Ąāšā¸Ģā¸ĸā¸¸ā¸ā¸ā¸˛ā¸Ąā¸­ā¸ĩā¸ā¸ā¸°

${owner == true ? `\nđ **==>** ā¸ā¸āšā¸ā¸ˇāšā¸­ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸āšā¸ā¸ĩāšā¸ĸā¸§ā¸ā¸ąā¸ **āšā¸āšā¸˛ā¸ā¸­ā¸Bot** ā¸ā¸ąāšā¸ā¸Ģā¸Ąā¸...āšā¸Žāšā¸­ā¸­ā¸ā¸˛ā¸Ąā¸­ā¸ĸā¸šāšāšā¸āš` : ""}
${userperms == true ? `\nâī¸ **==>** ā¸ā¸āšā¸ā¸ˇāšā¸­ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸āšā¸ā¸ĩāšā¸ĸā¸§ā¸ā¸ąā¸ **ā¸ā¸˛ā¸Ŗā¸ā¸ąāšā¸ā¸āšā¸˛** ā¸ā¸ąāšā¸ā¸Ģā¸Ąā¸..āšā¸­āšā¸ĸā¸ĸā¸Ģā¸ĸā¸¸ā¸ā¸Ēā¸ąā¸ā¸ā¸ĩāšā¸ā¸­ā¸°

đĢ  **==>** ā¸ā¸āšā¸ā¸ˇāšā¸­ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸āšā¸ā¸ĩāšā¸ĸā¸§ā¸ā¸ąā¸ **āšā¸­ā¸ā¸Ąā¸´ā¸** ā¸ā¸ąāšā¸ā¸Ģā¸Ąā¸ā¸ā¸ĩāšāšā¸Ŗā¸˛ā¸ā¸°ā¸ā¸­ā¸ā¸­ā¸ąā¸ā¸Ēā¸¸ā¸ā¸āšā¸˛ā¸ĸāšā¸Ĩā¸°ā¸ā¸°āšā¸Ĩā¸´ā¸ā¸ā¸˛ā¸Ąāšā¸āšāšā¸Ĩāšā¸§` : ""}
`)
          .setImage("https://i.imgur.com/g6etJUQ.gif")

        sendBaseEmbed();

        async function sendBaseEmbed(basemsg) {
          try {
            let msg;
            if (basemsg) msg = await basemsg.edit(baseembed)
            else msg = await message.channel.send(baseembed);

            if (owner) emojis.push("đ")
            if (userperms) {
              emojis.push("âī¸")
              emojis.push("đĢ")
            }

            for (const emoji of emojis)
              msg.react(emoji).catch(e => console.log("couldnt add reaction"))

            const filter = (reaction, user) => {
              return emojis.includes(reaction.emoji.name) && user.id === cmduser;
            };

            msg.awaitReactions(filter, {
                max: 1,
                time: 30 * 1000,
                errors: ['time']
              })
              .then(collected => {
                collected.first().users.remove(user.id).catch(error => console.error('Failed to clear reactions: '));
                var found = false;
                for (var i = 0; i < client.categories.length && !found; i++) {
                  if (client.categories[i].includes(collected.first().emoji.name)) {
                    sendCategoryEmbed(client.categories[i], msg)
                    break;
                  }
                }
              })
              .catch(e => {
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emoji.msg.ERROR} āšā¸­ā¸˛āšā¸Ĩā¸°āš ā¸Ģā¸Ąā¸āšā¸§ā¸Ĩā¸˛ā¸ā¸šāšā¸Ĩā¸°ā¸ā¸°ā¸Ĩā¸ĩā¸Ĩā¸˛āšā¸Ĩā¸ˇā¸­ā¸ā¸­ā¸ĸā¸šāšāšā¸āšā¸ā¸´āšā¸ā¸ā¸āšā¸āšā¸ā¸ŗā¸Ēā¸ąāšā¸ā¸Ąā¸˛āšā¸Ģā¸Ąāšā¸ā¸°!!!  `)
                  .setDescription(`\`\`\`${e.message}\`\`\``)
                ).then(msg => msg.delete({
                  timeout: 4000
                }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey)))
              });
          } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} āšā¸­ā¸°ā¸°ā¸° āšā¸ĸāšāšā¸Ĩāšā¸§āšā¸Ĩā¸°āšā¸ā¸´ā¸ā¸āšā¸­ā¸ā¸´ā¸ā¸ā¸Ĩā¸˛ā¸ā¸ā¸ĩāšāšā¸Ŗā¸˛āšā¸Ąāšā¸Ŗā¸šāšā¸ā¸°`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
            );
          }
        }

        function sendCategoryEmbed(category, message) {

          try {
            const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
            const n = 3;
            const result = [
              [],
              [],
              []
            ];
            const wordsPerLine = Math.ceil(items.length / 3);
            for (let line = 0; line < n; line++) {
              for (let i = 0; i < wordsPerLine; i++) {
                const value = items[i + line * wordsPerLine];
                if (!value) continue;
                result[line].push(value);
              }
            }

            const embed = new MessageEmbed()
              .setColor(ee.color)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle(`MENU đ° **${category.toUpperCase()} [${items.length}]**`)
              .setDescription("*ā¸ā¸ Emoji ā¸ā¸˛ā¸Ąā¸Ŗā¸šā¸ā¸ā¸ĩāšāšā¸ā¸ˇāšā¸­ā¸ā¸Ĩā¸ąā¸āšā¸āšā¸Ąā¸ā¸šā¸āšā¸­ā¸ā¸Ģā¸āšā¸˛ā¸ā¸°:* âĒ")
              .setFooter(`āšā¸­ā¸˛āšā¸Ĩā¸°āš āšā¸Ŗā¸˛ā¸ā¸°ā¸ĸāšā¸ŗā¸­ā¸ĩā¸ā¸ā¸Ŗā¸ąāšā¸ā¸ā¸°ā¸ā¸´ā¸Ąā¸āšā¸ā¸˛ā¸Ąāšā¸Ŗā¸˛āšā¸ā¸ā¸ā¸ĩāš, ${config.prefix}help [CMD NAME]āšā¸ā¸ˇāšā¸­ā¸ā¸šā¸ā¸ŗā¸Ēā¸ąāšā¸ā¸ā¸ąāšā¸ā¸Ģā¸Ąā¸ā¸āšā¸˛āšā¸Ąāšā¸ā¸ąā¸ā¸Ĩā¸°ā¸āšā¸Ŗā¸°ā¸§ā¸ąā¸āšā¸ā¸ā¸ā¸ąā¸ā¸Ģā¸āšā¸˛ā¸ā¸°ā¸ā¸´ā¸ā¸´`, client.user.displayAvatarURL());

            if (category.toLowerCase().includes("custom")) {
              const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
              try {
                embed.addField(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
              } catch {}
            } else {
              try {
                embed.addField(`\u200b`, `> ${result[0].join("\n> ")}`, true);
              } catch {}
              try {
                embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);
              } catch {}
              try {
                embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);
              } catch {}
            }
            message.edit(embed).then(msg => {
              msg.react("âĒ")
              emojis.push("âĒ")
              const filter = (reaction, user) => {
                return emojis.includes(reaction.emoji.name) && user.id === cmduser;
              };
              msg.awaitReactions(filter, {
                  max: 1,
                  time: 60 * 1000,
                  errors: ['time']
                })
                .then(collected => {
                  collected.first().users.remove(user.id).catch(error => console.error('Failed to clear reactions: '));
                  var found = false;
                  if (collected.first().emoji.name === "âĒ") return sendBaseEmbed(msg);
                  for (var i = 0; i < client.categories.length && !found; i++) {
                    if (client.categories[i].includes(collected.first().emoji.name)) {
                      sendCategoryEmbed(client.categories[i], msg)
                      break;
                    }
                  }
                })
                .catch(e => {
                  try {
                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: '));
                  } catch {
                    /* */
                  }
                });
            })
          } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} āšā¸­ā¸°ā¸°ā¸° āšā¸ĸāšāšā¸Ĩāšā¸§āšā¸Ĩā¸°āšā¸ā¸´ā¸ā¸āšā¸­ā¸ā¸´ā¸ā¸ā¸Ĩā¸˛ā¸ā¸ā¸ĩāšāšā¸Ŗā¸˛āšā¸Ąāšā¸Ŗā¸šāšā¸ā¸°`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
            );
          }
        }
        /* OLD HELP COMMAND
                 const embed = new MessageEmbed()
                     .setColor(ee.color)
                     .setThumbnail(client.user.displayAvatarURL())
                     .setTitle("HELP MENU đ° OTHER Commands")
                     .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
                 const embed2 = new MessageEmbed()
                     .setColor(ee.color)
                     .setThumbnail(client.user.displayAvatarURL())
                     .setTitle("HELP MENU -đļ MUSIC Commands")
                     .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
                 const commands = (category) => {
                     return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
                 };
                 try {
                   for (let i = 0; i < client.categories.length; i += 1) {
                     const current = client.categories[i];
                     const items = commands(current);
                     const n = 3;
                     const result = [[], [], []];
                     const wordsPerLine = Math.ceil(items.length / 3);
                     for (let line = 0; line < n; line++) {
                         for (let i = 0; i < wordsPerLine; i++) {
                             const value = items[i + line * wordsPerLine];
                             if (!value) continue;
                             result[line].push(value);
                         }
                     }
                     if (current.toLowerCase().includes("administration")) {
                         if (!message.member.hasPermission("ADMINISTRATOR")) continue;
                     }
                     if (current.toLowerCase().includes("owner")) {
                         if (!config.ownerIDS.includes(message.author.id)) continue;
                     }
                     if (current.toLowerCase().includes("music") || current.toLowerCase().includes("filter")){
                       try{embed2.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${result[0].join("\n> ")}`, true);}catch{}
                       try{embed2.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);}catch{}
                       try{embed2.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);}catch{}
                       continue;
                     }
                     if (current.toLowerCase().includes("custom")){
                       const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
                       if (!cmd) {
                           continue;
                       }
                       try{embed2.addField(`**${current.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n**Usage:**\n> \`${cmd.usage}\``);}catch{}
                       continue;
                     }
                     try{embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${result[0].join("\n> ")}`, true);}catch{}
                     try{embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);}catch{}
                     try{embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);}catch{}
                   }
                 } catch (e) {
                     console.log(String(e.stack).red);
                 }
                 message.channel.send(embed);
                 return message.channel.send(embed2);*/
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} āšā¸­ā¸°ā¸°ā¸° āšā¸ĸāšāšā¸Ĩāšā¸§āšā¸Ĩā¸°āšā¸ā¸´ā¸ā¸āšā¸­ā¸ā¸´ā¸ā¸ā¸Ĩā¸˛ā¸ā¸ā¸ĩāšāšā¸Ŗā¸˛āšā¸Ąāšā¸Ŗā¸šāšā¸ā¸°`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
