const path = require ("path")
const fs = require ("fs")
const save_path = path.join(__dirname, "computes.json")

if (!(fs.existsSync(save_path))){
    fs.writeFileSync(save_path, JSON.stringify([
        {
            "status": "sucess",
            "codename": "a100a",
            "username": [
                "Sirherobrine23",
                "sirherobrine23"
            ],
            "data": [
                {
                    "entrega": "Não definido",
                    "entrada": "Não definido"
                }
            ],
            "texts": [
                "computer/a100a/log1.txt"
            ]
        }
    ], null, 4))
}

function user_verify(json_config){
    const user = json_config.username
    const saves = fs.readSync(save_path)
    var sucess=false
    for (let com in saves){
        for (let com2 in saves[com].username){
            if (user === saves[com].username[com2]) sucess = true
            com2++
        }
        com++
    }
    return sucess
}

function user_registey(json_config){
    const username = json_config.usernames
    const data_ = json_config.data
    const status = json_config.status

    const new_user = {
        "status": status,
        "codename": Math.trunc(Math.random()),
        "username": username,
        "data": [
            {
                "entrada": data_,
                "entrague": "Não foi definido ainda a data de  entrega"
            }
        ],
        "texts": []
    }
    try {
        const old_save = JSON.parse(fs.readFileSync(save_path, "utf8"))
        const new_save = old_save.push(new_user)
        fs.writeFileSync(save_path, JSON.stringify(new_save, null, 4))
        return true
    } catch (error) {
        console.log("erro in save new file")
        console.log(error);
        return false
    }
}

function user_config(json_config){
    const username = json_config.username
    const save = JSON.parse(fs.readFileSync(save_path, "utf8"))
    for (let goo in save){
        var json_parse = save[goo]
        for (let us in save[goo].username){
            if (json_parse.username[us] === username) return json_parse
            else us++
        }
        goo++
    }
    return null
}

function user_update(update){
    return null
}

module.exports = {
    add_user: user_registey,
    verify: user_verify,
    get: user_config
}