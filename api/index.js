require("dotenv").config()
const app = require("./src/routes/index")
const connectDB = require("./src/database/connection")

const PORT = process.env.PORT || 10000

app.listen(PORT, async () => {
  await connectDB()
  console.log(`server listening on port ${PORT}`)
})