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

app.post('/signin', handleSignin(db, bcrypt));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => handleProfileGet(req, res, db));

app.put('/image', (req, res) => handleImagePut(req, res, db));

app.listen(3000, () => {
  console.log('app is running on port 3000');
});