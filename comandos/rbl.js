const Discord = require("discord.js");
const db = require("../blacklist.js");

exports.run = (client, message, args) => {
    if (!['422535241211707393', '717766639260532826' , '742798447253651506', '485922669208797226'].some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores / moderadores do bot podem utilizar este comando!')
  const id = args[0]
  const user = client.users.cache.find(a => a.id === id)
  if(!id) return message.channel.send("Você precisa adicionar o ID do usuário")
    if(isNaN(id)) return message.channel.send(`Você sabia que o ID do usuário é somente números? Então por que colocou: "${id}"?`)
      if(id.length < 18 || id.length > 18) return message.channel.send("Um ID contém 18 caracteres.")
    db.findOneAndDelete({_id:id}, (err, a) => {
      if(a) {
        const dd = new Discord.MessageEmbed()
        .setTitle("Blacklist | Sucesso")
        .setColor("GREEN")
        .setDescription("O usuário "+ user.tag +" foi removido da blacklist")
        return message.channel.send(dd);
      } else {

        const erro = new Discord.MessageEmbed()
        .setTitle("BlackList | erro")
        .setColor("RED")
        .setDescription(`O usuário ${user.tag} não está na Blacklist para ser removido`)
        return message.channel.send(erro)
      }
    })
}
exports.help = {
    name: 'rbl',
    aliases: ['starunban', 'botunban', 'bub']
}