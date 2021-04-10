const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
    if (!['422535241211707393', '717766639260532826' , '742798447253651506', '485922669208797226'].some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores / moderadores do bot podem utilizar este comando!')

    const faq1 = new MessageEmbed()
    .setTitle(':one: | Compras e vendas')
    .setColor('BLUE')
    .setDescription('Não vendemos vagas na team, e nem vendemos a Star™. Você pode oferecer á quantia que quiser, mas não vamos vender absolutamente nada.')
    message.channel.send(faq1)

    const faq2 = new MessageEmbed()
    .setTitle(':two: | Compras e vendas')
    .setColor('BLUE')
    .setDescription('O Discord ja encerrou o processo de verificação de bots, mesmo se você criar um bot e conseguir milhares de Servidores, não irá receber a badge.')
    message.channel.send(faq2)

    const faq3 = new MessageEmbed()
    .setTitle(':three: | Punições!')
    .setColor('BLUE')
    .setDescription('• s!kick @user motivo: expulse um usuário do seu servidor.\n\n• s!ban @user motivo: bana um usuário do seu servidor.\n\n• s!mute @user motivo: silencie um usuário no seu servidor.\n\n• s!warn @user motivo: dê um aviso ao membro do seu servidor. Você pode fazer com que alguma outra punição seja dada a este membro quando ele chegar a um número de warns.')
    message.channel.send(faq3)
}
module.exports.help = {
    name: "faq",
    aliases: ['infos']
}