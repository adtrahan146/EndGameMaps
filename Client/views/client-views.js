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
    const html = `<div class="container-fluid text-white">
                    <div class="row position-relative">

                        <div class="col-md-3">
                            <h3>Sort</h3>
                            <h3>Find</h3>
                            <h3>Create</h3>
                            <hr class="text-white">
                            <h3>Settings</h3>
                        </div>

                        <div id='map' class="col-md-9">

                        </div>
                    </div>
                </div>`;
    view.innerHTML = html;
    OurMap.initializeMap();
}

