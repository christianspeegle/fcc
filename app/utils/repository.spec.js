const {describe, it, expect, beforeEach, afterEach} = require("@jest/globals")
const repo = require("./repository")

const username1 = "michael69"
const username2 = "dw1ghtL0v35Dund34M1ffl1n"
const username3 = "thatswhatshesaid"

const description2 = "fitness orb"
const duration2 = "long enough to annoy Jim"
const date2 = new Date("2005-11-15")


beforeEach(() => {
	repo.addUser(username1)
	repo.addUser(username2)
	repo.addExercise(2, description2, duration2, date2)
})

afterEach(() => repo.clean())

describe("addUser", () => {

	it("should create a new user with _id == 3", () => {
		const newUser = repo.addUser(username3)
		expect(newUser)
			.toHaveProperty("_id")
		expect(newUser._id)
			.toBe(3)
	})

	it("should create a new user with exercises prop equal to an empty array", () => {
		const newUser = repo.addUser(username3)
		expect(newUser)
			.toHaveProperty("log")
		expect(newUser.log)
			.toEqual([])
	})

	it("should create a new user with username == michael69", () => {
		const newUser = repo.addUser(username3)
		expect(newUser)
			.toHaveProperty("username")
		expect(newUser.username)
			.toBe(username3)
	})

})

describe("getUser", () => {

	it("should retrieve the user with a given id", () => {
		const user = repo.getUser(2)
		expect(user._id)
			.toBe(2)
		expect(user.username)
			.toBe(username2)
	})

	it("should return null if no user with a given id exists", () => {
		const user = repo.getUser(42)
		expect(user)
			.toBe(null)
	})

	it("should throw an error if the id argument is not a number", () => {
		expect(() => repo.getUser("forty-two"))
			.toThrow("id must be a number")
	})

	it("should throw an error if the id argument is less than 1", () => {
		expect(() => repo.getUser(0))
			.toThrow("id must be greater than zero")
	})

})

describe("getAllUsers", () => {

	it("should return an array of all users", () => {
		const allUsers = repo.getAllUsers()

		expect(Array.isArray(allUsers))
			.toBe(true)
		expect(allUsers)
			.toHaveLength(2)
	})

	it("should return the _id property for all users", () => {
		const allUsers = repo.getAllUsers()

		expect(allUsers[0])
			.toHaveProperty("_id")
		expect(allUsers[0]._id)
			.toBe(1)
		expect(allUsers[1])
			.toHaveProperty("_id")
		expect(allUsers[1]._id)
			.toBe(2)
	})

	it("should return the username property", () => {
		const allUsers = repo.getAllUsers()

		expect(allUsers[0])
			.toHaveProperty("username")
		expect(allUsers[0].username)
			.toBe(username1)
	})

	it("should not return the log property", () => {
		const allUsers = repo.getAllUsers()

		expect(allUsers[0])
			.not
			.toHaveProperty("log")
	})

})

describe("addExercise", () => {

	const userId = 1
	const description = "5lb dumbbell"
	const duration = "5 reps"
	const date = new Date("2011-09-27")

	it("should return the user object with _id, username, description, duration, and date properties", () => {
		const user = repo.addExercise(userId, description, duration, date)

		expect(user)
			.toHaveProperty("_id")
		expect(user._id)
			.toBe(userId)

		expect(user)
			.toHaveProperty("username")
		expect(user.username)
			.toBe(username1)

		expect(user)
			.toHaveProperty("description")
		expect(user.description)
			.toBe(description)

		expect(user)
			.toHaveProperty("duration")
		expect(user.duration)
			.toBe(duration)

		expect(user)
			.toHaveProperty("date")
		expect(user.date)
			.toBe(date.toDateString())
	})

	it("should return null if the supplied user id doesn't exist in the repository", () => {
		const user = repo.addExercise(42, description, duration, date)
		expect(user)
			.toBe(null)
	})

	it("should use the current date as a default if no date is supplied", () => {
		const user = repo.addExercise(userId, description, duration)
		const now = new Date()

		expect(user.date)
			.toBe(now.toDateString())
	})

	it("should throw an error if the date is invalid", () => {
		expect(() => repo.addExercise(userId, description, duration, "that's what she said"))
			.toThrow("Invalid date supplied")
	})

})

