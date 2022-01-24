const express = require('express')
const router = express.Router()
const Product = require('../model/product')
const userController = require('../controllers/users')

router.get('', function(req,res){
  Product.find({}, function(err, foundProducts){
    res.json(foundProducts)
  })
  // res.json({'ok': true})
})

// router.get('/secret', userController.authMiddleware, function(req,res){
//   res.json({'ok': true})
// })

router.get('/:productId', userController.authMiddleware, function(req,res){
  const productId = req.params.productId
  Product.findById(productId, function(err, foundProduct){
    if(err){
      return res.status(422).send({errors: [{title: 'Product error', detail: 'No ID found.'}]})
    }
    return res.json(foundProduct)
  })
  // res.json({'ok': true})
})


module.exports = router