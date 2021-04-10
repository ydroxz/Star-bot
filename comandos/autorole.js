const autorole = require('../autorole.js')
const Discord = require('discord.js')
const mongoose = require('mongoose')

module.exports.run = async (bot, message, args) => {
  let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

    if(!role) {
      return message.channel.send('Você não especificou um cargo')
    }

    if(!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send('Você não tem permissão para usar este comando')
    }

    autorole.findOne({ GuildID: message.guild.id }, async (err, data) => {
      if(err) console.log(err)
      if(!data) {
        let newRole = new autorole({
          GuildID: message.guild.id,
          RoleID: role.id
        })
        newRole.save()
        let success = new Discord.MessageEmbed()
        .setTitle('Autorole Criado!')
        .setDescription(`O Cargo dado quando um usuário entrar será ${role.toString()}.`)
        .setColor('GREEN')
        message.channel.send(success)
      } else {
        let exists = new Discord.MessageEmbed()
        .setTitle('Autorole Existente!')
        .setDescription('Ultilize s!reset para resetar o autorole')
        .setColor('RED')
        message.channel.send(exists)
      }
    })
}
exports.help = {
    name: 'autorole',
    aliases: ['joinrole']
}