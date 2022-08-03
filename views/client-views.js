import Controls from '../controllers/client-controls.js';
import OurMap from '../model/mapView.js';

const BASE_URL = 'http://localhost:3000';

export async function getMapView(){
    try {
        let config;
        if(sessionStorage.token){
            config = setupTokenHeader();
        }
        const view = document.getElementById('client-view');
        const mapview = await fetch(`${BASE_URL}/views/mapview`, config);
        const mhHml = await mapview.text();
        view.innerHTML = mhHml;

    } catch (error) {
        console.log('ERROR.');
        view.innerHTML = `<h1>ERROR: Reload page in 2 seconds.</h1>`
    }
    OurMap.initializeMap();
    Controls.configureNavbarBtns();
    Controls.configureMapMenuBtns();
    window.scrollTo(0,0);
}

export async function getHomepage(){
    //Render homepage element
    let config;
    if(sessionStorage.token){
        config = setupTokenHeader();
    }

    const view = document.getElementById('client-view');
    const url = `${BASE_URL}/views/homepage`;
    try {
        const response = await fetch(url, config);
        const html = await response.text();
        if(response.status === 400){
            Controls.logout();
            return;
        }
        view.innerHTML = html;
    } catch (error) {
        view.innerHTML = `<h1>Oops! Sorry, server is down currently...</h1>`
    }

    Controls.configureHomepageBtns();

}

export async function getLoginMenu(){
    try {
        //Render loginPage from Homepage.ejs
        const view = document.getElementById('selector');

        const url = `${BASE_URL}/views/loginMenu`;
        try {
            const response = await fetch(url);
            const html = await response.text();
            view.innerHTML = html;
        } catch (error) {
            view.innerHTML = `<h1>Oops! Sorry.</h1>`
        }
    } catch (error) {
        console.log(error);
    }
    Controls.configureLoginBtns();
}


export async function getCreateAccountMenu(){
    try {
        //Render CreateAccountMenu from Homepage.ejs
        const view = document.getElementById('selector');

        const url = `${BASE_URL}/views/createAccountMenu`;
        try {
            const response = await fetch(url);
            const html = await response.text();
            view.innerHTML = html;
        } catch (error) {
            view.innerHTML = `<h1>Oops! Sorry, server is down currently...</h1>`
        }
    } catch (error) {
        console.log(error);
    }
    Controls.configureRegisterBtns();
}


//MapMenu:
export async function getPinSort(){
    const view = document.getElementById('mapOutputView');
    if(view.innerHTML){
        view.innerHTML = ``;
        return;
    }
    try {
        let config = setupTokenHeader();

        const view = document.getElementById('mapOutputView');

        const url = `${BASE_URL}/views/sort`;
        const response = await fetch(url, config);
        const html = await response.text();
        view.innerHTML = html;

    } catch (error) {
        console.log(error);
    }
    Controls.configureNoAccountBtns();
}

export async function getPinFind(){
    
    const view = document.getElementById('mapOutputView');
    if(view.innerHTML){
        view.innerHTML = ``;
        return;
    }
    try {
        const view = document.getElementById('mapOutputView');

        const url = `${BASE_URL}/views/find`;
        const response = await fetch(url);
        const html = await response.text();
        view.innerHTML = html;
        //add OurMap.panToRandomPin();
        // randomPin._id = document.getElementById('random_id').;
        // randomPin.radomName = document.getElementById('randomName').innerHTML;
        // randomPin.randomCat = document.getElementById('randomCat').innerHTML;
        // randomPin.randomComments = document.getElementById('randomComments').innerHTML;
        // randomPin.randomUsername = document.getElementById('randomUsername').innerHTML;


    } catch (error) {
        console.log(error);
    }
    OurMap.panToRandomPin();
}

export async function getPinCreate(coordParams){
    const view = document.getElementById('mapOutputView');
    if(view.innerHTML){
        view.innerHTML = ``;
        return;
    }
    try {
        let config = setupTokenHeader();
        const url = `${BASE_URL}/views/pinCreate`;
        const response = await fetch(url, config);
        const html = await response.text();
        view.innerHTML = html;

        if(typeof coordParams === 'string'){
            document.getElementById('pinLocation').value = coordParams;
            console.log(coordParams);
        }

        Controls.configurePinCreateBtns();
    } catch (error) {
        console.log(error);
    }
    Controls.configureNoAccountBtns();
}

export async function getPinManage(){

    const view = document.getElementById('mapOutputView');
    if(view.innerHTML){
        view.innerHTML = ``;
        return;
    }
    try {
        let config = setupTokenHeader();
        const url = `${BASE_URL}/views/pinManage`;
        const response = await fetch(url, config);
        const html = await response.text();
        view.innerHTML = html;
        Controls.configurePinManageBtns();
    } catch (error) {
        //todo
        //handle error
    }
    Controls.configureNoAccountBtns();
}

export function setupTokenHeader(){
    const config = { };
    config.method = "GET";
    config.headers = {"authorization": 'Bearer ' + sessionStorage.getItem('token')};
    return config;
}

