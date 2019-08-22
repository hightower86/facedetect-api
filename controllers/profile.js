const handleProfileGet = (db, req, res) => {

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
};

module.exports = handleProfileGet;