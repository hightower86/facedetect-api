const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '45307d5a668549edbd9bb90f4453870f'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable work with API'))
};

const handleImagePut = (req, res, db) => {
  const {
    id
  } = req.body;

  db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('unable get entries'));
};

module.exports = {
  handleImagePut: handleImagePut,
  handleApiCall: handleApiCall
};