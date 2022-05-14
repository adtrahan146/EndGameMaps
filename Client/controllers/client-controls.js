import * as viewFunctions from '../views/client-views.js'

class ClientControls{

    configureBtns = function(){
        const loginBtn = document.getElementById('login-btn').addEventListener('click', viewFunctions.getLoginMenu);
        const registerBtn = document.getElementById('register-btn').addEventListener('click', viewFunctions.getCreateAccountMenu);
        const guestBtn = document.getElementById('guest-btn').addEventListener('click', viewFunctions.getMapView);
    }
}

export default new ClientControls();