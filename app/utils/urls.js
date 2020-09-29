function hasProtocol(url) {
	if (!url || typeof url !== "string")
		throw new Error("parameter 'url' must be a non-empty string")

	return /^https?:\/\//.test(url)
}

module.exports = {
	hasProtocol
}