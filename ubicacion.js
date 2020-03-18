$(document).ready(function () {
	initMap2();
	sessionStorage.setItem('idCategoria', 'null');
	sessionStorage.setItem('idEstado', 'null');
	sessionStorage.setItem('descripcionEstado', 'null');

	var pageAnterior = document.referrer;
	var arrayPage = pageAnterior.split('/');
	var size = $("#base_url").val().split('/');
	console.log(arrayPage.length + " ==" + (size.length + 2));
	console.log("la pagina: ", arrayPage);
	if (arrayPage.length == (size.length + 2)){
			destruirVentana();
		var result = arrayPage[arrayPage.length-1];
			var est = sessionStorage.getItem('idEstado');
			if (result == "null" && est == "null") {
				initMap2();
			} else {
				sessionStorage.setItem('idCategoria', result);
				initMap4();
			}
			var nombre = $(elemt).data("nombre");
			$('#estadoCategoria').html(nombre);
	}

});

async function initMap4() {
	var markers = '';
	var existenArticulos = 0;
    var id_e = sessionStorage.getItem('idEstado');
	var id_c = sessionStorage.getItem('idCategoria');
	var jsondata = {
		"estado": id_e,
		"categoria": id_c
	};
	markers = await CargarAjaxJson(jsondata, './api/ubicaciones');
	
	if( markers == null){
		markers = 'ninguno';
		existenArticulos = 0;
	}
	if(markers.tipo) {
		
	    if(markers.tipo == "danger"){
	      	$('#alertaAjax').html(alertaAjax(markers.tipo, markers.mensaje));
		  	setTimeout(function(){ $('#alertaAjax').html(""); }, 6000);
	    }
	} else {
		var esta = '';
		var map;
		var bounds = new google.maps.LatLngBounds();
		var infoWindow = new google.maps.InfoWindow(),
			marker, i;
		var lat = 23.957484;
		var long = -102.893582;
		var cordenada = new google.maps.LatLng(lat, long);
		var map = new google.maps.Map(document.getElementById('mapa1'), {
			zoom: 5,
			center: cordenada,
			gestureHandling: 'cooperative',
			mapTypeId: 'roadmap'
		});


		map.addListener('maptypeid_changed', function () {
			if (this.mapTypeId == "hybrid") {
				removeLine();
			} else {
				bermudaTriangle.setMap(map);
			}
			//console.log(this.mapTypeId);
		});
	
		map.addListener('zoom_changed', function () {
			if (this.zoom < 5) {
				map.setZoom(5);
			}
		});
	
		try {
			esta = sessionStorage.getItem('descripcionEstado');
			var data = await ajaxCargarJsonEstados('./estados.json');
			//var map = data.map()
			var triangleCoords = data[esta];
			//var triangleCoords = data.quintana_roo;

			//console.log("datos: " + data);
		} catch (error) {
			console.log(error);
		}

/*
					Se encarga de sombrear el estado
*/
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
	function removeLine() {
		bermudaTriangle.setMap(null);
	}

	google.maps.event.addListener(bermudaTriangle, 'click', function () {
		console.log(this);
	});
	//console.log('Los makers son: ', markers);
	
	for (i = 0; i < markers.length; i++) {
		existenArticulos = 1;
		var position = new google.maps.LatLng(markers[i].latitud, markers[i].longitud);
		bounds.extend(position);
		var image = markers[i].url_m;
		marker = new google.maps.Marker({
			position: position,
			map: map,
			icon: image,
			center: position,
			title: markers[i].nombre_u,
			id: markers[i].id_u,
			draggable: false,
			animation: google.maps.Animation.DROP,
		});

		// Add info window to marker    
		google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
			return function () {
				infoWindow.setContent(Contenthtml(markers[i].nombre_u, markers[i].descripcion_u));
				infoWindow.open(map, marker);
			}
		})(marker, i));

		google.maps.event.addListener(marker, 'mouseout', (function (marker, i) {
			return function () {
				infoWindow.close(map, marker);
			}
		})(marker, i));

		google.maps.event.addListener(marker, 'click', (function (marker, i) {

			return function () {
				//console.log(this.id);
				sessionStorage.setItem('idpin', this.id);
				cargarVentanaPin();
			}
		})(marker, i));
		google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {

			return function () {
				if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
			}
		})(marker, i));
		google.maps.event.addListener(marker, 'mouseout', (function (marker, i) {

			return function () {
				if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
			}
		})(marker, i));
		//map.fitBounds(bounds);
	}

	function Contenthtml(nombre, descripcion) {
		html = '<div id="ventanapin"><h6>' + nombre + '</h6><p>' + descripcion + '</p></div>';
		return html;
	}

	// Set zoom level
	//marker.setMap(null);
	/*var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
		this.setZoom(9);
		google.maps.event.removeListener(boundsListener);
	});*/
	}

	switch (esta) {
		case 'oaxaca':
			map.setCenter(new google.maps.LatLng(17.063564, -96.734705));
			map.setZoom(8);
			break;
		case 'guerrero':
			map.setCenter(new google.maps.LatLng(17.740056, -100.096706));
			map.setZoom(8);
			break;
		case 'morelos':
			map.setCenter(new google.maps.LatLng(18.744209, -99.066642));
			map.setZoom(9.5);
			break;
		case 'michoacan':
			map.setCenter(new google.maps.LatLng(19.229152, -101.851743));
			map.setZoom(8);
			break;
		case 'chiapas':
			map.setCenter(new google.maps.LatLng(16.334833, -92.573902));
			map.setZoom(7.5);
			break;
		case 'yucatan':
			map.setCenter(new google.maps.LatLng(20.688753, -88.815202));
			map.setZoom(8);
			break;
		case 'quintana_roo':
			map.setCenter(new google.maps.LatLng(19.828958, -88.042534));
			map.setZoom(7.5);
			break;
		case 'campeche':
			map.setCenter(new google.maps.LatLng(19.237916, -90.262870));
			map.setZoom(7.7);
			break;
		case 'tabasco':
			map.setCenter(new google.maps.LatLng(18.015436, -92.545154));
			map.setZoom(8.5);
			break;
		case 'nuevo_leon':
			map.setCenter(new google.maps.LatLng(25.553093, -99.673743));
			map.setZoom(7);
			break;
		case 'tamaulipas':
			map.setCenter(new google.maps.LatLng(25.071001, -98.562845));
			map.setZoom(6.9);
			break;
		case 'veracruz':
			map.setCenter(new google.maps.LatLng(19.852371, -95.718860));
			map.setZoom(7);
			break;
		case 'sinaloa':
			map.setCenter(new google.maps.LatLng(24.668154, -107.762955));
			map.setZoom(7);
			break;
		case 'durango':
			map.setCenter(new google.maps.LatLng(24.730610, -104.594794));
			map.setZoom(7.2);
			break;
		case 'nayarit':
			map.setCenter(new google.maps.LatLng(21.875763, -104.809391));
			map.setZoom(8);
			break;
		case 'zacatecas':
			map.setCenter(new google.maps.LatLng(23.150327, -102.845140));
			map.setZoom(7.3);
			break;
		case 'aguas_calientes':
			map.setCenter(new google.maps.LatLng(22.010136, -102.391847));
			map.setZoom(9.6);
			break;
		case 'jalisco':
			map.setCenter(new google.maps.LatLng(20.754541, -103.466452));
			map.setZoom(7.4);
			break;
		case 'colima':
			map.setCenter(new google.maps.LatLng(19.117700, -103.982462));
			map.setZoom(9.5);
			break;
		case 'san_luis_potosi':
			map.setCenter(new google.maps.LatLng(22.766211, -100.119324));
			map.setZoom(7.5);
			break;
		case 'guanajuato':
			map.setCenter(new google.maps.LatLng(20.846939, -100.985934));
			map.setZoom(8.5);
			break;
		case 'queretaro':
			map.setCenter(new google.maps.LatLng(20.808228, -99.811711));
			map.setZoom(8.5);
			break;
		case 'hidalgo':
			map.setCenter(new google.maps.LatLng(20.510104, -98.872940));
			map.setZoom(8.5);
			break;
		case 'tlaxcala':
			map.setCenter(new google.maps.LatLng(19.431481, -98.151294));
			map.setZoom(10);
			break;
		case 'puebla':
			map.setCenter(new google.maps.LatLng(19.362556, -97.815792));
			map.setZoom(7.7);
			break;
		case 'ciudad_de_mexico':
			map.setCenter(new google.maps.LatLng(19.345862, -99.145089));
			map.setZoom(10);
			break;
		case 'estado_de_mexico':
			map.setCenter(new google.maps.LatLng(19.325549, -99.638082));
			map.setZoom(8.4);
			break;
		case 'baja_california_norte':
			map.setCenter(new google.maps.LatLng(30.443618, -115.541816));
			map.setZoom(7);
			break;
		case 'baja_california_sur':
			map.setCenter(new google.maps.LatLng(25.379246, -112.584538));
			map.setZoom(6.9);
			break;
		case 'sonora':
			map.setCenter(new google.maps.LatLng(29.319213, -111.433271));
			map.setZoom(6.6);
			break;
		case 'chihuahua':
			map.setCenter(new google.maps.LatLng(28.865064, -106.324935));
			map.setZoom(6.5);
			break;
		case 'coahuila':
			map.setCenter(new google.maps.LatLng(27.310645, -102.112671));
			map.setZoom(6.9);
			break;
		default:
			map.setCenter(new google.maps.LatLng(23.957484,-102.893582));
			map.setZoom(5);
			break;
	}
	

	if( id_c == 0) {
		map.setZoom(5);
	}

	if( markers == "ninguno" ) {
		
		$('#alertaAjax').html(alertaAjax("danger", "No existen articulos en este estado con la categoria seleccionada."));
		setTimeout(function(){ $('#alertaAjax').html(""); }, 6000);
	}
}


