const express = require('express');
const router = express.Router();

const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.route('/concerts').get((req, res) => {
  res.send(db.concerts);
})


router.route('/concerts/:id').get((req, res) => {
  res.send({ id: db.concerts.filter(concert => concert.id == req.params.id) })
})

router.route('/concerts').post((req, res) => {
  const { prformer, ganre, price, day, image } = req.body;


  db.concerts.push({ prformer: prformer, ganre: ganre, price: price, day: day, image: image, id: uuidv4() });
  console.log(db.concerts);
  res.send({ message: 'ok' });
})

router.route('/concerts/:id').put((req, res) => {


  db.concerts = db.concerts.map(concert => (concert.id == req.params.id ? { ...concert, ...req.body } : concert))
  console.log(db.concerts);
  res.send({ message: 'ok' });
})

router.route('/concerts/:id').delete((req, res) => {


  db.concerts = db.concerts.filter(concert => (concert.id != req.params.id))
  console.log(db.concerts);
  res.send({ message: 'ok' });
})


module.exports = router;