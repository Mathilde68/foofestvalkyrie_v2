"use strict";

window.addEventListener("DOMContentLoaded", start);



const Area = {
  area: "area",
  spots: 0,
  available: 0

}

let allAreas = [];



const cartOrder = {
  total_tickets: 0,
  reg_tickets: 0,
  vip_tickets: 0,
  tent_four: 0,
  tent_two: 0
}

const allTickets = [];

const reservation = {
  id: "",
  area: "",
  amount: 0,
  confirmed: false

}

let orderInfo = {
  fullname: "",
  adress: "",
  phone: "",
  email: "",
  others: [

  ],
  total_price: ""
}

console.log(orderInfo);

const storage = localStorage.getItem("tickets");
let savedTickets = JSON.parse(storage);


//Function that starts the whole systaaaaam
function start() {
  console.log("start");

  //Make sure, cart is visible first
  document.getElementById("cart_section").style.display = "block";
  //hiding timer
  document.getElementById("timer_section").style.display = "none";


  //Here I call functions
  checkCart();


}


function checkCart() {
  console.log(localStorage);

  //adds eventlistener and hides cart if localstorage is empty or if no tickets, calls prepare tickets of there is anything in local storage
  //otherwise, hide the proceed button and show cart empty message
if (localStorage.getItem("tickets") === null || savedTickets.reg_tickets === 0 & savedTickets.vip_tickets === 0) {
    document.querySelector(".cart_p_checkout").style.display = "none";
    document.querySelector(".emptyCart").style.display = "block";
  } else {
    prepareTickets();
    document.querySelector(".cart_p_checkout").style.display = "block";
    document.querySelector(".emptyCart").style.display = "none";
    document.querySelector(".cart_p_checkout").addEventListener("click", proceedToArea);

  }

}

function prepareTickets() {


  console.log(savedTickets);


  const cart = Object.create(cartOrder);
  cart.total_tickets = savedTickets.total_tickets;
  cart.reg_tickets = savedTickets.reg_tickets;
  cart.vip_tickets = savedTickets.vip_tickets;
  cart.tent_four = savedTickets.tent_four;
  cart.tent_two = savedTickets.tent_two;



  displayCart(cart);


}


//Here is the function for displaying the cart
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

  const regTotal = priceREG * cart.reg_tickets;
  const vipTotal = priceVIP * cart.vip_tickets;
  const twoTentTotal = tentTwoPrice * cart.tent_two;
  const fourTentTotal = tentFourPrice * cart.tent_four;
  const total = regTotal + vipTotal + twoTentTotal + fourTentTotal + 99;

  clone.querySelector("[data-field=cart_regu_ticket]").textContent = ticketNameReg;
  clone.querySelector("[data-field=cart_regu_quantity]").textContent = cart.reg_tickets + "x";
  clone.querySelector("[data-field=cart_regu_price]").textContent = priceREG;
  clone.querySelector("[data-field=cart_regu_total]").textContent = regTotal + " DKK";
  clone.querySelector("[data-field=cart_vip_ticket]").textContent = ticketName;
  clone.querySelector("[data-field=cart_vip_quantity]").textContent = cart.vip_tickets + "x";
  clone.querySelector("[data-field=cart_vip_price]").textContent = priceVIP;
  clone.querySelector("[data-field=cart_vip_total]").textContent = vipTotal + " DKK";
  clone.querySelector("[data-field=cart_two_tent]").textContent = tentTwoName;
  clone.querySelector("[data-field=cart_two_tent_quantity]").textContent = cart.tent_two + "x";
  clone.querySelector("[data-field=cart_two_tent_price]").textContent = tentTwoPrice;
  clone.querySelector("[data-field=cart_two_tent_total]").textContent = twoTentTotal + " DKK";
  clone.querySelector("[data-field=cart_four_tent]").textContent = tentFourName;
  clone.querySelector("[data-field=cart_four_tent_quantity]").textContent = cart.tent_four + "x";
  clone.querySelector("[data-field=cart_four_tent_price]").textContent = tentFourPrice;
  clone.querySelector("[data-field=cart_four_tent_total]").textContent = fourTentTotal + " DKK";

  clone.querySelector("[data-field=cart_total_total]").textContent = total + " DKK";

  //Making if statements so if you havent added anything in ticketform it doesnt show up
  if (cart.reg_tickets === 0) {
    clone.querySelector("[data-field=cart_regu_ticket]").style.display="none";
    clone.querySelector("[data-field=cart_regu_quantity]").style.display="none";
    clone.querySelector("[data-field=cart_regu_price]").style.display="none";
    clone.querySelector("[data-field=cart_regu_total]").style.display="none";
  }

  if (cart.vip_tickets === 0) {
    clone.querySelector("[data-field=cart_vip_ticket]").style.display="none";
    clone.querySelector("[data-field=cart_vip_quantity]").style.display="none";
    clone.querySelector("[data-field=cart_vip_price]").style.display="none";
    clone.querySelector("[data-field=cart_vip_total]").style.display="none";
  }

  if (cart.tent_two === 0) {
    clone.querySelector("[data-field=cart_two_tent]").style.display="none";
    clone.querySelector("[data-field=cart_two_tent_quantity]").style.display="none";
    clone.querySelector("[data-field=cart_two_tent_price]").style.display="none";
    clone.querySelector("[data-field=cart_two_tent_total]").style.display="none";

  }

  if (cart.tent_four === 0) {
    clone.querySelector("[data-field=cart_four_tent]").style.display="none";
    clone.querySelector("[data-field=cart_four_tent_quantity]").style.display="none";
    clone.querySelector("[data-field=cart_four_tent_price]").style.display="none";
    clone.querySelector("[data-field=cart_four_tent_total]").style.display="none";
  }

  document.querySelector("#cart_table").appendChild(clone);
}


