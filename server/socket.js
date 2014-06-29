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
    console.info(fakeBid);
    socket.emit('fakebid:product', fakeBid);
  }, 1000);

  socket.on('bid:product', function (data) {
    // do something with the data
    console.log('Bid => ');
    console.info(data);
  });

  /*
  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name: name
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });
  });

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name;
      userNames.free(oldName);

      name = data.name;

      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });

      fn(true);
    } else {
      fn(false);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
  */
};
