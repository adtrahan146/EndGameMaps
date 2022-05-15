import Controls from '../controllers/client-controls.js';
import OurMap from '../model/mapView.js';

const BASE_URL = 'http://localhost:3000';

export async function getMapView(){
    try {
        const view = document.getElementById('client-view');
        const mapview = await fetch(`${BASE_URL}/views/mapview`);
        const mhHml = await mapview.text();
        view.innerHTML = mhHml;

        const navbarView = document.getElementById('navbar');
        const url = `${BASE_URL}/views/navbar`;
    
        const response = await fetch(url);
        const html = await response.text();
    
        navbarView.innerHTML = html;
    } catch (error) {
        console.log('ERROR.');
        view.innerHTML = `<h1>ERROR: Reload page in 2 seconds.</h1>`
    }
    OurMap.initializeMap();
    Controls.configureNavbarBtns();
    Controls.configureMapMenuBtns();
}

export async function getHomepage(){
    //Render homepage element
    const view = document.getElementById('client-view');

    const url = `${BASE_URL}/views/homepage`;
    try {
        const response = await fetch(url);
        const html = await response.text();
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
}


//MapMenu:
export async function getPinSort(){
    const view = document.getElementById('mapOutputView');
    if(view.innerHTML){
        console.log(view.innerHTML)
        view.innerHTML = ``;
        return;
    }
    try {
        const view = document.getElementById('mapOutputView');

        const url = `${BASE_URL}/views/sort`;
        const response = await fetch(url);
        const html = await response.text();
        view.innerHTML = html;

    } catch (error) {
        console.log(error);
    }
}

export async function getPinFind(){
    
    const view = document.getElementById('mapOutputView');
    if(view.innerHTML){
        console.log(view.innerHTML)
        view.innerHTML = ``;
        return;
    }
    try {
        const view = document.getElementById('mapOutputView');

        const url = `${BASE_URL}/views/find`;
        const response = await fetch(url);
        const html = await response.text();
        view.innerHTML = html;

    } catch (error) {
        console.log(error);
    }
}

export async function getPinCreate(){
    const view = document.getElementById('mapOutputView');
    if(view.innerHTML){
        console.log(view.innerHTML)
        view.innerHTML = ``;
        return;
    }
    try {
        const url = `${BASE_URL}/views/pinCreate`;
        const response = await fetch(url);
        const html = await response.text();
        view.innerHTML = html;

    } catch (error) {
        console.log(error);
    }
}

export async function getPinManage(){

    const view = document.getElementById('mapOutputView');
    if(view.innerHTML){
        console.log(view.innerHTML)
        view.innerHTML = ``;
        return;
    }
    try {
        const url = `${BASE_URL}/views/pinManage`;
        const response = await fetch(url);
        const html = await response.text();
        view.innerHTML = html;

    } catch (error) {
        console.log(error);
    }
}