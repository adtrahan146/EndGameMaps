import * as viewFunctions from "../views/client-views.js";
import mapView from "../model/mapView.js";

const BASE_URL = "http://localhost:3000";

class ClientControls {
    configureHomepageBtns = function () {
        try {
            const loginBtn = document.getElementById("login-btn").addEventListener("click", viewFunctions.getLoginMenu);
            const registerBtn = document.getElementById("register-btn").addEventListener("click", viewFunctions.getCreateAccountMenu);
            const guestBtn = document.getElementById("guest-btn").addEventListener("click", viewFunctions.getMapView);
        } catch (error) {
            const startBtn = document.getElementById("start-btn").addEventListener("click", viewFunctions.getMapView);
            const logoutBtn = document.getElementById("logout-btn").addEventListener("click", this.logout);
        }

        //test
        // const readId = document.getElementById('readOneId').addEventListener('click', this.testUpdate);
        // const deleteTest = document.getElementById('testDelete').addEventListener('click', this.testDelete);
        // const testLogin = document.getElementById('testLogin').addEventListener('click', this.testLogin);
        // const specialTest = document.getElementById('specialTest').addEventListener('click', this.testAuth);
    };

    configureNavbarBtns = function () {
        const home = document.getElementById("nv-home").addEventListener("click", viewFunctions.getHomepage);
        //TODO
        // const friends = document.getElementById('nv-friends').addEventListener('click', viewFunctions.getFriendsMenu);
        // const account = document.getElementById('nv-accountSettings').addEventListener('click', viewFunctions.getAccountSettingsMenu);
    };

    configureMapMenuBtns = function () {
        const sort = document.getElementById("sort-tab").addEventListener("click", viewFunctions.getPinSort);
        const find = document.getElementById("find-tab").addEventListener("click", viewFunctions.getPinFind);
        const create = document.getElementById("create-tab").addEventListener("click", viewFunctions.getPinCreate);
        const manage = document.getElementById("manage-tab").addEventListener("click", viewFunctions.getPinManage);
    };

    configureLoginBtns = function () {
        const formElem = document.getElementById("login");

        formElem.addEventListener("submit", async (e) => {
            // on form submission, prevent default
            e.preventDefault();
            const data = new FormData(e.target);

            const email = data.get("email");
            const password = data.get("password");

            const config = new Object();
            config.method = "POST";
            config.headers = { Accept: "application/json", "Content-Type": "application/json" };
            config.body = JSON.stringify({ email: email, password: password });

            let response;
            let jsonResponse;
            try {
                response = await fetch(`${BASE_URL}/login/loginSubmit`, config);
                jsonResponse = await response.json();
                if (jsonResponse.token) {
                    sessionStorage.token = jsonResponse.token;
                    viewFunctions.getMapView();
                } else {
                    alert(jsonResponse.msg);
                }
            } catch (error) {
                alert("There was an issue trying to login.");
            }
            // document.getElementById('selector')
        });

        document.getElementById("get-register").addEventListener("click", viewFunctions.getCreateAccountMenu);
        const guestBtn = document.getElementById("get-map").addEventListener("click", viewFunctions.getMapView);
    };

    configureRegisterBtns = async function () {
        const formElem = document.getElementById("createAccount");

        formElem.addEventListener("submit", async (e) => {
            // on form submission, prevent default
            e.preventDefault();
            const data = new FormData(e.target);

            const name = data.get("name");
            const username = data.get("username");
            const email = data.get("email");
            const password = data.get("password");

            const config = new Object();

            config.method = "POST";
            config.headers = { Accept: "application/json", "Content-Type": "application/json" };
            config.body = JSON.stringify({ name: name, email: email, username: username, password: password });

            let response;
            let jsonResponse;
            try {
                response = await fetch(`${BASE_URL}/login/createAccount`, config);

                jsonResponse = await response.json();
            } catch (error) {
                alert("There was an issue creating your account.");
            }
            if (jsonResponse.state === true) {
                viewFunctions.getLoginMenu();
            } else {
                document.getElementById("serverMsgField").innerHTML += `<p>There was an error...Try again.</p>`;
            }
            // document.getElementById('selector').innerHTML = viewFunctions.getLoginMenu();
        });

        document.getElementById("get-login").addEventListener("click", viewFunctions.getLoginMenu);
        document.getElementById("get-map").addEventListener("click", viewFunctions.getMapView);
    };

    //tried to do bootstrap alert, but wasnt able to close alert... if you wanna give it a go
    configurePinCreateBtns = async function () {
        try {
            //works for getting checkboxes from form:
            const formElem = document.getElementById("pinCreate");
            let categories = [];

            document.getElementsByName("pinCategory").forEach(function (chk) {
                chk.addEventListener("click", function () {
                    if (this.checked) {
                        categories.push(this.value);
                        console.log(categories);
                    } else {
                        let i = categories.indexOf(this.value);
                        categories.splice(i, 1);
                        console.log(categories);
                    }
                });
            });

            //Submit event:
            formElem.addEventListener("submit", async (e) => {
                // on form submission, prevent default
                e.preventDefault();
                const data = new FormData(e.target);

                const pinName = data.get("pinName");
                const pinLocation = data.get("pinLocation");
                const pinCategory = categories;
                const comments = data.get("comments");

                try {
                    const config = new Object();
                    config.method = "POST";
                    config.headers = { Accept: "application/json", "Content-Type": "application/json", authorization: "Bearer " + sessionStorage.getItem("token") };
                    config.body = JSON.stringify({ pinName, pinLocation, pinCategory, comments });
                    const response = await fetch(`${BASE_URL}/mapMenu/pinCreate`, config);
                } catch (error) {
                    alert("Error trying to send to server");
                }
                document.getElementById("mapOutputView").innerHTML = ``;
                alert("Success!");
                mapView.removeTempCreatePin();
                mapView.getAllPins();
            });
        } catch (error) {
            return;
        }
    };

    configurePinManageBtns = function () {
        let length = mapView.usersPinsIds.length;

        for (let i = 0; i < length; i++) {
            try {
                let thisId = document.getElementById(mapView.usersPinsIds[i]).id;
                let ele = document.getElementById(mapView.usersPinsIds[i]);
                ele.addEventListener("click", function () {
                    mapView.panToPin(thisId);
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    configureNoAccountBtns = function () {
        try {
            document.getElementById("no-account-btn").addEventListener("click", viewFunctions.getHomepage);
        } catch (error) {
            //todo
            //handle error
            return;
        }
    };

    logout = function () {
        sessionStorage.removeItem("token");
        viewFunctions.getHomepage();
    };
}

export default new ClientControls();
