

export default class Map{
	#lng;
	#lat;
	#map = L.map('map');
	
	setupMap(){
		getUserCoords();
	
		//TODO: Take in user coords as params for setView()
		var map = L.map('map');
		map.setView([lat, lng], 10);
	
	
		
		//National Geographic free map tiles that look nice on my weak eyes
		var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
			maxZoom: 16
		});
		map.addLayer(Esri_NatGeoWorldMap);
	}
	
	getUserCoords(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getPosition);
		}
	}
	getPosition(position) {
		lng = position.coords.longitude;
		lat = position.coords.latitude;
	  
		// Some other code here (does not affect the API)
	}

}
