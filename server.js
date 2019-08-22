const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const handleRegister = require('./controllers/register');
const handleSignin = require('./controllers/signin');
const handleProfileGet = require('./controllers/profile');
const handleImagePut = require('./controllers/image');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'macbook',
    password: '',
    database: 'smart-brain'
  }
});

app.get('/', (req, res) => {
  res.json('what are you looking for?');
});

app.post('/signin', (req, res) => handleSignin(db, bcrypt, req, res));

app.post('/register', (req, res) => handleRegister(db, bcrypt, req, res));

app.get('/profile/:id', (req, res) => handleProfileGet(db, req, res));

app.put('/image', (req, res) => handleImagePut(db, req, res));

app.listen(3000, () => {
  console.log('app is running on port 3000');
});