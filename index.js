const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

require('dotenv').config();

const app = express();

app.use(express.json());
app.set("PORT", process.env.PORT || 3001);
app.use(cors(corsOptions));

// Conexión a Base de datos
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qdfyn.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, options)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e));

// Import routes
const authRoutes = require('./routes/auth');

app.use('/api/user', authRoutes);

app.listen(app.get("PORT"), () => {
    console.log(`servidor andando en: ${app.get("PORT")}`);
});