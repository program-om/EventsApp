const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./routes/api')

const app = express()
//without path means will be excuted with every request
//made to the app
app.use(cors())

const PORT = 3000

app.use(bodyParser.json())

app.use('/api', api) //direct to api when /api is requested
app.get('/', function(req, res){
    res.send('hello from server')
})

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT)
})