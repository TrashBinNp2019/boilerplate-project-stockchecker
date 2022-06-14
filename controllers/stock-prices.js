const axios = require( 'axios' ).default;
const likes = require( '../controllers/likes' );

async function getPrice( stock ) {
    try {
        const response = await axios
            .get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${ stock.toLowerCase() }/quote`);
            
        if ( response.status === 200 ) {
            return response.data.iexClose;
        }

    } catch ( err ) {
        console.log( err );
        return 0.0;
    }
}

module.exports = async function ( stock, like, source ) {
    let res = { error : 0, errorString : "", stockData : [] };

    if ( Array.isArray( stock ) ) {
        if ( stock.length !== 2 ) { 
            res.error = 400;
            res.errorString = "Invalid request. Must provide two stocks.";
            return res;
        };
        for ( let i = 0; i < stock.length; i++ ) {
            if ( like ) { likes.addLike( stock[ i ], source ); }
            let price = await getPrice( stock[ i ] );
            let liked = likes.getLikes( stock[ i ] );
            res.stockData.push( { stock: stock[i], price: price, rel_likes: liked } );
        } 
        // assuming there are two stocks, calculate the difference between the likes
        let diff = res.stockData[ 0 ].rel_likes - res.stockData[ 1 ].rel_likes;
        res.stockData[ 0 ].rel_likes = diff;
        res.stockData[ 1 ].rel_likes = -diff;
    } else {
        if ( like ) { likes.addLike( stock, source ); }
        let price = await getPrice( stock );
        let liked = likes.getLikes( stock );
        res.stockData = { stock: stock, price: price, likes: liked };
    }

    return res;
}