async function initMap4_respaldo() {
	var map;
	var bounds = new google.maps.LatLngBounds();
	var infoWindow = new google.maps.InfoWindow(),
		marker, i;

	var lat = 23.957484;
	var long = -102.893582;
	var cordenada = new google.maps.LatLng(lat, long);
	var map = new google.maps.Map(document.getElementById('mapa1'), {
		zoom: 5.5,
		center: cordenada,
		gestureHandling: 'cooperative',
		mapTypeId: 'roadmap'
	});


	map.addListener('maptypeid_changed', function () {
		if (this.mapTypeId == "hybrid") {
			removeLine();
		} else {
			bermudaTriangle.setMap(map);
		}
	});
	
	map.addListener('zoom_changed', function () {
		if (this.zoom < 5) {
			map.setZoom(5);
		}
	});
	
	try {
		var esta = sessionStorage.getItem('descripcionEstado');
		var data = await ajaxCargarJsonEstados('./estados.json');
		//var map = data.map()
		var triangleCoords = data[esta];
		//var triangleCoords = data.quintana_roo;

	} catch (error) {
		console.log(error);
	}
	// Construct the polygon.
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
	function removeLine() {
		bermudaTriangle.setMap(null);
	}

	google.maps.event.addListener(bermudaTriangle, 'click', function () {
		console.log(this);
	});

	var id_e = sessionStorage.getItem('idEstado');
	var id_c = sessionStorage.getItem('idCategoria');
	var jsondata = {
		"estado": id_e,
		"categoria": id_c
	};

	var markers = await CargarAjaxJson(jsondata, './api/ubicaciones');
	for (i = 0; i < markers.length; i++) {
		var position = new google.maps.LatLng(markers[i].latitud, markers[i].longitud);
		bounds.extend(position);
		var image = markers[i].url_m;
		marker = new google.maps.Marker({
			position: position,
			map: map,
			icon: image,
			center: position,
			title: markers[i].nombre_u,
			id: markers[i].id_u,
			draggable: false,
			animation: google.maps.Animation.DROP,
		});

		// Add info window to marker    
		google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
			return function () {
				infoWindow.setContent(Contenthtml(markers[i].nombre_u, markers[i].descripcion_u));
				infoWindow.open(map, marker);
			}
		})(marker, i));

		google.maps.event.addListener(marker, 'mouseout', (function (marker, i) {
			return function () {
				infoWindow.close(map, marker);
			}
		})(marker, i));

		google.maps.event.addListener(marker, 'click', (function (marker, i) {

			return function () {
				sessionStorage.setItem('idpin', this.id);
				cargarVentanaPin();
			}
		})(marker, i));
		google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {

			return function () {
				if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
			}
		})(marker, i));
		google.maps.event.addListener(marker, 'mouseout', (function (marker, i) {

			return function () {
				if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
			}
		})(marker, i));
		map.fitBounds(bounds);
	}

	function Contenthtml(nombre, descripcion) {
		html = '<div id="ventanapin"><h6>' + nombre + '</h6><p>' + descripcion + '</p></div>';
		return html;
	}

	// Set zoom level
	var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
		this.setZoom(8);
		google.maps.event.removeListener(boundsListener);
	});
}


