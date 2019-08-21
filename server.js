const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

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

console.log(db.select('*').from('users'));

const dataBase = {
  users: [{
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
  console.log(req.body.email, req.body.password);
  isValidPass = bcrypt.compare(req.body.password, dataBase.users[0].pass, function (err, res) {
    if (err) {
      return err;
    }
    return res;
  });

  if (req.body.email === dataBase.users[0].email &&
    req.body.password === dataBase.users[0].password
    //isValidPass
  ) {
    res.json(dataBase.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const {
    id = 127, name, email, password
  } = req.body;

  const storeUserPassword = (password, salt) =>
    bcrypt.hash(password, salt).then(storeHashInDatabase);

  const storeHashInDatabase = (hash) => {
    // Store the hash in your password DB
    return hash; // For now we are returning the hash for testing at the bottom
  };

  dataBase.users.push({
    id: id,
    name: name,
    email: email,
    password: storeUserPassword(password, 10),
    entries: 0,
    joined: new Date()
  });
  res.json(dataBase.users[dataBase.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  console.log(req.params);
  const {
    id
  } = req.params;
  const user = dataBase.users.find(user => user.id === id);
  if (user === undefined) {
    res.status(400).json('user not found');
  }
  res.json(user);

});

app.put('/image', (req, res) => {
  const {
    id
  } = req.body;
  const user = dataBase.users.find(user => user.id === id);

  if (user === undefined) {
    res.status(400).json('user not found');
  }
  user.entries++;
  res.json(user.entries);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});