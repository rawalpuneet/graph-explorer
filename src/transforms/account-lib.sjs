'use strict';

function update(content, context)
{

  if (xdmp.nodeKind(content.value) == 'document' &&
      content.value.documentFormat == 'JSON') {

      var obj = content.value.toObject();

      var uri = '/data/account-' + obj.accountId + '.json';
      var type = 'http://xmlns.com/foaf/0.1/Account ';
      var label = obj.accountName;

      var labelTriple = {
                            triple: {
                              subject: uri,
                              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
                              object: label
                            }
                        };


      var typeTriple = {
                            triple: {
                              subject: uri,
                              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                              object: type
                            }
                        };

      var clientTriple = {
                            triple: {
                              subject: uri,
                              predicate: "http://xmlns.com/foaf/0.1/accountOf",
                              object: '/data/client-' + obj.clientId + '.json'
                            }
                        };

      var triples = [];
      triples.push(labelTriple);
      triples.push(typeTriple);
      triples.push(clientTriple);

      obj['triples'] = triples;

    content.value = xdmp.unquote(xdmp.quote(obj));
  }
  return content;
};

exports.transform = update;
