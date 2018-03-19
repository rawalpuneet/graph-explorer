'use strict';
declareUpdate();

var triples = {
  "triples": [
    {
      "triple": {
        "subject":"http://xmlns.com/foaf/0.1/accountOf",
        "predicate": "http://www.w3.org/2000/01/rdf-schema#label",
         "object": {
                      "datatype":"http://www.w3.org/2001/XMLSchema#string", "value":"AccountOf"
                  }
      }
    },
    {
      "triple": {
        "subject":"http://xmlns.com/foaf/0.1/clientOf",
        "predicate": "http://www.w3.org/2000/01/rdf-schema#label",
        "object": {
          "datatype":"http://www.w3.org/2001/XMLSchema#string", "value":"ClientOf"
        }
      }
    },
    {
      "triple": {
        "subject":"http://xmlns.com/foaf/0.1/holdingOf",
        "predicate": "http://www.w3.org/2000/01/rdf-schema#label",
        "object": {
          "datatype":"http://www.w3.org/2001/XMLSchema#string", "value":"HoldingOf"
        }
      }
    },
    {
      "triple": {
        "subject":"http://xmlns.com/foaf/0.1/investedIn",
        "predicate": "http://www.w3.org/2000/01/rdf-schema#label",
        "object": {
          "datatype":"http://www.w3.org/2001/XMLSchema#string", "value":"InvestedIn"
        }
      }
    }
  ]
}
var uri = '/data/client-1.json'
var client = cts.doc().toObject()
client.triples.push(client, triples)
xdmp.documentInsert(uri, client, {collections: ['data/clients']})
