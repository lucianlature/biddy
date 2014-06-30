/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular

.module( 'ngBoilerplate.home', [
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.tpls',
  'socket'
])

// Register the 'bidTimeLeft' directive factory method.
// We inject $interval and dateFilter service since the factory method is DI.
.directive('bidTimeLeft', function ($interval) {
  // return the directive link function. (compile function not needed)
  return function (scope, element, attrs) {

    // used to update the UI
    function updateTimeLeft() {
      element.text( timerFormat(Math.floor((scope.tile.expires - new Date().getTime())/1000)) );
    }

    // watch the expression, and update the UI on change.
    scope.$watch(attrs.bidTimeLeft, function (value) {
      updateTimeLeft();
    });

    stopTime = $interval(updateTimeLeft, 1000);

    // listen on DOM destroy (removal) event, and cancel the next UI update
    // to prevent updating time ofter the DOM element was removed.
    element.on('$destroy', function() {
      $interval.cancel(stopTime);
    });
  };
})

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Bids' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $http, $interval, socket ) {

  socket.on('init', function (data) {
    console.info(data);
  });

  socket.on('fakebid:product', function (data) {
    console.log('fake bid:');
    console.info(data);
  });

  var expires = [
    new Date(+new Date() + 1728e5).getTime(),
    new Date(+new Date() + 864e5).getTime()
  ];

  // $scope.dynamicPopover = angular.element(item);
  // $scope.bidTemplate = 'assets/template/bidForm.html';
  $scope.popover = {
    "title": "Title",
    "template": "assets/template/bidForm.html",
    "content": "Hello Popover<br />This is a multiline message!"
  };

  $scope.format = 'M/d/yy h:mm:ss a';

  // bid initial value
  $scope.bid = 10;

  //$scope.$hide = function () {
  //  alert('hide');
  //};
  //
  $scope.submit = function() {
    if ($scope.bid) {
      // the bid is stored in this.bid
      console.info(this.bid);
    }
  };

  $http.get('assets/data/bids.json').success(function (data) {
    data.forEach(function (bid) {
      bid.expires = expires[Math.random() > 0.5 ? 0 : 1];
    });
    $scope.tiles = data;
  });

});

function pretty_time_string ( num ) {
  return ( num < 10 ? '0' : '' ) + num;
}

function timerFormat ( total_seconds ) {

  var hours = Math.floor(total_seconds / 3600);
      total_seconds = total_seconds % 3600,
      minutes = Math.floor(total_seconds / 60),
      total_seconds = total_seconds % 60,
      seconds = Math.floor(total_seconds);

  // Pad the minutes and seconds with leading zeros, if required
  hours = pretty_time_string(hours);
  minutes = pretty_time_string(minutes);
  seconds = pretty_time_string(seconds);

  // Compose the string for display
  return hours + ":" + minutes + ":" + seconds;
}
