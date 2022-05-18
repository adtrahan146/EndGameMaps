import * as viewFunctions from '../views/client-views.js'
import mapView from '../model/mapView.js';

class ClientControls{

    configureHomepageBtns = function(){
        const loginBtn = document.getElementById('login-btn').addEventListener('click', viewFunctions.getLoginMenu);
        const registerBtn = document.getElementById('register-btn').addEventListener('click', viewFunctions.getCreateAccountMenu);
        const guestBtn = document.getElementById('guest-btn').addEventListener('click', viewFunctions.getMapView);
    }

    configureNavbarBtns = function(){
        const home = document.getElementById('nv-home').addEventListener('click', viewFunctions.getHomepage);
        //TODO
        // const friends = document.getElementById('nv-friends').addEventListener('click', viewFunctions.getFriendsMenu);
        // const account = document.getElementById('nv-accountSettings').addEventListener('click', viewFunctions.getAccountSettingsMenu);
    }

    configureMapMenuBtns = function(){        
        const sort = document.getElementById('sort-tab').addEventListener('click', viewFunctions.getPinSort);
        const find = document.getElementById('find-tab').addEventListener('click', viewFunctions.getPinFind);
        const create = document.getElementById('create-tab').addEventListener('click', viewFunctions.getPinCreate);
        const manage = document.getElementById('manage-tab').addEventListener('click', viewFunctions.getPinManage);
    }

    configureLoginBtns = function(){
        const formElem = document.getElementById('login');

        formElem.addEventListener('submit', async(e) => {
            // on form submission, prevent default
            e.preventDefault();
            const data = new FormData(e.target);

            // const name = data.get('name');
            const email = data.get('email');
            const password = data.get('password');
          
            let jsonData = { email, password };
            jsonData = JSON.stringify(jsonData);

            const response = await fetch('http://localhost:3000/login/loginSubmit', {
                method: 'POST', // or 'PUT',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: jsonData
            });
            console.log(response.body);

            alert('Success!');
            viewFunctions.getMapView();
        });

        document.getElementById('get-register').addEventListener('click', viewFunctions.getCreateAccountMenu);
        const guestBtn = document.getElementById('get-map').addEventListener('click', viewFunctions.getMapView);

    }
    
    configureRegisterBtns = function(){
        const formElem = document.getElementById('createAccount');

        formElem.addEventListener('submit', async(e) => {
            // on form submission, prevent default
            e.preventDefault();
            const data = new FormData(e.target);

            const name = data.get('name');
            const email = data.get('email');
            const password = data.get('password');
          
            let jsonData = { name, email, password };
            jsonData = JSON.stringify(jsonData);

            const response = await fetch('http://localhost:3000/login/createAccount', {
                method: 'POST', // or 'PUT',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: jsonData
            });

            alert('Success!');
            viewFunctions.getLoginMenu();
        });

        document.getElementById('get-login').addEventListener('click', viewFunctions.getLoginMenu);
        const guestBtn = document.getElementById('get-map').addEventListener('click', viewFunctions.getMapView);
    }


//tried to do bootstrap alert, but wasnt able to close alert... if you wanna give it a go
    configurePinCreateBtns = function(){
        const formElem = document.getElementById('pinCreate');

        formElem.addEventListener('submit', async(e) => {
            // on form submission, prevent default
            e.preventDefault();
            const data = new FormData(e.target);

            const pinName = data.get('pinName');
            const pinLocation = data.get('pinLocation');
            const pinCategory = data.get('pinCategory');
            const comments = data.get('comments');
          
            let jsonData = { pinName, pinLocation, pinCategory, comments };
            jsonData = JSON.stringify(jsonData);

            const response = await fetch('http://localhost:3000/mapMenu/pinCreate', {
                method: 'POST', // or 'PUT',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: jsonData
            });

            document.getElementById('mapOutputView').innerHTML = ``;
            alert('Success!');
            mapView.removeTempCreatePin();
            mapView.getAllPins();
        });

        // pinCreateSubmit.addEventListener('submit', viewFunctions.getMapView);
        
        // function alert(message, type) {
        //     var wrapper = document.createElement('div')
        //     wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-coreui-dismiss="alert" aria-label="Close"></button></div>'

        //     alertPlaceholder.append(wrapper)
        // }

        // if (alertTrigger) {
        //     alertTrigger.addEventListener('click', function () {
        //         alert('Nice, you triggered this alert message!', 'success')
        //     })
        // }
    }
}

export default new ClientControls();