import {default as Food} from 'src/models/Food'


export function addFood(foodData) {
    return Food.create({name: foodData.number, price: foodData.price, description: foodData.description})
        .catch((e) => {
            return Promise.reject(e)
        })
}

export function getFood() {
    return Food.find({}).exec()
        .catch((e) => {
            return Promise.reject(e)
        })
}
