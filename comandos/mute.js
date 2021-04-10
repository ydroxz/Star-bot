const Discord = require('discord.js');
const ms = require('ms')

module.exports.run = (client, message, args) => {
  
   if (!message.member.hasPermission("KICK_MEMBERS")) {
    let ed = new Discord.MessageEmbed()
    .setTitle('<a:nao:758652322422849536> You dont have access to that command you need permision `Kick Members`')
    message.channel.send(ed)
  return
  }  
  
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute) return message.channel.send('<a:nao:758652322422849536> Não achei este usuário');
  let muterole = message.guild.roles.find(`name`, "Silenciado");
  if(!muterole) {
    try{
      muterole = message.guild.createRole({
        name: "Silenciado",
        color: "RANDOM",
        permissions:[]
      }) 
      message.guild.channels.forEach(async (channel, id) => {
        channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          READ_MESSAGES: true
        });
      });
    }catch(e){
      message.channel.send(e.stack)
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.channel.send("<a:nao:758652322422849536> Defina o tempo");
  
  (tomute.addRole(muterole.id));
  let emb = new Discord.MessageEmbed().setDescription((`<@${tomute.id}> foi mutado por ${ms(ms(mutetime))}`));
  message.channel.send(emb)
  
  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> foi mutado com sucesso!`)
  }, ms(mutetime))
};
exports.help = {
    name: 'mute',
    aliases: ['mutar', 'silenciar']
}