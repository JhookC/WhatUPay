$(document).foundation();

(function () {

  //Angular js
  var app = angular.module('whatUpay', ['ngRoute']);

  //Routes configuration
  /*app.config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl : 'views/home.html',
      })
      .when('/product', {
        templateUrl : 'views/productDescription.html'
      });
  });*/

  app.controller("mainController", function(){
  });

  app.controller("tableController", function(){
    this.vpres   = 0;
    this.desc    = 0;
    this.pmes    = 1;
    this.tea    = 0;
    this.cuoManejo = 0;
    this.perCuoMa = 0;
    this.data    = tabla;
    this.resume  =  resume;
    this.calcular = function(){
      valorPrestamo   = this.vpres;
      descuento       = this.desc;
      plazoMeses      = this.pmes;
      tasaEA          = Number(this.tea);
      cuotaManejo     = Number(this.cuoManejo);
      periocidadCuota = Number(this.perCuoMa);
      calcularTablaPagos();
      calcularResumen();

      $('#resumen').show();
      $('#dataTable').show();
      console.log("tn: " + this.ccSelected);
      console.log(this.resume);
    };
  });

  app.directive("topBar", function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/topBar.html'
    };
  });

  app.directive("homeDiv", function(){
    return {
      restrict: 'E',
      templateUrl: 'views/home.html'
    };
  });

  app.directive("tableDiv", function(){
    return {
      restrict: 'E',
      templateUrl: 'views/table.html'
    };
  });

})();
