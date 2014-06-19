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
  'ui.bootstrap.tpls'
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

/*
.directive('dynamicTooltip', function ($compile) {
  return {
    restrict: 'A',
    scope: {
      tooltipElement: '=',
      dynamicTooltip: '@'
    },
    link: function(scope, element, attrs) {
      var template = '<a href="#" tooltip-placement="top" tooltip="' + scope.dynamicTooltip + '">{{tooltipElement}}</a>';
      scope.$watch('tooltipElement', function (value) {
        var previousTooltip = element.find('a');
        angular.forEach(previousTooltip, function (item, i) {
          var el = angular.element(item);
          el.replaceWith(el.text());
        });
        var searchText = scope.tooltipElement;
        if (searchText) {
          replaced = element.html().replace(new RegExp(searchText, "g"), template);
          element.html(replaced);
        }
        $compile(element.contents())(scope);
      });
    }
  }
})
*/

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
.controller( 'HomeCtrl', function HomeController( $scope, $http, $interval ) {
  var expires = [
    new Date(+new Date() + 1728e5).getTime(),
    new Date(+new Date() + 864e5).getTime()
  ];

  // $scope.dynamicPopover = angular.element(item);
  $scope.bidTemplate = 'assets/template/bidForm.html';
  $scope.dynamicPopover = 'Bai, ejti nebun?';
  $scope.dynamicPopoverTitle = 'Please enter your bid';

  $scope.format = 'M/d/yy h:mm:ss a';

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
