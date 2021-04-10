const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    const region = {
      brazil: ':flag_br: Brazil',
      europe: 'Europa',
      hongkong: 'Hong Kong',
      india: 'Índia',
      japan: 'Japão',
      russia: 'Rússia',
      singapore: 'Singapore',
      southafrica: 'Africa do Sul',
      sydney: 'sydney',
      uscentral: 'US Central',
      useast: 'US East',
      ussouth: 'US Sul',
      uswest: 'US West'
    }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#f3f3f3')
            .setTitle(`${message.guild.name}`)
            .addFields(
                {
                    name: "<:owner:556682207532679189> Dono: ",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "<:online:556678187786960897> Membros: ",
                    value: `Esse servidor tem  ${message.guild.memberCount} membros`,
                    inline: true
                },
                {
                    name: "<:online:556678187786960897> Membros Online: ",
                    value: `Esse servidor tem ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} membros online!`,
                    inline: true
                },
                {
                    name: "<:bughunter:556682363120254979> Bots ",
                    value: `Esse servidor tem ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                    inline: true
                },
                {
                    name: "<:join_arrow:610983150406991873> Criado em: ",
                    value: message.guild.createdAt.toLocaleDateString("pt-br"),
                    inline: true
                },
                {
                    name: "<:earlysupporter:556682087579516968> Quantidade de cargos: ",
                    value: `Esse servidor tem ${message.guild.roles.cache.size}       cargos`,
                    inline: true,
                },
                {
                    name: `🗺 Região: `,
                    value: region[message.guild.region],
                    inline: true
                },
                {
                    name: `<:certified:556682763814699008> Verificação: `,
                    value: message.guild.verified ? 'Servidor verificado' : `Servidor não verificado`,
                    inline: true
                },
                {
                    name: '<a:nitrooo:740621688701714666> Impulsos: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? ` Esse servidor tem ${message.guild.premiumSubscriptionCount} Boosts` : `Esse servidor não possui Impulsos`,
                    inline: true
                },
                {
                    name: "<:bid_aprovado:745008665676742757> Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `Esse servidor tem ${message.guild.emojis.cache.size} emojis!` : 'Esse server não tem emojis' ,
                    inline: true
                }
            )
        await message.channel.send(embed)
        
    }

exports.help = {
    name: 'serverinfo',
    aliases: ['si']
}