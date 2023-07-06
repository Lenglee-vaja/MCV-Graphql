const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const db_url = process.env.DB_URL


const connect = async () => {
    await mongoose.connect(db_url, { useNewUrlParser: true }).then(()=>{
        console.log("Connect Success")
    }).catch((error)=>{
        console.log(error)
    });
}

module.exports = { connect }