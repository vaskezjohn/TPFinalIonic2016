angular.module('app.controllers', [])
  
.controller('tabsCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams,UsuarioDesafios) {
	 $scope.user = UsuarioDesafios;
}]);
    