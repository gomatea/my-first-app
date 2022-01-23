const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

router.post('/login', function(req,res){
  const{email, password} = req.body
  if(!email){
    //エラーを返す
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email.'}]})

  }
  if(!password){
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password.'}]})
  }

  User.findOne({email}, function(err, foundUser){
    if(err){
      //エラーを返す
      return res.status(422).send({errors: [{title: 'User error', detail: 'Server error.'}]})

    }
    if(!foundUser){
      //エラーを返す
      return res.status(422).send({errors: [{title: 'User error', detail: 'User does not exist.'}]})

    }

    if(!foundUser.registeredPasswordEquals(password)){
      return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password'}]})

    }

    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
    }, config.SECRET, { expiresIn: '1h' });

    return res.json(token)
  })
})

router.post('/register', function(req,res){
  const{username, email, password, confirmPassword} = req.body
  // 名前が同じ場合はまとめて書ける。
  // const username = req.body.username
  // const email = req.body.email
  // const password = req.body.password
  // const confirmPassword = req.body.confirmPassword

  if(!username){
    //エラーを返す
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill username.'}]})

  }
  if(!email){
    //エラーを返す
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email.'}]})

  }
  if(!password){
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password.'}]})
  }
  if(password !== confirmPassword){
    //エラーを返す
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please check password.'}]})

  }

  User.findOne({email}, function(err, foundUser){
    if(err){
      //エラーを返す
      return res.status(422).send({errors: [{title: 'User error', detail: 'Server error.'}]})

    }
    if(foundUser){
      //エラーを返す
      return res.status(422).send({errors: [{title: 'User error', detail: 'User already exists.'}]})

    }

    const user = new User({username, email, password})
    user.save(function(err){
      if(err){
        //エラーを返す
        return res.status(422).send({errors: [{title: 'User error', detail: 'Server error.'}]})

      }
      return res.json({"registered": true})
    })
  })
  // console.log(req.body)

})

module.exports = router

