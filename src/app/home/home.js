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
  'plusOne'
])

// Register the 'bidTimeLeft' directive factory method.
// We inject $interval and dateFilter service since the factory method is DI.
.directive('bidTimeLeft', function($interval, dateFilter) {
  // return the directive link function. (compile function not needed)
  return function(scope, element, attrs) {

    var format,  // date format
        stopTime; // so that we can cancel the time updates

    // used to update the UI
    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }

    // watch the expression, and update the UI on change.
    scope.$watch(attrs.bidTimeLeft, function(value) {
      format = value;
      updateTime();
    });

    stopTime = $interval(updateTime, 1000);

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
.controller( 'HomeCtrl', function HomeController( $scope, $interval ) {

  $scope.format = 'M/d/yy h:mm:ss a';

  $scope.tiles = [{
    id: 'b1',
    title: 'Bid #1',
    expires: new Date(+new Date() + 1728e5).getTime(),
    isVisible: true,
    image: 'assets/images/bid1.jpg'
  }, {
    id: 'b2',
    title: 'Bid #2',
    expires: new Date(+new Date() + 864e5).getTime(),
    isVisible: true,
    image: 'assets/images/bid2.jpg'
  }, {
    id: 'b3',
    title: 'Bid #3',
    expires: new Date(+new Date() + 1728e5).getTime(),
    isVisible: true,
    image: 'assets/images/bid3.jpg'
  }];
  /*
  $sc = items.map(function(item){
          item.timer = Math.floor((item.expires - time)/1000);
        });
  */
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
