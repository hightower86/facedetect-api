const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const dataBase = {
  users: [
    {
      id: "123",
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    },
    {
      id: "125",
      name: 'bob',
      email: 'bob@gmail.com',
      password: 'cherry',
      entries: 0,
      joined: new Date()
    },
  ]
};

app.get('/', (req, res) => {
  res.send(dataBase.users);
});

app.post('/signin', (req, res) => {
  if (req.body.email === dataBase.users[0].email &&
      req.body.password === dataBase.users[0].password) {
        res.json('success');
      } else {
        res.status(400).json('error logging in');
      }
});

app.post('/register', (req, res) => {
  const { id, name, email, password, entries } = req.body;
  dataBase.users.push(
    {
      id: id,
      name: name, 
      email: email, 
      password: password, 
      entries: entries,
      joined: new Date()});
  res.json(dataBase.users[dataBase.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const user = dataBase.users.find( user => user.id === id );
  if (user === undefined) {
    res.status(400).json('user not found');
  }
  res.json(user); 
  
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});