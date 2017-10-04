const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const app = express()

// Middleware: Use CORS package
app.use(cors())

// The invoice file
let invoicePath = path.join(__dirname, 'invoice.html')
let invoice = () => {
  return fs.readFileSync(invoicePath, "UTF-8")
}

// Middleware: Check for CSRF header, continue if set, else respond with 400
app.use('**', (req, res, next) => {
  if (req.headers['x-csrf'] === 'foo')
    next()
  else
    res.send(400, 'No CSRF header')
})

// Respond with invoice
app.get('/invoice', (req, res) => {
  res.send(invoice())
})

// Start app on port 80
app.listen(80, () => {
  console.log('App is running on port 80')
})