const express = require("express")
const cors = require("cors")
const bp = require("body-parser")

const repo = require("./utils/repository")

const app = new express()
const router = express.Router()
const port = 6005
const invalidResponse = {
	error: "Invalid request"
}

app.use(cors({optionsSuccessStatus: 200}))
app.use(bp.urlencoded({extended: true}))

router
	.post("/new-user", (request, response) => {
		if (!request.body.username) {
			return response.json(invalidResponse)
		}

		const user = repo.addUser(request.body.username)

		return response.json(user)
	})
	.post("/add", (request, response) => {
		if (!request.body.userId ||
			!request.body.description ||
			!request.body.duration) {
			return response.json(invalidResponse)
		}

		let id = parseInt(request.body.userId)

		let user
		try {
			user = repo.addExercise(id, request.body.description, request.body.duration, request.body.date)
		} catch (e) {
			console.log(e)
			return response.json(invalidResponse)
		}

		if (user == null) {
			return response.json(invalidResponse)
		}

		return response.json(user)
	})
	.get("/users", (request, response) => {
		return response.json(repo.getAllUsers())
	})
	.get("/log", (request, response) => {
		if(!request.query.userId) {
			return response.json(invalidResponse)
		}

		const id = parseInt(request.query.userId)
		const options = {}
		if (request.query.from) {
			options.from = request.query.from
		}
		if (request.query.to) {
			options.to = request.query.to
		}
		if (request.query.limit) {
			const limit = parseInt(request.query.limit)
			if (typeof limit !== "number") {
				console.log("Limit was not a number!")
				return response.json(invalidResponse)
			}
			options.limit = limit
		}

		let user
		try {
			user = repo.getExerciseLog(id, options)
		} catch(e) {
			console.log(e)
			user = null
		}

		if (!user) {
			console.log("User was null")
			return response.json(invalidResponse)
		}

		return response.json(user)
	})

app.use(router)

app.listen(port, () => console.log(`Exercise tracker microservice started on port ${port}`))