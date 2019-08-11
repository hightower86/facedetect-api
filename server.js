const express = require('express');
const bodyParser = require('body-parser');
const bcrypt  = require('bcrypt');

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

  isValidPass = bcrypt.compare(req.body.password, dataBase.users[0].pass, function(err, res) {
    if (err) {
      return err;
    }
    return res;
  });

  if (req.body.email === dataBase.users[0].email &&
      // req.body.password === dataBase.users[0].password
      isValidPass) {
        res.json('success');
      } else {
        res.status(400).json('error logging in');
      }
});

app.post('/register', (req, res) => {
  const { id=127, name, email, password } = req.body;

  const pass = bcrypt.hash(password, saltRounds=10, function(err, hash) {
    // Store hash in your password DB.
    if (err) {
      return err;
    }
    return hash;
  });
  console.log(pass);

  dataBase.users.push(
    {
      id: id,
      name: name, 
      email: email, 
      password: pass, 
      entries: 0,
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

app.put('/image', (req, res) => {
  const { id } = req.body;
  const user = dataBase.users.find( user => user.id === id );

  if (user === undefined) {
    res.status(400).json('user not found');
  }
  user.entries++;
  res.json(user.entries);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});