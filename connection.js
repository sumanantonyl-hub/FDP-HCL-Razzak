const mongoose = require('mongoose')
require('dotenv').config()
const establish = async() => {
    try{
        // local community server
        await mongoose.connect(process.env.db_url)
        console.log(`Connection established`)
    }catch(error){console.error(error)}
}
module.exports=establish