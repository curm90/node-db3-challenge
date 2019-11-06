const Schemes = require('../../schemes/scheme-model');

function validateSchemeId(req, res, next) {
  Schemes.findById(req.params.id)
    .then(scheme => {
      if (!scheme) {
        res.status(404).json({ message: `Scheme does not exist.` });
      } else {
        req.scheme = scheme;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get schemes ${err.message}` });
    });
}

function validateScheme(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing scheme data' });
  } else if (!req.body.scheme_name) {
    res.status(400).json({ message: 'Please provide scheme name' });
  } else {
    next();
  }
}

module.exports = {
  validateScheme,
  validateSchemeId
};
