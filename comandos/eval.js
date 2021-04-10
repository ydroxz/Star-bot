const { MessageEmbed }= require('discord.js')
const API = require("../shardconfig")
module.exports.run = async (client, message, args) => {
  if (!['422535241211707393', '717766639260532826' , '742798447253651506', '672652538880720896'].some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores do bot podem utilizar este comando!')
  if (!args[0])
    return message.channel.send(
      `Insira um valor para executar o eval.`
    );
await message.channel.send('Executando...').then(async m => {
  try {
    let beforeRunning = Date.now()
    let result = eval(args.join(' '))

    if (result instanceof Promise) {
      m.edit('O código retornou uma promise - aguardando ela ser resolvida...')
      await result
    }
    if (typeof result !== 'string') result = require('util').inspect(result)
    let end = (Date.now() - beforeRunning)
    let sembed = new MessageEmbed(message.author).setTimestamp()
      .setAuthor('✔️ • Sucesso!')
      .setDescription('```fix\nEae mermão bora repensar essa atitude? Bebeu todinho sem agitar hoje?\n```')
      .setColor('00ff0b')
      .addField('Tempo de execução', (end / 60).toFixed(5) + 's')
    if(args[0] == "process.env.TOKEN") return m.edit('Sucesso!', sembed)
    let nembed = new MessageEmbed(message.author).setTimestamp()
      .setAuthor('✔️ • Sucesso!')
      .setDescription('```fix\nEae mermão bora repensar essa atitude? Bebeu todinho sem agitar hoje?\n```')
      .setColor('00ff0b')
      .addField('Tempo de execução', (end / 60).toFixed(5) + 's')
    if(args[0] == "process.env.MONGO") return m.edit('Sucesso!', nembed)
    let dembed = new MessageEmbed(message.author).setTimestamp()
      .setAuthor('✔️ • Sucesso!')
      .setDescription('```fix\nEae mermão bora repensar essa atitude? Bebeu todinho sem agitar hoje?\n```')
      .setColor('00ff0b')
      .addField('Tempo de execução', (end / 60).toFixed(5) + 's')
    if(args[0] == "process.env") return m.edit('Sucesso!', dembed)
    let aembed = new MessageEmbed(message.author).setTimestamp()
      .setAuthor('✔️ • Sucesso!')
      .setDescription('```fix\nEae mermão bora repensar essa atitude? Bebeu todinho sem agitar hoje?\n```')
      .setColor('00ff0b')
      .addField('Tempo de execução', (end / 60).toFixed(5) + 's')
    if(args[0] == "client.token") return m.edit('Sucesso!', aembed)
        let adgembed = new MessageEmbed(message.author).setTimestamp()
      .setAuthor('✔️ • Sucesso!')
      .setDescription('```fix\nEae mermão bora repensar essa atitude? Bebeu todinho sem agitar hoje?\n```')
      .setColor('00ff0b')
      .addField('Tempo de execução', (end / 60).toFixed(5) + 's')
    if(args[0] == "client.token.split('.')") return m.edit('Sucesso!', aembed)
    let embed = new MessageEmbed(message.author).setTimestamp()
      .setAuthor('✔️ • Sucesso!')
      .setDescription('```js\n' + result.slice(0, 2000) + '\n```')
      .addField('Tempo de execução', (end / 60).toFixed(5) + 's').setColor("00ff0b")
    m.edit('Sucesso!', { embed: embed })
  } catch (e) {
    let embed = new MessageEmbed(message.author).setTimestamp()
      .setAuthor('❌ • Erro!')
      .setDescription('```js\n' + e.stack.slice(0, 2000) + '\n```')
      .setColor("ff0000")
    m.edit('Falha...', { embed: embed })
  }
})
}
exports.help = {
    name: 'eval',
    aliases: ['evaluate', 'ev']
}