async function initMap2() {
	var lat = 23.957484;
	var long = -102.893582;
	var cordenada = new google.maps.LatLng(lat, long);
	var map = new google.maps.Map(document.getElementById('mapa1'), {
		zoom: 5.5,
		center: cordenada,
		gestureHandling: 'cooperative'
	});

	map.addListener('center_changed', function () {
		// 3 seconds after the center of the map has changed, pan back to the
		// marker.
		window.setTimeout(function () {
			// map.setCenter(cordenada);
			//map.setZoom(5.5);
		}, 3000);
	});

	map.addListener('maptypeid_changed', function () {
		if (this.mapTypeId == "hybrid") {
			removeLine();
		} else {
			bermudaTriangle.setMap(map);
		}
	});
	map.addListener('zoom_changed', function () {
		if (this.zoom < 5) {
			map.setZoom(5);
		}
	});
	google.maps.event.addListener(map, "click", function (overlay, latlng) {
		console.log(this);
	});

	var data = await ajaxCargarJsonEstados('./estados.json');
	var datos = await CargarAjaxJson('', './api/todosestados');
	for (var i = 0; i < datos.length; i++) {
		var res = datos[i].descripcion_e
		var triangleCoords = data[res];

		var bermudaTriangle = new google.maps.Polygon({
			paths: triangleCoords,
			strokeColor: '#000000',
			strokeOpacity: 8,
			strokeWeight: 1,
			fillColor: datos[i].color,
			fillOpacity: 0.80,
			id: datos[i].id_e,
			nombre: datos[i].nombre_e,
			descripcion: datos[i].descripcion_e

		});
		bermudaTriangle.setMap(map);
		//evento click
		google.maps.event.addListener(bermudaTriangle, 'click', function () {
			var idEstado = sessionStorage.getItem('idEstado');
	        $("#selecetEstados > option[value="+ idEstado +"]").removeAttr("selected");
			sessionStorage.setItem('idEstado', this.id);
			sessionStorage.setItem('descripcionEstado', this.descripcion);
			$("#selecetEstados > option[value="+ this.id +"]").attr("selected",true);
			initMap4();
		});

		//evento mousover
		bermudaTriangle.addListener('mouseover', showArrays);

		var infoWindow = new google.maps.InfoWindow;

		function showArrays(event) {

			//ventana info
			infoWindow.setContent(ContentHtmlEstado(this.nombre, this.id));
			infoWindow.setPosition(event.latLng);
			infoWindow.open(map);
		}
	}

	function ContentHtmlEstado(nombre, id) {
		html = '<div id="nombreestado"><h6>' + nombre + '</h6><a onClick="cargarhistoria(this)" href="javascript:void(0)" data-id="'+ id +'">Ver historia</a></div>';
		return html;
	}
}

