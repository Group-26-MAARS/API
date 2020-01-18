const express = require('express');
const Equipment = require('../models/equipment');
const { uploadToImgur, generateQrCode } = require('../middleware/qrCode');

const router = express.Router();

router.get('/', (req, res) => {
  Equipment.find({}, (err, equipment) => {
    if (err) {
      return res.status(404).json(err);
    }

    return res.status(200).json(equipment);
  });
});

router.post('/new', async (req, res) => {
  const { ID, dateOfLastService } = req.body;

  const qrCode = await (uploadToImgur(generateQrCode(req.body.ID)));

  const newEquipment = new Equipment({
    ID,
    dateOfLastService,
    qrCode,
  });

  newEquipment.save((err, product) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(product);
  });
});

router.get('/:id', (req, res) => {
  Equipment.findOne({ ID: req.params.ID }, (err, doc) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!doc) return res.status(404).json({ message: 'No results found.' });

    return res.status(200).json(doc);
  });
});

router.post('/update', (req, res) => {
  const { ID, dateOfLastService } = req.body;
  const updated = {};

  if (dateOfLastService) { updated.dateOfLastService = dateOfLastService; }

  Equipment.findOneAndUpdate({ ID }, updated, { new: true }, (err, doc) => {
    if (err) return res.status(500).json(err);

    if (!doc) return res.status(404).json({ message: `Equipment with ID: ${req.body.ID} was not found` });

    return res.status(200).json(doc);
  });
});

module.exports = router;
