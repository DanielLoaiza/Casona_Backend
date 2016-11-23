import mongoose, {Schema} from 'mongoose'

// se crea el schema que utilizará el modelo
let FoodSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    section: String
})

// se crea el modelo de la coleccion
let model = mongoose.model('Food', FoodSchema)

// se exporta el nuevo modelo
export default model
