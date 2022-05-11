import * as MAP from '../model/mapView.js';

export function getHomepage(){
    //Render homepage element
    const view = document.getElementById('client-view');
    const html = `<h1 id='welcome'>welcome</h1>
                    <button id='test-here'>Get The Map</button>`;
    view.innerHTML = html;
    document.getElementById('test-here').addEventListener('click', getMapView);
}

export function getMapView(){
    const view = document.getElementById('client-view');
    const html = `<div id='map'></div>`;
    view.innerHTML = html;
    MAP.setupMap();
}

