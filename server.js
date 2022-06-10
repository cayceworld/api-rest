const express = require('express');
const app = express();


const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');


//app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);



app.use((req, res) => {
  res.send({ message: 'Not found...' })
})

app.listen(7000, () => {
  console.log('Server is running on port: 7000');
});