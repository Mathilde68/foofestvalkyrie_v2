"use strict";

window.addEventListener("DOMContentLoaded", start);

endpoint="https://valkyriefest.herokuapp.com/available-spots";


//Function that starts the whole systaaaaam
function start(){
    console.log("start");

    //Here I call functions
    registerButtons();

}

function registerButtons(){
   
    //Here I add eventlistener for the tickets
    document.querySelector(".regu_ticket").addEventListener("click", showRegDetails);
    document.querySelector(".vip_ticket").addEventListener("click", showVipDetails);
}



function showVipDetails() {
    const vipDetail = document.querySelector(".vip_fillout");
    console.log("LOL");
    vipDetail.style.display = "block";
    document.querySelector(".closeVip").addEventListener("click", () => vipDetail.style.display = "none");
}
function showRegDetails() {
    const regDetail = document.querySelector(".regu_fillout");
    console.log("LOL");

    regDetail.style.display = "block";
    document.querySelector(".closeRegu").addEventListener("click", () => regDetail.style.display = "none");

    
}

