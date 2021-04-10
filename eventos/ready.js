module.exports = async (client) => {
  const avatares = [
    "https://cdn.discordapp.com/attachments/750072900266229910/754783750415581194/staravatar1.png",
    "https://cdn.discordapp.com/attachments/750072900266229910/754783781399035994/staravatar2.webp",
    "https://cdn.discordapp.com/attachments/750072900266229910/754784581005082695/staravatar3.png"
  ] 
  
  const status = [
    "online",
    "idle"
  ]
  
  const atividades = [
     ["Musicas Espaciais", "LISTENING"],
     ["Undertale", "PLAYING"],
     ["ADG", "WATCHING"],
     ["G0ularte", "WATCHING"]
    ];
  setInterval(async () => {
    let i = Math.floor(Math.random() * atividades.length + 1) - 1
      await client.user.setActivity(atividades[i][0], { type: atividades [i][1] });
  }, 10000);

  setInterval(async () => {
    let b = Math.floor(Math.random() * status.length + 1) - 1
      await client.user.setStatus(status[b])
  }, 20000)

  setInterval(async () => {
    let c = Math.floor(Math.random() * avatares.length + 1) - 1
      await client.user.setAvatar(avatares[c])
  }, 180000)
  console.log('Estou Online!')
}