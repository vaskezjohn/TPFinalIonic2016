angular.module('app.controllers')
   
.controller('crearDesafioCtrl', ['$scope','$state' ,'$stateParams','$ionicPopup', 'CreditosSrv' ,'UsuarioDesafios', 'SrvFirebase',
function ($scope,$state ,$stateParams,$ionicPopup, CreditosSrv, UsuarioDesafios,SrvFirebase) {

  $scope.$on('$ionicView.loaded', function () {
    if(firebase.auth().currentUser == null){
      $state.go('tab.perfilLoginRegister');
    }
  });

  $scope.nuevoDesafioData = {
    titulo: "Desafio por defecto",
    detalle: "",
    fechaInicio: new Date("07/13/2017"),
    fechaFin: new Date("09/13/2017"),
    valorApuesta: 50
  };

  $scope.maxCredits = UsuarioDesafios.getCredits();

  //$scope.updateTextArea = function(id) {
  //  var element = document.getElementById(id);
  //  element.style.height =  element.scrollHeight + "px";
 // }

  $scope.createDesafio = function(){
    var desafiosRef = SrvFirebase.RefDesafios();
    desafiosRef.push({
      titulo: $scope.nuevoDesafioData.titulo,
      detalle: $scope.nuevoDesafioData.detalle,
      fechaInicio: $scope.nuevoDesafioData.fechaInicio.getTime(),
      fechaFin: $scope.nuevoDesafioData.fechaFin.getTime(),
      creador: UsuarioDesafios.getShowData(),//"useralgo",
      desafiado: "",
      estado: 'Available',
      ganador: "",
      valorApuesta: $scope.nuevoDesafioData.valorApuesta 
    },function(error){
      if(error){        
        $scope.console(error);
      }else{
        $state.go('tab.listaDeDesafios');
        $scope.cleanData();
        SrvFirebase.EnviarNotificacion();
        CreditosSrv.GastarCreditos(UsuarioDesafios.getShowData(),$scope.nuevoDesafioData.valorApuesta);         
      }
    });    
  }

  $scope.cleanData = function(){
    debugger;
    $scope.nuevoDesafioData = {
      titulo: "",
      detalle: "",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      valorApuesta: 0
    };
  };

}]);
   
