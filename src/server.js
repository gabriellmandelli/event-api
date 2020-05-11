const mongoose = require("mongoose")
const express = require("express")
const routes = require("./routes")
const cors = require("cors")

const DatabaseConstants = require("./configurations/constants/DataBaseConstants")

const server = express()

mongoose.connect(DatabaseConstants.MONGOOSE_CONNECTION, { useNewUrlParser: true, useCreateIndex: true })

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(DatabaseConstants.SERVER_PORT, () => {
  console.log(`Server started on Port ${DatabaseConstants.SERVER_PORT}`)
})