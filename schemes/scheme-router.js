const express = require('express');
const Schemes = require('./scheme-model.js');

const { validateScheme, validateSchemeId } = require('../data/middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const schemes = await Schemes.find();
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: `Failed to get schemes ${error.message}` });
  }
});

router.get('/:id', validateSchemeId, async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await Schemes.findById(id);
    res.status(200).json(scheme);
  } catch (error) {
    res.status(500).json({ message: `Failed to get schemes ${error.message}` });
  }
});

router.get('/:id/steps', validateSchemeId, async (req, res) => {
  try {
    const { id } = req.params;
    const steps = await Schemes.findSteps(id);

    if (steps.length) {
      res.status(200).json(steps);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find steps for given scheme' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get steps ' + error.message });
  }
});

router.post('/', validateScheme, async (req, res) => {
  try {
    const { scheme_name } = req.body;
    const newScheme = await Schemes.add({ scheme_name });
    res.status(201).json(newScheme);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create new scheme' });
  }
});

router.post('/:id/steps', async (req, res) => {
  try {
    const stepData = req.body;
    const { id } = req.params;

    const scheme = await Schemes.findById(id);
    if (scheme) {
      const newStep = await Schemes.addStep(stepData, id);
      res.status(201).json(newStep);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create new step ' + error.message });
  }
});

router.put('/:id', [validateSchemeId, validateScheme], async (req, res) => {
  try {
    const { id } = req.params;
    const { scheme_name } = req.body;
    const changes = await Schemes.update(id, { scheme_name });

    res.status(200).json({ updated: changes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update scheme' });
  }
});

router.delete('/:id', validateSchemeId, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Schemes.remove(id);
    res.status(200).json({ removed: deleted });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete scheme' });
  }
});

module.exports = router;
