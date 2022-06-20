const express = require('express');
const router = express.Router();

const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.route('/testimonials').get((req, res) => {
  res.send(db.testimonials);
})

router.route('/testimonials/random').get((req, res) => {
  res.send({ random: db.testimonials[Math.floor(Math.random() * db.testimonials.length)] })
  console.log({ random: db.testimonials[Math.floor(Math.random() * db.testimonials.length)] });
})

router.route('/testimonials/:id').get((req, res) => {
  res.send({ id: db.testimonials.filter(testimonial => testimonial.id == req.params.id) })
})

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  db.testimonials.push({ author: author, text: text, id: uuidv4() });
  console.log(db.testimonials);
  res.send({ message: 'ok' });
})

router.route('/testimonials/:id').put((req, res) => {

  db.testimonials = db.testimonials.map(testimonial => (testimonial.id == req.params.id ? { ...testimonial, ...req.body } : testimonial))
  console.log(db.testimonials);
  res.send({ message: 'ok' });
})

router.route('/testimonials/:id').delete((req, res) => {

  db.testimonials = db.testimonials.filter(testimonial => (testimonial.id != req.params.id))
  console.log(db.testimonials);
  res.json({ message: 'ok' });
})


module.exports = router;