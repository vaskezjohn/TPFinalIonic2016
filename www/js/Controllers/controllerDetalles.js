angular.module('app.controllers')

.controller('detallesDesafioCtrl', ['$scope','$http','$state', '$timeout', '$ionicPopup', '$stateParams', 'CreditosSrv' ,'UsuarioDesafios','SrvFirebase',
function ($scope,$http,$state, $timeout, $ionicPopup, $stateParams, CreditosSrv, UsuarioDesafios,SrvFirebase) {

  $scope.$on('$ionicView.loaded', function () {
    if(firebase.auth().currentUser == null){
      $state.go('tab.perfilLoginRegister');
    }
    else
    {
      debugger;
      console.info("PARAMS", $stateParams.desId);
      SrvFirebase.RefDesafios($stateParams.desId).once('value', function(snapshot) {
      var exists = (snapshot.val() != null);
      console.log(exists);
      if(exists){
        $scope.des = snapshot.val();
        $scope.des.fechaInicio = new Date(snapshot.val().fechaInicio);
        $scope.des.fechaFin = new Date(snapshot.val().fechaFin);
        $scope.fechaInicioReal = $scope.getFechaInicio();
        $scope.fechaFinReal = $scope.getFechaFin();
      }
  });
    }
  });

  $scope.user = UsuarioDesafios;
  console.info("USUARIO", $scope.user);

  $scope.des = {
    titulo: "DesafioLoco",
    detalle: "Descripcion del LocoDesafio",
    fechaInicio: new Date(),
    fechaFin: new Date(),
    valorApuesta: 100,
    estado: 'Available'
  };

  $scope.getFechaInicio = function(){
    return ($scope.des.fechaInicio.getDate()+1) + "/" + 
    ($scope.des.fechaInicio.getMonth()+1) + "/" + 
    ($scope.des.fechaInicio.getFullYear());
  };

  $scope.getFechaFin = function(){
    return ($scope.des.fechaFin.getDate()+1) + "/" + 
    ($scope.des.fechaFin.getMonth()+1) + "/" + 
    ($scope.des.fechaFin.getFullYear());
  };

  $scope.GoBack = function(){
    $state.go($stateParams.backState);
  };

  $scope.AceptarDesafio = function(){
    $scope.des.desafiado = UsuarioDesafios.getShowData();
    $scope.des.estado = 'Accepted';

    CreditosSrv.GastarCreditos(UsuarioDesafios.getShowData(),$scope.des.valorApuesta);

    //SOBRESCRIBIR DESAFIO
    SrvFirebase.RefDesafios($stateParams.desId).update({
      desafiado : UsuarioDesafios.getShowData(),
      estado : 'Accepted'
    },function(error){
      if(error){
        var alertPopup = $ionicPopup.alert({
           title: 'Error',
           template: error
         });

         alertPopup.then(function(res) {
           console.log('Error cerrado');
         });
      }else{
        var alertPopup = $ionicPopup.alert({
           title: 'Aviso',
           template: 'DESAFIO ACEPTADO!!'
         });

         alertPopup.then(function(res) {
           console.log('Alert de Aceptado cerrado');
            $state.go('tab.desafiosAceptados');
         });
      }
    });

  };

  $scope.CompletarDesafio = function(){
    //GANADOR ES EL DESAFIANTE
    $scope.des.ganador = $scope.des.desafiado;
    $scope.des.estado = 'Finished';

    CreditosSrv.GanarCreditos($scope.des.ganador,$scope.des.valorApuesta * 2);

    //SOBRESCRIBIR DESAFIO
    SrvFirebase.RefDesafios($stateParams.desId).update({
      ganador : $scope.des.desafiado,
      estado : 'Finished'
    },function(error){
      if(error){
        var alertPopup = $ionicPopup.alert({
           title: 'Error',
           template: error
         });

         alertPopup.then(function(res) {
           console.log('Error cerrado');
         });
      }else{
        var alertPopup = $ionicPopup.alert({
           title: 'Aviso',
           template: 'DESAFIO TERMINADO!!'
         });

         alertPopup.then(function(res) {
           console.log('Alert de Aceptado cerrado');
            $state.go('desafiosTabs.desafiosAceptados');
         });
      }
    });
  };

  $scope.FallarDesafio = function(){
    //GANADOR ES EL CREADOR
    $scope.des.ganador = $scope.des.creador;
    $scope.des.estado = 'Finished';

    CreditosSrv.GanarCreditos($scope.des.ganador,$scope.des.valorApuesta * 2);

    //SOBRESCRIBIR DESAFIO
    SrvFirebase.RefDesafios($stateParams.desId).update({
      ganador : $scope.des.creador,
      estado : 'Finished'
    },function(error){
      if(error){
        var alertPopup = $ionicPopup.alert({
           title: 'Error',
           template: error
         });

         alertPopup.then(function(res) {
           console.log('Error cerrado');
         });
      }else{
        var alertPopup = $ionicPopup.alert({
           title: 'Aviso',
           template: 'DESAFIO TERMINADO!!'
         });

         alertPopup.then(function(res) {
           console.log('Alert de Aceptado cerrado');
            $state.go('desafiosTabs.desafiosAceptados');
         });
      }
    });
  };

 
  
}]);
   