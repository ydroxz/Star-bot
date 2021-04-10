const Discord = require ("discord.js");
const mongoose = require("mongoose");
const Money = require("../money.js");
const dbUrl = process.env.MONGO;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

module.exports.run = async (client, message, args) => {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const bot = new Discord.MessageEmbed()
    .setTitle('ERRO')
    .setDescription('BOT não pode ter conta em meu banco')
    .setColor('RED')
    if(target.user.bot) return message.channel.send(bot);

    Money.findOne({
        userID: target.user.id,
    }, async (err, money) => {
        let balanceEmbed = new Discord.MessageEmbed()
        .setAuthor(target.user.tag, target.user.displayAvatarURL)
        .setColor("GREEN");

        if(!money) {
            balanceEmbed.setDescription(`${target.user} • 0 StarCoins`)
        } else if(money) {
            balanceEmbed.setDescription(`${target.user} • ${money.coins.toLocaleString()} StarCoins`)
        }

        message.channel.send(balanceEmbed);
    });
    },

exports.help = {
    name: 'balance',
    aliases: ['money']
}