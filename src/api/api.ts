import express from "express"
import bp from "body-parser"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { apiKeyAuth } from "@vpriem/express-api-key-auth"
import { config } from "../../data/config"

import { startDatabase } from "./db/mongo"
import { insertStat, getStats } from "./db/ads"

const stats = require("./routes/v1/stats")

const app = express()

app.use(helmet())
app.use(bp.json())
app.use(cors())
app.use(morgan("combined"))
app.use(apiKeyAuth([config.tsabApi.auth]))

// app.use(function (req, res) {
//   res.status(404).end("Invalid API endpoint")
// })

/**
 * Base route for the API. Goto /api/ to get the latest API version.
 */
app.get("/", async (req, res) => {
  res.send({
    message: "goto /api/v1/ ",
  })
})

app.use("/api/v1/stats", stats)

startDatabase().then(async () => {
  await insertStat({ title: "hello from in memory db" })

  app.listen(config.tsabApi.apiPort, "localhost", function () {
    console.log("listening on port 3000")
  })
})
