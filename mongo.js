const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://users:ZcKMIdooMyFrfoE0@manu.xwc86.mongodb.net/?retryWrites=true&w=majority";
function getupdate(){
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        client.db("pc").collection("PCMANU").find().toArray().then(results => {
            module.exports.test = results[0]
        })
        client.close()
    });
}
getupdate()
setInterval(() => {
    getupdate()
}, 5000);