const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const handleRegister = require('./controllers/register');
const handleSignin = require('./controllers/signin');
const handleProfileGet = require('./controllers/profile');
const {
  handleImagePut,
  handleApiCall
} = require('./controllers/image');

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
  res.send('it is working!');
});

app.post('/signin', handleSignin(db, bcrypt));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => handleProfileGet(req, res, db));

app.put('/image', (req, res) => handleImagePut(req, res, db));
app.post('/imageurl', (req, res) => handleApiCall(req, res));

app.listen(3000, () => {
  console.log('app is running on port 3000');
});