//here is teh function for proceeding to area select
function proceedToArea() {
  console.log("lol");
  //Make sure, cart is not visible, and camping is not
  document.getElementById("cart_section").style.display = "none";
  document.getElementById("camping_section").style.display = "block";


  //get availability of the camp areas
  getAvailability();

  //eventlistenr to proceed to info
  //here i add click eventlistener, if form is valid it prevents default submit, and calls proceed to cart
  //its to make sure that each input fiels still  shows as required while the form is invalid, and only prevents default once everything IS valid
  document.querySelector("#choose_area_btn").addEventListener("click", function (event) {
    if (document.querySelector('#camping').checkValidity()) {
      document.getElementById("campErr").innerHTML = "";
      event.preventDefault();
      proceedToInfo();

    } else {
      document.getElementById("campErr").innerHTML = `<p>Please choose a camparea to continue</p>`;

    }
  });
}


//here is the function for proceeding to info input
function proceedToInfo() {

  putReservation();

  //hiding camping sectiong and make costumer section visible
  document.getElementById("camping_section").style.display = "none";
  document.getElementById("costumer_section").style.display = "block";
  document.getElementById("timer_section").style.display = "block";

  //for loop that calls add ticket info for the amount of tickets
  for (var x = 1; x < savedTickets.total_tickets; x++) {
    console.log(x);
    addTicketInfo();
  }





  //here i add click eventlistener, if form is valid it prevents default submit, and calls proceed to cart
  //its to make sure that each input fiels still  shows as required while the form is invalid, and only prevents default once everything IS valid
  document.querySelector(".p_payment").addEventListener("click", function (event) {
    if (document.querySelector('.costumer_form form').checkValidity()) {
      event.preventDefault();
      proceedToCard();

    } else {
      console.log("not valid yet");
    }
  });
}

//add ticket info makes a new instance of the formsection class
function addTicketInfo() {
  document.getElementById("otherTicket_title").style.display="block";
  const otherTicket = new Formsections("otherTicket");

}

function proceedToCard() {


  document.getElementById("costumer_section").style.display = "none";
  document.getElementById("payment_section").style.display = "block";


  //here i add click eventlistener, if form is valid it prevents default submit, and calls reservationPost
  //dis makes sure that each input fiels still shows as required while the form is invalid, and only prevents default once everything IS valid
  document.querySelector(".p_buy").addEventListener("click", function (event) {
    if (document.querySelector('#card_info').checkValidity() === true) {
      event.preventDefault();
      reservationPost();
    } else {
      console.log("YOU HAVE TO PAY FIRST");
    }
  });

}

