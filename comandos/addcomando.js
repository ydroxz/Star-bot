const cc = require("../cc.js");
const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports.run = async(client, message, args) => {
  if(!args[0]) return message.channel.send(`Digite o nome do comando`);
  cc.findOne({name: 'cc', serverid: message.guild.id}).then(result => {
  let first = args.join(' ');
  let sec;
  message.channel.send(`Diga a Mensagem do comando`).then(c => {
    let filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
      if(collected.first().content) {
        sec = collected.first().content;
      }
    }).catch(() => {
      message.channel.send(`Você demorou demais tente novamente!`)
    
  }).then(a => {
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setColor("RANDOM")
  .setTimestamp()
      let newDoc = new cc({
        _id: new mongoose.Types.ObjectId(),
        name: 'cc',
        serverid: message.guild.id,
        commands: c
      });
      embed.setDescription("Saved `" + first + "` with `" + sec + "`.")
      newDoc.save().catch(console.error);
      message.channel.send(embed);
    }else{
      if(result.commands.some(r => first === r.name)) return message.channel.send(`Este comando já existe`);
      if(result.commands.length === 5) {
        embed.setDescription(`
Desculpe, você atingiu o número máximo de comandos personalizados para esta guilda. Compre a versão premium para adicionar mais!`);
        return message.channel.send(embed);
      }
      if(!result.commands == []) {
        if(result.commands){ var c = result.commands ? result.commands : [] } else { var c = [] };
        c.push({
          name: first,
          response: sec
        });
        let newDoc = new cc({
          _id: new mongoose.Types.ObjectId(),
          name: 'cc',
          serverid: message.guild.id,
          commands: c
        });
        cc.deleteOne({name: "cc", serverid: message.guild.id}).catch(console.error);
        newDoc.save().catch(console.error);
        embed.setDescription("Adicionado `" + first + "` com a resposta `" + sec + "`.");
        message.channel.send(embed);
      }
    }
  })
  })
  })
}
module.exports.help = {
    name: "addcomando",
    aliases: ['addcc']
}