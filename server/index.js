const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const SampleDb = require('./sample-db')

const app = express()
const productsRoute = require('./routes/products')

mongoose.connect(config.DB_URI).then(
  () => {
    const sampleDb = new SampleDb()
    sampleDb.initDb()
  }
)

app.use('/api/v1/products', productsRoute)

// app.get('/products',function(req, res){
//   res.json({'success': true})
// })

const PORT = process.env.PORT || '3001'

app.listen(PORT, function(){
  console.log('I am listening.')
})