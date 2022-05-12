import OurMap from '../model/mapView.js';

export async function getHomepage(){
    //Render homepage element
    const view = document.getElementById('client-view');

    const url = `http://localhost:3000/views/homepage`;
    const response = await fetch(url);
    const html = await response.text();

    view.innerHTML = html;
    document.getElementById('guest-btn').addEventListener('click', getMapView);
}

export function getMapView(){
    const view = document.getElementById('client-view');
    const html = `<div id='map'></div>`;
    view.innerHTML = html;
    OurMap.initializeMap();
}

