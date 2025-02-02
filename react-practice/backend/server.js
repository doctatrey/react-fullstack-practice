require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose'); // ^ v Initializing Dependencies
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes'); // Importing Question Model
const blogRoutes = require('./routes/blogRoutes'); // Importing Blog Model
const authRoutes = require('./routes/authRoutes'); // Importing Authentication Model

const app = express(); 
const PORT = process.env.PORT || 2000; 

//Middleware
app.use(cors()); //Connects fromtend to backend (server)
app.use(express.json()); //Allows us to recieve and send JSON

//Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> {console.log("Connected to MongoDB")})
.catch(err => {console.log("ERROR: " + err)})

app.use('/questions', quizRoutes)
app.use('/blog', blogRoutes)
app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
