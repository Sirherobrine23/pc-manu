const { Telegraf } = require("telegraf")
const token = '1627623319:AAFNObqGOwvI26mk6N6EJ30iOs9eeCCNeCQ';
const pc = require("./main_process")
const bot = new Telegraf(token)
bot.start((ctx) => {
ctx.reply(`Olá ${ctx.message.from.first_name} ${ctx.message.from.last_name}

Bem-Vindo o novo BOT.

Aqui poderar pegar algumas informações, como progresso e algumas informações tecnicas.

Por Favor certifique que você tenha informado o seu username do telegram para conseguimos pegar algumas informações

seu username é ${ctx.message.from.username}
`)
})

bot.help((ctx) => ctx.reply("Use o /start"))

bot.action("delete", ({ deleteMessage }) => deleteMessage())

bot.command("info", (ctx) => {
    const username = ctx.from.username
    const test = pc.get({"username": username})
    const men = `Status: ${test.status}
Data da Ocorrencia: ${test.data[0].entrada}
Usuarios permitidos: "${test.username}"
`
ctx.reply(men)
});
bot.on("message", (ctx) => {
    // const text = ctx.message
    const text = ctx.message.text
    console.log(text);
});
bot.launch()