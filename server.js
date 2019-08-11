const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const dataBase = {
  users: [
    {
      id: 123,
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: 124,
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    },
    {
      id: 125,
      name: 'bob',
      email: 'bob@gmail.com',
      password: 'cherry',
      entries: 0,
      joined: new Date()
    },
  ]
};

app.get('/', (req, res) => {
  res.send('this is working');
});

app.post('/signin', (req, res) => {
  if (req.body.email === dataBase.users[0].email &&
      req.body.password === dataBase.users[0].password) {
        res.json('success');
      } else {
        res.status(400).json('error logging in');
      }
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});