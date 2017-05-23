var mongoose = require('mongoose');
let databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost/almanac';

mongoose.connect(databaseUrl);

var weatherSchema = mongoose.Schema({
  city: String,
  state: String,
  temperature: Number,
  summary: String,
  date: Date
});

var Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;