const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true
})

module.exports.run = (client, message) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.slice(1, 2).join(' ')) {
            const db_sorteio = require("../sorteio.js")
            db_sorteio.findOne({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') }, (err, Rsorte) => {
                if (Rsorte) {
                    message.channel.messages.fetch({ limit: 100 }).then(msgs => {
                        const find = msgs.find(m => m.id === Rsorte.messageid)
                        if (find) {
                            const reacts = find.reactions.array().filter(a => a.emoji.name === 'trix_premio')
                            const ganhador = reacts[Math.floor(Math.random() * reacts.length)].fetchUsers().then(users => {
                                const lista = users.map(a => a.id).filter(a => a !== client.user.id)
                                const sortear = lista[Math.floor(Math.random() * lista.length)]
                                client.setTimeout(final, 100, sortear)
                            })
                            function final(ganhadorid) {
                                const embed = new Discord.MessageEmbed()
                                    .setColor('BLUE')
                                    .setTitle('<a:wumpusgift:760827461217812481> Sorteio Encerrado <a:wumpusgift:760827461217812481>')
                                    .setDescription(`${Rsorte.desc}\n\n<a:wumpusgift:760827461217812481> Vencedor: ${message.guild.members.find(a => a.id === ganhadorid)}`.replace('null','Sem participantes'))

                                find.edit(embed)

                                db_sorteio.findOneAndDelete({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') }, (err, sdjuh) => { })
                            }
                        } else {
                            db_sorteio.findOneAndDelete({ guildid: message.guild.id, id: args.slice(1, 2).join(' ') }, (err, sdjuh) => { })
                            const embed_err = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setDescription(`${message.member}**, Eu achei no meu banco de dados um sorteio com este id mas alguem deletou a mensagem do sorteio então eu não consigo sortear o vencedor!**`)
                            message.channel.send(`${message.member}**, Eu achei no meu banco de dados um sorteio com este id mas alguem deletou a mensagem do sorteio então eu não consigo sortear o vencedor!**`)
                        }
                    })
                } else {
                    const embed_err = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.member}**, Não encontrei nenhum sorteio com este id!**`)
                    message.channel.send(`${message.member}**, Não encontrei nenhum sorteio com este id!**`)
                }
            })
        } else {
            const embed_err = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o id do sorteio!**`)
            message.channel.send(`${message.member}**, Informe o id do sorteio!**`)
        }
    } else {
        const embed_err = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão de __Administrador__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}


module.exports.help = {
    name: 'encerrar-sorteio',
    aliases: ['end-giveaway']
}