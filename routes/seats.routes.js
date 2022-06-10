const express = require('express');
const router = express.Router();

const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.route('/seats').get((req, res) => {
  res.send(db.seats);
})


router.route('/seats/:id').get((req, res) => {
  res.send({ id: db.seats.filter(seat => seat.id == req.params.id) })
})

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  res.send({ message: 'ok' });
  db.seats.push({ day: day, seat: seat, client: client, email: email, id: uuidv4() });
  console.log(db.seats);
})

router.route('/seats/:id').put((req, res) => {

  res.send({ message: 'ok' });
  db.seats.map(seat => (seat.id == req.params.id ? { ...seat, ...req.body } : seat))
  console.log(db.seats);
})

router.route('/seats/:id').delete((req, res) => {

  res.json({ message: 'ok' });
  db.seats.filter(seat => (seat.id !== req.params.id))
  console.log(db.seats);
})


module.exports = router;