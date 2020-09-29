const express = require("express")
const cors = require("cors")

const app = new express()
const port = 6002

app.use(cors({optionsSuccessStatus: 200}))

app.use("/", (request, response) => {
	const responseObject = {
		ipaddress: request.header("X-Forwarded-For"),
		language: request.header("Accept-Language"),
		software: request.header("User-Agent")
	}

	response.json(responseObject)
})

app.listen(port, () => console.log(`Request Header Parser microservice started on port ${port}`))