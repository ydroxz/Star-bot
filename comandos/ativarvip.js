const Discord = require('discord.js')
const moment = require('moment')
const mongoose = require('mongoose')

const config = require("../config.json")

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true
})

exports.run = (client, message) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    if (args.slice(1, 2).join(' ')) {
        const keys = require("../keys.js")
        const vips = require("../vips.js")
        keys.findOne({ key: args.slice(1, 2).join(' ') }, (err, result) => {
            if (result) {
                keys.findOneAndDelete({ key: args.slice(1, 2).join(' ') }, (err, uhdu) => { })
                vips.findOne({ userid: message.author.id }, async (err, Rvip) => {
                    if (Rvip) {
                        Rvip.mult = (Rvip.mult + 0.1).toFixed(1)
                        await Rvip.save()
                        const embed_final = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('<a:sim:758652293381488641> Vip Ativado!')
                            .setDescription(`Parabéns **${message.author.tag}**\n você acabou de ativar mais um vip na sua conta!`)
                        message.channel.send(embed_final)
                    }
                    if (!Rvip) {
                        const newvip = new vips({
                            userid: message.author.id,
                            mult: (1.1).toFixed(1)
                        })
                        newvip.save()
                        const embed_final = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('<a:sim:758652293381488641> Vip Ativado!')
                            .setDescription(`Parabéns **${message.author.tag}**\n você acabou de ativar seu primeiro vip na conta!`)
                        message.channel.send(embed_final)
                    }
                })
            } else {
                const embed_err = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('ERRO!')
                    .setDescription(`${message.author},a chave fornecida está incorreta!`)
                message.channel.send(`${message.author}, a chave fornecida está incorreta!`)
            }
        })
    } else {
        const embed_err = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.author}, informe a chave!`)
        message.channel.send(`${message.author}, informe a chave!`)
    }
}
exports.help = {
    name: 'ativarvip',
    aliases: ['usarvip']
}