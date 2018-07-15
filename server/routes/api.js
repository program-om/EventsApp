//define api end points
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')
const mongoose = require('mongoose')
const db = "mongodb://admin:admin0Pass@ds129821.mlab.com:29821/eventsdb"

//connect to the db
mongoose.connect(db, err => {
    if(err){
        console.error('Error: ' + err)
    } else{
        console.log('Connected to mongodb');
    }
})

function verifyToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('Unathorized request!')
  }

  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null'){
    return res.status(401).send('Unathorized request!')
  }

  let payload = jwt.verify(token, 'secretKey')
  if(!payload){
    return res.status(401).send('Unathorized request!')
  }

  req.userId = payload.subject
  next()
}

router.get('/', (req, res) => {
    res.send('From API routs. ' + req.ip)
})

router.post('/register', (req, res) => {
    let userDate = req.body
    let user = new User(userDate)//user is a mongoose.model()
    user.save((error, registeredUser) => {
        if(error){
            console.log(error);
        } else{
          let payload = { subject: registeredUser._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error);
        }else{
            if(!user){//no user found
                res.status(401).send('Invalid email')
            }else if(user.password !== userData.password){
                res.status(401).send('Invalid password')
            }else{
              let payload = { subject: user._id}
              let token = jwt.sign(payload, 'secretKey')
              res.status(200).send({token})
            }
        }
    })
})

router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })
  
  router.get('/special', verifyToken, (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })

module.exports = router