describe("getExerciseLog", () => {

	const d1 = new Date("2020-10-23")
	const d2 = new Date("2020-10-24")
	const d3 = new Date("2020-10-25")
	const d4 = new Date("2020-10-26")
	const d5 = new Date("2020-10-27")

	it("should return the user object with added count prop", () => {
		const user = repo.getExerciseLog(2)

		expect(user)
			.toHaveProperty("_id")
		expect(user._id)
			.toBe(2)

		expect(user)
			.toHaveProperty("username")
		expect(user.username)
			.toBe(username2)

		expect(user)
			.toHaveProperty("count")
		expect(user.count)
			.toBe(1)

		expect(user)
			.toHaveProperty("log")
		expect(Array.isArray(user.log))
			.toBe(true)
		expect(user.log)
			.toHaveLength(1)
	})

	it("should return only exercises within a specific date range when from and to are passed in the options object", () => {
		repo.addExercise(1, description2, duration2, d1)
		repo.addExercise(1, description2, duration2, d2)
		repo.addExercise(1, description2, duration2, d3)
		repo.addExercise(1, description2, duration2, d4)
		repo.addExercise(1, description2, duration2, d5)


		const user = repo.getExerciseLog(1, {
			from: d2,
			to: d4
		})

		expect(user.count)
			.toBe(3)

		const log = user.log

		expect(log)
			.toHaveLength(3)
		expect(log[0].date)
			.toBe(d2.toDateString())
		expect(log[1].date)
			.toBe(d3.toDateString())
		expect(log[2].date)
			.toBe(d4.toDateString())

	})

	it("should properly order the dates of the exercises in ascending order", () => {
		repo.addExercise(1, description2, "long enough to break up the monotony", d5)
		repo.addExercise(1, description2, duration2, d4)
		repo.addExercise(1, description2, duration2, d1)
		repo.addExercise(1, description2, duration2, d3)
		repo.addExercise(1, description2, duration2, d2)


		const user = repo.getExerciseLog(1)

		expect(user.log[0].date)
			.toBe(d1.toDateString())
		expect(user.log[1].date)
			.toBe(d2.toDateString())
		expect(user.log[2].date)
			.toBe(d3.toDateString())
		expect(user.log[3].date)
			.toBe(d4.toDateString())
		expect(user.log[4].date)
			.toBe(d5.toDateString())
	})

	it("should return only the first n exercises if limit option is passed", () => {
		repo.addExercise(1, description2, duration2, d1)
		repo.addExercise(1, description2, duration2, d2)
		repo.addExercise(1, description2, duration2, d3)

		const user = repo.getExerciseLog(1, {
			limit: 2
		})

		expect(user.count)
			.toBe(2)

		expect(user.log)
			.toHaveLength(2)

		expect(user.log[0].date)
			.toBe(d1.toDateString())

		expect(user.log[1].date)
			.toBe(d2.toDateString())
	})

	it("should throw an error if the from option is not a valid date", () => {
		expect(() => repo.getExerciseLog(1, {from: "that's what she said"}))
			.toThrow("Date must be a valid date string, timestamp, or Date object")
	})

	it("should throw an error if the to option is not a valid date", () => {
		expect(() => repo.getExerciseLog(1, {to: "that's also what she said"}))
			.toThrow("Date must be a valid date string, timestamp, or Date object")
	})

	it("should throw an error if the limit option is not a valid number", () => {
		expect(() => repo.getExerciseLog(1, {limit: "*whispers* that's what she said"}))
			.toThrow("limit option must be a number")
	})

})