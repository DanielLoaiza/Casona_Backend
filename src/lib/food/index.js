import {default as Food} from 'src/models/Food'


export function addFood(foodData) {
    return Food.create({name: foodData.name, price: foodData.price, description: foodData.description, section: foodData.section})
        .catch((e) => {
            return Promise.reject(e)
        })
}

export function getFood() {
    return Food.aggregate([{
        $group: {
            _id: '$section', //$section is the column name in collection
            plates: { $push: {name:"$name", price:"$price", description:"$description", _id:"$_id"} }
        }
    }]).exec()
        .catch((e) => {
            return Promise.reject(e)
        })
}
