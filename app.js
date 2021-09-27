const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.routes')
const linkRoutes = require('./routes/link.routes')
const redirectRoutes = require('./routes/redirect.routes')

const app = express()
// url, middleware
app.use(express.json({extended: true}))
app.use('/api/auth', authRoutes)
app.use('/api/link', linkRoutes)
app.use('/t', redirectRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')) )

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = config.get('port') || 5000

const start = async () => {
    try {
        await mongoose.connect(config.get('mongodbUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () =>  console.log(`Server started ${PORT}...`))
    } catch (error) {
        console.log('Server Error:', error.message)
        process.exit(1)
    }
}

start()

