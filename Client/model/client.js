async function getHomepage(){
        const view = document.getElementById('client-view');
        const url = `http://localhost:3000/api/test`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
}

window.onload = getHomepage();