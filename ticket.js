"use strict";

window.addEventListener("DOMContentLoaded", start);

const Area ={
    area: "area",
    spots: 0,
    available: 0

}

const allAreas=[];

const Reservation ={
id: "",
tickets: 0,
tent_four:0,
tent_two:0,
area:"",
amount:0,
vip: false
}

const form = document.querySelector(".vip_fillout");
 
//Function that starts the whole systaaaaam
function start(){
    console.log("start");


    //Here I call functions
    registerButtons();

    // calling the load JSON function
    loadJSON();
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

    //eventlistener for the buyy buttons
   document.querySelector(".ticket_buy").addEventListener("click", getUserInputRegu);
   document.querySelector(".ticket_buyVip").addEventListener("click", getUserInputVIP);

}

//Here we fetch the endpoint to load json of the available camping spots
async function loadJSON(){

    const endpoint="https://valkyriefest.herokuapp.com/available-spots";


    const data = await fetch(endpoint);
    const json = await data.json();
  
  
    /* console.log(json); */
    prepareData(json);

}

function prepareData(json){

    json.forEach(jsonobject => {

        const camping = Object.create(Area);

        camping.area = jsonobject.area;
        camping.spots = jsonobject.spots;
        camping.available = jsonobject.available;

        console.log(camping);

        allAreas.push(camping);

    });


console.log(allAreas);
allAreas.forEach(displayAreaAvailability);

}


function displayAreaAvailability(camping){
    
  const clone = document.querySelector("#template_camping").content.cloneNode(true);
    const cloneV = document.querySelector("#template_camping").content.cloneNode(true);

  clone.querySelector("[data-field=area]").textContent= camping.area;
  clone.querySelector("[data-field=spots]").textContent= "Spots: "+ camping.spots;
  clone.querySelector("[data-field=available]").textContent= "Available: "+camping.available;

  cloneV.querySelector("[data-field=area]").textContent= camping.area;
  cloneV.querySelector("[data-field=spots]").textContent= "Spots: "+ camping.spots;
  cloneV.querySelector("[data-field=available]").textContent= "Available: "+camping.available;

  if(camping.area === "Svartheim"){
    document.querySelector("#camping_one").appendChild(clone);
    document.querySelector("#camping_one_v").appendChild(cloneV);

  }
  if(camping.area === "Nilfheim"){
    document.querySelector("#camping_two").appendChild(clone);
    document.querySelector("#camping_two_v").appendChild(cloneV);
 

  }  if(camping.area === "Helheim"){
    document.querySelector("#camping_three").appendChild(clone);
    document.querySelector("#camping_three_v").appendChild(cloneV);

  }  if(camping.area === "Muspelheim"){
    document.querySelector("#camping_four").appendChild(clone);
    document.querySelector("#camping_four_v").appendChild(cloneV);

  } else if(camping.area === "Alfheim"){
    document.querySelector("#camping_five").appendChild(clone);
    document.querySelector("#camping_five_v").appendChild(cloneV);

  }
    

}


function getUserInputRegu(){
    const Rform = document.querySelector(".regu_fillout");
    const Rtickets =  parseInt(Rform.elements.amount_reg_ticket.value);
    const Rreservation = Object.create(Reservation);
    const RtentTwo = parseInt(Rform.elements.amount_tent_two.value);
    const RtentFour = parseInt(Rform.elements.amount_tent_four.value);
    const Rcamp = Rform.elements.camparea.value;

    Rreservation.tickets = Rtickets;
    Rreservation.tent_two = RtentTwo;
    Rreservation.tent_four = RtentFour;
    Rreservation.area = Rcamp;

    Rreservation.amount = RtentTwo + (RtentFour*2);

    localStorage.setItem("regu", JSON.stringify(Rreservation));
    let storageRegu = localStorage.getItem("regu");
    let savedRegu = JSON.parse(storageRegu);
    console.log("Person Object Regu:", savedRegu);
}



function getUserInputVIP(){

    const Vform = document.querySelector(".vip_fillout");
    const Vtickets =  parseInt(Vform.elements.amount_vip_ticket.value);
    const Vreservation = Object.create(Reservation);
    const VtentTwo = parseInt(Vform.elements.amountv_tent_two.value);
    const VtentFour = parseInt(Vform.elements.amountv_tent_four.value*2);
    const Vcamp = Vform.elements.campareav.value;

    Vreservation.tickets = Vtickets;
    Vreservation.tent_two = VtentTwo;
    Vreservation.tent_four = VtentFour;
    Vreservation.area = Vcamp;
    Vreservation.vip = true;

    Vreservation.amount = VtentTwo + VtentFour;

  /*   console.log(Rreservation, Vreservation); */

  putReservation(Vreservation);
}


function putReservation(reservation){

    const payLoad = {
        area: reservation.area,
        amount: reservation.amount,
      };
      const postData = JSON.stringify(payLoad);
      
    console.log(payLoad);
       
      fetch(`https://valkyriefest.herokuapp.com/reserve-spot`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: postData,
      })
        .then((res) => res.json())
        .then((d) => {
    console.log(d);
          if(d.id){
              saveReservation(d);
          }else{
              console.log("Cannot reserve, no spots available in chosen area");
          }

        });

        function saveReservation(d){
            reservation.id = d.id;
            console.log(reservation);
            localStorage.setItem("vip", JSON.stringify(reservation));
          goToCart();
        }
}


function goToCart(){
    location.href = "checkout.html";
}


function showVipDetails() {
    const vipDetail = document.querySelector(".vip_fillout");
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

