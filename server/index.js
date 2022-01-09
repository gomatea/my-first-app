const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/index')
const SampleDb = require('./sample-db')
const path = require('path')

const app = express()
const productsRoute = require('./routes/products')

mongoose.connect(config.DB_URI).then(
  () => {
      if(process.env.NODE_ENV !== 'production'){
      const sampleDb = new SampleDb()
      // sampleDb.initDb()
    }
  }
)

app.use('/api/v1/products', productsRoute)

// app.get('/products',function(req, res){
//   res.json({'success': true})
// })

// 本番環境の場合のみ
if(process.env.NODE_ENV === 'production'){
  // パスがproducts以外の場合は、distのindex.htmlを返す
  const appPath = path.join(__dirname, '..', 'dist', 'my-first-app')
  app.use(express.static(appPath))
  app.get("*", function(req, res){
    res.sendFile(path.resolve(appPath, 'index.html'))
  })
}

const PORT = process.env.PORT || '3001'

app.listen(PORT, function(){
  console.log('I am listening.')
})