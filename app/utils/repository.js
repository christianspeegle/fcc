const {isValidDate, getDate} = require("./dates")

let repo = []

/**
 * Creates a new user in the repository and returns it
 *
 * @param {string} username The new user's username
 * @returns {{log: [], _id: number, username: string}}
 */
function addUser(username) {
	const newUser = {
		_id: repo.length + 1,
		username,
		log: []
	}

	repo.push(newUser)

	return newUser
}

/**
 * Returns a user with the given id, or null if no user has the given id
 *
 * @param {number} id The id of the desired user
 * @returns {null|{log: [], _id: number, username: string}}
 */
function getUser(id) {
	if (typeof id !== "number") {
		throw new Error("id must be a number")
	}

	if (id < 1) {
		throw new Error("id must be greater than zero")
	}

	--id
	if (id >= repo.length) {
		return null
	}

	return repo[id]
}

/**
 * Returns all users with their _id properties
 *
 * @returns {[{_id: number, username: string}]}
 */
function getAllUsers() {
	return repo.map(u => {
		return {
			_id: u._id,
			username: u.username
		}
	})
}

/**
 * Adds an exercise to the user with the given id
 *
 * @param {number} id The id of the user to add the exercise to
 * @param {string} description The description of the exercise
 * @param {string} duration The duration of the exercise
 * @param {int|string|Date} date The date the exercise was performed. Defaults to today
 * @returns {null|{log: [], _id: number, username: string}}
 */
function addExercise(id, description, duration, date = new Date()) {
	const user = getUser(id)
	if (user === null) {
		return null
	}

	if (!isValidDate(date)) {
		throw new Error("Invalid date supplied")
	}

	date = getDate(date)

	user.log.push({
		description,
		duration,
		date
	})

	return user
}

function getExerciseLog(id, options = {}) {
	let user
	try {
		user = getUser(id)
	} catch(e) {
		console.log(e)
		user = null
	}

	if (!user) {
		return null
	}

	const userCopy = Object.assign({}, user)

	if (options.hasOwnProperty("from")) {
		options.from = getDate(options.from)
		if (!isValidDate(options.from)) {
			throw new Error("Date must be a valid date string, timestamp, or Date object")
		}

		userCopy.log = userCopy.log.filter(exercise => exercise.date.getTime() >= options.from.getTime())
	}

	if (options.hasOwnProperty("to")) {
		options.to = getDate(options.to)
		if (!isValidDate(options.to)) {
			throw new Error("Date must be a valid date string, timestamp, or Date object")
		}

		userCopy.log = userCopy.log.filter(exercise => exercise.date.getTime() <= options.to.getTime())
	}

	userCopy.log.sort((a, b) => {
		if (a.date.getTime() < b.date.getTime()) {
			return -1
		}
		if (a.date.getTime() > b.date.getTime()) {
			return 1
		}
		return 0
	})

	if (options.hasOwnProperty("limit")) {
		if (typeof options.limit !== "number") {
			throw new Error("limit option must be a number")
		}

		if (userCopy.log.length > options.limit) {
			userCopy.log.splice(options.limit)
		}
	}

	userCopy.count = userCopy.log.length

	return userCopy
}

function clean() {
	repo = []
}

module.exports = {
	addUser,
	getUser,
	getAllUsers,
	addExercise,
	getExerciseLog,
	clean
}