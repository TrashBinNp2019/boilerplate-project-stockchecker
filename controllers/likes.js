const crypto = require( 'crypto' );

let likes = [];

module.exports.addLike = function addLike( stock, src ) {
    stockLikes = likes.filter( e => e.name === stock );
    if ( stockLikes.length === 0 ) {
        let source = crypto.createHash( 'sha256' ).update( src ).digest( 'hex' );
        likes.push( { name: stock, sources: [ source ] } );  
    } else {
        let source = crypto.createHash( 'sha256' ).update( src ).digest( 'hex' );
        if ( !stockLikes[ 0 ].sources.includes( source ) ) {
            stockLikes[ 0 ].sources.push( source );
        }
    }
}

module.exports.getLikes = function getLikes( stock ) {
    stockLikes = likes.filter( e => e.name === stock );
    if ( stockLikes.length === 0 ) {
        let likedStock = { name: stock, sources: [] };
        likes.push( likedStock ); 
        return likedStock.sources.length;
    } else {
        return stockLikes[ 0 ].sources.length;
    }
}