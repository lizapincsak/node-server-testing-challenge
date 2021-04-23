const db = require('../../data/dbConfig.js');


async function create(fruit){
    const [id] = await db('fruits').insert(fruit)
    return db("fruits").where("id", id).first()
}

async function removeFruit(id){
    const fruit = await db("fruits").where({id}).first()
    await db("fruits").where("id", id).del()
    return fruit
}

module.exports = {
   create, removeFruit
}