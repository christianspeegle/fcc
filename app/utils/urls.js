const promisify = require("util").promisify
const dnsl = require("dns").lookup
const lookup = promisify(dnsl)

function hasProtocol(url) {
	if (!url || typeof url !== "string")
		throw new Error("parameter 'url' must be a non-empty string")

	return /^https?:\/\//.test(url)
}

function stripProtocol(url) {
	if (!url || typeof url !== "string")
		throw new Error("parameter 'url' must be a non-empty string")

	const match = url.match(/^https?:\/\/([^\/]+)\/?(.*)$/)
	if (match && match.length > 1)
		return match[1]

	return null
}

module.exports = {
	hasProtocol,
	stripProtocol,
	lookup
}