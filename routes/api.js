'use strict';

const stockPrices = require('../controllers/stock-prices');
const requestIp = require( 'request-ip' );

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      let source = requestIp.getClientIp(req);
      if ( !source ) { source = 'unknown'; }
      stockPrices(req.query.stock, req.query.like, source )
        .then( result => {
          if ( result.error !== 0 ) { 
            res.status( 400 ).json( { error: result.errorString } );
          } else {
            res.json( { stockData: result.stockData } );
          }
        } );
    });
    
};
