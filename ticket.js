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

    //Here I add eventlistener for the increment and decrement buttons for ticket and tent
    
    //regular
    document.getElementById("minus_r_t").addEventListener("click", deRT);
    document.getElementById("plus_r_t").addEventListener("click", inRT);
    document.getElementById("minus_r_two").addEventListener("click", deRTwo);
    document.getElementById("plus_r_two").addEventListener("click", inRTwo);
    document.getElementById("minus_r_four").addEventListener("click", deRFour);
    document.getElementById("plus_r_four").addEventListener("click", inRFour);
   //vip
   document.getElementById("minus_v_t").addEventListener("click", deVT);
   document.getElementById("plus_v_t").addEventListener("click", inVT);
   document.getElementById("minus_v_two").addEventListener("click", deVTwo);
   document.getElementById("plus_v_two").addEventListener("click", inVTwo);
   document.getElementById("minus_v_four").addEventListener("click", deVFour);
   document.getElementById("plus_v_four").addEventListener("click", inVFour);

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

function deRT (){
    document.getElementById('amount_reg_ticket').stepDown();
    

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


function deVT (){
    document.getElementById('amount_vip_ticket').stepDown();
    

}
function inVT (){
    document.getElementById('amount_vip_ticket').stepUp();

}

function deVTwo (){
    document.getElementById('amountv_tent_two').stepDown();

}
function inVTwo (){
    document.getElementById('amountv_tent_two').stepUp();

}

function deVFour (){
    document.getElementById('amountv_tent_four').stepDown();

}
function inVFour (){
    document.getElementById('amountv_tent_four').stepUp();

}



/* function increment() {
    document.getElementById('demoInput').stepUp();
 }
 function decrement() {
    document.getElementById('demoInput').stepDown();
 } */

