const {describe, it, expect} = require("@jest/globals")
const {hasProtocol, stripProtocol} = require("./urls")

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

describe("stripProtocol", () => {

	const noProtocol = "www.facebook.com"
	const httpProtocol = "http://www.facebook.com"
	const httpsProtocol = "https://www.facebook.com"
	const withUri = "https://www.facebook.com/profile"
	const noProtocolWithUri = "www.facebook.com/profile"
	const notAUrl = 42

	it("should return subdomain.domain.tld when provided http://somedomain", () => {
		expect(stripProtocol(httpProtocol))
			.toBe("www.facebook.com")
	})

	it("should return subdomain.domain.tld when provided https://somedomain", () => {
		expect(stripProtocol(httpsProtocol))
			.toBe("www.facebook.com")
	})

	it("should return subdomain.domain.tld when provided https://somedomain/someuri", () => {
		expect(stripProtocol(withUri))
			.toBe("www.facebook.com")
	})

	it("should return null when provided subdomain.domain.tld with no protocol", () => {
		expect(stripProtocol(noProtocol))
			.toBe(null)
	})

	it("should return null when provided somedomain/someuri with no protocol", () => {
		expect(stripProtocol(noProtocolWithUri))
			.toBe(null)
	})

	it("should throw an error if url is not a string", () => {
		expect(() => stripProtocol(notAUrl))
			.toThrow("parameter 'url' must be a non-empty string")
	})

})