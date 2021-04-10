const Discord = require("discord.js");
const os = require("os");

module.exports.run = async (client, message, args) => {
const ms = await message.channel.send("<:relogio:755526912033685564>┃Aguarde");
const clientms = ms.createdTimestamp - message.createdTimestamp;

  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;  
  let modelo = os.cpus().map((i) => `${i.model}`)[0]

  const promises = [
    client.shard.fetchClientValues('users.cache.size'),
    client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.fetchClientValues('channels.cache.size'),
];

Promise.all(promises).then(async results => {
    const totalUsers = results[0].reduce((prev, userCount) => prev + userCount, 0);
    const totalGuilds = results[1].reduce((prev, guildCount) => prev + guildCount, 0);
    const totalCanais = results[2].reduce((prev, channelCount) => prev + channelCount, 0);


  const botinfo = new Discord.MessageEmbed()
  .setAuthor('Minhas Informações')
  .setThumbnail(client.user.displayAvatarURL())
  .setColor("#7c2ae8")
  .addField('<:botdeveloper:763739544549326899>┃Criadores', `\`${client.users.cache.get('717766639260532826').tag}, ${client.users.cache.get('742798447253651506').tag}, ${client.users.cache.get('672652538880720896').tag}, ${client.users.cache.get('422535241211707393').tag}\``)
  .addField(`<:staff:556680099865427978>┃Servidores`,`\`${totalGuilds}\``)
  .addField('<:stafftools:755502350499577867>┃Canais', `\`${totalCanais}\``)
  .addField(`<:Pandaassistindoo:743792298340646914>┃Usuários`, `\`${totalUsers}\``)
  .addField(`<:gaming_keyboard:745980906648502382>┃Memória RAM`,`\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB de 1024MB\``)
  .addField(`💻┃CPU`, `\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}% de CPU\``)
  .addField(`<:cpu:745991204113743932>┃Processador`, `\`${modelo}\``)
  .addField(`<:discord:743792299753865238>┃Ping`,`\`Latência do Servidor: ${ms.createdTimestamp -
      message.createdTimestamp}ms\nLatência da API: ${Math.round(
      client.ws.ping
    )}ms\``)
  .addField('<:relogio:755526912033685564>┃Tempo de Atividade', `\`${days.toFixed()} dias ${hours.toFixed()} horas ${minutes.toFixed()} minutos ${seconds.toFixed()} segundos\``)
  .setImage('https://top.gg/api/widget/719524114536333342.png')
  ms.edit("<:relogio:755526912033685564>┃Aguarde.");
  await ms.edit("<:relogio:755526912033685564>┃Aguarde..");
  await ms.edit("<:relogio:755526912033685564>┃Aguarde...");
  await ms.edit(`${message.author}`, botinfo);
  })
};

exports.help = {
    name: 'botinfo',
    aliases: ['starinfo']
}