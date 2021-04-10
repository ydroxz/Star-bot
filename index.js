const { ShardingManager, WebhookClient } = require('discord.js');
const hook = new WebhookClient('769401388278611979', 'VwIwAP7njzCREdsmYVDgDBXKADR3i-N9aLSf2gTS8nFi25dGs1MZFSgVKkTiwY5AFO-v');
const manager = new ShardingManager('./bot.js', { 
  totalShards: 3,
  shardRespawn: true,
});

manager.on('shardCreate', shard => {
  console.log(`Shard ${shard.id} iniciada`);
  hook.send(`<:online:769404416649461761> Shard ${shard.id} esta online <:online:769404416649461761>`)
})
manager.spawn()