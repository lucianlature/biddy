var _ = require('lodash'),
    randomFromArray = function (ar) {
      return ar[_.random(ar.length-1)];
    }

// Keep track of which bids are emulated so that there are no duplicates
var bids = (function () {

  var bidValues = _.range(10, 20, .1),
      bidProducts = _.range(1, 10);

  // serialize claimed names as an array
  var getRandom = function () {
    return {
      bid: Number(randomFromArray(bidValues).toFixed(2)),
      productId: randomFromArray(bidProducts)
    };
  };

  return {
    getRandom: getRandom
  };
}());

// export function for listening to the socket
module.exports = function (socket) {

  var fakeBid = bids.getRandom();
  // send the new user their name and a list of users
  socket.emit('init', {
    bid: fakeBid
  });

  setInterval( function () {
    var fakeBid = bids.getRandom();
    socket.emit('fakebid:product', fakeBid);
  }, 5000);

  socket.on('bid:product', function (data) {
    // do something with the data
    console.log('Bid => ');
    console.info(data);
  });
};
