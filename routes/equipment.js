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


const createNewEquipment = async (req, res) => {
  const { _id } = req.body;
  const newEquipment = new Equipment({
    _id,
  });

  const qrCode = await (uploadToImgur(generateQrCode(newEquipment._id)));
  newEquipment.qrCode = qrCode;

  newEquipment.save((err, product) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(product);
  });
};

const updateEquipment = async (req, res) => {
  const { _id, dateOfLastService } = req.body;
  const updated = {};

  if (dateOfLastService) { updated.dateOfLastService = dateOfLastService; }

  Equipment.findOneAndUpdate({ _id }, updated, { new: true }, (err, doc) => {
    if (err) return res.status(500).json(err);

    if (!doc) return res.status(404).json({ message: `Equipment with ID: ${req.body.ID} was not found` });

    return res.status(200).json(doc);
  });
};

/**
 * Creates an equipment object
 * @param {Equipment} req.body JSON representing the Equipment
 * @return 200 with the new object
 * @throws 500 if the insert fails
 */
router.post('/new', createNewEquipment);
router.put('/new', createNewEquipment);


/**
 * Creates an equipment object
 * @param {string} ID  representing the Equipment ID
 * @return 200 with the object
 * @throws 404 if object not found
 * @throws 500 if the find fails
 */
router.get('/:id', (req, res) => {
  Equipment.findOne({ _id: req.params.id }, (err, doc) => {
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
router.post('/update', updateEquipment);
router.put('/update', updateEquipment);


const deleteEquipment = async (req, res) => {
  const _id = Number(req.body.id);
  Equipment.deleteOne({ _id }, (err) => {
    if (err) res.status(500).json(err);
  });
  res.status(200).json({ msg: `deleted ${req.body.id}` });
};


/**
 * Deletes an equipment object
 * @param {Equipment} req.body JSON representing the updated Equipment
 * @return 200 with the updated object
 */
router.post('/delete', deleteEquipment);
router.put('/delete', deleteEquipment);


module.exports = router;
