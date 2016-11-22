import mongoose, {Schema} from 'mongoose'

// se crea el schema que utilizará el modelo
let TableSchema = new Schema({
    status: Boolean,
    number: Number
})

// se crea el modelo de la coleccion
let model = mongoose.model('Table', TableSchema)

// se exporta el nuevo modelo
export default model
