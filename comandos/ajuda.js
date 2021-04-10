const Discord = require("discord.js");
const prefixes = require("../prefixes.json")
const config = require("../config.json")
const fs = require('fs')

module.exports.run = async (client, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }
     let prefix = prefixes[message.guild.id].prefixes;
  var embed = new Discord.MessageEmbed()
  .setTitle('<:bot_badgeearlysupporter:754046596265541742> | __Menu de Ajuda!__')
  .setColor("#303136")
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription(`<a:Rosa_seta_pg:754374503001358467> __[Me Adicione!](https://discord.com/oauth2/authorize?client_id=719524114536333342&permissions=-1&scope=bot)__ \n<a:Rosa_seta_pg:754374503001358467> __[Vote em mim!](https://zuraaa.com/bots/719524114536333342/votar)__  \n<a:Rosa_seta_pg:754374503001358467> __[Meu site oficial!](http://stardiscordbot.tk/)__ `)
  .setImage(`https://media.discordapp.net/attachments/732936241720590456/733290197113896990/unknown.png?width=760&height=427`)
  .addField('<:bughunter:754470614601039932> Utilidades \n<:wumpus:754739856436887712> Diversão \n<:panda:754744551176011826> Moderação\n<a:money:754743646791794728> Economia \n<:config:754048572734832801> Configurações\n<a:back:754744724048314499> Voltar', '\u200B', false)

  message.channel.send({embed}).then(msg=> {
    msg.delete({ timeout: 180000 })
      msg.react(':bughunter:754470614601039932').then(r=>{
      msg.react(':wumpus:754739856436887712')
      msg.react(':panda:754744551176011826') 
      msg.react(':money:754743646791794728')
      msg.react(':config:754048572734832801')
      msg.react('a:back:754744724048314499')
  })

  const utilfilter = (reaction, user) => reaction.emoji.name === 'bughunter' && user.id === message.author.id;
  const funfilter = (reaction, user) => reaction.emoji.name === 'wumpus' && user.id === message.author.id;
  const diverfilter = (reaction, user) => reaction.emoji.name === 'panda' && user.id === message.author.id;
  const economyfilter = (reaction, user) => reaction.emoji.name === 'money' && user.id === message.author.id;
  const devfilter = (reaction, user) => reaction.emoji.name === 'config' && user.id === message.author.id;
  const voltarfilter = (reaction, user) => reaction.emoji.name === 'back' && user.id === message.author.id;
  const util = msg.createReactionCollector(utilfilter, { time: 180000 });
  const fun = msg.createReactionCollector(funfilter, { time: 180000 });
  const diver = msg.createReactionCollector(diverfilter, { time: 180000 });
   const economy = msg.createReactionCollector(economyfilter, { time: 180000 });
   const dev = msg.createReactionCollector(devfilter, { time: 180000 });
  const voltar = msg.createReactionCollector(voltarfilter, { time: 180000 });



  util.on('collect', r1 => { 
   r1.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
          .setColor("#303136")
          .setImage(`https://media.discordapp.net/attachments/732936241720590456/733290197113896990/unknown.png?width=760&height=427`)
          .setDescription(`> **<:bughunter:754470614601039932> » Comandos de Ultilidades!**\n\n<a:Rosa_seta_pg:754374503001358467> **${prefix}giveaway**\n\`Crie um sorteio\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}avatar**\n\`Pegue o avatar de qualquer pessoa\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}emoji**\n\`Pegue qualquer emoji do discord!\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}serverinfo**\n\`Veja as informações do servidor\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}servericon**\n\`Pegue o icone do servidor\``);
          
      msg.edit(embed);
  })

  fun.on('collect', r2 => { 
   r2.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
          .setColor("#303136")
          .setImage(`https://media.discordapp.net/attachments/732936241720590456/733290197113896990/unknown.png?width=760&height=427`)
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`> **<:wumpus:754739856436887712> » Comandos de Diversão!**\n\n<a:Rosa_seta_pg:754374503001358467> **${prefix}hug**\n\`Abraçe algum usuário\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}kiss**\n\`Beije algum usuário\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}slap**\n\`Bata em algum usuário\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}8ball**\n\`Pergunte a bola Nº8\`\n<a:Rosa_seta_pg:754374503001358467>> **${prefix}ship**\n\`Veja se aquele seu amigo combina com certa pessoa\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}primeiraspalavras**\n\`Faça o pequeno bebê falar algo interessante\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}laranjo**\n\`Faça o laranjo falar algo interessante\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}stonks**\n\`Crie um meme stonks\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}emojify**\n\`Transforme texto em emojis\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}morse**\n\`Transforme texto em morse\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}roll**\n\`Gire os dados\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}tempo**\n\`Veja o tempo de qualquer cidade em tempo real\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}coinflip**\n\`Tire cara ou coroa\``);
    
      msg.edit(embed);
  })

  diver.on('collect', r3 => { 
   r3.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
          .setColor("#303136")
          .setImage(`https://media.discordapp.net/attachments/732936241720590456/733290197113896990/unknown.png?width=760&height=427`)
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`> **<:panda:754744551176011826> » Moderação!**\n\n<a:Rosa_seta_pg:754374503001358467> **${prefix}ban**\n\`Bana um usuário do seu servidor!\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}kick**\n\`Expulse um usuário do servidor\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}clean**\n\`Limpe o seu chat\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}slowmode**\n\`Ultilize o modo lento\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}lock**\n\`Feche o canal\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}unlock**\n\`Abra o canal\``);
      msg.edit(embed);
  })

  economy.on('collect', r4 => { 
   r4.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
          .setColor("#303136")
          .setImage(`https://media.discordapp.net/attachments/732936241720590456/733290197113896990/unknown.png?width=760&height=427`)
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`> **<a:money:754743646791794728> » Economia!**\n\n<a:Rosa_seta_pg:754374503001358467> **${prefix}daily**\n\`Pegue o seu bonûs diario\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}work**\n\`Trabalhe para ganhar dinheiro\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}bal**\n\`Veja seu dinheiro!\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}loja**\n\`Veja produtos para adquirir\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}dep**\n\`Deposite seu dinheiro\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}comprar**\n\`Compre algum produto da loja\``);
      msg.edit(embed);
  })

  dev.on('collect', r5 => { 
   r5.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
          .setColor("#303136")
          .setImage(`https://media.discordapp.net/attachments/732936241720590456/733290197113896990/unknown.png?width=760&height=427`)
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`> **<:config:754048572734832801> » Configurações!**\n\n<a:Rosa_seta_pg:754374503001358467> **${prefix}autorole**\n\`Selecione um cargo automatico para ser dado quando um usuário entrar em seu servidor\` \n<a:Rosa_seta_pg:754374503001358467> **${prefix}messagelog**\n\`Selecione um canal para setar logs de mensagem\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}welcome**\n\`Selecione o canal de mensagem de boas vindas\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}goodbye**\n\`Selecione o canal de mensagem de despedidas\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}reset**\n\`Reseta alguma configuração do seu servidor!\`\n<a:Rosa_seta_pg:754374503001358467> **${prefix}prefix**\n\`Mude o prefixo no servidor\``)
      msg.edit(embed);
  })

  voltar.on('collect', r5 => { 
   r5.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
  .setTitle('<:bot_badgeearlysupporter:754046596265541742> | __Menu de Ajuda!__')
  .setColor("#303136")
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription(`<a:Rosa_seta_pg:754374503001358467> __[Me Adicione!](https://discord.com/oauth2/authorize?client_id=719524114536333342&permissions=-1&scope=bot)__ \n<a:Rosa_seta_pg:754374503001358467> __[Vote em mim!](https://zuraaa.com/bots/719524114536333342/votar)__  \n<a:Rosa_seta_pg:754374503001358467> __[Meu site oficial!](http://stardiscordbot.tk/)__ `)
  .setImage(`https://media.discordapp.net/attachments/732936241720590456/733290197113896990/unknown.png?width=760&height=427`)
  .addField('<:bughunter:754470614601039932> Utilidades \n<:wumpus:754739856436887712> Diversão \n<:panda:754744551176011826> Moderação\n<a:money:754743646791794728> Economia \n<:config:754048572734832801> Configurações\n<a:back:754744724048314499> Voltar', '\u200B', false)
          
    msg.edit(embed);
  })
})
}
exports.help = {
    name: 'ajuda',
    aliases: ['help', 'comandos', 'commands']
}