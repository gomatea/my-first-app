//import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductSchema = new Schema({
  coverImage: String, // String is shorthand for {type: String}
  name: {type: String, required: true, max:[60, '最大60文字']},
  price: Number,
  description: String,
  headings: [{ title: String, description: String }],
});

module.exports = mongoose.model('product', ProductSchema)