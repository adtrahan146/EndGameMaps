
var map = L.map('map');

//TODO: Take in user coords as params for setView()
map.setView([51.505, -0.09], 10);


//National Geographic free map tiles that look nice on my weak eyes
var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});
map.addLayer(Esri_NatGeoWorldMap);
