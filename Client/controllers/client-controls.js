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
        document.getElementById('get-register').addEventListener('click', viewFunctions.getCreateAccountMenu);
        const guestBtn = document.getElementById('get-map').addEventListener('click', viewFunctions.getMapView);

    }
    
    configureRegisterBtns = function(){
        document.getElementById('get-login').addEventListener('click', viewFunctions.getLoginMenu);
        const guestBtn = document.getElementById('get-map').addEventListener('click', viewFunctions.getMapView);
    }


//tried to do bootstrap alert, but wasnt able to close alert... if you wanna give it a go
    configurePinCreateBtns = function(){
        const pinCreateSubmit = document.getElementById('pinCreateSubmitBtn');
        const formElem = document.querySelector('form');

        formElem.addEventListener('submit', (e) => {
            // on form submission, prevent default
            e.preventDefault();
          
            // construct a FormData object, which fires the formdata event
            const form = new FormData(formElem);
            console.log(form)
        });

        pinCreateSubmit.addEventListener('submit', viewFunctions.getMapView);
        
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