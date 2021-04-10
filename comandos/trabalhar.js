const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGO;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

const Money = require("../money.js");

module.exports.run = (client, message, args) => {
        let earnedCoins = Math.floor(Math.random() * 100) + 1;
    Money.findOne({
        userID: message.author.id
    }, async (err, money) => {
        if(err) console.log(err);
        if(!money) {
            const newMoney = new Money({
                userID: message.author.id,
                coins: earnedCoins
            });

            await newMoney.save().catch(e => console.log(e));
        } else if(money) {
            money.coins = money.coins + earnedCoins;
            await money.save().catch(e => console.log(e));
        }
    });
    const concluido = new Discord.MessageEmbed()
    .setTitle('Trabalho Concluido')
    .setDescription(`Você acaba de receber \`${earnedCoins}\` StarCoins!`)
    .setColor('BLUE')
    message.channel.send(concluido);
    },
exports.help = {
    name: 'trabalhar',
    aliases: ['work']
}