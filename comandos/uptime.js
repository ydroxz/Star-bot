const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `๐๏ธ ${days.toFixed()} dias\n๐๏ธ ${hours.toFixed()} horas\n๐๏ธ ${minutes.toFixed()} minutos\n๐๏ธ ${seconds.toFixed()} segundos`;

  const embed = new Discord.MessageEmbed()
    .setTitle(`Tempo de atividade ๐ฐ๏ธ`)
    .setThumbnail("https://cdn.discordapp.com/attachments/711943715723149433/737541151225020456/d07335a92f67a04adc75b402004ad1d7.gif")
    .setColor("#eceef0")
    .setDescription(`**Estou online hรก:**\n${uptime}`)

  message.channel.send(embed);
};
exports.help = {
    name: 'uptime',
    aliases: ['up']
}