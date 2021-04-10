const Discord = require("discord.js");
const DuckDuckScrape = require('duck-duck-scrape')
const ddg = new DuckDuckScrape()
const {MessageEmbed} = Discord

exports.run = async (client, message, args) => {

    if(!args[0]) return message.channel.send(`❌ | ${message.author}, Você não disse o que devo pesquisar...`)

    let result = ddg.search(args.join(' '), 1, 'pt-br')
 
    let k = await message.channel.send(`Proucurando resultados para ` + "🔎`" + `${args.join(" ")}` + "`" + `**...**`)
    
    result.then((data) => {

        let embed = new Discord.MessageEmbed()
        .setTitle(data[0].title)
        .setDescription(data[0].description)
        .setURL(data[0].url)
        .setColor("FFFF00")
        .setThumbnail(data[0].icon)
        
      k.edit("Resultados:", {embed: embed})

    })


}
exports.help = {
    name: 'pesquisar',
    aliases: ['search']
}