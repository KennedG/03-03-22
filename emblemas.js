const { Message, Client, MessageEmbed } = require("discord.js");
const db = require("quick.db")


module.exports = {
    name: "background",
    run: async (client, message, args) => {
      
let args0 = args.join(" ")
let dindin = db.fetch(`cristais_${message.author.id}`)
let verificado = '<a:verificado:908562051927007242>'
let booster = '<a:booster:859296451594944522>'
let discorddono = '<a:coroa:898814229640019968>'
let hype = '<a:hype:859296488479391764>'
let coração = '<a:Red_CoraPixelCDL:947624620608090172>'



if(args0==='Verificado'){
  if(dindin<200) return message.reply(`Ops ${message.author} você não possui Cristais suficiente!`)

  message.reply('<:dcl_ypSino:914350019182723122> | Emblema setado com sucesso!')
  db.subtract(`cristais_${message.author.id}`, 100)

  db.set(`emblemas_${message.author.id}`, verificado)
}

if(args0==='Booster'){
    if(dindin<250) return message.reply(`Ops ${message.author} você não possui Cristais suficiente!`)
  
    message.reply('<:dcl_ypSino:914350019182723122> | Emblema setado com sucesso!')
    db.subtract(`cristais_${message.author.id}`, 250)
  
    db.set(`emblemas_${message.author.id}`, booster)
  }

if(args0==='donogizmo'){
    if(dindin<1) return message.reply(`Ops ${message.author} você não possui Cristais suficiente!`)
  
    message.reply('<:dcl_ypSino:914350019182723122> | Emblema setado com sucesso!')
    db.subtract(`cristais_${message.author.id}`, 1)
  
    db.set(`emblemas_${message.author.id}`, discorddono)
  }

if(args0==='Hype'){
    if(dindin<300) return message.reply(`Ops ${message.author} você não possui Cristais suficiente!`)
  
    message.reply('<:dcl_ypSino:914350019182723122> | Emblema setado com sucesso!')
    db.subtract(`cristais_${message.author.id}`, 300)
  
    db.set(`emblemas_${message.author.id}`, hype)
  }

if(args0==='Coração'){
    if(dindin<325) return message.reply(`Ops ${message.author} você não possui Cristais suficiente!`)
  
    message.reply('<:dcl_ypSino:914350019182723122> | Emblema setado com sucesso!')
    db.subtract(`cristais_${message.author.id}`, 325)
  
    db.set(`emblemas_${message.author.id}`, coração)
  }

if(!args0){
       const embed = new MessageEmbed()
   .setColor(`#0060EE`)
  .setTitle(`<:AnuncioV3:947624398989443152> | Loja de emblemas`)
.setDescription(`
> Emblema #1
> Nome: _Verificado_
> Preço: 100 Cristais
Preview: <a:verificado:908562051927007242>

> Emblema #2
> Nome: _Booster_
> Preço: 250 Cristais
Preview: <a:booster:859296451594944522>

> Emblema #3
> Nome: _Hype_
> Preço: 300 Cristais
Preview: <a:hype:859296488479391764>

> Emblema #4
> Nome: _Coração_
> Preço: 325 Cristais
Preview: <a:Red_CoraPixelCDL:947624620608090172>


`)
         .setFooter(`Para comprar utilize G!emblemas <nome>`);

message.reply({embeds: [embed]})
}
    },
};