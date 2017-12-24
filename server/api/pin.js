const router = require('express').Router();
const Pin = require('../models/pin');


router.get('/:userId', (req, res, next) => { // find pin by user;
  const user = req.params.userId;
  Pin.find({ author: user })
    .then(pinsForUser => res.json(pinsForUser))
    .catch(next);
});

router.get('/', (req, res, next) => { // finds all pins for homepage
  Pin.find()
    .then(pinsForUser => res.json(pinsForUser))
    .catch(next);
});

router.post('/', (req, res, next) => { // creates a pin for logged in user
  const newPin = new Pin({
    image: req.body.image,
    description: req.body.description,
    board: req.body.board,
    author: req.user.username,
    tags: req.body.tags,
  });

  newPin.save()
    .then(savedPin => res.json(savedPin))
    .catch(next);
});

router.post('/save', (req, res, next) => { // Saves a pin for logged in user
  const newPin = new Pin({
    image: req.body.image,
    description: req.body.description,
    board: req.body.board,
    author: req.user.username,
    tags: req.body.tags,
  });

  newPin.save()
    .then(savedPin => res.json(savedPin))
    .catch(next);
});

router.delete('/:pinId', (req, res, next) => {
  const pin = req.param.pinId;
  Pin.deleteOne({ _id: pin });
});

module.exports = router;
