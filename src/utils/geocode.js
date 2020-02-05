const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    '.json?access_token=pk.eyJ1IjoiYW5nZWxlbmNpbmEiLCJhIjoiY2s2OGIxdnVwMDM1bzNncWp2NXNveXFpYyJ9.vkvNPFSExLaL773Pb9vXlA&limit=1';

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location, Try another search.', undefined);
    } else {
      // const latitude = response.body.features[0].center[0];
      // const longitude = response.body.features[0].center[1];

      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
