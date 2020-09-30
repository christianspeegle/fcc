const {describe, it, expect} = require("@jest/globals")
const {isValidDate, getDate} = require("./dates")

describe("isValidDate", () => {

	it("should return true if the date is a valid date string", () => {
		expect(isValidDate("2020-10-23"))
			.toBe(true)
		expect(isValidDate("2020-10-24T16:00:00"))
			.toBe(true)
		expect(isValidDate("October 23, 2020 16:00:00"))
			.toBe(true)
	})

	it("should return true if the date is a valid date number", () => {
		expect(isValidDate(0))
			.toBe(true)
		expect(isValidDate(100000000))
			.toBe(true)
		expect(isValidDate(Date.now()))
			.toBe(true)
	})

	it("should return false if the date is not a valid date string", () => {
		expect(isValidDate("that's what she said"))
			.toBe(false)
	})

	it("should return false if the date is falsy", () => {
		expect(isValidDate(null))
			.toBe(false)
		expect(isValidDate(undefined))
			.toBe(false)
		expect(isValidDate(false))
			.toBe(false)
	})

})

describe("getDate", () => {

	it("should return a date if the date string is valid", () => {
		expect(getDate("2020-10-23"))
			.toBeInstanceOf(Date)
	})

	it("should return a date if the date timestamp is valid", () => {
		expect(getDate(1000000))
			.toBeInstanceOf(Date)
	})

	it("should return null if the date is not valid", () => {
		expect(getDate("that's what she said"))
			.toBe(null)
		expect(getDate(9007199254740991))
			.toBe(null)
	})

})