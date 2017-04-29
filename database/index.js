var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/almanac');

var weatherSchema = mongoose.Schema({
  city: String,
  state: String,
  temperature: Number,
  summary: String,
  date: Date
});

var Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;