// const headers = {   'Access-Control-Allow-Origin':'*',
//                     'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'};

async function getHomepage(){
    const view = document.getElementById('client-view');
    const url = `http://localhost:3000/`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    view.innerHTML = data.body;
}

