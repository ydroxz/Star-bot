const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")

//database
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true
})

exports.run = (client, message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        if (args.slice(1).join(' ')) {
            const db_sorteio = require("../sorteio.js")
            const moment = require('moment')
            moment.locale('pt-BR')

            const id1 = Math.floor(Math.random() * (9))
            const id2 = Math.floor(Math.random() * (9))
            const id3 = Math.floor(Math.random() * (9))
            const id4 = Math.floor(Math.random() * (9))
            const id5 = Math.floor(Math.random() * (9))
            const idf = `${id1}${id2}${id3}${id4}${id5}`
            const votacao = args.slice(1).join(' ')

            const emoji_sorteio = client.emojis.cache.find(e => e.name === 'wumpusgift')

            const embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('<a:wumpusgift:760827461217812481> Sorteio <a:wumpusgift:760827461217812481>')
                .setDescription(`**Prêmio:** ${args.slice(1).join(' ')}\n**Host:** ${message.author}`)
                .setTimestamp()
                .setFooter(`ID do sorteio: ${idf}`)
            message.channel.send(embed).then(msg => {
                msg.edit(embed)
                msg.react('🎉')
                const newDB = new db_sorteio({
                    guildid: message.guild.id,
                    id: idf,
                    messageid: msg.id,
                    desc: args.slice(1).join(' ')
                })
                newDB.save()
            })
        } else {
            const embed_err = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o premio do sorteio!**`)
            message.channel.send(`${message.member}**, Informe o premio do sorteio!**`)
        }
    } else {
        const embed_err = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão de __Administrador__ para executar este comando!**`)
        message.channel.send(`${message.member}**, Você não tem permissão de __Administrador__ para executar este comando!**`)
    }
}

module.exports.help = {
    name: 'criar-sorteio',
    aliases: ['giveaway-start']
}