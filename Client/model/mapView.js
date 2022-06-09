import * as viewFunctions from '../views/client-views.js';
import * as mapAssets from './mapAssets.js';
const BASE_URL = 'http://localhost:3000';

class OurMap{

	#position;
	map;
	Marker;
	allPins;

	constructor(){
		this.#position = {
			latitude: 0,
			longitude: 0
		};
		this.Marker = L.marker();
		this.getUserCoords();
		this.allPins = [];
	}
	
	async initializeMap(){

		this.map = L.map('map');

		//TODO: Take in user coords as params for setView()
		this.map.setView([this.#position.latitude, this.#position.longitude], 11);
		await this.getAllPins();
		
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
	
	//Called to get coords to display users location
	getUserCoords(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getPosition, null, (e) =>{
				enableHighAccuracy: true
			});
		}else{
			return;
		}
	}

	//return function from getUserCoords that gets users current location based on ISP addr.
	getPosition = (position) => {

		this.#position.latitude = position.coords.latitude;
		this.#position.longitude = position.coords.longitude;
	  
		// Some other code here (does not affect the API)
	}

	getAllPins = async () =>{
		try {	
			const url = `${BASE_URL}/mapView/generatePins`;
			const response = await fetch(url);
			const pins = await response.json();
			this.addPinsToMapView(pins);

		} catch (error) {
			console.log(error);
		}
	}
	addPinsToMapView = (pins) =>{
		for(let i=0; i<pins.length; i++){
			var coords = pins[i].pinLocation.split(',');
			var lat = coords[0];
			var lng = coords[1];
			var pin = L.marker([lat, lng], {icon: mapAssets.greenIcon, title: pins[i].pinName});
			pin.bindPopup(`
					<i>Name</i>:  ${pins[i].pinName}<br>
					<i>Category</i>:  ${pins[i].pinCategory}<br>
					<i>User Comments</i>:  ${pins[i].comments}<br>
					<i>Author</i>:  ${pins[i].username}<br>
			`, {className: 'text-center justify-content-center maps-font'}).openPopup();
			this.allPins.push(pin);
			pin.addTo(this.map);
		}
	}

	//Called when clicked on map
	startPinCreate = (e) =>{

		if (this.Marker) {
			this.map.removeLayer(this.Marker);
		}
		// if(!sessionStorage.token || sessionStorage===''){
		// 	alert('You must make an account first!');
		// 	return;
		// }

		// Add marker to map at click location; add popup window
		// var popup = L.popup();
		// popup.setContent("You clicked the map at " + e.latlng.toString());
		// Marker.bindPopup(popup);

		this.Marker = new L.marker(e.latlng, {
			draggable: true
		}).addTo(this.map);
		
		let pinCreate = document.getElementById('pinCreate');
		let pinLocation = document.getElementById('pinLocation');
		let coords = this.Marker.getLatLng();

		if(pinCreate){
			pinLocation.value = `${coords.lat},${coords.lng}`;
			return;
		}
		viewFunctions.getPinCreate();
	}

	panToRandomPin(){
		let coords = this.allPins[Math.floor(Math.random() * this.allPins.length)];
		coords = coords._latlng
		this.map.flyTo(coords, 14);
	}

	removeTempCreatePin(){
		if(this.Marker){
			this.map.removeLayer(this.Marker);
		}
		return;
	}

}

export default new OurMap();