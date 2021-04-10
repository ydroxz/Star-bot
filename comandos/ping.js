const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  
  const aguardar = new Discord.MessageEmbed()
    .setAuthor('🏓 Ping?')
    .setDescription('<a:wumpus_cool:738180240156655690> | Medindo a Latência')
    .setThumbnail('https://i.pinimg.com/originals/a8/d7/dc/a8d7dc6b29f48fe6b5201469fee2c452.gif')
    .setColor("#7c2ae8")
  
  const m = await message.channel.send(aguardar);
  
  const ping = new Discord.MessageEmbed()
    .setAuthor('🏓 Pong!')
    .setColor("#7c2ae8")
    .setThumbnail('https://i.pinimg.com/originals/a8/d7/dc/a8d7dc6b29f48fe6b5201469fee2c452.gif')
    .setDescription(`📡┃Latência do Servidor:\n \`\`\`${m.createdTimestamp -
      message.createdTimestamp}ms\`\`\`\n🛰️┃Latência da API:\n \`\`\`${Math.round(
      client.ws.ping
    )}ms\`\`\``)
  
  m.edit(ping);
};
exports.help = {
    name: 'ping',
    aliases: ['ws']
}