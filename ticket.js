"use strict";

window.addEventListener("DOMContentLoaded", start);


const Reservation = {
    id: "",
    total_tickets: 0,
    reg_tickets: 0,
    vip_tickets: 0,
    tent_four: 0,
    tent_two: 0,
    area: "",
    amount: 0
}

//Function that starts the whole systaaaaam
function start() {
    console.log("start");


    //Here I call functions
    registerButtons();


}

function registerButtons() {

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

var hasbeenChecked = false;
function getUserInput() {
    const form = document.querySelector(".regu_fillout");
    const reg_tickets = parseInt(form.elements.amount_reg_ticket.value);
    const vip_tickets = parseInt(form.elements.amount_vip_ticket.value);
    const reservation = Object.create(Reservation);
    const tentTwo = parseInt(form.elements.amount_tent_two.value);
    const tentFour = parseInt(form.elements.amount_tent_four.value);
    reservation.reg_tickets = reg_tickets;
    reservation.vip_tickets = vip_tickets;


    // Making an ifstatement so the amount is equal to the amount of tickets you put in the form
    if (vip_tickets === 0 && reg_tickets > 0) {
        reservation.total_tickets = reg_tickets;
    }
    if (vip_tickets > 0 && reg_tickets === 0) {
        reservation.total_tickets = vip_tickets;
    }
    if (vip_tickets > 0 && reg_tickets > 0) {
        reservation.total_tickets = vip_tickets + reg_tickets;
    }


    reservation.tent_two = tentTwo;
    reservation.tent_four = tentFour;

    reservation.amount = parseInt(tentTwo + (tentFour * 2));
    console.log(reservation);
    localStorage.setItem("tickets", JSON.stringify(reservation));



  


    const tentSpaceTwo = reservation.tent_two * 2;
    const tentSpaceFour = reservation.tent_four * 4;
    const totalSpace = tentSpaceTwo + tentSpaceFour;
    

    //if all these conditions are met, go to cart, else check validity to show correct err messages
    //this is so of the user fills the form correctly on the first try, it will go to cart.
    //the has been checked bool makes sure that go to cart doesnt trigger automatically when getuserinput is called again after clicking amount buttons
    if (reservation.total_tickets > 0 & reservation.total_tickets <= totalSpace & hasbeenChecked == false || reservation.total_tickets > 0 & totalSpace == 0 & hasbeenChecked == false) {
       goToCart();
    } else {
        checkValidity();
    }





    //for each amount button, add click eventlistener that calls getuserinput
    //this makes sure validity is checked every time there is changes 
    document.querySelectorAll(".amount_btn").forEach(btn => btn.addEventListener("click", getUserInput));





    function checkValidity() {
        const ticketErr = document.getElementById("errTicket");
    const tentErr = document.getElementById("errTent");

    //valid variable that gets updated in checkvalidity function
    var valid;
    //sets has been checked to true, so gotocart doesnt trigger instantly when get input is called again
    hasbeenChecked = true;

        //if no tickets selected, show err message 
        //if tents have been chosen, but are less than total tickets, show err message, showing how much space is needed
        //else valid is true and err msg removed
        if (reservation.total_tickets === 0) {
            valid = false;
            console.log(valid);
            ticketErr.innerHTML = `<p>Please add some tickets before proceeding </p>`;
           

        } else if (reservation.total_tickets > totalSpace & totalSpace > 0) {
            valid = false;
            console.log(valid);
            tentErr.innerHTML = `<p>Please add tents enough for ${reservation.total_tickets} people</p>`;
           

        } else {
            valid = true;
            ticketErr.innerHTML = "";
            tentErr.innerHTML = "";
            console.log(valid);
        }

        //if form is valid, add click eventlistener to buy button, and go to cart
        //else remove this eventlistener, so instead get user input is (previous eventlistener)
        // doing it with click eventlistener so it doesnt go to cart  as soon as valid is true
        // this way user can still add more tickets or tents spaces
        if (valid == true) {
            document.querySelector(".ticket_buy").addEventListener("click",
                goToCart);
        } else {
            document.querySelector(".ticket_buy").removeEventListener("click",
                goToCart);
        }


    }

}



function goToCart() {
    location.href = "checkout.html";
}


function showRegDetails() {

    const regDetail = document.querySelector(".regu_fillout");
    console.log("LOL");

    regDetail.style.display = "block";
    regDetail.style.opacity = '100';


    regDetail.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    //  document.querySelector(".closeRegu").addEventListener("click", () => regDetail.style.display = "none"); 

    document.querySelector(".regu_ticket").removeEventListener("click", showRegDetails);
    document.querySelector(".regu_ticket").addEventListener("click", closeDetails);


    function closeDetails() {
        console.log("closed");
        document.querySelector("#tickets").scrollIntoView({ behavior: "smooth", inline: "nearest" });

        regDetail.style.opacity = '0';


        document.querySelector(".regu_ticket").addEventListener("click", showRegDetails);
    }
}


function deRT() {
    document.getElementById('amount_reg_ticket').stepDown();


}
function inRT() {
    document.getElementById('amount_reg_ticket').stepUp();

}

function deRTwo() {
    document.getElementById('amount_tent_two').stepDown();

}
function inRTwo() {
    document.getElementById('amount_tent_two').stepUp();

}

function deRFour() {
    document.getElementById('amount_tent_four').stepDown();

}
function inRFour() {
    document.getElementById('amount_tent_four').stepUp();

}


function deVT() {
    document.getElementById('amount_vip_ticket').stepDown();


}
function inVT() {
    document.getElementById('amount_vip_ticket').stepUp();

}

