import * as L from './node_modules/leaflet/dist/leaflet.js';
// import {OurMap} from '../model/mapView.js';
import * as ejs from './node_modules/ejs/ejs.js';

import {getHomepage, getMapView} from './views/client-views.js';

window.onload = getHomepage();

