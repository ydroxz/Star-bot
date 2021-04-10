const Discord = require('discord.js')
const fs = require('fs');

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMININSTRATOR")) return message.reply('Você não tem permissão para usar este comando');
  if(!args[0] || args[0 == "help"]) return message.channel.send('Você precisa escolher um prefixo')

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes),(err) => {
    if (err) console.log(err)
  });

  const sEmbed = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setTitle('Prefixo alterado com sucesso')
  .setDescription(`Prefixo alterado para ${args[0]}`);

  message.channel.send(sEmbed)
}
exports.help = {
    name: 'prefix',
    aliases: ['prefixo', 'setprefix']
}