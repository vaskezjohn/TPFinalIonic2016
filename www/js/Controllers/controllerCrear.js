////////////////////////////////////////////////////////////////////
//        IMPORTANTE:                                             // 
//    ESTADOS DE DESAFIOS:                                        //
//            _Available = Recien Creado (Disponible)             // 
//            _Accepted = Aceptado                                //
//            _Checking = Pendiente a revision por Administrador  //
//            _Finished = Terminado                               //
////////////////////////////////////////////////////////////////////

angular.module('app.controllers')
   
.controller('crearDesafioCtrl', ['$scope','$state' ,'$stateParams','$ionicPopup', 'CreditosSrv' ,'UsuarioDesafios', 'SrvFirebase',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state ,$stateParams,$ionicPopup, CreditosSrv, UsuarioDesafios,SrvFirebase) {

  $scope.$on('$ionicView.loaded', function () {
    if(firebase.auth().currentUser == null){
      $state.go('tab.perfilLoginRegister');
    }
  });

 console.log(firebase.auth().currentUser);
  $scope.nuevoDesafioData = {
    titulo: "DesafioPlaceHolder",
    detalle: "ESTA ES UNA descripcion de Desafio!!",
    fechaInicio: new Date("07/13/2017"),

    fechaFin: new Date("09/13/2017"),
    valorApuesta: 50
  };

  console.log($scope.nuevoDesafioData.fechaInicio);

  $scope.maxCredits = UsuarioDesafios.getCredits();

  $scope.updateTextArea = function(id) {
    var element = document.getElementById(id);
    element.style.height =  element.scrollHeight + "px";
  }

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
        SrvFirebase.EnviarNotificacion();
         CreditosSrv.GastarCreditos(UsuarioDesafios.getShowData(),$scope.nuevoDesafioData.valorApuesta);
         $scope.cleanData();
      }
    });

    
  }

  $scope.cleanData = function(){
    $scope.nuevoDesafioData = {
      titulo: "",
      detalle: "",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      valorApuesta: 0
    };
  };

}]);
   
