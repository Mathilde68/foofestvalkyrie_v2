"use strict";

window.addEventListener("DOMContentLoaded", start);



const Area = {
  area: "area",
  spots: 0,
  available: 0

}

const allAreas = [];

const allRes = [];

const ticketRes = {
  id: "",
  total_tickets: 0,
  reg_tickets: 0,
  vip_tickets: 0,
  tent_four: 0,
  tent_two: 0,
  area: ""
}

const reservation = {
  id: "",
  area: "",
  amount: 0
}



//Function that starts the whole systaaaaam
function start() {
  console.log(reservation);
  console.log("start");

  //Make sure, cart is visible first
  document.getElementById("cart_section").style.display = "block";

  //Here I call functions
  registerButtons();

  prepareTickets();
}


function registerButtons() {

  //Here I add buttons for the cart
  document.querySelector(".cart_p_checkout").addEventListener("click", proceedTC);

}

function prepareTickets() {

  let storage = localStorage.getItem("tickets");
  console.log(storage);
  let savedTickets = JSON.parse(storage);

  console.log(savedTickets);


  const cart = Object.create(ticketRes);
  cart.total_tickets = savedTickets.total_tickets;
  cart.reg_tickets = savedTickets.reg_tickets;
  cart.vip_tickets = savedTickets.vip_tickets;
  cart.tent_four = savedTickets.tent_four;
  cart.tent_two = savedTickets.tent_two;



  allRes.push(cart);

  allRes.forEach(displayCart);


}

function displayCart(cart) {

  const clone = document.querySelector("#cart").content.cloneNode(true);

  const priceREG = 799;
  const priceVIP = 1299;
  const tentTwoPrice = 299;
  const tentFourPrice = 399;
  const ticketName = "VIP Festival Ticket";
  const ticketNameReg = "Regular Festival Ticket";
  const tentTwoName = "2 Person tent";
  const tentFourName = "4 Person tent";


  clone.querySelector("[data-field=cart_regu_ticket]").textContent = ticketNameReg;
  clone.querySelector("[data-field=cart_regu_quantity]").textContent = cart.reg_tickets;
  clone.querySelector("[data-field=cart_regu_price]").textContent = priceREG + " DKK";
  clone.querySelector("[data-field=cart_regu_total]").textContent = priceREG * cart.reg_tickets + " DKK";

  clone.querySelector("[data-field=cart_vip_ticket]").textContent = ticketName;
  clone.querySelector("[data-field=cart_vip_quantity]").textContent = cart.vip_tickets;
  clone.querySelector("[data-field=cart_vip_price]").textContent = priceVIP + " DKK";
  clone.querySelector("[data-field=cart_vip_total]").textContent = priceVIP * cart.vip_tickets + " DKK";

  clone.querySelector("[data-field=cart_two_tent]").textContent = tentTwoName;
  clone.querySelector("[data-field=cart_two_tent_quantity]").textContent = cart.tent_two;
  clone.querySelector("[data-field=cart_two_tent_price]").textContent = tentTwoPrice;
  clone.querySelector("[data-field=cart_two_tent_total]").textContent = tentTwoPrice * cart.tent_two + " DKK";

  clone.querySelector("[data-field=cart_four_tent]").textContent = tentFourName;
  clone.querySelector("[data-field=cart_four_tent_quantity]").textContent = cart.tent_four;
  clone.querySelector("[data-field=cart_four_tent_price]").textContent = tentFourPrice;
  clone.querySelector("[data-field=cart_four_tent_total]").textContent = tentFourPrice * cart.tent_four + " DKK";

  document.querySelector("#cart_table").appendChild(clone);
}



function proceedTC() {
  console.log("lol");
  //Make sure, cart is not visible 
  document.getElementById("cart_section").style.display = "none";
  document.getElementById("camping_section").style.display = "block";
  getAvailability();
  document.getElementById("choose_area_btn").addEventListener("click", proceedToInfo);

}


function proceedToInfo() {
  putReservation();

  document.getElementById("camping_section").style.display = "none";
  document.getElementById("costumer_section").style.display = "block";


  document.querySelector(".p_payment").addEventListener("click", proceedToCard);
}


function proceedToCard() {


  document.getElementById("costumer_section").style.display = "none";
  document.getElementById("payment_section").style.display = "block";

  document.querySelector(".p_buy").addEventListener("click", reservationPost);

}

function confirmOrder() {

  document.getElementById("payment_section").style.display = "none";
  document.getElementById("order_popup").style.display = "block";


}



function reservationPost() {
  const payload = {

    id: reservation.id,

  };
  console.log(payload);


  fetch(`https://valkyriefest.herokuapp.com/fullfill-reservation`, {

    method: "post",

    body: JSON.stringify(payload),

    headers: {

      Accept: "application/json",

      "Content-Type": "application/json",

    },

  })

    .then((res) => res.json())

    .then((d) => {
      console.log(d);
      confirmOrder();
    });
}




//Here we fetch the endpoint to load json of the available camping spots
async function getAvailability() {

  const endpoint = "https://valkyriefest.herokuapp.com/available-spots";


  const data = await fetch(endpoint);
  const json = await data.json();


  prepareAreas(json);

}

