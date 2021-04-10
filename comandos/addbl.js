const Discord = require("discord.js");
const db = require("../blacklist.js");

module.exports.run = (client, message, args) => {
    if (!['422535241211707393', '717766639260532826' , '742798447253651506', '485922669208797226'].some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores / moderadores do bot podem utilizar este comando!')
  const id = args[0]
  const user = client.users.cache.find(a => a.id === id)
  if(!id) return message.channel.send("Você precisa adicionar o ID do usuário")
  if(isNaN(id)) return message.channel.send(`Você sabia que o ID do usuário é somente números? Então por que colocou: "${id}"?`)
      if(id.length < 18 || id.length > 18) return message.channel.send("Um ID contém 18 caracteres.")
  if(id == "422535241211707393" || id == "742798447253651506" || id == "742798447253651506" || id == "672652538880720896") return message.channel.send(`Desculpe ${message.author.tag}, mas você sabe com certeza que ${user.tag} é um dos meus desenvolvedores, então por que eu iria bloquear ele?`)
    db.findOne({_id:id}, (err, a) => {
      if(a) {
        const dd = new Discord.MessageEmbed()
        .setTitle("Blacklist | Erro")
        .setColor("RED")
        .setDescription("Esse usuário já esta na BlackList")
        return message.channel.send(dd);
      } else {
        new db ({
          _id:id,
          autorTag:message.author.tag
        }).save().catch(err => console.log(err))

        const sucesso = new Discord.MessageEmbed()
        .setTitle("BlackList | Sucesso")
        .setColor("GREEN")
        .setDescription(`O usuário ${user.tag} foi adicionado na blacklist`)
        return message.channel.send(sucesso)

        const log = new Discord.MessageEmbed()
        .setTitle('Blacklist | +1 Usuário')
        .setColor('#ff0000')
        .setDescription(`O usuário \`${user.tag}\` foi banido de usar meus comandos!`)
      
        client.channels.cache.get('766728661000257617').send(log)
      }
    })
};
exports.help = {
    name: 'addbl',
    aliases: ['starban', 'botban', 'bb']
}