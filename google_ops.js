var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var google_api = require('./google_api.js');
var string_utils = require('./string_utils.js');

/**
* SAMPLE: Print the names and majors of students in a sample spreadsheet:
* https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
*/
exports.listMajors = function (auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      console.log('Name, Major:');
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log('%s, %s', row[0], row[4]);
      }
    }
  });
}

exports.listRows = function(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1yESryfZp6UZ0mwCq8pAL3-mNFzj1DHz9Cfq5K5LgBww',
    range: 'rea-email-list.csv',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      console.log('First Name, Last Name, Email, Alt Email, Agent:');
      for (var i = 0; i < 10; i++) {
        var row = rows[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log('%s, %s, %s, %s, %s', row[0], row[1], row[2], row[3], row[4]);
      }
    }
  });
}

exports.cleanRows = function(auth) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1yESryfZp6UZ0mwCq8pAL3-mNFzj1DHz9Cfq5K5LgBww',
    range: 'rea-email-list.csv',
    }, function(err, response) {
    if (err) {
        console.log('The API returned an error: ' + err);
        return;
    }
    var rows = response.values;
    if (rows.length == 0) {
        console.log('No data found.');
    } else {

        var contacts = [];
        for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        contacts.push( { 'FirstName' : row[0], 'LastName' : row[1], 'Email' : row[2], 'AltEmail' : row[3], 'Agent' : row[4] } );
        }
        // Format each column
        contacts = _.map(contacts, obj => {
            // Format FirstName
            if (_.isUndefined(obj.FirstName) == false && obj.FirstName != '') {
                obj.FirstName = titleCase(obj.FirstName.trim().replace(/\s+/g, " "));
            }
            else {
                obj.FirstName = '';
            }
            // Format LastName
            if (_.isUndefined(obj.LastName) == false && obj.LastName != '') {
                obj.LastName = string_utils.titleCase(obj.LastName.trim().replace(/\s+/g, " "));
            }
            else {
                obj.LastName = '';
            }
            obj.Email = obj.Email.trim().replace(/\s+/g, " ").toLowerCase();
            // Format AltEmail
            if (_.isUndefined(obj.AltEmail) == false) {
                obj.AltEmail = obj.AltEmail.trim().replace(/\s+/g, " ").toLowerCase();            }
            else {
                obj.AltEmail = '';
            }
            // Format Agent
            if (_.isUndefined(obj.Agent) == false) {
                obj.Agent = 'TRUE';
            }
            else {
                obj.Agent = 'FALSE';
            }
            return obj;
        });
        console.log(contacts);
    }
    });
}

// TODO: Add a sheet
exports.addBlankSheet = function(auth) {
    var sheets = google.sheets('v4');

    var spreadsheetId = '1yESryfZp6UZ0mwCq8pAL3-mNFzj1DHz9Cfq5K5LgBww';
    var requests = [];
    requests.push({
      "addSheet": {
        "properties": {
          "title": "Deposits",
          "gridProperties": {
            "rowCount": 20,
            "columnCount": 12
          },
          "tabColor": {
            "red": 1.0,
            "green": 0.3,
            "blue": 0.4
          }
        }
      }
    });
    var batchUpdateRequest = {requests: requests}

    sheets.spreadsheets.batchUpdate({
      auth: auth,
      spreadsheetId: spreadsheetId,
      resource: batchUpdateRequest
    }, function(err, response) {
      if(err) {
        // Handle error
        console.log(err);
      }
    });

}
