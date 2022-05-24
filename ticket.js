"use strict";

window.addEventListener("DOMContentLoaded", start);


const Reservation ={
id: "",
total_tickets: 0,
reg_tickets: 0,
vip_tickets: 0,
tent_four:0,
tent_two:0,
area:"",
amount:0
}
 
//Function that starts the whole systaaaaam
function start(){
    console.log("start");


    //Here I call functions
    registerButtons();

  
}

function registerButtons(){
   
    //Here I add eventlistener for the tickets
    document.querySelector(".regu_ticket").addEventListener("click", showRegDetails);
   
    //Here I add eventlistener for the increment and decrement buttons for ticket and tent
    //regular
    document.getElementById("minus_r_t").addEventListener("click", deRT);
    document.getElementById("plus_r_t").addEventListener("click", inRT);
    document.getElementById("minus_r_two").addEventListener("click", deRTwo);
    document.getElementById("plus_r_two").addEventListener("click", inRTwo);
    document.getElementById("minus_r_four").addEventListener("click", deRFour);
    document.getElementById("plus_r_four").addEventListener("click", inRFour);
   //vip amount
   document.getElementById("minus_v_t").addEventListener("click", deVT);
   document.getElementById("plus_v_t").addEventListener("click", inVT);
  

    //eventlistener for the buyy buttons
   document.querySelector(".ticket_buy").addEventListener("click", getUserInput);
   
}



function getUserInput(){
    const form = document.querySelector(".regu_fillout");
    const reg_tickets =  parseInt(form.elements.amount_reg_ticket.value);
    const vip_tickets =  parseInt(form.elements.amount_vip_ticket.value);
    const reservation = Object.create(Reservation);
    const tentTwo = parseInt(form.elements.amount_tent_two.value);
    const tentFour = parseInt(form.elements.amount_tent_four.value);
    reservation.reg_tickets = reg_tickets;
    reservation.vip_tickets = vip_tickets;
    reservation.total_tickets = vip_tickets + reg_tickets;
    reservation.tent_two = tentTwo;
    reservation.tent_four = tentFour;

    reservation.amount = parseInt(tentTwo + (tentFour*2));
    console.log(reservation);
     localStorage.setItem("tickets", JSON.stringify(reservation));
     goToCart();
     /*
    let storageRegu = localStorage.getItem("regu");
    let savedRegu = JSON.parse(storageRegu); */
   
}

function goToCart(){
    location.href = "checkout.html";
}

/* -----------move these functions to checkout.js: loadjson, prepare areas, display camping and put reservation-------------*/
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

