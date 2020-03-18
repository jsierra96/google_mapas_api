$(document).ready(function(){
    $('.select2').select2();

    $('.select2').on('change', function(e){
        selectEstado($('.select2').val());
    });
});

function initMap() {
    var lat = 23.957484;
	var long = -102.893582;
	var cordenada = new google.maps.LatLng(lat, long);
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5.5,
		center: cordenada
    });
    mapaInicial();
}



function cargarnEstados() {
    var estados = null;
	try {
        $.ajax({
            url: 'estados.json',
            success: function(respuesta) {
                estados = respuesta;
            }
        });
    } catch(error) {
        console.log("Ocurrio un error al abrir el json");
    }
    return estados;
}

function selectEstado(esta) {
    var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5.5
    });

    $.ajax({
        url: 'estados.json',
        success: function(respuesta) {
            estados = respuesta;

            var triangleCoords = estados[esta];

            var bermudaTriangle = new google.maps.Polygon({
                paths: triangleCoords,
                strokeColor: '#6e6e6efd',
                strokeOpacity: 5,
                strokeWeight: 1,
                fillColor: '#2a97e065',
                fillOpacity: 0.5,
                id: sessionStorage.getItem('idEstado')
            });
            bermudaTriangle.setMap(map);
            var estado = '';
            var position = null;
            switch (esta) {
                case 'oaxaca':
                    position = new google.maps.LatLng(17.063564, -96.734705);
                    estado = 'Oaxaca';
                    map.setCenter(position);
                    map.setZoom(8);
                    break;
                case 'guerrero':
                    position = new google.maps.LatLng(17.740056, -100.096706);
                    estado = 'Guerrero';
                    map.setCenter(position);
                    map.setZoom(8);
                    break;
                case 'morelos':
                    position = new google.maps.LatLng(18.744209, -99.066642);
                    estado = 'Morelos';
                    map.setCenter(position);
                    map.setZoom(9.5);
                    break;
                case 'michoacan':
                    position = new google.maps.LatLng(19.229152, -101.851743);
                    estado = 'Michoacan';
                    map.setCenter(position);
                    map.setZoom(8);
                    break;
                case 'chiapas':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(16.334833, -92.573902));
                    map.setZoom(7.5);
                    break;
                case 'yucatan':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(20.688753, -88.815202));
                    map.setZoom(8);
                    break;
                case 'quintana_roo':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(19.828958, -88.042534));
                    map.setZoom(7.5);
                    break;
                case 'campeche':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(19.237916, -90.262870));
                    map.setZoom(7.7);
                    break;
                case 'tabasco':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(18.015436, -92.545154));
                    map.setZoom(8.5);
                    break;
                case 'nuevo_leon':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(25.553093, -99.673743));
                    map.setZoom(7);
                    break;
                case 'tamaulipas':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(25.071001, -98.562845));
                    map.setZoom(6.9);
                    break;
                case 'veracruz':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(19.852371, -95.718860));
                    map.setZoom(7);
                    break;
                case 'sinaloa':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(24.668154, -107.762955));
                    map.setZoom(7);
                    break;
                case 'durango':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(24.730610, -104.594794));
                    map.setZoom(7.2);
                    break;
                case 'nayarit':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(21.875763, -104.809391));
                    map.setZoom(8);
                    break;
                case 'zacatecas':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(23.150327, -102.845140));
                    map.setZoom(7.3);
                    break;
                case 'aguas_calientes':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(22.010136, -102.391847));
                    map.setZoom(9.6);
                    break;
                case 'jalisco':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(20.754541, -103.466452));
                    map.setZoom(7.4);
                    break;
                case 'colima':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(19.117700, -103.982462));
                    map.setZoom(9.5);
                    break;
                case 'san_luis_potosi':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(22.766211, -100.119324));
                    map.setZoom(7.5);
                    break;
                case 'guanajuato':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(20.846939, -100.985934));
                    map.setZoom(8.5);
                    break;
                case 'queretaro':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(20.808228, -99.811711));
                    map.setZoom(8.5);
                    break;
                case 'hidalgo':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(20.510104, -98.872940));
                    map.setZoom(8.5);
                    break;
                case 'tlaxcala':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(19.431481, -98.151294));
                    map.setZoom(10);
                    break;
                case 'puebla':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(19.362556, -97.815792));
                    map.setZoom(7.7);
                    break;
                case 'ciudad_de_mexico':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(19.345862, -99.145089));
                    map.setZoom(10);
                    break;
                case 'estado_de_mexico':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(19.325549, -99.638082));
                    map.setZoom(8.4);
                    break;
                case 'baja_california_norte':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(30.443618, -115.541816));
                    map.setZoom(7);
                    break;
                case 'baja_california_sur':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(25.379246, -112.584538));
                    map.setZoom(6.9);
                    break;
                case 'sonora':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(29.319213, -111.433271));
                    map.setZoom(6.6);
                    break;
                case 'chihuahua':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(28.865064, -106.324935));
                    map.setZoom(6.5);
                    break;
                case 'coahuila':
                    position =
                    estado =
                    map.setCenter(new google.maps.LatLng(27.310645, -102.112671));
                    map.setZoom(6.9);
                    break;
                default:
                    map.setCenter(new google.maps.LatLng(23.957484,-102.893582));
                    map.setZoom(5);
                    break;
            }

            var contentString = '<h1 id="firstHeading" class="firstHeading">Casos de Covid-19 en Oaxaca</h1>'+ 
            '<div id="casos">' +
                '<div class="danger">' +
                    '<div style="width:15px;height:15px;background:red;"></div>' +
                    '30 casos de covid-19 confirmados' +
                '</div>' +
                '<div class="danger">' +
                    '<div style="width:15px;height:15px;background:orange;"></div>'+
                    '20 casos bajo sospecha' +
                '</div>' +
                '<div class="danger">' +
                    '<div style="width:15px;height:15px;background:green;"></div>' +
                    '10 casos falsa alarma' +
                '</div>'
            '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.open(map);
        }
    });
    
   
}

