const config = require('./config');
const express = require('express');
const marklogic = require('marklogic');
const digestRequest = require('request-digest')('admin', 'admin');
const cors = require('cors');
const {XMLParser} = require("fast-xml-parser");

const app = express();

app.use(cors());

const port = config.port;

const db = marklogic.createDatabaseClient({
  host: config.host,
  port:	config.rest['rest-api'].port,
  user:	config.auth.user,
  password: config.auth.pass,
  authType: 'digest'
});
const q = marklogic.queryBuilder;

app.get('/search', (req, res) => {

	const whereClause = [
      q.collection("person")
  	];

	db.documents.query(
    q.where(whereClause)
    .slice(parseInt(0), parseInt(20))
  )
  .result(function(documents) {
      let results = [];
      documents.forEach((document) => {
        results.push(document)
      });
      console.log("Result count: " + results.length);
      res.json(results);
      }, (error) => {
        console.dir(error);
    });
});

// Optionally force paths to arrays
const alwaysArray = [
    //"person.contacts.contact"
];

// fast-xml-parser: https://github.com/NaturalIntelligence/fast-xml-parser
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true,
    isArray: (name, jpath, isLeafNode, isAttribute) => { 
        if (alwaysArray.indexOf(jpath) !== -1) return true;
    }
};
const parser = new XMLParser(options);

const xmlToJson = xml => {
	const json = parser.parse(xml);
	return json;
};

app.get('/search2', (req, res) => {
    let q = req.query.q ? req.query.q : "",
        length = req.query.length ? req.query.length : 10,
        sort = req.query.sort ? req.query.sort : 'descending';

	  // https://docs.marklogic.com/guide/search-dev/query-options

    try {
      // const response = axiosDigest.get("http://localhost:8000/v1/search?format=json&q=John");
      digestRequest.request({
		  host: 'http://localhost',
		  path: '/v1/search?format=json&q=' + q, // + '&options=options',
		  port: config.rest['rest-api'].port,
		  method: 'GET',
		  headers: { Accept: "application/json" }
		}, function (error, response, body) {
		  if (error) {
        console.log(error);
		    throw error;
		  }
		 
		  console.log(response.statusCode);

		  if (response && response.statusCode === 200) {
	        //res.send(xmlToJson(body));
	        const jObj = JSON.parse(body);
          if (jObj.results[0]?.extracted && jObj.results[0].extracted.content) {
            const json = xmlToJson(jObj.results[0].extracted.content[0]);
            jObj.results[0].extracted.content[0] = json;
          }
	        res.json(jObj);
	      }
		});
      
    } catch (error) {
      let message = error;
      console.error("Error: /search2", message);
    }

});

app.listen(port, () => console.log('Server listening on port ' + port))
