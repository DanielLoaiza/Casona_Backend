import mongoose, {Schema} from 'mongoose'
import {_extend} from 'util'

// se crea el schema que utilizará el modelo
let OrderSchema = new Schema({
    total: Number,
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItem',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


// se crea el modelo de la coleccion
let model = mongoose.model('Order', OrderSchema)

// se exporta el nuevo modelo
export default model
