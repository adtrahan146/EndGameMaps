import * as viewFunctions from '../views/client-views.js'

class ClientControls{

    configureHomepageBtns = function(){
        const loginBtn = document.getElementById('login-btn').addEventListener('click', viewFunctions.getLoginMenu);
        const registerBtn = document.getElementById('register-btn').addEventListener('click', viewFunctions.getCreateAccountMenu);
        const guestBtn = document.getElementById('guest-btn').addEventListener('click', viewFunctions.getMapView);
    }

    configureNavbarBtns = function(){
        const home = document.getElementById('nv-home').addEventListener('click', viewFunctions.getHomepage);
        //TODO
        // const registerBtn = document.getElementById('nv-friends').addEventListener('click', viewFunctions.getCreateAccountMenu);
        // const guestBtn = document.getElementById('nv-accountSettings').addEventListener('click', viewFunctions.getMapView);
    }
}

export default new ClientControls();