import mongoose, {Schema} from 'mongoose'
import {_extend} from 'util'

// se crea el schema que utilizará el modelo
let UserSchema = new Schema({
  name: String,
  lastName: String,
  fullName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// toco dejarlo en es5, en es6 el this es undefined
UserSchema.pre('save', function(next) {
  this.fullName = this.name + ' ' + this.lastName
  next()
})

// se crea el modelo de la coleccion
let model = mongoose.model('User', UserSchema)

// se exporta el nuevo modelo
export default model
