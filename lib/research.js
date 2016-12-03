var Model = require('./model.js')
var request = require('request');
var cheerio = require('cheerio');

var url = "https://thatsthem.com/advanced-results?d_first=fred&d_mid=&d_last=leeds&d_email=&d_phone=&d_fulladdr=&d_state=&d_city=&d_zip=";

request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body)

    var title = $('title').text();
    var content = $('body').text();
    // var freeArticles = $('.central-featured-lang.lang1 a small').text()

    console.log('URL: ' + url);
    console.log('Title: ' + title);
    console.log('EN articles: ' + freeArticles);
  }
  else {
    console.log("We’ve encountered an error: " + error);
  }
});

model = new Model(listing);

model.save(function(err) {
    if (err) {
        console.log('Database err saving: ' + url);
    }
});
