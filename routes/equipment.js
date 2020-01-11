const express = require('express');

const router = express.Router();
const Equipment = require('../models/equipment');

router.get('/', (req, res) => {
  Equipment.find({}, (err, equipment) => {
    if (err) {
      return res.status(404).json(err);
    }

    return res.status(200).json(equipment);
  });
});

router.post('/new', (req, res) => {
  const { ID, dateOfLastService } = req.body;
  const newEquipment = new Equipment({
    ID,
    dateOfLastService,
  });

  newEquipment.save((err, product) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(product);
  });
});

router.get('/:id', (req, res) => {
  Equipment.find({ ID: req.params.ID }, (err, doc) => {
    if (err) {
      return res.status(404).json(err);
    }

    return res.status(200).json(doc);
  });
});

module.exports = router;
