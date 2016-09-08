const knex = require('../db/knex');

function verifyNew(req, res, next) {
  // container for all errors

  const errors = [];

  // grab values from req.body (form)
  const emoji = req.body.emoji;
  const emotion = req.body.emotion;

  isUnique('emoji', emoji, function(error, response) {
    if (error) {
      return next(error);
    }
    if (response) {
      errors.push('Emoji already taken 😢');
    }

    // is emoji blank
    if (emoji === '') {
      errors.push('Emoji cannot be blank 😑');
    }

    // is emotion blank
    if (emotion === '') {
      errors.push('Emotion cannot be blank 😑');
    }

    // send back errors if applicable
    if (errors.length) {
      // re-render page if there are errors
      const renderObject = {};
      renderObject.errors = errors;
      return res.render('new', renderObject);
    } else {
      // send to next middleware
      return next();
    }
  });
}

function verifyEdit(req, res, next) {
  // container for all errors

  const errors = [];

  // grab values from req.body (form)
  const emoji = req.body.emoji;
  const emotion = req.body.emotion;

  // is emoji blank
  if (emoji === '') {
    errors.push('Emoji cannot be blank 😑');
  }

  // is emotion blank
  if (emotion === '') {
    errors.push('Emotion cannot be blank 😑');
  }

  // send back errors if applicable
  if (errors.length) {
    // re-render page if there are errors
    const renderObject = {};

    renderObject.errors = errors;
    console.log('hey', renderObject.errors);
    return res.render('emojis', renderObject);
  } else {
    // send to next middleware
    return next();
  }
}

// helper function

function isUnique(column, value, callback) {
  knex('emojis').select().where(column, value)
  .then((value) => {
    if (value.length) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  })
  .catch((error) => {
    callback(error);
  });
}

module.exports = {
  verifyNew,
  verifyEdit
};
