const { Telegraf } = require("telegraf")
const token = '1627623319:AAFNObqGOwvI26mk6N6EJ30iOs9eeCCNeCQ';
require("./mongo")
const bot = new Telegraf(token)
bot.start((ctx) => {
ctx.reply(`Olá ${ctx.message.from.username}

Bem-Vindo o novo BOT.

Aqui poderar pegar algumas informações, como progresso e algumas informações tecnicas.

Por Favor informe o Numero de rastreio da Manuteção
`)
})

bot.help((ctx) => ctx.reply("Use o /start"))

bot.action("delete", ({ deleteMessage }) => deleteMessage())

bot.command("status", (ctx) => {
    const username = ctx.from.username
    var test = require("./mongo").test
    test = eval(`test.${chat_id}`)
    console.log(username)
ctx.reply(`Status: ${test.status}
Data da Ocorrencia: ${test.date}
Data da Ultima Atualização: ${test.update}
Usuarios permitidos: "${test.user}"
Seu username: ${username}
`)
});
bot.on("message", (ctx) => {
    // const text = ctx.message
    const text = ctx.message.text
    console.log(text);
});
bot.launch()