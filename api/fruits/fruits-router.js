const Fruit = require("./fruits-model");
const router = require("express").Router()

router.get("/", (req, res) => {

})

router.get("/:id", (req, res) => {

})
router.post("/", (req, res) => {

})
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  const deleted = await Fruit.removeFruit(id)
  res.status(200).json(deleted)
})

router.put("/:id", (req, res) => {

})


router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      sageAdvice: 'Finding the real error is 90% of the bug fix',
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = router;