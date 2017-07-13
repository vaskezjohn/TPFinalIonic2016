angular.module('app.controllers')
   
.controller('desafiosAceptadosCtrl', ['$scope','$state','$timeout', '$stateParams','UsuarioDesafios','SrvFirebase',
function ($scope,$state, $timeout, $stateParams, UsuarioDesafios,SrvFirebase) {
  $scope.$on('$ionicView.loaded', function () {
    if(firebase.auth().currentUser == null){
      $state.go('tab.perfilLoginRegister');
    }
    else
    {
      var desafiosRef = SrvFirebase.RefDesafios();
      $scope.DesafiosDisponibles = [];
      $scope.cantidadDesafios = 0;

      desafiosRef.on('child_added', function(snapshot) {
        // code to handle new child.
        $timeout(function(){
          var desafioId = snapshot.key;
          var desafioObject = snapshot.val();
          if(desafioObject.estado == 'Accepted' && 
            ((desafioObject.creador.userUUID == UsuarioDesafios.getUUID()) || 
              (desafioObject.desafiado.userUUID == UsuarioDesafios.getUUID()) )){
            desafioObject.id = desafioId;
            console.log(desafioObject);
            $scope.DesafiosDisponibles.push(desafioObject);
            $scope.cantidadDesafios++;
          }
        });
      });
    }
  });

  $scope.IrAlDesafio = function(desafio){
    $state.go('detallesDesafio',{desId : desafio.id, backState : 'tab.desafiosAceptados'});
  };
  
}]);