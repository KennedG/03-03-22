const Discord = require("discord.js")
const {MessageEmbed} = require ("discord.js")
const moment = require("moment") // npm i moment
moment.locale('pt-BR')

module.exports = {
    name: 'userinfo',
    aliases: ["infouser", "ui", "iu"],

run: async(client, message, args) => {
    const usuário = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(!args[0]){ // autor da mensagem
        let msgMember = message.member
        let msgAuthor = message.author
        const dwBackTo = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('back')
            .addOptions([
                {
                    label: 'Voltar',
                    value: 'back',
                    emoji: '939170462360035338'
                }
            ])
        )

        const dw = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('menu-selector')
            .setPlaceholder(`Veja mais sobre suas informações`)
            .addOptions([
                {
                    label: 'Seus cargos',
                    value: 'author-roles',
                    emoji: '939165099837501472'
                },
                {
                    label: 'Suas permissões',
                    value: 'author-perms',
                    emoji: '939176161253138442'
                }
            ])
        )

        message.reply({embeds: [
            new MessageEmbed()
            .setColor(msgMember.displayHexColor)
            .setThumbnail(msgAuthor.displayAvatarURL({ dynamic: true}))
            .setTitle(`Suas informações (${msgAuthor.tag})`)
            .setFields(
                {
                    name: ":clock3: Tempo de conta criada:",
                    value:`\`${moment(msgMember.user.createdAt).format('LLL')}\`\n(${moment(msgMember.user.createdAt).startOf('day').fromNow()})`,
                    inline: true
                },
                {
                    name: ":notebook: Tempo que entrou no servidor", // .format('LL')
                    value: `\`${moment(msgMember.joinedAt).format('LLL')}\`\n(${moment(msgMember.joinedAt).fromNow()})`,
                    inline: true
                },
                {
                    name: ":id: ID",
                    value: `\`${msgAuthor.id}\``,
                    inline: true
                }
            )
        ], components: [dw]}).then(msg => {
            const f = (interaction) => interaction.isSelectMenu()

            const c = msg.createMessageComponentCollector({ f })

            c.on("collect", async(coll) => {
                let v = coll.values[0]
                coll.deferUpdate()
                

                if (v === 'author-roles') {
      const r = coll.member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1)
                    if (r.length === 0) {
                        msg.edit({embeds: [
                            new MessageEmbed()
                            .setColor(coll.member.displayHexColor)
                            .setTitle(`Seus cargos (${coll.user.tag})`)
                            .addField(`Total de cargos: ${r.length}:`, `Nenhum!`)
                        ], components: [dw]})   
                    } else {
                      msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(coll.member.displayHexColor)
                        .setTitle(`Seus cargos (${coll.user.tag})`)
                        .addField(`Total de cargos: ${r.length}:`, `\n${r.join(", ")}`)
                    ], components: [dwBackTo]})  
                    }
                      
                } else if (v === 'author-perms') {                    

                    const perms = {
                        CREATE_INSTANT_INVITE: '\`Criar convite instantâneo\`',
                        KICK_MEMBERS: '\`Expulsar membros\`',
                        BAN_MEMBERS: '\`Banir membros\`',
                        ADMINISTRATOR: '\`Administrador\`',
                        MANAGE_CHANNELS: '\`Gerenciar canais\`',
                        MANAGE_GUILD: '\`Gerenciar servidor\`',
                        ADD_REACTIONS: '\`Adicionar reações\`',
                        VIEW_AUDIT_LOG: '\`Ver registro de auditoria\`',
                        PRIORITY_SPEAKER: '\`Voz Prioritária\`',
                        STREAM: '\`Ao vivo\`',
                        VIEW_CHANNEL: '\`Ver canais\`',
                        SEND_MESSAGES: '\`Enviar mensagens\`',
                        SEND_TTS_MESSAGES: '\`Enviar mensagens em tts\`',
                        MANAGE_MESSAGES: '\`Gerenciar mensagens\`',
                        EMBED_LINKS: '\`Enviar links\`',
                        ATTACH_FILES: '\`Enviar anexos\`',
                        READ_MESSAGE_HISTORY: '\`Ver histórico de mensagens\`',
                        MENTION_EVERYONE: '\`Mencionar everyone e cargos\`',
                        USE_EXTERNAL_EMOJIS: '\`Usar emojis externos\`',
                        USE_EXTERNAL_STICKERS: '\`Usar figurinhas externas\`',
                        VIEW_GUILD_INSIGHTS: '\`Ver análises do servidor\`',
                        CONNECT: "\`Conectar em call's\`",
                        SPEAK: `\`Falar em call's\``,
                        MUTE_MEMBERS: `\`Mutar membros\``,
                        DEAFEN_MEMBERS: `\`Ensurdecer membros\``,
                        MOVE_MEMBERS: `\`Mover membros\``,
                        USE_VAD: `\`Utilizar detecção de voz\``,
                        CHANGE_NICKNAME: `\`Alterar apelido\``,
                        MANAGE_NICKNAMES: `\`Gerenciar apelidos\``,
                        MANAGE_ROLES: `\`Gerenciar cargos\``,
                        MANAGE_WEBHOOKS: `\`Gerenciar webhooks\``,
                        MANAGE_EMOJIS_AND_STICKERS: `\`Gerenciar emojis e figurinhas\``,
                        USE_APPLICATION_COMMANDS: `\`Utilizar comandos slashs (/)\``,
                        REQUEST_TO_SPEAK: `\`Pedir para falar\``,
                        MANAGE_EVENTS: `\`Gerenciar eventos\``,
                        MANAGE_THREADS: `\`Gerenciar threads\``,
                        CREATE_PUBLIC_THREADS: `\`Criar threads públicas\``,
                        CREATE_PRIVATE_THREADS: `\`Criar threads privadas\``,
                        SEND_MESSAGES_IN_THREADS: `\`Falar em threads\``,
                        START_EMBEDDED_ACTIVITIES: `\`Iniciar atividades\``,
                        MODERATE_MEMBERS: `\`Gerenciar moderação do servidor\``
                    }
                    
                    const permsArray = coll.member.permissions.toArray().map(p => perms[p]) 

                    msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(coll.member.displayHexColor)
                        .setTitle(`Suas permissões (${coll.user.tag})`)
                        .addField(`Perms:`, `${permsArray.join(`, `)}`)
                    ], components: [dwBackTo]}) 

                } else if (v === 'back') {
                    msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(msgMember.displayHexColor)
                        .setThumbnail(msgAuthor.displayAvatarURL({ dynamic: true}))
                        .setTitle(`Suas informações (${msgAuthor.tag})`)
                        .setFields(
                            {
                                name: ":clock3: Tempo de conta criada:",
                                value:`\`${moment(msgMember.user.createdAt).format('LLL')}\`\n(${moment(msgMember.user.createdAt).startOf('day').fromNow()})`,
                                inline: true
                            },
                            {
                                name: ":notebook: Tempo que entrou no servidor", // .format('LL')
                                value: `\`${moment(msgMember.joinedAt).format('LLL')}\`\n(${moment(msgMember.joinedAt).fromNow()})`,
                                inline: true
                            },
                            {
                                name: ":id: ID",
                                value: `\`${msgAuthor.id}\``,
                                inline: true
                            }
                        )
                    ], components: [dw]})
                }
            })
        })
        
    } else if (usuário) {
        const dwBackTo = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('back')
            .addOptions([
                {
                    label: 'Voltar',
                    value: 'back',
                    emoji: '939170462360035338'
                }
            ])
        )

        const dw = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('menu-selector')
            .setPlaceholder(`Veja mais informações`)
            .addOptions([
                {
                    label: 'Cargos',
                    value: 'user-roles',
                    emoji: '939165099837501472'
                },
                {
                    label: 'Permissões',
                    value: 'user-perms',
                    emoji: '939176161253138442'
                }
            ])
        )
        message.reply({embeds: [
            new MessageEmbed()
            .setColor(usuário.displayHexColor)
            .setThumbnail(usuário.displayAvatarURL({ dynamic: true}))
            .setTitle(`Informações de: ${usuário.user.tag}`)
            .setFields(
                {
                    name: ":clock3: Tempo de conta criada:",
                    value: `\`${moment(usuário.user.createdAt).format('LLL')}\`\n(${moment(usuário.user.createdAt).startOf('day').fromNow()})`,
                    inline: true
                },
                {
                    name: ":notebook: Tempo que entrou no servidor",
                    value: `\`${moment(usuário.joinedAt).format('LLL')}\`\n(${moment(usuário.joinedAt).fromNow()})`,
                    inline: true
                },
                {
                    name: ":id: ID",
                    value: `\`${usuário.id}\``,
                    inline: true
                }
            )
        ], components: [dw]}).then(msg => {
            const f = (interaction) => interaction.isSelectMenu()

            const c = msg.createMessageComponentCollector({ f })

            c.on("collect", async(coll) => {
                let v = coll.values[0]
                coll.deferUpdate()
    
                if (v === 'user-roles') {
      const r = usuário.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1)
                    if (r.length === 0) {
                        msg.edit({embeds: [
                            new MessageEmbed()
                            .setColor(usuário.displayHexColor)
                            .setTitle(`Cargos de ${usuário.user.tag}`)
                            .addField(`Total de cargos: ${r.length}:`, `Nenhum!`)
                        ], components: [dw]})   
                    } else {
                      msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(usuário.displayHexColor)
                        .setTitle(`Cargos de: ${coll.user.tag}`)
                        .addField(`Total de cargos: ${r.length}:`, `\n${r.join(", ")}`)
                    ], components: [dwBackTo]})  
                    }
                      
                } else if (v === 'user-perms') {                    
                    const perms = {
                        CREATE_INSTANT_INVITE: '\`Criar convite instantâneo\`',
                        KICK_MEMBERS: '\`Expulsar membros\`',
                        BAN_MEMBERS: '`\`Banir membros\`',
                        ADMINISTRATOR: '\`Administrador\`',
                        MANAGE_CHANNELS: '\`Gerenciar canais\`',
                        MANAGE_GUILD: '\`Gerenciar servidor\`',
                        ADD_REACTIONS: '\`Adicionar reações\`',
                        VIEW_AUDIT_LOG: '\`Ver registro de auditoria\`',
                        PRIORITY_SPEAKER: '\`Voz Prioritária\`',
                        STREAM: '\`Ao vivo\`',
                        VIEW_CHANNEL: '\`Ver canais\`',
                        SEND_MESSAGES: '\`Enviar mensagens\`',
                        SEND_TTS_MESSAGES: '\`Enviar mensagens em tts\`',
                        MANAGE_MESSAGES: '\`Gerenciar mensagens\`',
                        EMBED_LINKS: '\`Enviar links\`',
                        ATTACH_FILES: '\`Enviar anexos\`',
                        READ_MESSAGE_HISTORY: '\`Ver histórico de mensagens\`',
                        MENTION_EVERYONE: '\`Mencionar everyone e cargos\`',
                        USE_EXTERNAL_EMOJIS: '\`Usar emojis externos\`',
                        USE_EXTERNAL_STICKERS: '\`Usar figurinhas externas\`',
                        VIEW_GUILD_INSIGHTS: '\`Ver análises do servidor\`',
                        CONNECT: "\`Conectar em call's\`",
                        SPEAK: `\`Falar em call's\``,
                        MUTE_MEMBERS: `\`Mutar membros\``,
                        DEAFEN_MEMBERS: `\`Ensurdecer membros\``,
                        MOVE_MEMBERS: `\`Mover membros\``,
                        USE_VAD: `\`Utilizar detecção de voz\``,
                        CHANGE_NICKNAME: `\`Alterar apelido\``,
                        MANAGE_NICKNAMES: `\`Gerenciar apelidos\``,
                        MANAGE_ROLES: `\`Gerenciar cargos\``,
                        MANAGE_WEBHOOKS: `\`Gerenciar webhooks\``,
                        MANAGE_EMOJIS_AND_STICKERS: `\`Gerenciar emojis e figurinhas\``,
                        USE_APPLICATION_COMMANDS: `\`Utilizar comandos slashs (/)\``,
                        REQUEST_TO_SPEAK: `\`Pedir para falar\``,
                        MANAGE_EVENTS: `\`Gerenciar eventos\``,
                        MANAGE_THREADS: `\`Gerenciar threads\``,
                        CREATE_PUBLIC_THREADS: `\`Criar threads públicas\``,
                        CREATE_PRIVATE_THREADS: `\`Criar threads privadas\``,
                        SEND_MESSAGES_IN_THREADS: `\`Falar em threads\``,
                        START_EMBEDDED_ACTIVITIES: `\`Iniciar atividades\``,
                        MODERATE_MEMBERS: `\`Gerenciar moderação do servidor\``
                    }
                    
                    const permsArray = usuário.permissions.toArray().map(p => perms[p])

                    msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(usuário.displayHexColor)
                        .setTitle(`Permissões de ${usuário.user.tag}`)
                        .addField(`Permissões:`, `${permsArray.join(`, `)}`)
                    ], components: [dwBackTo]}) 

                } else if (v === 'back') {
                    msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(usuário.displayHexColor)
                        .setThumbnail(usuário.displayAvatarURL({ dynamic: true}))
                        .setTitle(`Informações de: ${usuário.user.username}`)
                        .setFields(
                            {
                                name: ":clock3: Tempo de conta criada:",
                                value: `\`${moment(usuário.user.createdAt).format('LLL')}\`\n(${moment(usuário.user.createdAt).startOf('day').fromNow()})`,
                                inline: true
                            },
                            {
                                name: ":notebook: Tempo que entrou no servidor",
                                value: `\`${moment(usuário.joinedAt).format('LLL')}\`\n(${moment(usuário.joinedAt).fromNow()})`,
                                inline: true
                            },
                            {
                                name: ":id: ID",
                                value: `\`${usuário.id}\``,
                                inline: true
                            }
                        )
                    ], components: [dw]})
                }
            })
        })
    } else if (!usuário) {
        return message.reply("**<:noentry:921415736566636575> | Usuário não identificado. Certifique-se se está mencionando um usuário válido ou utilizando um ID válido!**")
    }
}
}