async function cargarhistoria(elemnt){
	var id = $(elemnt).data("id");
	 var datos = await CargarAjaxJson({"id": id},'./api/cargarhistoria');
	 if(datos.tipo == "danger"){
		 $('#alertaAjax').html(alertaAjax(datos.tipo, datos.mensaje));
		 //$('#modalfomriniciarsesion').modal('show');
		 setTimeout(function(){ $('#alertaAjax').html(""); }, 6000);
		 
	 }else{
		 $("#popup").css('visibility','visible');
		 $("#popup").css('opacity','1');
		 $(".popup-inner").addClass('rotate-card');
		 $(".popup__photo img").attr('src', datos.html.escudo);
		$(".popup__text h1").text(datos.html.nombre_e);
		$(".popup__text div").empty();
		$(".popup__text div").animate({scrollTop:0}, 'slow');
		$(".popup__text div").append(datos.html.historia);
		console.log("La historia", datos);
	 }
}

function cerrarHistoria(){
	$("#popup").css('visibility','hidden');
	$("#popup").css('opacity','0');
	$(".popup-inner").removeClass('rotate-card');
}


async function initMap() {
	var lat = 23.957484;
	var long = -102.893582;
	var cordenada = new google.maps.LatLng(lat, long);
	var map = new google.maps.Map(document.getElementById('mapa1'), {
		zoom: 5.5,
		center: cordenada,
		gestureHandling: 'cooperative'
	});


	map.addListener('center_changed', function () {
		// 3 seconds after the center of the map has changed, pan back to the
		// marker.
		console.log(this);
		window.setTimeout(function () {
			// map.setCenter(cordenada);
			//map.setZoom(5.5);
		}, 3000);
	});

	map.addListener('maptypeid_changed', function () {
		if (this.mapTypeId == "hybrid") {
			removeLine();
		} else {
			bermudaTriangle.setMap(map);
		}
		//console.log(this.mapTypeId);
	});
	map.addListener('zoom_changed', function () {
		if (this.zoom < 5) {
			map.setZoom(5);
		}
	});
}

