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

    // configureMapMenuBtns = function(){
    //     const sort = document.getElementById('sort-tab').addEventListener('click', viewFunctions.getPinSort);
    //     const find = document.getElementById('find-tab').addEventListener('click', viewFunctions.getPinFind);
    //     const create = document.getElementById('create-tab').addEventListener('click', viewFunctions.getPinCreate);
    //     const manage = document.getElementById('manage-tab').addEventListener('click', viewFunctions.getPinManage);
    // }
}

export default new ClientControls();