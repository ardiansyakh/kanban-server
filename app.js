require('dotenv').config()
const express = require('express')
const errHandler = require('../fancy-todo-server/middleware/errHandler')
const app = express()
const router = require('./router')
const PORT = process.env.PORT || 3000


app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(errHandler)
app.listen(PORT, ()=>{
    console.log(`listen on port: ${PORT}`);
})