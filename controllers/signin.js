const handleSignin = (db, bcrypt, req, res) => {
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
};

module.exports = handleSignin;