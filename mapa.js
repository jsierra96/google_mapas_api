var map = null;
var infowindow = null;

(function($) {
    var Defaults = $.fn.select2.amd.require('select2/defaults');
    $.extend(Defaults.defaults, {
        searchInputPlaceholder: ''
    });
    var SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');
    var _renderSearchDropdown = SearchDropdown.prototype.render;
    SearchDropdown.prototype.render = function(decorated) {
        var $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));
        this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));
        return $rendered;
    };
})(window.jQuery);

$(document).ready(function(){
    $(".select2").select2({
        searchInputPlaceholder: 'Seleccione un estado para ver los casos del Covid-19'
    });

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

function closeInfoWindow() {
    infoWindow.close();
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
                    position = new google.maps.LatLng(16.334833, -92.573902);
                    estado = 'Chiapas';
                    map.setCenter(position);
                    map.setZoom(7.5);
                    break;
                case 'yucatan':
                    position = new google.maps.LatLng(20.688753, -88.815202);
                    estado = 'Yucatan';
                    map.setCenter(position);
                    map.setZoom(8);
                    break;
                case 'quintana_roo':
                    position = new google.maps.LatLng(19.828958, -88.042534);
                    estado = 'Quintana Roo';
                    map.setCenter(position);
                    map.setZoom(7.5);
                    break;
                case 'campeche':
                    position = new google.maps.LatLng(19.237916, -90.262870);
                    estado = 'Campeche';
                    map.setCenter(position);
                    map.setZoom(7.7);
                    break;
                case 'tabasco':
                    position = new google.maps.LatLng(18.015436, -92.545154);
                    estado = 'Tabasco';
                    map.setCenter(position);
                    map.setZoom(8.5);
                    break;
                case 'nuevo_leon':
                    position = new google.maps.LatLng(25.553093, -99.673743);
                    estado = 'Nuevo Leon';
                    map.setCenter(position);
                    map.setZoom(7);
                    break;
                case 'tamaulipas':
                    position = new google.maps.LatLng(25.071001, -98.562845);
                    estado = 'Tamaulipas';
                    map.setCenter(position);
                    map.setZoom(6.9);
                    break;
                case 'veracruz':
                    position = new google.maps.LatLng(19.852371, -95.718860);
                    estado = 'Veracruz';
                    map.setCenter(position);
                    map.setZoom(7);
                    break;
                case 'sinaloa':
                    position = new google.maps.LatLng(24.668154, -107.762955);
                    estado = 'Sinaloa';
                    map.setCenter(position);
                    map.setZoom(7);
                    break;
                case 'durango':
                    position = new google.maps.LatLng(24.730610, -104.594794);
                    estado = 'Durango';
                    map.setCenter(position);
                    map.setZoom(7.2);
                    break;
                case 'nayarit':
                    position = new google.maps.LatLng(21.875763, -104.809391);
                    estado = 'Nayarit';
                    map.setCenter(position);
                    map.setZoom(8);
                    break;
                case 'zacatecas':
                    position = new google.maps.LatLng(23.150327, -102.845140);
                    estado = 'Zacatecas';
                    map.setCenter(position);
                    map.setZoom(7.3);
                    break;
                case 'aguas_calientes':
                    position = new google.maps.LatLng(22.010136, -102.391847);
                    estado = 'Aguas Calientes';
                    map.setCenter(position);
                    map.setZoom(9.6);
                    break;
                case 'jalisco':
                    position = new google.maps.LatLng(20.754541, -103.466452);
                    estado = 'Jalisco';
                    map.setCenter(position);
                    map.setZoom(7.4);
                    break;
                case 'colima':
                    position = new google.maps.LatLng(19.117700, -103.982462);
                    estado = 'Colima';
                    map.setCenter(position);
                    map.setZoom(9.5);
                    break;
                case 'san_luis_potosi':
                    position = new google.maps.LatLng(22.766211, -100.119324);
                    estado = 'San Luis Potosi';
                    map.setCenter(position);
                    map.setZoom(7.5);
                    break;
                case 'guanajuato':
                    position = new google.maps.LatLng(20.846939, -100.985934);
                    estado = 'Guanajuato';
                    map.setCenter(position);
                    map.setZoom(8.5);
                    break;
                case 'queretaro':
                    position = new google.maps.LatLng(20.808228, -99.811711);
                    estado = 'Queretaro';
                    map.setCenter(position);
                    map.setZoom(8.5);
                    break;
                case 'hidalgo':
                    position = new google.maps.LatLng(20.510104, -98.872940);
                    estado = 'Hidalgo';
                    map.setCenter(position);
                    map.setZoom(8.5);
                    break;
                case 'tlaxcala':
                    position = new google.maps.LatLng(19.431481, -98.151294);
                    estado = 'Tlaxcala';
                    map.setCenter(position);
                    map.setZoom(10);
                    break;
                case 'puebla':
                    position = new google.maps.LatLng(19.362556, -97.815792);
                    estado = 'Puebla';
                    map.setCenter(position);
                    map.setZoom(7.7);
                    break;
                case 'ciudad_de_mexico':
                    position = new google.maps.LatLng(19.345862, -99.145089);
                    estado ='Ciudad de México';
                    map.setCenter(position);
                    map.setZoom(10);
                    break;
                case 'estado_de_mexico':
                    position = new google.maps.LatLng(19.325549, -99.638082);
                    estado = 'Estado de México';
                    map.setCenter(position);
                    map.setZoom(8.4);
                    break;
                case 'baja_california_norte':
                    position = new google.maps.LatLng(30.443618, -115.541816);
                    estado = 'Baja California';
                    map.setCenter(position);
                    map.setZoom(7);
                    break;
                case 'baja_california_sur':
                    position = new google.maps.LatLng(25.379246, -112.584538);
                    estado = 'Baja California Sur';
                    map.setCenter(position);
                    map.setZoom(6.9);
                    break;
                case 'sonora':
                    position = new google.maps.LatLng(29.319213, -111.433271);
                    estado = 'Sonora';
                    map.setCenter(position);
                    map.setZoom(6.6);
                    break;
                case 'chihuahua':
                    position = new google.maps.LatLng(28.865064, -106.324935);
                    estado = 'Chihuahua';
                    map.setCenter(position);
                    map.setZoom(6.5);
                    break;
                case 'coahuila':
                    position = new google.maps.LatLng(27.310645, -102.112671); 
                    estado = 'Coahuila';
                    map.setCenter(new google.maps.LatLng(27.310645, -102.112671));
                    map.setZoom(6.9);
                    break;
                default:
                    map.setCenter(new google.maps.LatLng(23.957484,-102.893582));
                    map.setZoom(5);
                    break;
            }

            var contentString = '<h1 id="firstHeading" class="firstHeading">Casos de Covid-19 en ' + estado +'</h1>'+ 
            '<div id="casos">' +
                '<div class="danger">' +
                    '<div style="background:red;">30</div>' +
                    ' Casos confirmados' +
                '</div>' +
                '<div class="danger">' +
                    '<div style="background:orange;">20</div>'+
                    ' Casos sospechosos' +
                '</div>' +
                '<div class="danger">' +
                    '<div style="background:green;">10</div>' +
                    ' Casos falsos' +
                '</div>'
            '</div>';

            infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.setPosition(position);
            infowindow.open(map);
        }
    });
    
   
}

