exports.run = (client, message, args) => {
  let user = message.author;
    if (!['422535241211707393', '717766639260532826' , '742798447253651506', '664174201220890645'].some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores do bot podem utilizar este comando!')
  
  if (args.length === 0) return message.channel.send("Use: `s!reload <comando>`");
  
  try {
    delete require.cache[require.resolve(`./${args[0]}`)];
  } catch (e) {
    return message.channel.send(`Não achei o comando **${args[0]}**`);
  }
  
  message.channel.send(`Recarreguei o comando **${args[0]}**`);
  
}
exports.help = {
    name: 'reload',
    aliases: ['recarregar']
}