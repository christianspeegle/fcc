const {describe, it, expect} = require("@jest/globals")
const {hasProtocol} = require("./urls")

describe("hasProtocol", () => {

	const urlWithHttp = "http://www.facebook.com"
	const urlWithHttps = "https://www.facebook.com"
	const urlWithHttpNotStart = "www.http://www.facebook.com"
	const urlWithHttpsNotStart = "facebook.www.https://com"
	const urlWithoutHttp = "www.facebook.com"
	const notAUrl = 42

	it("should return true if a string starts with 'http://'", () => {
		expect(hasProtocol(urlWithHttp))
			.toBe(true)
	})

	it("should return true if a string starts with 'https://'", () => {
		expect(hasProtocol(urlWithHttps))
			.toBe(true)
	})

	it("should return false if a string contains 'http://' but not at the start", () => {
		expect(hasProtocol(urlWithHttpNotStart))
			.toBe(false)
	})

	it("should return false if a string contains 'https://' but not at the start", () => {
		expect(hasProtocol(urlWithHttpsNotStart))
			.toBe(false)
	})

	it("should return false if a string doesn't contain 'http(s)://'", () => {
		expect(hasProtocol(urlWithoutHttp))
			.toBe(false)
	})

	it("should throw an error if the argument passed is not a string", () => {
		expect(() => hasProtocol(notAUrl))
			.toThrow("parameter 'url' must be a non-empty string")
	})

})