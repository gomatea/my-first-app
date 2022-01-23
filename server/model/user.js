//import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {type: String, required: true, max:[60, '最大60文字']},
  email: {
    type: String, 
    required: true,
    lowercase: true,
    unique: true,
    max:[60, '最大60文字']
  },
  password: {
    type: String,
    required: true,
    min:[6, '最小60文字'],
    max:[30, '最大30文字']
  }
});

// saveが呼び出される前に実行される関数を定義する
UserSchema.pre('save', function(next){
  const saltRounds = 10;

  // user.passwordをハッシュ化して再代入する
  const user = this
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      user.password = hash
      next()
    });
});
})

// DBのハッシュ化されたパスワードと生パスワードを比較する
UserSchema.methods.registeredPasswordEquals = function(rawPassword){
  return bcrypt.compareSync(rawPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)