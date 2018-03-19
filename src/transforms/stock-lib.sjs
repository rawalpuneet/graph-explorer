'use strict';

function update(content, context)
{

  if (xdmp.nodeKind(content.value) == 'document' &&
      content.value.documentFormat == 'JSON') {

      var obj = content.value.toObject();

      var uri = '/data/stock-'+ obj.stockId + '.json';
      var type = 'http://xmlns.com/foaf/0.1/Organization';
      var label = obj.stockName + '(' + obj.symbol + ')';

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

      var triples = [];
      triples.push(labelTriple);
      triples.push(typeTriple);

      obj['triples'] = triples;

    content.value = xdmp.unquote(xdmp.quote(obj));
  }
  return content;
};

exports.transform = update;
