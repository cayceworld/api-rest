const express = require('express');
var cors = require('cors')
const app = express();
const path = require('path');


const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/NewWaveFest-v3/build')));


app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/NewWaveFest-v3/build/index.html'));
});

  app.use(cors({
  "origin": "http://localhost:3000", //origin sets domains that we approve
  "methods": "GET,POST,PUT,DELETE", 
}));  


app.use((req, res) => {
  res.send({ message: 'Not found...' })
})



app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});