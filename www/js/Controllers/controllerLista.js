angular.module('app.controllers')
   
.controller('listaDeDesafiosCtrl', ['$scope','$state', '$timeout', '$stateParams', 'UsuarioDesafios','SrvFirebase',
function ($scope,$state, $timeout, $stateParams, UsuarioDesafios,SrvFirebase) {
  $scope.$on('$ionicView.loaded', function () {
    if(firebase.auth().currentUser == null){
      debugger;
      $state.go('tab.perfilLoginRegister');
    }
    else
    {
      var desafiosRef = SrvFirebase.RefDesafios();
      $scope.DesafiosDisponibles = [];

      desafiosRef.on('child_added', function(snapshot) {
        // code to handle new child.
        $timeout(function(){
          var desafioId = snapshot.key;
          var desafioObject = snapshot.val();
          if((desafioObject.estado == 'Available' || UsuarioDesafios.isAdmin())){
            desafioObject.id = desafioId;
            console.log(desafioObject);
            $scope.DesafiosDisponibles.push(desafioObject);
          }
        });
      });
    }
  });

 
  $scope.IrAlDesafio = function(desafio){
    $state.go('detallesDesafio',{desId : desafio.id, backState : 'tab.listaDeDesafios'});
  };

}]);

    