function prepareAreas(json) {
  

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


function displayAreaAvailability(camping) {
  document.querySelectorAll("[data-action='area_select']").forEach(input => input.addEventListener("click", reserveAreaSpot));



  const clone = document.querySelector("#template_camping").content.cloneNode(true);
  clone.querySelector("[data-field=spots]").textContent = "Spots: " + camping.spots;
  clone.querySelector("[data-field=available]").textContent = "Available: " + camping.available;




  if (camping.area === "Svartheim") {
    document.querySelector("#area_a").textContent = camping.area;
    clone.querySelector("[data-field=available]").id = "Svartheim_a";

    document.querySelector("#camping_one").appendChild(clone);



  }
  if (camping.area === "Nilfheim") {
    document.querySelector("#area_b").textContent = camping.area;
    clone.querySelector("[data-field=available]").id = "Nilfheim_a";

    document.querySelector("#camping_two").appendChild(clone);



  } if (camping.area === "Helheim") {
    document.querySelector("#area_c").textContent = camping.area;
    clone.querySelector("[data-field=available]").id = "Helheim_a";

    document.querySelector("#camping_three").appendChild(clone);


  } if (camping.area === "Muspelheim") {
    document.querySelector("#area_d").textContent = camping.area;
    clone.querySelector("[data-field=available]").id = "Muspelheim_a";

    document.querySelector("#camping_four").appendChild(clone);


  } else if (camping.area === "Alfheim") {
    document.querySelector("#area_e").textContent = camping.area;
    clone.querySelector("[data-field=available]").id = "Alfheim_a";

    document.querySelector("#camping_five").appendChild(clone);


  }
  function reserveAreaSpot() {

    const storage = localStorage.getItem("tickets");
    let savedTickets = JSON.parse(storage);

    const campForm = document.querySelector("#camping");
    const area = campForm.camparea.value;



    reservation.area = area;
    reservation.amount = savedTickets.total_tickets;

    let hu;

    if (this.value === camping.area) {
      if (camping.available > savedTickets.total_tickets) {
        hu = camping.available - savedTickets.total_tickets;

        const area = this.value;
        console.log(hu);
        updateDisplay(hu, area);

        console.log(reservation);
      }
    }

  }

  function updateDisplay(hu, area) {
    const area_availability = area + "_a";
    if (area = camping.area) {
      document.getElementById(area_availability).textContent = hu;
    }
  }

}



function putReservation() {

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
      if (d.id) {
        saveReservation(d);
      } else {
        console.log("Cannot reserve, no spots available in chosen area");
      }

    });

  function saveReservation(d) {
    reservation.id = d.id;
    console.log(reservation);
    timerDesktop();
  }
}



//Timer function and times up
function timerDesktop() {


  //Here I set the timer layout to be 05:00 as default
  document.querySelector(".timer").innerHTML = "05" + ":" + "00";
  //Setting so when calling timerDesktop, the timer for desktop starts
  startTimer();

  function startTimer() {

    //Here I make a variable for the innerHTML for the timer
    const min_sec = document.querySelector(".timer").innerHTML;

    //Here I split the the string so it becomes an array of only the four digits for minutes and seconds
    const arraytime = min_sec.split(/[:]+/);

    //Here I set m, my minutes variable, as the first part of the array 0
    let m = arraytime[0];

    //Here I set s, my seconds variable, as the last part of the array 1 -1 for countdown and call the function seconds
    let s = seconds(arraytime[1] - 1);

    //Here I make an if statement saying if seconds hits 59, minutes have to decrement 1 value
    if (s == 59) {
      m = m - 1;
    }

    //Here if minutes are smaller than 0, its only the seconds that returns
    if (m < 0) {
      return;
    }

    //Here I add my minute and seconds variables to the inner HTML, so the timers length is added to the other variable of timer default
    document.querySelector(".timer").innerHTML = m + ":" + s;

    //Here I call the setTimeout function and makes it call the startTImer function every second, therefore its always in loop
    setTimeout(startTimer, 1000);

    //Here I make an if statement saying, if the timer seconds hits the string 00, it stops the settimeOut function
    if (s === "00" && m === "00") {
      clearTimeout(setTimeout, timesUp());
    }
  }
  //Here I make the function seconds to make sure when seconds hits under 10 or are over or equal 0, it needs a 0 infront (09), and when its neither its counting down from 59
  function seconds(sec) {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    }
    if (sec < 0) {
      sec = "59";
    }
    return sec;
  }


}

function timesUp() {
  console.log("TIMES UP BIIIIIIITCH");

  const timesupPop = document.getElementById("timesup_popup");

  timesupPop.style.display = "block"
  document.querySelector(".timesup_continue").addEventListener("click", closeDownTime);

  function closeDownTime() {
    const timesupPop = document.getElementById("timesup_popup");

    timesupPop.style.display = "none"

    location.href = "index.html";
  }
}

/* let form = document.querySelector("form");

form.addEventListener("input", test);

function test (e) {
 if(e.target.value.length == e.target.maxLength){
        e.target.nextElementSibling.focus();
          
    }
}
 */


