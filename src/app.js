const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlers engine and views location
// Le decimos express que motor de plantilla vamos a utilizar
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
// pasamos la ruta index para responder al cliente
app.use(express.static(publicDirectoryPath));
// app.get('/', (req, res) => {
//   res.send();
// });

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Angel Encina'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Angel Encina'
  });
});

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    helpText: 'This is some helpFul text.',
    title: 'Help',
    name: 'Angel Encina'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address'
    });
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }

      res.send({
        forecast: forecastData.latitude,
        location,
        address: req.query.address
      });
    });
  });

  // res.send({
  //   forecast: 'It is snow',
  //   location: 'Argentina',
  //   address: req.query.address
  // });
});

app.get('/products', (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term'
    });
  }

  res.send({
    products: []
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'ANgel Encina',
    errorMessage: 'Page not found'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
