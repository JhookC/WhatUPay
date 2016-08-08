var valorPrestamo   = 0;
var descuento       = 0;
var plazoMeses      = 0;
var tasaEA          = 0;
var tasaNA          = 0;
var tasaMes         = 0;
var cuotaManejo     = 0;
var periocidadCuota = 0;
var tabla           = [];
var creditcards     = [];
var resume          = [{"ir1": 0, "ir2": 0, "ir3": 0, "ir4": 0, "ir5": 0, "ir6": 0}];

var ir1             = 0;
var ir2             = 0;
var ir3             = 0;
var ir4             = 0;
var ir5             = 0;
var ir6             = 0;

function calcularResumen() {
  ir1   = (tasaMes*100).toFixed(3);
  ir2   = calcularIntereses();
  ir3   = calcularPagoTotalSinCuotaManejo();
  ir4   = calcularPagoTotalConCuotaManejo();
  ir5   = calcularCargoAdicionalPorcentual(1);
  ir6   = calcularCargoAdicionalPorcentual(0);

  //JSON
  resume[0].ir1 = ir1;
  resume[0].ir2 = ir2;
  resume[0].ir3 = ir3;
  resume[0].ir4 = ir4;
  resume[0].ir5 = ir5;
  resume[0].ir6 = ir6;
  console.log("Res "+resume);

  return resume;
}

function calcularTablaPagos() {
  tabla.length = 0;
  tasaNA  = (Math.pow((1 + (tasaEA/100)), (1/12)) - 1) * 12;
  tasaMes = tasaNA / 12;

  console.log("Descuento: "+descuento);
  if (descuento != 0) {
    console.log(valorPrestamo * ((100 - descuento) / 100));
    valorPrestamo *= (100 - descuento) / 100;
  }

  var cuotaProgresiva     = valorPrestamo;
  var aporteCapital       = valorPrestamo/plazoMeses;

  for (var i = 1; i <= plazoMeses; i++) {
    var cuotaManejoMensual  = 0;

    if (i != 1) {
      cuotaProgresiva -= aporteCapital;
    }

    if (i % periocidadCuota == 0) {
      cuotaManejoMensual = cuotaManejo;
    }

    var interes             = cuotaProgresiva   * tasaMes;
    var totalCuota          = aporteCapital     + interes;
    var saldo               = cuotaProgresiva   - aporteCapital;
    var cuotaFinal          = totalCuota        + cuotaManejoMensual;

    var line = {
      cuota       : i,
      inicial     : cuotaProgresiva.toFixed(),
      interes     : interes.toFixed(),
      capital     : aporteCapital.toFixed(),
      totalCuota  : totalCuota.toFixed(),
      saldo       : saldo.toFixed(),
      cuotaManejo : cuotaManejoMensual.toFixed(),
      cuotaFinal  : cuotaFinal.toFixed()
    };

    tabla.push(line);
  }

  return JSON.stringify(tabla);
}

function calcularPagoTotalConCuotaManejo() {
  var total = 0;

  for (var fila in tabla) {
    total += Number(tabla[fila].cuotaFinal);
  }

  return total;
}

function calcularPagoTotalSinCuotaManejo() {
  var total = 0;

  for (var fila in tabla) {
    total += Number(tabla[fila].totalCuota);
  }

  return total;
}

function calcularIntereses() {
  var intereses = 0;

  for (var fila in tabla) {
    intereses += Number(tabla[fila].interes);
  }

  return intereses;
}

function calcularCargoAdicionalPorcentual(tipo) {
  var total       = 0;
  var porcentaje  = 0;

  if (tipo == 1) {
    total = calcularPagoTotalConCuotaManejo();
  } else {
    total = calcularPagoTotalSinCuotaManejo();
  }

  porcentaje = ((total * 100) / valorPrestamo) - 100;
  return porcentaje.toFixed(2);
}

//-------------------------------------------------------------------------------
function loadJSON(file, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }


function load() {

    loadJSON("../ccards.json", function(response) {

        var actual_JSON = JSON.parse(response);
        creditcards = actual_JSON;
    });


}

load();

/*console.log(calcularTablaPagos());
console.log("Tasa mensual: " + (tasaMes*100).toFixed(3));
console.log("Intereses: " + calcularIntereses());
console.log("Total sin cuota: " + calcularPagoTotalSinCuotaManejo());
console.log("Total con cuota: " + calcularPagoTotalConCuotaManejo());
console.log("Porcentaje adicional: " + calcularCargoAdicionalPorcentual(1));*/
