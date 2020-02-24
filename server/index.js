const express = require('express')
const index = express()
index.use(express.static('public/static/'))
index.listen('8996', () => {
  console.log('server of cool music player is running on port 8996');
})