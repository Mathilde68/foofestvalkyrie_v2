
"use strict";


const Artist = {
  name: "",
  members: [

  ],
  genre: "",
  logoCredits: "",
  logo: "",
  bio: ""
}

const allArtists = [];

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

//preparing the data by creating an Artist object for each.
function prepareData(jsondata) {

  jsondata.forEach(jsonobject => {

    const artist = Object.create(Artist);

    artist.name = jsonobject.name;
    artist.members = jsonobject.members;
    artist.genre = jsonobject.genre;
    artist.logoCredits = jsonobject.logoCredits;
    artist.logo = jsonobject.logo;
    artist.bio = jsonobject.bio;

    allArtists.push(artist);

  });

  displayList(allArtists);
}

/* calls display artist for each artst on the list*/
function displayList(list) {
  console.log(list);
  list.forEach(displayArtist);

}


function displayArtist(artist) {
  console.log(artist.name);

  const clone = document.querySelector("#template").content.cloneNode(true);


  clone.querySelector("#artist-name").textContent = artist.name;

  document.querySelector(".list-wrapper #lineup-list").appendChild(clone);


}


