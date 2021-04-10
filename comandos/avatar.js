const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    const user = args[0] ? message.mentions.users.first() || await client.users.fetch(args[0]).catch(_ => message.author) : message.author
    const avatar = user.displayAvatarURL({ dynamic: true, size: 2048 })
  

    const embed = new Discord.MessageEmbed()
      .setAuthor(`🖼️ ${user.tag}`)
      .setDescription(`[Clique Aqui](${avatar}) para Baixar o Avatar`)
      .setImage(avatar)
      .setColor("RANDOM")
    message.channel.send(embed)
    }
exports.help = {
    name: 'avatar',
    aliases: ['av']
}