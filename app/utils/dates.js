function isValidDate(date) {
	if (!date && date !== 0) {
		return false
	}

	if (!(date instanceof Date)) {
		date = new Date(date)
	}

	return !isNaN(date.getUTCMilliseconds())
}

function getDate(date) {
	if (!isValidDate(date)) {
		return null
	}

	return new Date(date)
}

module.exports = {
	isValidDate,
	getDate
}