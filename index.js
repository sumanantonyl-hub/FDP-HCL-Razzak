const app = require('express')()
const parser = require('body-parser')
const db = require('./connection')
const dbApi = require('./CorporateDbController')
const uApi = require('./UserController')
require('dotenv').config()

db()
app.use(parser.json())
app.use('/api',dbApi)
app.use('/auth',uApi)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`API Running @ ${PORT}`)
})