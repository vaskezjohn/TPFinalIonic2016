angular.module('app.controllers')
  
.controller('autorCtrl', ['$scope', '$stateParams','$cordovaInAppBrowser', 
function ($scope, $stateParams,$cordovaInAppBrowser) {
  var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

console.log("entro aca");
  $scope.OpenGitHub=function(){
    $cordovaInAppBrowser.open('https://github.com/', '_self', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });
  };

}]);
   