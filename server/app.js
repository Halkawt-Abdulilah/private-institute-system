require('dotenv').config()
require('express-async-errors')
const express = require('express')

const app = express()
const port = process.env.PORT || 5000

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//db connection
const sequelize = require('./connection/db')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors())

const authRoutes = require('./routes/authRoutes')

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/', authRoutes)

app.listen(port, () => {
    try {
        console.log(`listening at port ${port}`);
    } catch (error) {
        console.log(error);
    }
})