const express = require("express")
const cors = require("cors")

const app = new express()
const port = 6001

app.use(cors({optionsSuccessStatus: 200}))

app.use("/", (request, response) => {
	console.log("-----Starting Request-----")
	const urlParams = request.url.split("/")
	console.log(`Request URL: ${request.url}`)
	let date
	let responseObject

	if (urlParams.length > 1 && urlParams[1]) {
		date = new Date(urlParams[1])
		if (isNaN(date.getTime())) {
			date = new Date(parseInt(urlParams[1]))
		}

		if (isNaN(date.getTime())) {
			responseObject = {
				error: "Invalid Date"
			}
			console.log(responseObject)
			return response.json(responseObject)
		}
	} else {
		date = new Date()
	}

	responseObject = {
		unix: date.getTime(),
		utc: date.toUTCString()
	}
	console.log(responseObject)
	return response.json(responseObject)
})

app.listen(port, () => console.log(`Timestamp microservice started on port ${port}`))