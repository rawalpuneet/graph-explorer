'use strict';

function update(content, context)
{

  if (xdmp.nodeKind(content.value) == 'document' &&
      content.value.documentFormat == 'JSON') {

      var obj = content.value.toObject();

      var uri = '/data/holding-' + obj.holdingId + '.json';
      var type = 'http://xmlns.com/foaf/0.1/Holding';

      //search for stock name
      var stock = cts.search(cts.andQuery([cts.collectionQuery("data/stocks"),
                                   cts.jsonPropertyValueQuery('stockId', obj.stockId)
                               ])).toObject()[0].toObject();

      var label = stock.symbol + ' : ' + obj.investment;

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

      var accountTriple = {
                            triple: {
                              subject: uri,
                              predicate: "http://xmlns.com/foaf/0.1/holdingOf",
                              object: '/data/account-' + obj.accountid + '.json'
                            }
                        };

      var stockTriple = {
                            triple: {
                              subject: uri,
                              predicate: "http://xmlns.com/foaf/0.1/investedIn",
                              object: '/data/stock-' + obj.stockId + '.json'
                            }
                        };

      var triples = [];
      triples.push(labelTriple);
      triples.push(typeTriple);
      triples.push(accountTriple);
      triples.push(stockTriple);

      obj['triples'] = triples;

    content.value = xdmp.unquote(xdmp.quote(obj));
  }
  return content;
};

exports.transform = update;
