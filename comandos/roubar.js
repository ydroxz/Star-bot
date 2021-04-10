const Discord = require('discord.js');
const mongoose = require('mongoose');
const dbUrl = process.env.MONGO;
const cooldown = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require('../money.js');

module.exports.run = async (client, message, args) => {
        await message.delete()
        const aguarde = new Discord.MessageEmbed()
        .setTitle('Aguarde')
        .setDescription('Espere `30 segundos` para usar este comando de novo')
        .setColor('BLUE')
        if (cooldown.has(message.author.id)) {
          message.channel.send(aguarde);
  } else {

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const mencione = new Discord.MessageEmbed()
        .setTitle('ERRO')
        .setDescription('Mencione um usuário para roubar')
        .setColor('RED')
        if (!target || target.id === message.author.id) return message.reply(mencione).then(m => m.delete(5000));
        const imune = new Discord.MessageEmbed()
        .setTitle('Parado!')
        .setDescription('Você não pode roubar meu criador!')
        .setColor('BLUE')
        if(target.id === "717766639260532826") return message.reply(imune).then(m => m.delete(5000));
      
        Money.findOne({
          userID: message.author.id
        }, (err, sendres) => {
          if (err) console.log(err);

            Money.findOne({
              userID: target.id
            }, (err, targetres) => {
              if (err) console.log(err);
                let chance = Math.floor(Math.random() * 100) + 1;
              if(chance < 50) {
              sendres.money = sendres.money - 500;
              sendres.save().catch(err => console.log(err));
              targetres.money = targetres.money + 500
              targetres.save().catch(err => console.log(err));
              const roubo = new Discord.MessageEmbed()
              .setTitle('Roubo realizado com sucesso!')
              .setColor('GREEN')
              .setDescription(`O Usuário **${target.displayName}** acabou de ser roubado e pagou **500 StarCoins**`)
              message.channel.send(roubo);
              }

              let amt = Math.floor(Math.random() * targetres.money) - 1;
      
              if(chance > 50){
                sendres.money = sendres.money + amt;
                sendres.save().catch(err => console.log(err));
                targetres.money = targetres.money - amt;
                targetres.save().catch(err => console.log(err))
                const roubado = new Discord.MessageEmbed()
                .setTitle('Yeah')
                .setColor('BLUE')
                .setDescription(`Você roubou **${target.displayName}** com sucesso e ganhou **${amt}**!`)
                message.channel.send(roubado);
              }
            })
          }
      
        )
        cooldown.add(message.author.id);
        setTimeout(() => {
          cooldown.delete(message.author.id);
        }, 30000);
    }
        }

exports.help = {
    name: 'roubar',
    aliases: [ ]
}