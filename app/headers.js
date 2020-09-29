const express = require("express")
const cors = require("cors")

const app = new express()
const port = 6002

app.use(cors({optionsSuccessStatus: 200}))

app.use("/", (request, response) => {

})

app.listen(port, () => console.log(`<<Microservice Name>> microservice started on port ${port}`))