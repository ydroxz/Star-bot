const express = require('express');
const app = express();
const talkedRecently = new Set();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});

app.listen(process.env.PORT);
const mongoose = require("mongoose");
require("snekfetch")
mongoose.connect(process.env.MONGO, { 
  
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then (function () {
  console.log("\x1b[32m[ BANCO DE DADOS ] \x1b[0mBanco de dados foi ligado")
}).catch (function () {
  console.log("\x1b[31m[ BANCO DE DADOS ] \x1b[0mBanco de dados desligado por erro")
});

require("./blacklist.js");
const bldb = require("./blacklist.js");
const Discord = require("discord.js");
const client = new Discord.Client({ disableMentions: 'everyone'});
const config = require("./config.json");
const { prefix } = require("./config.json")
const ytdl = require('ytdl-core');
const db = require('quick.db')
const Money = require("./money.js");
const autorole = require('./autorole.js');
const welcomeChannel = require('./WelcomeChannel.js');
const votosZuraaa = require('./votosZuraaa.js');
const logChannel = require('./messagelog.js');
const fs = require('fs');
const AFK = require('./afk.js');
const glob = require('glob')
const emoji = require('./emojis.json');
const ms = require('ms')
const cooldowns = {} // a!p sunflower
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBLTOKEN, client);
// DBL API
dbl.on('posted', () => {
  console.log('Servidores postados!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
// Handler bugadão
client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;

      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }
     let prefix = prefixes[message.guild.id].prefixes;
     
      if (message.mentions.has(client.user)) { 
        const mencionada = new Discord.MessageEmbed() .setDescription(`<:catblush:738179935692390462> » Olá, ${message.author}, Ultilize \`${prefix}ajuda\` para ver meus comandos`)
        .setColor('PURPLE')
      message.channel.send(mencionada);
      }

     if (!message.content.toLowerCase().startsWith(prefix)) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {
        lastCmd: null
      }
let ultimoCmd = cooldowns[message.author.id].lastCmd 
     let timeout = 5000
    if (ultimoCmd !== null && timeout- (Date.now() - ultimoCmd) > 0) {
let time = ms(timeout - (Date.now() - ultimoCmd)); 
let resta = [time.seconds, 'segundos']
 
if(resta[0] == 0) resta = ['alguns', 'millisegundos']
if(resta[0] == 1) resta = [time.seconds, 'segundo']
const aguarde = new Discord.MessageEmbed()
  .setTitle('<a:alerta:750801360487972984> | Cooldown')
  .setColor('#ff0000')
  .setDescription(`${message.author}, Espere **${time}** para usar outro comando`)
        message.channel.send(aguarde).then(msg=> {
    msg.delete({ timeout: 5000 });
        })
       return;
    } else {
cooldowns[message.author.id].lastCmd = Date.now() 
    }

    const args = message.content
        .trim().slice(prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

                bldb.findOne({_id:message.author.id}, (err, bl) => {
    if(bl) {
      const detectado = new Discord.MessageEmbed()
      .setTitle("Você foi adicionado na BlackList")
      .setColor("RED")
      .setDescription("Sistema de blacklist")
      return message.channel.send(detectado)
    } else {
      try {
        const commandFile = require(`./comandos/${command}`)
        commandFile.run(client, message, args);
            } catch (err) {
      return;
  }
                }
                })
});
// Votos
client.on('message', message => {
    votosZuraaa.verificaVotos(message, function(user){
        const obrigado = new Discord.MessageEmbed()
        .setTitle('🎉 Obrigado pelo seu Voto!')
        .setDescription('Obrigada por votar em mim, cada voto me ajuda a crescer! Continue votando e sendo uma pessoa incrível!')
        .setColor('BLUE')
        user.send(obrigado);
        const voted = new Discord.MessageEmbed()
        .setTitle('🥳 Obrigado pelo seu Voto!')
        .setDescription(`\`${user.tag}\` votou em mim! Vote você também e seja uma pessoa incrível!\nhttps://zuraaa.com/bots/719524114536333342/votar`)
        .setColor('BLUE')
        client.channels.cache.get(`752295111718862948`).send(voted)
        });
    });
// Log de Servidor
const adicionada = new Discord.WebhookClient('752297039924297819', 'GJTDu8zgmY0VFIjQfYFMgEkkV7JoOHI_z_CySH0f8xvF46q0VHkAPr5av8vJP_LW8EnP')
client.on("guildCreate", guild => {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Fui adicionada em um servidor!`)
  .setDescription(`Membros: ${guild.memberCount} membros\nDono: ${guild.owner}\nID: ${guild.owner.id}\nServidor: ${guild.name}`)
  .setThumbnail(guild.displayAvatarURL)
  .setTimestamp()
  .setColor('RANDOM')
  adicionada.send(embed);
  guild.owner.send(`Olá, ${guild.owner}\n\nNão sei se foi você ou outra pessoa que me adicionou no servidor **${guild.name}**, mas já que você é o dono eu acho que seria uma boa ideia falar um pouco sobre mim.\n\nEu me chamo **Star:tm:** e sou apenas um simples bot para o Discord! Meu objetivo é deixar o seu servidor mais divertido 🥳\n\nSe precisar de ajuda ou tenha alguma duvida, entre no meu servidor de suporte: https://discord.gg/Gq2kssT`)
})
// Log de Servidor
const removida = new Discord.WebhookClient('752297039924297819', 'GJTDu8zgmY0VFIjQfYFMgEkkV7JoOHI_z_CySH0f8xvF46q0VHkAPr5av8vJP_LW8EnP')
client.on("guildDelete", guild => {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Fui removida de um servidor!`)
  .setDescription(`Membros: ${guild.memberCount} membros\nDono: ${guild.owner}\nID: ${guild.owner.id}\nServidor: ${guild.name}`)
  .setThumbnail(guild.displayAvatarURL)
  .setTimestamp()
  .setColor('RANDOM')
  removida.send(embed);
});
// Log de Mensagem
client.on('messageDelete', async (message) => {
  logChannel.findOne({ GuildID: message.guild.id }, async (err, data12) => {
  if(!data12) return;
  if(message.author.bot) return;
  let messageChannel = client.channels.cache.get(data12.MessageLogChannel)
  let messageDeleteEmbed = new Discord.MessageEmbed()
  .setAuthor('Mensagem Deletada', 'https://media.discordapp.net/attachments/506838906872922145/603642595419357190/messagedelete.png')
  .setDescription(`**Usuário**\: <@${message.author.id}>
  **Canal**\: <#${message.channel.id}>
  ${message.content}`)
  .setColor('RED')
  .setFooter(`ID da mensagem\: ${message.id}`)
  .setTimestamp()
  messageChannel.send(messageDeleteEmbed)
  });
});
// Log de Mensagem
client.on('messageUpdate', async (oldMessage, newMessage) => {
  logChannel.findOne({ GuildID: oldMessage.guild.id }, async (err, data53) => {
  if(!data53) return;
  if(newMessage.author.bot) return;
  let messageChannel2 = client.channels.cache.get(data53.MessageLogChannel)
  let messageUpdateEmbed = new Discord.MessageEmbed()
  .setAuthor('Mensagem Editada', 'https://media.discordapp.net/attachments/506838906872922145/603643138854354944/messageupdate.png')
  .setDescription(`**Usuário**\: <@${oldMessage.author.id}>
  **Canal**\: <#${oldMessage.channel.id}>`)
  .addField('Antes\:', `${oldMessage.content}`)
  .addField('Depois\:', `${newMessage.content}`)
  .setColor('YELLOW')
  .setFooter(`ID da mensagem\: ${newMessage.id}`)
  .setTimestamp(newMessage.editedTimestamp)
  messageChannel2.send(messageUpdateEmbed)
  });
});
// Mensagem de Boas-Vindas
client.on('guildMemberAdd', member => {
    welcomeChannel.findOne({ GuildID: member.guild.id }, async (err, data) => {
      if(!data) return;
let welcomechanneldata = client.channels.cache.get(data.WelcomeChannelID)
  let join = new Discord.MessageEmbed()
  .setTitle(`${member.guild.name}`)
  .setDescription(`Olá ${member.user} seja bem-vindo ao servidor\n Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
  .setColor('#ff00c2')
 welcomechanneldata.send(join)
    })
})
// Autorole
client.on('guildMemberAdd', async member => {
  autorole.findOne({ GuildID: member.guild.id }, async (err, data432) => {
    if(!data432) return;
    let autorolerole = member.guild.roles.cache.get(data432.RoleID)
    member.roles.add(autorolerole)
  })
})
// Canal de sugestões
client.on("message", msg => {
    if(msg.channel.id == '754691920625926228'){
        msg.react("a:sim:753735844812161034");
        msg.react("a:nao:753735889783357560");
    }
});

// Carinha Especial UwU
client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("714930300924461057");
  let channel = await client.channels.cache.get("755277456969302057");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
  if (guild != member.guild) {
    return
   } else {
    channel.send(`<a:welcome:755429019230404618>  Olá ${member.user} Bem-Vindo(a) a **${guild.name}** Passa em <#755277453408337981> para obter tags <a:hypegato:755445409157218484>`).then(msg=> {
    msg.delete({ timeout: 30000 });
    })
  }
});

