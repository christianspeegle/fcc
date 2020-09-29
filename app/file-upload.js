const express = require("express")
const cors = require("cors")
const multer = require("multer")()

const app = new express()
const port = 6004

app.use(cors({optionsSuccessStatus: 200}))

app.use("/", multer.single("upfile"), (request, response) => {
	response.json({
		name: request.file.originalname,
		size: request.file.size
	})
})

app.listen(port, () => console.log(`File Metadata microservice started on port ${port}`))