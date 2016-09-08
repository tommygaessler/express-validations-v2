const express = require('express');
const router = express.Router();

const knex = require('../db/knex');
// const validations = require('./validations');

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

module.exports = router;
