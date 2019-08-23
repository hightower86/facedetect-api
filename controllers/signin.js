const handleSignin = (db, bcrypt) => (req, res) => {

  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(400).json('incorrect submission!');
  }
  db.select('email', 'hash').from('login').where('email', '=', email)
    .then(data => {
      isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(data => {
            res.json(data[0]);
          })
          .catch(err => status(400).json(`user with email ${email} is not exist`));
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch(err => res.status(400).json('wrong credentials'));
};

module.exports = handleSignin;