// get-page.js: request webpage with caching using https://github.com/alltherooms/cached-request

var cheerio = require('cheerio');

// Set up cached-request
var request = require('request')
,   cachedRequest = require('cached-request')(request)
,   cacheDirectory = "./tmp/cache";
cachedRequest.setCacheDirectory(cacheDirectory);
cachedRequest.setValue('ttl', 10000000);

// Use cached-request
cachedRequest({url: 'https://thatsthem.com/advanced-results?d_first=fred&d_mid=&d_last=leeds&d_email=&d_phone=&d_fulladdr=&d_state=&d_city=&d_zip='}, function (error, response, body) {
    if (!error) {
        console.log('Request successful');
       var $ = cheerio.load(body);
       var html = $('html');

    //var title = $('title').text();
      // var content = $('body').text();
      // var freeArticles = $('.central-featured-lang.lang1 a small').text()

    //   console.log('URL: ' + url);
       console.log('HTML:' + html );
      // console.log('Title: ' + title);
      // console.log('EN articles: ' + freeArticles);

    }
    else {
      console.log("We’ve encountered an error: " + error);
    }
});

// Use regular request module
// var url = "http://wikipedia.org";
// request(url, function (error, response, body) {
//   if (!error) {
//     var $ = cheerio.load(body);
//     var html = $('body').text();
//
//     // var title = $('title').text();
//     // var content = $('body').text();
//     // var freeArticles = $('.central-featured-lang.lang1 a small').text()
//
//     console.log('URL: ' + url);
//     console.log('HTML:' + html );
//     // console.log('Title: ' + title);
//     // console.log('EN articles: ' + freeArticles);
//   }
//   else {
//     console.log("We’ve encountered an error: " + error);
//   }
// });
