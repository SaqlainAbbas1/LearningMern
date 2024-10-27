


import express from 'express'
import bodyParser from 'body-parser'
import {dirname} from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
var isAuthenticated = false

app.use(bodyParser.urlencoded({extended: true}))

function CheckUser(req, res, next){
    const password = req.body['password']
    if(password === 'hello'){
        isAuthenticated = true
    }
    next()
}

app.use(CheckUser)

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})
app.post('/check', (req, res)=>{
    if(isAuthenticated){
        res.sendFile(__dirname + '/public/secret.html')
    }
    else{
        res.sendFile(__dirname + '/public/index.html')
    }
})

const port = 3000
app.listen(port, ()=>{
    console.log(`server is running on port : ${port}`);
})