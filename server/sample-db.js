const Product = require('./model/product')

class SampleDb{
  constructor(){
    this.products = [
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens',
        headings: [
          {title: 'aaa', description: 'aaaaa'},
          {title: 'bbb', description: 'bbbbb'}
        ]
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras',
        headings: [
          {title: 'aaa', description: 'aaaaa'},
          {title: 'bbb', description: 'bbbbb'}
        ]
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Standard',
        price: 299,
        description: '',
        headings: [
          {title: 'aaa', description: 'aaaaa'},
          {title: 'bbb', description: 'bbbbb'}
        ]
      }
    ];
  }

  async initDb(){
    await this.cleanDb()
    this.pushProductsToDb()
  }

  async cleanDb(){
    await Product.deleteMany({})
  }

  pushProductsToDb(){
    this.products.forEach(
      (product) => {
        const newProduct = new Product(product)
        newProduct.save()
      }
    )
  }

  // seeDb(){
  //   this.pushProductsToDb()
  // }
}

module.exports = SampleDb