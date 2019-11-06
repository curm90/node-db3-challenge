const db = require('../data/db.config');

module.exports = {
  find: () => db('schemes'),

  findById: id =>
    db('schemes')
      .where({ id })
      .first(),

  findSteps: id =>
    db('steps as s')
      .join('schemes as sch', 'sch.id', 's.scheme_id')
      .select('sch.scheme_name', 's.step_number', 's.instructions')
      .where({ 'sch.id': id })
      .orderBy('s.step_number', 'asc'),

  add: scheme => db('schemes').insert(scheme),

  update: (id, changes) =>
    db('schemes')
      .where({ id })
      .update(changes),

  remove: id =>
    db('schemes')
      .where('id', id)
      .del()
};
