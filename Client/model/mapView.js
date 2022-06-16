import * as viewFunctions from '../views/client-views.js';
import * as mapAssets from './mapAssets.js';
const BASE_URL = 'http://localhost:3000';

class OurMap{

	#position;
	map;
	Marker;
	allPins;
	usersPins;
	usersPinsIds;

	catNiche;
	catOdd;
	catReturn;

	constructor(){
		this.#position = {
			latitude: 0,
			longitude: 0
		};
		this.Marker = L.marker();
		this.getUserCoords();
		this.usersPins = [];
		this.usersPinsIds = [];
		this.allPins = [];
		this.catNiche = [];
		this.catOdd = [];
		this.catReturn = [];
	}
	
	async initializeMap(){

		this.map = L.map('map', {});

		//TODO: Take in user coords as params for setView()
		this.map.setView([this.#position.latitude, this.#position.longitude], 11);
		await this.getUsersPins();
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
			let config = viewFunctions.setupTokenHeader();	
			const url = `${BASE_URL}/mapView/generatePins`;
			const response = await fetch(url, config);
			const pins = await response.json();
			this.addPinsToMapView(pins);

		} catch (error) {
			console.log(error);
		}
	}
	
	getUsersPins = async () =>{
		try {
			let config = viewFunctions.setupTokenHeader();	
			const url = `${BASE_URL}/data/usersPins`;
			const response = await fetch(url, config);
			const pins = await response.json();
			for(let i=0; i<pins.usersPins.length; i++){
				this.usersPins.push(pins.usersPins[i]);
				this.usersPinsIds.push(this.usersPins[i]._id);
			}

		} catch (error) {
			console.log(error);
		}
	}

	addPinsToMapView = (pins) =>{
		for(let i=0; i<pins.length; i++){
			let pin;
			var coords = pins[i].pinLocation.split(',');
			var lat = coords[0];
			var lng = coords[1];
			if(this.usersPinsIds.includes(pins[i]._id)){
				pin = L.marker([lat, lng], {icon: mapAssets.goldIcon, title: pins[i]._id});
			}else{
				pin = L.marker([lat, lng], {icon: mapAssets.greenIcon, title: pins[i]._id});
			}

			for(let y=0; y<pins[i].pinCategory.length; y++){
				if(pins[i].pinCategory[y] === 'Niche'){this.catNiche.push(pins[i]);}
				if(pins[i].pinCategory[y] === 'Will Visit Again'){this.catReturn.push(pins[i]);}
				if(pins[i].pinCategory[y] === 'Oddity'){this.catOdd.push(pins[i]);}
			}

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

	async panToRandomPin(){
		let randomPin = await document.getElementById('randomId').title;
		let coords = this.allPins.filter(pins => pins.options.title === randomPin)[0];
		coords = coords._latlng
		this.map.flyTo(coords, 16);
	}

	panToPin(){
		//Callback funct that uses 'this' as a reference to the btn's id & pin id value

		//this vs globalThis
		console.log(globalThis)
		let coords = this.usersPinsIds.indexOf(this.id);
		// let coords = 
		coords = coords._latlng
		this.map.flyTo(coords, 16);
	}

	removeTempCreatePin(){
		if(this.Marker){
			this.map.removeLayer(this.Marker);
		}
		return;
	}

}

export default new OurMap();