//here i show the popup showing the order has been confirmed, and stopping the timer as well
function confirmOrder() {
  document.getElementById("payment_section").style.display = "none";
  document.getElementById("timer_section").style.display = "none";
  document.getElementById("order_popup").style.display = "block";
 

  //eventlistener button
  document.querySelector(".order_continue").addEventListener("click", () => {
    location.href = "schedule.html";
  });



  //calling the timer again to stop the timer
  timer();

  //calling Saveorder info, which reads the forms values, and saves everything about the order in a object
  saveOrderInfo();
}

function saveOrderInfo() {

  //reading values from the costumer form
  const costumerForm = document.querySelector(".costumer_form form");
  const fullname = costumerForm.elements.fullname.value;
  const email = costumerForm.elements.mail.value;
  const address = costumerForm.elements.address.value + ", " + costumerForm.elements.city.value;
  const phone = costumerForm.elements.phone.value;
  const total = document.querySelector("[data-field=cart_total_total]").textContent;

  //array for fullnames and phones
  const fullnames = [];
  const phones = [];

  //for each fullname input, add object containing  the name to fullname array, same with phones
  document.querySelectorAll(".fullnames").forEach(input => {
    const fullname = {
      fullname: input.value
    }
    fullnames.push(fullname);

  });
  document.querySelectorAll(".phonenums").forEach(input => {

    const phone = {
      phone: input.value
    }
    phones.push(phone);
  });

  //maps the arrays to combine fullname and phone into their own individual arrays
  const Others = fullnames.map(function (value, index) {
    return [value, phones[index]]
  });


  //create new order object from Orderinfo template
  let newOrder = Object.create(orderInfo);

  //combining all the information from tickets and reservation in the order object, by using spread
  newOrder = { ...savedTickets, ...reservation }
  newOrder.fullname = fullname;
  newOrder.email = email;
  newOrder.address = address;
  newOrder.phone = phone;
  newOrder.others = Others;
  newOrder.total_price = total;
  console.log(newOrder);


  //calling post info with the neworder object, to post order to our database
  postOrderInfo(newOrder);
}

//this function posts to our database the neccesary info from the order object, 
//then it calls sendConfirmation with the neccesary info from order
function postOrderInfo(order) {
  const payload = {
    name: order.fullname,
    email: order.email,
    phone: order.phone,
    adress: order.address,
    area: order.area,
    reg_ticket: order.reg_tickets,
    vip_ticket: order.vip_tickets,
    two_tents: order.tent_two,
    four_tents: order.tent_four,
    others: order.others,
    total_price: order.total_price
  };
  console.log(payload);
  fetch('https://foobooking-7e65.restdb.io/rest/bookings', {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "62965c79c4d5c3756d35a402",
    },
    body: JSON.stringify(payload),

  }).then((res) => res.json())
    .then((d) => {
      console.log(d);
      sendConfirmation(order.fullname, order.email, order.total_price);
    });

}

function ticketMessage() {
  var ticketMessage;
  if (savedTickets.reg_tickets === 0) {
    ticketMessage = ` ${savedTickets.total_tickets} total tickets; ${savedTickets.vip_tickets} VIP tickets`;
  } else if (savedTickets.vip_tickets === 0) {
    ticketMessage = ` ${savedTickets.total_tickets} total tickets: ${savedTickets.reg_tickets} Regular tickets`;
  } else {
    ticketMessage = ` ${savedTickets.total_tickets} total tickets: ${savedTickets.reg_tickets} Regular tickets and ${savedTickets.vip_tickets} VIP tickets`;
  }
  return ticketMessage;
}


function tentMessage() {
  var tents;
  if (savedTickets.tent_four === 0 & savedTickets.tent_two > 0) {
    tents = ` ${savedTickets.tent_two} two person tents`;
  } else if (savedTickets.tent_two === 0 & savedTickets.tent_four > 0) {
    tents = ` ${savedTickets.tent_four} four person tents`;
  } else if (savedTickets.tent_four > 0 & savedTickets.tent_two > 0) {
    tents = ` ${savedTickets.tent_two} two person tents and ${savedTickets.tent_four} four person tents`;
  } else {
    tents = "No tents were purchased - so remember to bring your own ;)";
  }
  return tents;
}


