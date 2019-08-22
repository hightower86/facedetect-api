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
  db.select('email', 'hash').from('login').where('email', '=', req.body.email)
    .then(data => {
      isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(data => {
            res.json(data[0]);
          })
          .catch(err => status(400).json(`user with email ${req.body.email} is not exist`));
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch(err => res.status(400).json('wrong credentials'));

});

app.post('/register', (req, res) => {

  const {
    name,
    email,
    password
  } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  db.transaction(trx => {
      trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              name: name,
              email: loginEmail[0],
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('unable to register'));
});

app.get('/profile/:id', (req, res) => {

  const {
    id
  } = req.params;

  db.select('*').from('users').where({
      id: id
    })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('user not exist');
      }
    })
    .catch(err => res.status(400).json('bad request'));
});

app.put('/image', (req, res) => {
  const {
    id
  } = req.body;

  db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('unable get entries'));

});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});