
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('emojis').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('emojis').insert({emoji: '😊', emotion: 'happy'}),
        knex('emojis').insert({emoji: '😭', emotion: 'sad'}),
        knex('emojis').insert({emoji: '😡', emotion: 'mad'})
      ]);
    });
};
