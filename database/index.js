var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/almanac');
mongoose.connect('mongodb://jescobedo:jescobedo@ds145667.mlab.com:45667/jeeweather');

var weatherSchema = mongoose.Schema({
  city: String,
  state: String,
  temperature: Number,
  summary: String,
  date: Date
});

var Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;