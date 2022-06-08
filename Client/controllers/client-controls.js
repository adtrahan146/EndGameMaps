import * as viewFunctions from '../views/client-views.js'
import mapView from '../model/mapView.js';

class ClientControls{

    configureHomepageBtns = function(){
        try {
            const loginBtn = document.getElementById('login-btn').addEventListener('click', viewFunctions.getLoginMenu);
            const registerBtn = document.getElementById('register-btn').addEventListener('click', viewFunctions.getCreateAccountMenu);
            const guestBtn = document.getElementById('guest-btn').addEventListener('click', viewFunctions.getMapView);
        } catch (error) {
            const startBtn = document.getElementById('start-btn').addEventListener('click', viewFunctions.getMapView);
        }

        
        //test
        // const readId = document.getElementById('readOneId').addEventListener('click', this.testUpdate);
        // const deleteTest = document.getElementById('testDelete').addEventListener('click', this.testDelete);
        // const testLogin = document.getElementById('testLogin').addEventListener('click', this.testLogin);
        // const specialTest = document.getElementById('specialTest').addEventListener('click', this.testAuth);

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

            const email = data.get('email');
            const password = data.get('password');

            const config = new Object();
            config.method = "POST";
            config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
            config.body = JSON.stringify({'email': email, 'password': password});

            let response;
            let jsonResponse;
            try {
                response = await fetch("http://localhost:3000/login/loginSubmit", config);
                jsonResponse = await response.json();
                if(jsonResponse.token){
                    sessionStorage.token = jsonResponse.token;
                    viewFunctions.getMapView();
                }else{
                    alert(jsonResponse.msg);
                }
            }catch(error) {
                alert('There was an issue trying to login.');
            }
            // document.getElementById('selector')
        });

        document.getElementById('get-register').addEventListener('click', viewFunctions.getCreateAccountMenu);
        const guestBtn = document.getElementById('get-map').addEventListener('click', viewFunctions.getMapView);

    }
    
    configureRegisterBtns = async function(){
        const formElem = document.getElementById('createAccount');

        formElem.addEventListener('submit', async(e) => {
            // on form submission, prevent default
            e.preventDefault();
            const data = new FormData(e.target);

            const name = data.get('name');
            const username = data.get('username');
            const email = data.get('email');
            const password = data.get('password');

            const config = new Object();

            config.method = "POST";
            config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
            config.body = JSON.stringify({'name': name, 'email': email, 'username': username, 'password': password});

            let response;
            let jsonResponse;
            try {
                response = await fetch("http://localhost:3000/login/createAccount", config);

                jsonResponse = await response.json();
            }catch(error) {
                alert('There was an issue creating your account.');

            }
            
            document.getElementById('serverMsgField').innerHTML += `<p>${JSON.stringify(jsonResponse)}</p>`
            // document.getElementById('selector').innerHTML = viewFunctions.getLoginMenu();
        });

        document.getElementById('get-login').addEventListener('click', viewFunctions.getLoginMenu);
        document.getElementById('get-map').addEventListener('click', viewFunctions.getMapView);
    }


    //tried to do bootstrap alert, but wasnt able to close alert... if you wanna give it a go
    configurePinCreateBtns = async function(){
        try {
            const formElem = document.getElementById('pinCreate');

            formElem.addEventListener('submit', async(e) => {
                // on form submission, prevent default
                e.preventDefault();
                const data = new FormData(e.target);

                const pinName = data.get('pinName');
                const pinLocation = data.get('pinLocation');
                const pinCategory = data.get('pinCategory');
                const comments = data.get('comments');
            
                const jsonData = JSON.stringify({pinName, pinLocation, pinCategory, comments});

                try {
                    const config = new Object();
                    config.method = "POST";
                    config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', "authorization": 'Bearer ' + sessionStorage.getItem('token')};
                    config.body = JSON.stringify({pinName, pinLocation, pinCategory, comments});
                    const response = await fetch('http://localhost:3000/mapMenu/pinCreate', config);
                } catch (error) {
                    alert('Error trying to send to server');
                }
                document.getElementById('mapOutputView').innerHTML = ``;
                alert('Success!');
                mapView.removeTempCreatePin();
                mapView.getAllPins();
            });
        } catch (error) {
            return;   
        }
    }

    configureNoAccountBtns = function(){
        try {
            document.getElementById('no-account-btn').addEventListener('click', viewFunctions.getHomepage);
        } catch (error) {
            //todo
            //handle error
            return;
        }
    }


    async testReadAll(){
        const config = new Object();
        config.method = "GET";
        const response = await fetch("http://localhost:3000/getuser", config);
        const data = await response.json()
        document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
    }
    async testRead(){
        const config = new Object();
        config.method = "GET";
        const response = await fetch(`http://localhost:3000/get/${readId.value}`, config);
        const data = await response.json()
        document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
    }
    async testCreate(){
        const config = new Object();
        config.method = "POST";
        config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
        config.body = JSON.stringify({'email': email.value, 'password': password.value});
        const response = await fetch("http://localhost:3000//login/createAccount", config);
        const data = await response.json()
        document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
    }
    async testUpdate(){
        const config = new Object();
        config.method = "PUT";
        config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
        config.body = JSON.stringify({'email': updateEmail.value, 'password': updatePassword.value});
        const response = await fetch(`http://localhost:3000/update/${readId.value}`, config);
        const data = await response.json()
        document.getElementById('testOutput').innerHTML += `<p>${JSON.stringify(data)}</p>`
    }
    async testDelete(){
        const config = new Object();
        config.method = "DELETE";
        const response = await fetch(`http://localhost:3000/delete/${deleteId.value}`, config);
        const data = await response.json()
        document.getElementById('testOutput').innerHTML += `<p>${JSON.stringify(data)}</p>`
    }
    async testLogin(){
        const config = new Object();
        config.method = "POST";
        config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
        config.body = JSON.stringify({'email': loginId.value, 'password': loginPassword.value});
        const response = await fetch("http://localhost:3000/login/loginSubmit", config);
        const data = await response.json();
        sessionStorage.token = data.token;
        document.getElementById('testOutput').innerHTML += `<p>${JSON.stringify(data)}</p>`;
    }
    async testAuth(){
        const config = {};
        config.method = "GET";
        config.headers = {"Authorization": 'Bearer ' + sessionStorage.getItem('token')}
        const response = await fetch("http://localhost:3000/special", config);
        const data = await response.json()
        document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
    }
}

export default new ClientControls();