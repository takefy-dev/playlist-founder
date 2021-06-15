require('dotenv').config()
const cors = require('cors')
const Manager = require('./Managers/Manager');
const playlistFounder = new Manager();

const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    credentials: true
}))
app.use('/api', routes);
app.set('manager', playlistFounder)
app.listen('3000', () => console.log('Server listeing on port 3000'))