function sendConfirmation(name, email, total) {
  const tickets = ticketMessage();
  const tents = tentMessage();

  const payload = {
    service_id: 'service_ngppnvc',
    template_id: 'template_wuxketh',
    user_id: 'dgCgRYkZrhDwvJ2pA',
    template_params: {
      'to_name': name,
      'to_user': email,
      'tickets': tickets,
      'tents': tents,
      'total': total
    }
  };
  console.log(payload);


  fetch(`https://api.emailjs.com/api/v1.0/email/send`, {

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


    });
}

//post the reservation with the id as payload
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
    //setting reservation confirmed to true, and calling confirm order once reservation has been posted
    .then((res) => res.json())
    .then((d) => {
      console.log(d);
      reservation.confirmed = true;
      console.log(reservation);
      confirmOrder();
    });
}




//Here we fetch the endpoint to load json of the available camping spots*/
async function getAvailability() {

  const endpoint = "https://valkyriefest.herokuapp.com/available-spots";


  const data = await fetch(endpoint);
  const json = await data.json();


  prepareAreas(json);

}

function prepareAreas(json) {
  allAreas = [];

  json.forEach(jsonobject => {

    const camping = Object.create(Area);

    camping.area = jsonobject.area;
    camping.spots = jsonobject.spots;
    camping.available = jsonobject.available;


    allAreas.push(camping);

  });


  console.log(allAreas);


  prepareList();
}

function prepareList() {



  document.querySelector("#camping_one").textContent = "";
  document.querySelector("#camping_two").textContent = "";
  document.querySelector("#camping_three").textContent = "";
  document.querySelector("#camping_four").textContent = "";
  document.querySelector("#camping_five").textContent = "";

  allAreas.forEach(displayAreaAvailability);

}

//Here we display the areas and their availability + add function for reserving spot, and updating the list
function displayAreaAvailability(camping) {


  //add eventlistener for each of the area select radio buttons
  document.querySelectorAll("[data-action='area_select']").forEach(input => input.addEventListener("click", reserveAreaSpot));


  const clone = document.querySelector("#template_camping").content.cloneNode(true);
  clone.querySelector("[data-field=spots]").textContent = camping.spots + " spots";
  clone.querySelector("[data-field=available]").textContent = "Available: " + camping.available;

  //if no spots available set text to to sold out (EVT: make radio button unclickable too???)
  if (camping.available === 0) {

    clone.querySelector("[data-field=available]").textContent = "SOLD OUT";
    disableClick();

  }


  /*appending each area's info to the coresponding list and changing the name*/
  /*giving each  area-availability field an id with areaname + _a for available
   - the id is needed later when changing the available count */

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



  //if there is less available spots than tickets, disable clicking
  if (camping.available < savedTickets.total_tickets) {
    disableClick();
  }

  //here is the function that makes sure the button is unclickable and blacks out the btn with unclickable class
  function disableClick() {


    const area = camping.area;

    console.log("disabled " + area);

    document.getElementById(area).checked = false;
    document.getElementById(area).disabled = true;
    document.getElementById(area).classList.add("unclickable");
  }




  /*Here i add function that saves the reservation area, and updates the display for availability*/
  function reserveAreaSpot() {
    //first resets the list to make sure availability goes back to orginial value when clicking between areas.
    resetList();


    //if the clicked area matches the camping area, and if there is enough spots
    if (this.value === camping.area) {
      if (camping.available >= savedTickets.total_tickets) {

        //then calculate new availability - update display updates the corresponding available spot fields

        const newAvailability = camping.available - savedTickets.total_tickets;
        console.log(newAvailability);
        updateDisplay(newAvailability, this.value);

        //then set the values of reservation to match selected area and amount of tickets*/
        reservation.area = this.value;
        reservation.amount = savedTickets.total_tickets;

        console.log(reservation);
      }
    }
  }



  /*Here I update the display to show the new availability, 
      - it receives the updated available count and the clicked area that lead into the function*/
  function updateDisplay(newAvailability, area) {
    const area_availability = area + "_a";
    /*adding "_a" to the area to match the id for area-availability data-fields*/
    if (area = camping.area) {

      /*sets textcontent of the areas availability - using the area-availability variable*/
      document.getElementById(area_availability).textContent = `Available: ${newAvailability}`;
    }

  }



  //Here i add reset function that makes sure availability goes back to orginial value.
  //this is to make sure the area availability changes when clicking between areas.
  function resetList() {
    const area_availability = camping.area + "_a";
    if (camping.available === 0) {
      document.getElementById(area_availability).textContent = `SOLD OUT`;

    } else {

      document.getElementById(area_availability).textContent = `Available: ${camping.available}`;
    }
  }
}