// Star Dreams
client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("749990091174445078");
  let channel = await client.channels.cache.get("752651151240986696");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
  if (guild != member.guild);
	else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`Adeus!`)
      .setImage("https://i.imgur.com/pqlOncV.gif")
      .setDescription(`**${member.user.username}**, saiu do servidor! :broken_heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Até Logo!")
      .setTimestamp();

    channel.send(embed);
  }
});
// Log de Comandos
const comando = new Discord.WebhookClient('752297039924297819', 'GJTDu8zgmY0VFIjQfYFMgEkkV7JoOHI_z_CySH0f8xvF46q0VHkAPr5av8vJP_LW8EnP')
 client.on('message', message => {
   if (!message.content.toLowerCase().startsWith(config.prefix)) return;
   if (message.author.bot) return;
   if (message.channel.type == 'dm') return;
            var guild = message.guild.get;
            let embeddiretor = new Discord.MessageEmbed()
                .setTitle("🔔 • Log de comandos!")
                .setColor("RANDOM")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**Usuário:** \`${message.author.username}#${message.author.discriminator}\` \n **ID:** \`${message.author.id}\` \n **Comando:** \`${message.content}\` \n\n **🔍 • Dados do servidor!**\n \n **Nome:** \`${message.guild.name}\` \n **ID:** \`${message.guild.id}\` \n **Posse:** \`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}\` \n **Owner ID:** \`${message.guild.owner.user.id}\` \n**Membros:** \`${message.guild.memberCount}\` \n **Canais:** \`${message.guild.channels.cache.size}\``)
                comando.send(embeddiretor);
            });

