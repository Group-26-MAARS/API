/**
 * express module
 * @const
 */
const express = require('express');

/**
 * @typedef Euipment
 * @const
 */
const Equipment = require('../models/equipment');

/**
 * QR code helper functions
 * @const
 */
const { uploadToImgur, generateQrCode } = require('../middleware/qrCode');

/**
 * Express router to mount equipment related functions on.
 * @type {object}
 * @const
 * @namespace equipmentRouter
 */
const router = express.Router();

/**
 * Gets all the Equipment
 * @name GET/equipment
 * @function
 * @memberof module:routes/equipmentRouter
 * @inner
 * @return 200 with the Equipment
 * @throws 500 if the operation fails
 */
router.get('/', (req, res) => {
  Equipment.find({}, (err, equipment) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(equipment);
  });
});

/**
 * Creates an equipment object
 * @param {Equipment} req.body JSON representing the Equipment
 * @return 200 with the new object
 * @throws 500 if the insert fails
 */
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

/**
 * Creates an equipment object
 * @param {string} ID  representing the Equipment ID
 * @return 200 with the object
 * @throws 404 if object not found
 * @throws 500 if the find fails
 */
router.get('/:id', (req, res) => {
  Equipment.findOne({ ID: req.params.ID }, (err, doc) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!doc) return res.status(404).json({ message: 'No results found.' });

    return res.status(200).json(doc);
  });
});

/**
 * Updates an equipment object
 * @param {Equipment} req.body JSON representing the updated Equipment
 * @return 200 with the updated object
 * @throws 404 if the doc with `ID` is not found
 * @throws 500 if the update fails
 */
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
