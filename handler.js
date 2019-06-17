'use strict';

const useragent = require('useragent');
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const path = require('path');

const getPolyFillName = (browser) => {
  switch (browser) {
    case 'ie':
      return path.join(__dirname, '/generated/ie-polyfills.min.js');
    default:
      return path.join(__dirname, '/generated/polyfills.min.js');
  }
};

module.exports.polyfill = async (event, context) => {
  const ua = useragent.parse(event.headers['user-agent']);
  console.log(ua);
  const body = await readFile(getPolyFillName(ua.family.toLowerCase()), 'utf8');
  return {
    statusCode: 200,
    body,
    headers: {
      'Content-Type': 'application/javascript',
      'X-Detected-UA': ua.family,
    }
  };
};

module.exports.helloWorld = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};
