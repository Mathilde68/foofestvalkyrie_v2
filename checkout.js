<<<<<<< HEAD
"use strict"


function getReservation(){
    /* 
alert(Reservation);

const order = Reservation;

console.log(order)
console.log(Reservation)

 */

}

function displayList(){}



function displayCart(){}
=======

/* let form = document.querySelector("form");

form.addEventListener("input", test);

function test (e) {
 if(e.target.value.length == e.target.maxLength){
        e.target.nextElementSibling.focus();
          
    }
}
 */

//Timer function and times up
function timerDesktop(){
//Here I set the timer layout to be 05:00 as default
document.querySelector(".timer").innerHTML = "05" + ":" + "01";
//Setting so when calling timerDesktop, the timer for desktop starts
startTimer();

function startTimer(){

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
 if(s === "00"){
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

function timesUp(){
  console.log("TIMES UP BIIIIIIITCH");
  
  const timesupPop = document.getElementById("timesup_popup");

  timesupPop.style.display ="block"


  document.querySelector(".timesup_continue").addEventListener("click", closeDownTime);

function closeDownTime(){
  const timesupPop = document.getElementById("timesup_popup");

  timesupPop.style.display ="none"
}

}


>>>>>>> 7d45ebe575fa1ec93cdee62c9ae3784e249704c4
