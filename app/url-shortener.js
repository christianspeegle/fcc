const express = require("express")
const cors = require("cors")
const bp = require("body-parser")
const {hasProtocol, stripProtocol, lookup} = require("./utils/urls")

const app = new express()
const router = express.Router()
const port = 6003
const urls = []

app.use(cors({optionsSuccessStatus: 200}))
app.use(bp.urlencoded({extended: true}))

router.post("/new", async (request, response) => {
	const url = request.body.url
	console.log(`Testing ${url} for truthiness and protocol match`)

	if (!url || typeof url !== "string" || !hasProtocol(url)) {
		return response.json({error: "Invalid URL"})
	}

	console.log(`Testing ${url} for DNS matches`)

	const domain = stripProtocol(url)
	let exists
	try {
		exists = await lookup(domain)
	} catch (e) {
		console.log(`Error with DNS lookup: ${e}`)
		exists = false
	}

	if (!exists) {
		return response.json({error: "Invalid URL"})
	}

	console.log(`${url} passes, generating shortened URL`)
	urls.push(request.body.url)
	return response.json({
		"original_url": request.body.url,
		"short_url": urls.length - 1
	})
})
      .get("/:shortUrl", (request, response) => {
	      let url = false
	      try {
		      url = parseInt(request.params["shortUrl"], 10)
	      } catch (e) {
	      }

	      if (url === false || urls.length <= url) {
		      return response.json({error: "Invalid URL"})
	      }

	      const location = urls[url]
	      console.log(location)

	      response.redirect(301, location)
      })

app.use(router)

app.listen(port, () => console.log(`URL Shortener microservice started on port ${port}`))