async function ajaxCargarJsonEstados(url) {
	try {
		const response = await fetch(url, {
			method: 'POST'
		});
		return JSON.parse(await response.text());

	} catch (err) {
		console.log('Error en el ajax:', err);
	}
}

function cargarEstados() {
	var idEstado = sessionStorage.getItem('idEstado');
    $("#selecetEstados > option[value="+ idEstado +"]").removeAttr("selected");
	var result = $('select[id=selecetEstados]').val();
	var descripcion = $('#selecetEstados option:selected').data("des");
	$("#selecetEstados > option[value="+ result +"]").attr("selected",true);
	sessionStorage.setItem('idEstado', result);
	sessionStorage.setItem('descripcionEstado', descripcion);
	console.log($("#estadoCategoria").text());
	if( $("#estadoCategoria").text() === "Categorias"){
		$('#alertaAjax').html(alertaAjax("success", "Elija una categoría."));
		setTimeout(function(){ $('#alertaAjax').html(""); }, 6000);
	}else {
		initMap4();	
	}
	
	//initMap4();
/*	if (result == "0" ) {
		sessionStorage.setItem('idEstado', result);
		initMap2();
	} else {
		sessionStorage.setItem('idEstado', result);
		sessionStorage.setItem('descripcionEstado', descripcion);
		console.log("estado: " + result);
		initMap4();
	}*/
}

function cargarCategorias(elemt) {
	
	var pathname = window.location.pathname;
	var cadena = pathname.split('/');
	if (cadena[cadena.length - 1] ){
		//window.location.href = './';
		setTimeout(function () {
			abrir(elemt);
		}, 2000);
	}else{
		abrir(elemt);
	}
}

function abrir(elemt){
	destruirVentana();
	var result = $(elemt).data("id");
	var est = sessionStorage.getItem('idEstado');
	if (result == "null" && est == "null") {
		initMap2();
	} else {
		sessionStorage.setItem('idCategoria', result);
		initMap4();
	}
	var nombre = $(elemt).data("nombre");
	$('#estadoCategoria').html(nombre);
}

function traerCategoria(elemt){
	var result = $(elemt).data("id");
	sessionStorage.setItem('idCategoria', result);
	initMap4();
}


