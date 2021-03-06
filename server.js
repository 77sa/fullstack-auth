require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

connectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT']
}))
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log('Server started'))

process.on('unhandledRejection', (error, promise) => {
    console.log(`Error: ${error}`)
    server.close(() => process.exit(1))
})