//Mensagem de Despedidas
client.on("guildMemberRemove", (member) => {
  let chx = db.get(`byechannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

  let wembed = new Discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.avatarURL())
  .setTitle("Até Logo")
  .setColor("#ff2050")
  .setImage("https://media0.giphy.com/media/3o7btQsLqXMJAPu6Na/giphy-preview.gif")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`Adeus **${member.user.username}** espero que volte logo! :broken_heart:`);
  
  client.channels.cache.get(chx).send(wembed)
})
// Evento Ready
client.on("ready", () => {
  let activities = [
      `Utilize ${config.prefix}help para ver meus comandos ^^`,
      `Estou em: ${client.guilds.cache.size} servidores lindos ❤️!`,
      `Monitorando: ${client.channels.cache.size} canais!`,
      `Conheço: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} pessoinhas diferentes! ^^`,
      `Amor para todo o mundo ❤️!`,
      `Alegria para todos os meus usuários`,
      `Ultilize ${config.prefix}upvote para votar em mim!`,
      `Entre em meu servidor de suporte! https://discord.gg/2pFH6Yy`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
     type: "STREAMING", url: "https://www.twitch.tv/adg_ofc"
      }), 10000);  // WATCHING, LISTENING, PLAYING, STREAMING
// Deixando bot ON
  client.user
      .setStatus("online") // idle, dnd, online, invisible
      .catch(console.error);
console.log('Estou Online!')
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token 