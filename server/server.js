const config = require('../config');
const express = require('express');
const marklogic = require('marklogic');
const digestRequest = require('request-digest')('admin', 'admin');
const cors = require('cors');
const {XMLParser} = require("fast-xml-parser");

const app = express();

app.use(cors());

const port = config.server.port;

const db = marklogic.createDatabaseClient({
  host: config.host,
  port:	config.rest['rest-api'].port,
  user:	config.auth.user,
  password: config.auth.pass,
  authType: 'digest'
});
const q = marklogic.queryBuilder;

// fast-xml-parser: https://github.com/NaturalIntelligence/fast-xml-parser
const options = {
    ignoreAttributes: false,
    ignoreDeclaration: true,
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

app.get('/searchWithNode', (req, res) => {

  const qText = req.query.q ? req.query.q : '';

	const whereClause = [
    q.collection("person"),
    q.parsedFrom(qText)
  ];

	db.documents.query(
    q.where(whereClause)
    .slice(parseInt(0), parseInt(10))
  )
  .result(function(documents) {
      let results = [];
      documents.forEach((document) => {
        if (document.content) {
          const json = xmlToJson(document.content);
          document.content = json;
          // Add entity type as property to each result
          const entityType = Object.keys(json)[0];
          document.entityType = entityType;
        }
        results.push(document)
      });
      res.json(results);
      }, (error) => {
        console.dir(error);
    });

});

// Optionally force paths to arrays
const alwaysArray = [
    //"person.contacts.contact"
];

app.get('/search', (req, res) => {
    let q = req.query.q ? req.query.q : "",
        length = req.query.length ? req.query.length : 10,
        sort = req.query.sort ? req.query.sort : 'descending';

	  // https://docs.marklogic.com/guide/search-dev/query-options

    try {
      // const response = axiosDigest.get("http://localhost:8000/v1/search?format=json&q=John");
      digestRequest.request({
		  host: 'http://localhost',
		  path: '/v1/search?format=json&q=' + q + '&options=search-options',
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
	        const jObj = JSON.parse(body);
          if (jObj.results && jObj.results.length) {
            jObj.results.forEach((r, i) => {
              if (r.extracted && r.extracted.content) {
                // Convert extracted XML to JSON and replace for each result
                const json = xmlToJson(r.extracted.content[0]);
                jObj.results[i].extracted = json;
                // Add entity type as property to each result
                const entityType = Object.keys(json)[0];
                jObj.results[i].entityType = entityType;
              }
            })
          }
	        res.json(jObj);
	      }
		  });
      
    } catch (error) {
      let message = error;
      console.error("Error: /search", message);
    }

});

app.listen(port, () => console.log('Server listening on port ' + port))