function mapaInicial() {
    var lat = 23.957484;
	var long = -102.893582;
	var cordenada = new google.maps.LatLng(lat, long);
    var colores = ['#3e93f0', '#80ca35', '#5BC7AB', '#6d8bbc', '#1597a6', '#85499e', '#ff0080', '#4BB4F5', '#c40062', '#0f88ca', '#5eacd7', '#f2e331', '#06645a', '#61d1bb', '#9797ff', '#9ABF1A', '#0080c0', '#d32607', '#3F6E47', '#ff6600', '#ff9f9f', '#0080ff', '#c6ee3c', '#A3C36D', '#efb429', '#f37e7e', '#e39d1a', '#82d09b', '#800080', '#E0315B', '#486cfb', '#d3faa0'];
    var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5.5,
		center: cordenada,
		gestureHandling: 'cooperative'
    });
    $.ajax({
        url: 'estados.json',
        success: function(respuesta) {
            estados = respuesta;
            var j = 0;
            
            $.each(estados, function(index, value) {
                var triangleCoords = value;
                var bermudaTriangle = new google.maps.Polygon({
                    paths: triangleCoords,
                    strokeColor: '#000000',
                    strokeOpacity: 8,
                    strokeWeight: 1,
                    fillColor: colores[j],
                    fillOpacity: 0.80,
                    estado: index,
                    confirma: 0,
                    sospechoso: 0,
                    falsos: 0      
               });
               j++;
               bermudaTriangle.setMap(map);
               google.maps.event.addListener(bermudaTriangle,'click', function (event) {
      //console.log(event);
      var contentString = '<h1 id="firstHeading" class="firstHeading">Casos de Covid-19 Oaxaca</h1>'+ 
            '<div id="casos">' +
                '<div class="danger">' +
                    '<div style="width:15px;height:15px;background:red;"></div>' +
                    '30 casos de covid-19 confirmados' +
                '</div>' +
                '<div class="danger">' +
                    '<div style="width:15px;height:15px;background:orange;"></div>'+
                    '20 casos bajo sospecha' +
                '</div>' +
                '<div class="danger">' +
                    '<div style="width:15px;height:15px;background:green;"></div>' +
                    '10 casos falsa alarma' +
                '</div>'
            '</div>';
            
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
    infowindow.setPosition(new google.maps.LatLng(20.846939, -100.985934));
    infowindow.open(map);
    console.log('click');
    console.log(this.getPosition());
    //console.log(event.latLng);
  });


            });
            
        }
    });
}