const request = require("supertest")
const db = require("../../data/dbConfig")
const server = require("../server.js")

const Fruit = require('./fruits-model');

const mango = {name: "Mango"}
const cherry = {name: "Cherry"}

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async ()=>{
    await db("fruits").truncate()
})
afterAll(async ()=>{
    await db.destroy()
})

it("correct env", ()=>{
    expect(process.env.DB_ENV).toBe("testing")
})

describe("Fruits model" , () => {           
    describe("creates fruit", () => {
        it("adds fruits to db", async()=> {
            let all
            await Fruit.create(mango)
            all = await db('fruits')
            expect(all).toHaveLength(1)

            await Fruit.create(cherry)
            all = await db('fruits')
            expect(all).toHaveLength(2)
        })
        it("inserted fruit", async() => {
            const fruit = await Fruit.create(mango)
            expect(fruit).toMatchObject({id:1, ...mango})
        })
    })
    describe("[DELETE]  /delete fruit", () => {
            it("deletes fruits from db", async() => {
                const [id] = await db("fruits").insert(mango)
                let removed = await db("fruits").where({id}).first()
                expect(removed).toBeTruthy()

                await request(server).delete("/fruits/"+ id)
                removed = await db("fruits").where({id}).first()
                expect(removed).toBeFalsy()
            })
            it("responds with the deleted fruit", async () => {
                await db("fruits").insert(mango)
                let fruit = await request(server).delete("/fruits/1")
                expect(fruit.body).toMatchObject(mango)
            })
    })

})