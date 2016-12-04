// Getting Started - http://mongoosejs.com/docs/index.html

// TODO: Is this code being executed on every run? Should it be in app.js too?

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thatsthem');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("We're connected!")
});

var webPageSchema = mongoose.Schema({
    url: String,
    html: String
});

var webPage = mongoose.model('webPage', webPageSchema);

// TODO: Insert document with Mongoose
// var testPage = new webPage( { url:'Blah URL 2', html:'Blah HTML 2'} );
// console.log(testPage.url);
// testPage.save(function (err, fluffy) {
//   if (err) return console.error(err);
// });

//db.close();
module.exports = webPage;

// SAMPLE FUNCTIONS
// var kittySchema = mongoose.Schema({
//     name: String
// });
//
// var Kitten = mongoose.model('Kitten', kittySchema);
//
// var silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'
//
// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// kittySchema.methods.speak = function () {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// }
//
// var Kitten = mongoose.model('Kitten', kittySchema);
//
// var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak(); // "Meow name is fluffy"
//
// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });
//
// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })
//
// Kitten.find({ name: /^fluff/ }, callback);
