const express = require('express');
const router = express.Router();

const knex = require('../db/knex');
const validations = require('./validations');

router.get('/', (req, res, next) => {
  knex('emojis')
  .then((emojis) => {
    const renderObject = {};
    renderObject.emojis = emojis;
    res.render('emojis', renderObject);
  })
  .catch((error) => {
    return next(error);
  });
});

router.get('/new', (req, res, next) => {
  res.render('new');
});

router.post('/new', validations.verify, (req, res, next) => {
  const emoji = req.body.emoji;
  const emotion = req.body.emotion;

  knex('emojis').insert({
    emoji: emoji,
    emotion: emotion
  })
  .then((emoji) => {
    res.redirect('/emojis');
  })
  .catch((error) => {
    return next(error);
  });
});

module.exports = router;
