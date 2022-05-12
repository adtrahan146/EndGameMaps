import OurMap from '../model/mapView.js';

export async function getHomepage(){
    //Render homepage element
    const view = document.getElementById('client-view');

    const url = `http://localhost:3000/views/homepage`;
    const response = await fetch(url);
    const html = await response.text();

    // const html = `<h1 id='welcome'>welcome</h1>
    //                 <button id='test-here'>Get The Map</button>`;

    view.innerHTML = html;
    document.getElementById('test-here').addEventListener('click', getMapView);
}

export function getMapView(){
    const view = document.getElementById('client-view');
    const html = `<div id='map'></div>`;
    view.innerHTML = html;
    OurMap.initializeMap();
}

