const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  
if (!['422535241211707393', '717766639260532826' , '742798447253651506', '485922669208797226'].some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores / moderadores do bot podem utilizar este comando!')
        message.channel.send(`<a:sim:753735844812161034>| Ok, ${message.author}, Vou reiniciar....`);
        message.channel.send(`
<:pasta:755102272807108729> | A fechar pastas...`)
        setTimeout(() => {
            process.exit(0);
        }, 5000); 
    }
    exports.help = {
    name: 'reiniciar',
    aliases: ['religar']
}