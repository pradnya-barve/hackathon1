require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

// Routes
// app.use('/users', userRouter)

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch((err) => {console.log(err)});

// Below MongoDB and  Above Listen Sever
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

// Listen Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})