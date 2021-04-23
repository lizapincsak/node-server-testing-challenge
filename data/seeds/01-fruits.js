
exports.seed = function(knex) {
  return knex('fruits').del()
    .then(function () {
      return knex('fruits').insert([
        {name: 'banana'},
        {name: 'apple'},
        {name: 'papaya'}
      ]);
    });
};