/*put reservation to the reserve spot endpoint, with a paylaod containing the reservations area, and amount*/
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
      /*if it returns an id, the reservation is saved*/
      console.log(d);
      if (d.id) {
        saveReservation(d);
      } else {
        console.log("Cannot reserve, no spots available in chosen area");
      }

    });
  /*reservation id is saved and the timer starts*/
  function saveReservation(d) {
    reservation.id = d.id;
    console.log(reservation);
    timer();


  }
}




//Timer function and times up
function timer() {
  console.log("timer");
  document.querySelector("#timer_section").style.display = "block"

  //Here I set the timer layout to be 05:00 as default
  document.querySelector(".timer").innerHTML = "5" + ":" + "00";
  //Setting so when calling timer, the timer for desktop starts


  //if the reservation/order has been confirmed, stop the timer, otherwise start the timer;
  if (reservation.confirmed) {
    stopTimer();
  } else {
    startTimer();
  }
}

function stopTimer() {
  //Here I reset the timer layout to be 00:00, this is done after order completion
  document.querySelector(".timer").innerHTML = "00" + ":" + "00";
  //here i hide the timer
  document.getElementById("timer_section").style.display="none";

  //clearing the local storage
  localStorage.clear("tickets");
}
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
  if (s === "00" && m === "0") {
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


function timesUp() {

  console.log("TIMES UP BIIIIIIITCH");


  const timesupPop = document.getElementById("timesup_popup");

  //show time sup popup
  timesupPop.style.display = "block"
  document.querySelector(".timesup_continue").addEventListener("click", closeDownTime);

    //here i hide the timer
    document.getElementById("timer_section").style.display="none";

  //clearing the local storage
  localStorage.clear("tickets");


  function closeDownTime() {
    const timesupPop = document.getElementById("timesup_popup");

    timesupPop.style.display = "none"

    location.href = "checkout.html";
  }
}

//our formsection class to construct extra input fields for the additional ticket owners
//it creates two input field with a label each, and appends it to a div formsection, 
//which is then appended to the end of the costumer info form
class Formsections {
  constructor(id) {
  

    const labelName = document.createElement('label');
    labelName.for = 'fullname_guest';
    labelName.innerHTML = 'Fullname*';

    const inputName = document.createElement('input');
    inputName.name = 'fullname_guest';
    inputName.classList.add('fullnames');
    inputName.type = 'text';
    inputName.required = true;

    const labelTel = document.createElement('label');
    labelTel.for = 'phone_guest';
    labelTel.innerHTML = 'Enter your phone number';

    const inputTel = document.createElement('input');
    inputTel.name = 'phone_guest';
    inputTel.classList.add('phonenums');
    inputTel.type = 'tel';
    inputTel.maxLength = '8';
    inputTel.pattern = '[0-9]+';

    this.labelName = labelName;
    this.inputName = inputName;
    this.labelTel = labelTel;
    this.inputTel = inputTel;

    
    const formsection = document.createElement('div');
    formsection.classList.add("others_form");
    formsection.appendChild(labelName);
    formsection.appendChild(inputName);
    formsection.appendChild(labelTel);
    formsection.appendChild(inputTel);
    document.getElementById(id).appendChild(formsection); 

  
  }
}

