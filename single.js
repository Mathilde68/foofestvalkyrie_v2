


const Artist = {
    name: "",
    members: [

    ],
    genre: "",
    logoCredits: "",
    logo: "",
    bio: ""
}





window.addEventListener("DOMContentLoaded", start);


function start() {
    console.log("started");



    //load my json
    loadJSON();
}

//async function fetching the json from the bands endpoint
async function loadJSON() {
    const endpoint = "https://valkyriefest.herokuapp.com/bands";


    const lineup = await fetch(endpoint);
    const data = await lineup.json();
    prepareData(data);
}


function prepareData(jsondata) {

    //find the ID (artist-name) and saves in the variable id
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    console.log("ID", id);

    const jsonobject = jsondata.filter(artist => { return artist.name === id });


    const artist = Object.create(Artist);


    artist.name = jsonobject[0].name;
    artist.members = jsonobject[0].members;
    artist.genre = jsonobject[0].genre;
    artist.logoCredits = jsonobject[0].logoCredits;
    artist.bio = jsonobject[0].bio;


    if (jsonobject[0].logo.includes("http")) {
        artist.logo = jsonobject[0].logo;

    } else {
        artist.logo = "https://valkyriefest.herokuapp.com/logos/" + jsonobject[0].logo;

    }

    console.log(artist);

    displayArtist(artist);
}

function displayArtist(artist) {
    document.title = `FooFest - ${artist.name}`;
    document.querySelector("#artist-name").textContent = artist.name;
    document.querySelector("#bandImage").src = artist.logo;
    document.querySelector(".logo_credits").textContent = artist.logoCredits;
    document.querySelector(".genre_text").textContent = artist.genre;

    artist.members.forEach(member => {
        document.querySelector(".member_list").innerHTML += `<li>${member}</li>`;
    });

    document.querySelector("#bio").textContent = artist.bio;


}

document.querySelector("#back_arrow").addEventListener("click", () => {history.back(); })






