const Loli = require("lolis.life")
const Discord = require("discord.js")
module.exports.run = async (client, message, args) => {
  let loli = new Loli()
  loli.getSFWLoli().then((loli) => {
    const embed = new Discord.MessageEmbed()
    .setColor("#ff1562")
    .setImage(loli.url)
    message.channel.send(embed)
  })
}
exports.help = {
    name: 'loli',
    aliases: [ ]
}