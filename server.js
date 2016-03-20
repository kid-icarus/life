import express from 'express'

let app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/public/css/style.css', (req, res) => {
  res.sendFile(__dirname + '/public/css/style.css')
})
app.get('/public/dist/bundle.js', (req, res) => {
  res.sendFile(__dirname + '/public/dist/bundle.js')
})

app.listen(2000)