function mapaInicial() {
    var lat = 23.957484;
	var long = -102.893582;
	var cordenada = new google.maps.LatLng(lat, long);
    var colores = ['#3e93f0', '#80ca35', '#5BC7AB', '#6d8bbc', '#1597a6', '#85499e', '#ff0080', '#4BB4F5', '#c40062', '#0f88ca', '#5eacd7', '#f2e331', '#06645a', '#61d1bb', '#9797ff', '#9ABF1A', '#0080c0', '#d32607', '#3F6E47', '#ff6600', '#ff9f9f', '#0080ff', '#c6ee3c', '#A3C36D', '#efb429', '#f37e7e', '#e39d1a', '#82d09b', '#800080', '#E0315B', '#486cfb', '#d3faa0'];
    map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5.5,
		center: cordenada,
		gestureHandling: 'cooperative'
    });
    infowindow = new google.maps.InfoWindow();
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

                google.maps.event.addListener(map, 'click', function(){
                    closeInfoWindow();
                });
               
                bermudaTriangle.setMap(map);
                bermudaTriangle.addListener('click', function (event) {

                switch (index) {
                    case 'oaxaca':
                        position = new google.maps.LatLng(17.063564, -96.734705);
                        estado = 'Oaxaca';
                        break;
                    case 'guerrero':
                        position = new google.maps.LatLng(17.740056, -100.096706);
                        estado = 'Guerrero';
                        break;
                    case 'morelos':
                        position = new google.maps.LatLng(18.744209, -99.066642);
                        estado = 'Morelos';
                        break;
                    case 'michoacan':
                        position = new google.maps.LatLng(19.229152, -101.851743);
                        estado = 'Michoacan';
                        break;
                    case 'chiapas':
                        position = new google.maps.LatLng(16.334833, -92.573902);
                        estado = 'Chiapas';
                        break;
                    case 'yucatan':
                        position = new google.maps.LatLng(20.688753, -88.815202);
                        estado = 'Yucatan';
                        break;
                    case 'quintana_roo':
                        position = new google.maps.LatLng(19.828958, -88.042534);
                        estado = 'Quintana Roo';
                        break;
                    case 'campeche':
                        position = new google.maps.LatLng(19.237916, -90.262870);
                        estado = 'Campeche';
                        break;
                    case 'tabasco':
                        position = new google.maps.LatLng(18.015436, -92.545154);
                        estado = 'Tabasco';
                        break;
                    case 'nuevo_leon':
                        position = new google.maps.LatLng(25.553093, -99.673743);
                        estado = 'Nuevo Leon';
                        break;
                    case 'tamaulipas':
                        position = new google.maps.LatLng(25.071001, -98.562845);
                        estado = 'Tamaulipas';
                        break;
                    case 'veracruz':
                        position = new google.maps.LatLng(19.852371, -95.718860);
                        estado = 'Veracruz';
                        break;
                    case 'sinaloa':
                        position = new google.maps.LatLng(24.668154, -107.762955);
                        estado = 'Sinaloa';
                        break;
                    case 'durango':
                        position = new google.maps.LatLng(24.730610, -104.594794);
                        estado = 'Durango';
                        break;
                    case 'nayarit':
                        position = new google.maps.LatLng(21.875763, -104.809391);
                        estado = 'Nayarit';
                        break;
                    case 'zacatecas':
                        position = new google.maps.LatLng(23.150327, -102.845140);
                        estado = 'Zacatecas';
                        break;
                    case 'aguas_calientes':
                        position = new google.maps.LatLng(22.010136, -102.391847);
                        estado = 'Aguas Calientes';
                        break;
                    case 'jalisco':
                        position = new google.maps.LatLng(20.754541, -103.466452);
                        estado = 'Jalisco';
                        break;
                    case 'colima':
                        position = new google.maps.LatLng(19.117700, -103.982462);
                        estado = 'Colima';
                        break;
                    case 'san_luis_potosi':
                        position = new google.maps.LatLng(22.766211, -100.119324);
                        estado = 'San Luis Potosi';
                        break;
                    case 'guanajuato':
                        position = new google.maps.LatLng(20.846939, -100.985934);
                        estado = 'Guanajuato';
                        break;
                    case 'queretaro':
                        position = new google.maps.LatLng(20.808228, -99.811711);
                        estado = 'Queretaro';
                        break;
                    case 'hidalgo':
                        position = new google.maps.LatLng(20.510104, -98.872940);
                        estado = 'Hidalgo';
                        break;
                    case 'tlaxcala':
                        position = new google.maps.LatLng(19.431481, -98.151294);
                        estado = 'Tlaxcala';
                        break;
                    case 'puebla':
                        position = new google.maps.LatLng(19.362556, -97.815792);
                        estado = 'Puebla';
                        break;
                    case 'ciudad_de_mexico':
                        position = new google.maps.LatLng(19.345862, -99.145089);
                        estado ='Ciudad de México';
                        break;
                    case 'estado_de_mexico':
                        position = new google.maps.LatLng(19.325549, -99.638082);
                        estado = 'Estado de México';
                        break;
                    case 'baja_california_norte':
                        position = new google.maps.LatLng(30.443618, -115.541816);
                        estado = 'Baja California';
                        break;
                    case 'baja_california_sur':
                        position = new google.maps.LatLng(25.379246, -112.584538);
                        estado = 'Baja California Sur';
                        break;
                    case 'sonora':
                        position = new google.maps.LatLng(29.319213, -111.433271);
                        estado = 'Sonora';
                        break;
                    case 'chihuahua':
                        position = new google.maps.LatLng(28.865064, -106.324935);
                        estado = 'Chihuahua';
                        break;
                    case 'coahuila':
                        position = new google.maps.LatLng(27.310645, -102.112671); 
                        estado = 'Coahuila';
                        break;
                    default:
                        map.setCenter(new google.maps.LatLng(23.957484,-102.893582));
                        map.setZoom(5);
                        break;
                }

                    var contentString = '<h1 id="firstHeading" class="firstHeading">Casos de Covid-19 en '+estado+'</h1>'+ 
                        '<div id="casos">' +
                            '<div class="danger">' +
                                '<div style="background:red;">30</div>' +
                                'Casos confirmados' +
                            '</div>' +
                            '<div class="danger">' +
                                '<div style="background:orange;">20</div>'+
                                'Casos sospechosos' +
                            '</div>' +
                            '<div class="danger">' +
                                '<div style="background:green;">10</div>' +
                                'Casos falsos' +
                            '</div>'
                        '</div>';
            
                    infowindow.setContent(contentString);
                    infowindow.setPosition(position);
                    infowindow.open(map);
                    console.log('click');
                });
            });
        }
    });
}
