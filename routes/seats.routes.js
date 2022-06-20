const express = require('express');
const router = express.Router();

const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.route('/seats').get((req, res) => {
  res.send(db.seats);
  console.log('get', db.seats)
})


router.route('/seats/:id').get((req, res) => {
  res.send({ id: db.seats.filter(seat => seat.id == req.params.id) })
})

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;


  if (db.seats.some(check => (check.day == day && check.seat == seat))) {
    console.log(db.seats.some(check => check))
    return res.status(404).json({ message: "The slot is already taken..." })
  } else {
    db.seats.push({ day: day, seat: seat, client: client, email: email, id: uuidv4() });
    res.send({ message: 'ok' });
  }
  console.log('post:', db.seats);
})

router.route('/seats/:id').put((req, res) => {

  db.seats = db.seats.map(seat => (seat.id == req.params.id ? { ...seat, ...req.body } : seat))
  console.log('put:', db.seats);

  res.send({ message: 'ok' });
})

router.route('/seats/:id').delete((req, res) => {


  db.seats = db.seats.filter(seat => (seat.id != req.params.id))
  console.log('delete:', db.seats);
  res.send({ message: 'ok' });
})


module.exports = router;