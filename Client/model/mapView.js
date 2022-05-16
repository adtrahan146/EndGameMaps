import * as viewFunctions from '../views/client-views.js';
import * as mapAssets from './mapAssets.js';

class OurMap{

	#position;
	map;
	Marker;

	constructor(){
		this.#position = {
			latitude: 0,
			longitude: 0
		};
		this.Marker = L.marker();
		this.getUserCoords();

	}
	
	initializeMap(){

		this.map = L.map('map');

		//TODO: Take in user coords as params for setView()
		this.map.setView([this.#position.latitude, this.#position.longitude], 11);
		
		var userLoc = L.marker([this.#position.latitude, this.#position.longitude], {icon: mapAssets.goldIcon});
		userLoc.bindPopup(`Your ISP says you're here! Sending goons now.`).openPopup();
		userLoc.addTo(this.map);
	
		//National Geographic free map tiles that look nice on my weak eyes
		var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
			maxZoom: 16,
		});
		this.map.addLayer(Esri_NatGeoWorldMap);

		//Map Binding events
		this.map.on('click', this.startPinCreate);
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

	startPinCreate = (e) =>{

		if (this.Marker) {
			this.map.removeLayer(this.Marker);
		}

		// Add marker to map at click location; add popup window
		// var popup = L.popup();
		// popup.setContent("You clicked the map at " + e.latlng.toString());
		// Marker.bindPopup(popup);

		this.Marker = new L.marker(e.latlng, {
			draggable: true
		}).addTo(this.map);
		
		var pinCreate = document.getElementById('pinCreate');
		var pinLocation = document.getElementById('pinLocation');
		let coords = this.Marker.getLatLng();

		if(pinCreate){
			pinLocation.value = `${coords.lat},${coords.lng}`;
			console.log(pinLocation.value)
			return;
		}
		viewFunctions.getPinCreate();
	}

}

export default new OurMap();