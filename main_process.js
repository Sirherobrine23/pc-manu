const path = require ("path")
const fs = require ("fs")
const base_path = (process.env.BASE_PATH||".")
const base_files = path.join(base_path, "save")
const save_file_users = path.join(base_files, "computes.json")

if (!(fs.existsSync(base_files))) fs.mkdirSync(base_files)
if (!(fs.existsSync(path.join(base_files, "texts")))) fs.mkdirSync(path.join(base_files, "texts"))

const base_new_user_file = [
    {
        "status": "in progress",
        "codename": "a100a",
        "username": [
            {
                "user": "Sirherobrine23"
            },
            {
                "user": "sirherobrine23"
            },
            {
                "user": "amatheus"
            }
        ],
        "data": [
            {
                "entrega": "Não definido",
                "entrada": "Não definido"
            }
        ],
        "texts": []
    }
];

if (!(fs.existsSync(save_file_users))){
    fs.writeFileSync(save_file_users, JSON.stringify(base_new_user_file, null, 4))
}
else {
    let nuller = fs.readFileSync(save_file_users, "utf8")
    var user_file_validy1 = false
    var user_file_validy2 = false
    if (nuller[0] === "[") user_file_validy1 = true
    if (nuller.slice(-1) === "]") user_file_validy2 = true
    if (user_file_validy1 !== user_file_validy2) {
        fs.writeFileSync(path.join(base_files, `oldUsers_${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.json`), fs.readFileSync(save_file_users, "utf8"))
        fs.writeFileSync(save_file_users, JSON.stringify(base_new_user_file, null, 4))
    }
}

function user_verify(json_config){
    const user = json_config.username
    const saves = fs.readSync(save_file_users)
    var sucess=false
    for (let com in saves){
        for (let com2 in saves[com].username){
            if (user === saves[com].username[com2].user) sucess = true
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
    console.log(json_config)
    const new_user = {
        "status": status,
        "codename": `a${Math.floor (Math.random() * 1000000000000)}`,
        "username": [
            {
                "user": username
            }
        ],
        "data": [
            {
                "entrada": data_,
                "saida": "Não foi definido ainda a data de  entrega"
            }
        ],
        "texts": []
    }
    const old_save = JSON.parse(fs.readFileSync(save_file_users, "utf8"))
    old_save.push(new_user)
    console.log(old_save);
    fs.writeFileSync(save_file_users, JSON.stringify(old_save, null, 4))
    return true
}

function user_config(json_config){
    const username = json_config.username
    const save = JSON.parse(fs.readFileSync(save_file_users, "utf8"))
    for (let goo in save){
        var json_parse = save[goo]
        for (let us in save[goo].username){
            if (json_parse.username[us].user === username) return json_parse
            else us++
        }
        goo++
    }
    return null
}

function user_update(update){
    return null
}

function user_text_update(jso){
    var codename = jso.codename,
        paths = jso.path,
        save = JSON.parse(fs.readFileSync(save_file_users))
    for (let com in save){
        if (save[com].codename === codename){
            save[com].texts.push(paths)
        }
    }
    fs.writeFileSync(save_file_users, JSON.stringify(save, null, 4))
}

function text_main(text, username){
    const file_name = `info_${Math.floor (Math.random() * 1000000000000)}.txt`
    var codename = user_config({"username": username})
    console.log(codename)
    codename = codename.codename
    if (text !== ""){
        const text_path = path.join(base_files, "texts", codename),
            text_file = path.join(base_files, "texts", codename, file_name)
        if (!(fs.existsSync(text_path))) fs.mkdirSync(text_path)
        fs.writeFileSync(text_file, text)
        user_text_update({
            "codename": codename,
            "path": text_file
        })
    }
    else return false
    return true
}

module.exports = {
    add_user: user_registey,
    verify: user_verify,
    get: user_config,
    text: text_main
}