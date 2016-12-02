// npm packages
var _ = require('underscore');
var request = require('request');
var emailRegex = require('email-regex');

// local files
var google_api = require('./google_api.js');
var string_utils = require('./string_utils.js');
var google_ops = require('./google_ops.js');
//var google_sheet_ops = require('./google_sheet_ops.js')



//google_api.do( "client_secret.json", google_ops.listMajors );
//google_api.do( "client_secret.json", google_ops.listRows );


google_api.do( "client_secret.json", google_ops.addBlankSheet );











// TODO: Refactor functions/Split into separate files/.gitignore
// TODO: Plan out best data format for extracting/transforming/loading

// TODO: Fix duplicates where Agent value is not the same

// TODO: Move AltEmail into list?

// TODO: Deduplicate list