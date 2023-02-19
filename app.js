const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('port') || 4000;
const MONGO_URI = config.get('mongoUri');
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
        app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
    }
    catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();


