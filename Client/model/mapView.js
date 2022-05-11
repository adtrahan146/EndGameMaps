// import * as L from '../node_modules/leaflet/dist/leaflet.js';

class OurMap{

	#position;
	#map;

	constructor(){
		this.#position = {
			latitude: 0,
			longitude: 0
		};
		this.getUserCoords();
	}
	
	initializeMap(){
	
		//TODO: Take in user coords as params for setView()
		this.#map = L.map('map');
		this.#map.setView([this.#position.latitude, this.#position.longitude], 10);
	
		//National Geographic free map tiles that look nice on my weak eyes
		var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
			maxZoom: 16
		});
		this.#map.addLayer(Esri_NatGeoWorldMap);
	}
	
	getUserCoords(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getPosition);
		}else{
			return;
		}
	}

	getPosition = (position) => {

		this.#position.latitude = position.coords.latitude;
		this.#position.longitude = position.coords.longitude;
	  
		// Some other code here (does not affect the API)
	}

}

export default new OurMap();