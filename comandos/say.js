const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      "Tu és fraco, falta-te permissão em Gerenciar Mensagens para usar este comando"
    );
  const sayMessage = args.join(" ");
  message.delete().catch(O_o => {});
  message.channel.send(`${sayMessage}`);
};
exports.help = {
    name: 'say',
    aliases: ['falar']
}