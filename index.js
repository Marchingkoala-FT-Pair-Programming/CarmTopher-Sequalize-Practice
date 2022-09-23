const volleyball = require('volleyball');
const express = require('express');
const path = require('path');
const app = express();
app.use(volleyball)
const middleware = express.static(path.join(__dirname, 'style'))
app.use(middleware)
const PORT = 3000;

const router = require('./router')
app.use('/', router)

app.listen( PORT, ()=>{
    console.log('Server is live Again!')
})