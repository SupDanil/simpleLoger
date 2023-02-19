const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'})

const app = express();

const MONGO_URI = process.env.MONGO_URI_LOCAL
const PORT = process.env.PORT || 4000;

mongoose.set('strictQuery', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api',require('./routes/log.routes') );

async function start() {
    try{
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();


