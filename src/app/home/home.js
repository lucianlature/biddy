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
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'plusOne'
])

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
.controller( 'HomeCtrl', function HomeController( $scope ) {
  $scope.tiles = [{
    id: 'b1',
    title: 'Bid #1',
    expires: new Date(+new Date + 1728e5).getTime(),
    isVisible: true,
    image: 'assets/images/bid1.jpg'
  }, {
    id: 'b2',
    title: 'Bid #2',
    expires: new Date(+new Date + 864e5).getTime(),
    isVisible: true,
    image: 'assets/images/bid2.jpg'
  }, {
    id: 'b3',
    title: 'Bid #3',
    expires: new Date(+new Date + 1728e5).getTime(),
    isVisible: true,
    image: 'assets/images/bid3.jpg'
  }];
})

;

