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
    this.message = "Product page";
  });

  app.controller("tableController", function(){
    this.ccSelected = 0;
    this.vpres   = 0;
    this.desc    = 0;
    this.pmes    = 1;
    this.data    = tabla;
    this.resume  =  resume;
    this.creditcards = creditcards;
    this.calcular = function(){
      valorPrestamo   = this.vpres;
      descuento       = this.desc;
      plazoMeses      = this.pmes;
      tasaEA          = Number(creditcards[this.ccSelected - 1].tea);
      cuotaManejo     = Number(creditcards[this.ccSelected - 1].cuota);
      periocidadCuota = Number(creditcards[this.ccSelected - 1].freq);
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
