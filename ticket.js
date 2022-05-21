"use strict";

window.addEventListener("DOMContentLoaded", start);


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

    //Here I add eventlistener for the increment and decrement buttons for ticket and tent
    
    document.getElementById("minus_r_t").addEventListener("click", deRT);
    document.getElementById("plus_r_t").addEventListener("click", inRT);
    document.getElementById("minus_r_two").addEventListener("click", deRTwo);
    document.getElementById("plus_r_two").addEventListener("click", inRTwo);
    document.getElementById("minus_r_four").addEventListener("click", deRFour);
    document.getElementById("plus_r_four").addEventListener("click", inRFour);
    

    
}

function deRT (){
    document.getElementById('amount_reg_ticket').stepDown().preventDefault();
    

}
function inRT (){
    document.getElementById('amount_reg_ticket').stepUp();

}

function deRTwo (){
    document.getElementById('amount_tent_two').stepDown();

}
function inRTwo (){
    document.getElementById('amount_tent_two').stepUp();

}

function deRFour (){
    document.getElementById('amount_tent_four').stepDown();

}
function inRFour (){
    document.getElementById('amount_tent_four').stepUp();

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

/* function increment() {
    document.getElementById('demoInput').stepUp();
 }
 function decrement() {
    document.getElementById('demoInput').stepDown();
 } */

