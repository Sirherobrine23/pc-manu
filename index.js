const { Telegraf } = require("telegraf")
const token = '1627623319:AAFNObqGOwvI26mk6N6EJ30iOs9eeCCNeCQ';
const pc = require("./main_process")
const bot = new Telegraf(token)
const fs = require("fs")
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
    ctx.reply(`Status: ${test.status}`)
    ctx.reply(`Data da Ocorrencia: ${test.data[0].entrada}`)
    ctx.reply(`Data da entrega: ${test.data[0].saida}`)
    ctx.reply(`Usuarios permitidos: "${test.username}"`)
    for (let com in test.texts){
        ctx.reply(fs.readFileSync(test.texts[com]))
        com++
    }
});
bot.command("teste", (ctx) => {
    const username = ctx.from.username
    const file_content = `Uma mensagem de teste,
    isso esta aqui para teste do novo arquvo para ver se foi salvo direito, quebra linhas e outros
    mais algumas coisas estaram presentes.
        By Sirherobrine23`
    pc.add_user({
        "username": username,
        "data": "5/03/2021",
        "status": "in progress"
    })
    setTimeout(() => {
        pc.text(file_content, username)
    }, 2500);
    ctx.reply(file_content)
});
bot.on("message", (ctx) => {
    ctx.deleteMessage()
})
bot.launch()