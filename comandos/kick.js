const Discord = require("discord.js");
const db = require('quick.db');
const c = require('../config.json');

exports.run = (client, message, args) => {
    var infu = ('https://extremoz.rn.gov.br/wp-content/uploads/2019/10/info.png')
    let erro = new Discord.MessageEmbed()

  .setTitle(`INFORMAÇÃO`)
  .setDescription(`*Aplique uma punição leve*`)
  .addField(`:hammer: **Uso**`, `\`${c.prefix}kick <@user> <motivo>\``, true)
  .addField(`:book: **Exemplo**`, `\`${c.prefix}kick @kayozin Totoso\``, true)
  .addField(`:bookmark: **Permissão**`, `\`KICK_MEMBERS\``)
  .addField(`:twisted_rightwards_arrows: **Alternativas**`, `\`${c.prefix}expulsar\``)
  .setColor('#a67dff')  
   
       var membro = message.mentions.members.first() || message.guild.members.get(args[0]);
       if (!membro) return message.channel.send(erro);
       if (membro === message.member) return message.channel.send(`:x: **»** Salve! **${message.author.username}**, você não pode se expulsar!`)
       
       var motivo = args.slice(1).join(" ");
       if (!motivo) return message.channel.send(erro);
       
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`:x: **»** Salve! **${message.author.username}**, você não possui a permissão \`KICK_MEMBERS\`.`)
       
       let banembed = new Discord.MessageEmbed()

       .setDescription(`**${message.author.username}**, você realmente deseja aplicar essa punição em **${membro.user.username}**?`)
       .setColor('AQUA')
       .setFooter(`Clique no emoji para confirmar ou espere 30s para cancelar!`)

       message.channel.send(banembed).then(msg => { 
         msg.react("👍");
   
         let filtro = (reaction, usuario) => reaction.emoji.name === "👍" && usuario.id === message.author.id; 
         let coletor = msg.createReactionCollector(filtro, {max: 1});
   
         coletor.on("collect", em => { 
             em.remove(message.author.id);
             
             let embed = new Discord.MessageEmbed()

             .setTitle(`:hammer: Kick`)
             .setDescription(`**:bust_in_silhouette: » Membro:** \`${membro.user.tag}\`\n\n**:police_officer: » Responsável:** ${message.author}\n\n**:notepad_spiral: » Motivo:** ${motivo}`)
             .setThumbnail(message.author.displayAvatarURL())
             .setColor('#ff0000')
             var canal = message.guild.channels.cache.get(db.get(`punichannel_${message.guild.id}`))
             if (!canal) {
              message.channel.send(`Caso deseje escolher um canal para enviar, utilize: \`s!stafflog\``, embed)
              membro.kick(); 
             } else {
              canal.send(embed)
              membro.kick(); 
             
            }
         });
       });
}
exports.help = {
    name: 'kick',
    aliases: ['expulsar']
}