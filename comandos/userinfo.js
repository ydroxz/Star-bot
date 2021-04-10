const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author

  if (user.presence.status === "dnd") user.presence.status = "Não pertubar";
  if (user.presence.status === "idle") user.presence.status = "Ausente";
  if (user.presence.status === "offline") user.presence.status = "Offline";
  if (user.presence.status === "online") user.presence.status = "Online";

  function game() {
    let game;
    if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
    else if (user.presence.activities.length < 1) game = "Nada"
    return game;
  }

  let x = Date.now() - user.createdAt;
  let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt;
  let created = Math.floor(x / 86400000);
  let joined = Math.floor(y / 86400000);

  const member = message.guild.member(user);
  let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "Nenhum";
  let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
  let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
  let status = user.presence.status;
  let avatar = user.avatarURL({ size: 2048 });

  const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, avatar)
    .setThumbnail(avatar)
    .setTimestamp()
    .setColor('BLUE')
    .addField("ID", user.id, true)
    .addField("Nick", nickname, true)
    .addField("Conta criada dia", `${createdate} \ná ${created} dias`, true)
    .addField("Entrou no servidor em", `${joindate} \ná ${joined} dias`, true)
    .addField("Status", status, true)
    .addField("Game", game(), true)

  message.channel.send(embed);
}

exports.conf = {
  aliases: ["user"],
  cooldown: 5
}

exports.help = {
    name: 'userinfo',
    aliases: ['ui']
}