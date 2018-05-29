const express = require('express')

const app = express()

app.get('/', (req, res) => {
	res.send({ hi: 'I love Joy Anne Lyn May Carbonilla'})
})

const port = process.env.PORT || 5000

app.listen(port)
