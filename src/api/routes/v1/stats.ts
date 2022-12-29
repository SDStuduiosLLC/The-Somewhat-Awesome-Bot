import express from "express"
import { insertStat, getStats } from "../../db/ads"
const router = express.Router()

router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`)
  next()
})

router.post("/post", async (req, res) => {
  const stat = req.body
  await insertStat(stat)
  res.send({ message: "Stat posted" })
})

router.get("/all", async (req, res) => {
  res.send(getStats())
})

module.exports = router
