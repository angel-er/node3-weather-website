const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/9d12570fe2864497183a05b9c700a4dd/' +
    latitude +
    ',' +
    longitude;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        latitude: body.daily.data[0].summary,
        longitude: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
