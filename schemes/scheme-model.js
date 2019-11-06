const db = require('../data/db.config');

module.exports = {
  find() {
    return db('schemes');
  },

  findById(id) {
    return db('schemes')
      .where({ id })
      .first();
  },

  findSteps(id) {
    return db('steps as s')
      .join('schemes as sch', 'sch.id', 's.scheme_id')
      .select('sch.scheme_name', 's.step_number', 's.instructions')
      .where({ 'sch.id': id })
      .orderBy('s.step_number', 'asc');
  },

  add(scheme) {
    return db('schemes')
      .insert(scheme)
      .then(ids => this.findById(ids[0]));
  },

  update(id, changes) {
    return db('schemes')
      .where({ id })
      .update(changes)
      .then(id => (id > 0 ? this.findById(id) : null));
  },

  remove(id) {
    return db('schemes')
      .where('id', id)
      .del();
  }
};
