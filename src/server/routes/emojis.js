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

router.put('/edit/:id', validations.verifyEdit, (req, res, next) => {
  const id = parseInt(req.params.id);
  const editedEmoji = req.body.emoji;
  const editedEmotion = req.body.emotion;
  knex('emojis')
  .update({
    emoji: editedEmoji,
    emotion: editedEmotion
  })
  .where('id', id)
  .returning('*')
  .then((emoji) => {
    if (emoji.length) {
      res.status(200).json({
        status: 'success',
        message: `${emoji[0].id} has been updated`
      });
    } else {
      res.status(404).json({
        status: 'errror',
        message: `${emoji[0].id} does not exist`
      });
    }
  })
  .catch((error) => {
    res.status(500).json({
      status: 'errror',
      message: `${id} does not exist`
    });
  });
});

router.delete('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  knex('emojis').del().where('id', id).returning('*')
  .then((emoji) => {
    if (!emoji.length) {
      res.status(500).json({
        status: 'fail',
        message: `${id} does not exist`
      });
    } else if (emoji.length) {
      res.status(200).json({
        status: 'success',
        message: `${id} is deleted`
      });
    }
  })
  .catch((error) => {
    res.status(500).json({
      status: 'error',
      message: `${id} does not exist`
    });
  });
});

module.exports = router;