async function CargarAjaxJson(data, url) {
	try {
		$('#iconocarga').html('<img class="imagencarga" src="./assets/img/loading.gif" alt="">');
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		/*
		var respuesta = await response.text();
		$('#error').html(respuesta);
		*/
		$('#iconocarga').html('');
		const respuesta = JSON.parse(await response.text());
		if(respuesta == ""){
		  $('#alertaAjax').html(alertaAjax('danger', '. No se encontraron resultados.'));
		  setTimeout(function(){ $('#alertaAjax').html(""); }, 6000);
		}
		return respuesta;

	} catch (err) {
		$('#alertaAjax').html(alertaAjax('danger', '. No se encontraron resultados.'));
		  setTimeout(function(){ $('#alertaAjax').html(""); }, 6000);
		$('#iconocarga').html('');
		console.log('Error en el ajax:', err);
	}
}

function cargarVentanaPin() {
	var pin = sessionStorage.getItem('idpin');
	//console.log(pin);
	var data = new URLSearchParams("id=" + pin);
	var url = './api/ubicacion';
	ajaxCargarPinVentana(data, url);
}


async function ajaxCargarPinVentana(data, url) {
	try {
		$('#iconocarga').html('<img class="imagencarga" src="./assets/img/loading.gif" alt="">');
		const response = await fetch(url, {
			method: 'POST',
			body: data
		});
		/*
		var respuesta = await response.text();
		$('#error').html(respuesta);
		*/
		var respuesta = JSON.parse(await response.text());
		console.log(respuesta);
		$('#iconocarga').html('');
		ventana(respuesta);

	} catch (err) {
		destruirVentana();
		$('#alertaAjax').html(alertaAjax('danger', '. No se encontraron resultados.'));
		  setTimeout(function(){ $('#alertaAjax').html(""); }, 6000);
		$('#iconocarga').html('');
		//console.log('Error en el ajax:', err);
	}
}

function ventana(respuesta) {
	var ancho = $(window).width();
	
	if(ancho>=974){
        $('#mapa1').removeClass('col-12');
		$('#mapa1').addClass('col-6');

		setTimeout(function () {
			if ($("#ventanaopen").length > 0) {
				//si existe solo remplazar el contenido
				$('#ventanaopen').html(crearVentana(respuesta));
			} else {
				$('#contenedormap').append('<div id="ventanaopen" class="col-6"></div>');
				$('#ventanaopen').html(crearVentana(respuesta));
			}
		}, 1000);
    } else {
			
    $('#mapa1').removeClass('col-6');
	$('#mapa1').addClass('col-12');
	if ($("#ventanaopen").length > 0) {
		//si existe solo remplazar el contenido
		$('#ventanaopen').html(crearVentana(respuesta));
	} else {
		$('#contenedormap').append('<div id="ventanaopen" class="col-12"></div>');
		$('#ventanaopen').html(crearVentana(respuesta));
	}
			
		}
}

function crearVentana(json) {
	if (Array.isArray(json)) {
		json = json[0];
	}
	
	var html = '<button onClick="destruirVentana()" type="button" class="close btncloseventana" aria-label="Close"><span aria-hidden="true">&times;</span></button><div id="imgventana" class="img_ventana" style="background-image: url(' + json.url_i +');"></div><div class="contVentana"><h5>' + json.nombre_ar + '</h5><p>' + json.descripcion_u + '</p><div><a data-id="'+ json.id_ar +'" onClick="cargarArticulo(this)" class="btn_ver_ventana">Ver más...</a></div></div>';
	return html;
}

function destruirVentana() {
	$('#ventanaopen').remove();
	$('#mapa1').removeClass('col-6 ');
	$('#mapa1').addClass('col-12');
}

function direccion(element) {
	var lat = $(element).data("lat");
	var long = $(element).data("long");
	var url = 'https://www.google.com/maps?ll=' + lat + ',' + long + '&z=19&t=m&hl=es-ES&gl=US&mapclient=apiv3'
	window.open(url);
}

function cargarArticulo(elemnt){
  var id = $(elemnt).data("id");
  var url = "./articulo";
  window.location.href = url + '?id=' + id;
  //window.open(url + '?id='+ id, '_blank');
}