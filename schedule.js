
//indhent data -done
//split op efter scene -done
//split op efter dag -done
//split op i enkelte tider -done
//vis data -done
//filtrer data efter input af dag - done
// fiks template og vis data pænt
//filtrer efter scene på mobile ??? 


"use strict";


const Act = {
  stage: "stagename",
  day: "day",
  fullDay: "",
  start: "",
  end: "",
  artist: ""


};

const allSchedule = [];



const settings = {
  filterDay: "mon",
  filterStage: "Midgard"

}


window.addEventListener("DOMContentLoaded", start);


const mediaQuery = window.matchMedia('(min-width: 768px)');
const form = document.querySelector("#schedule-form");
const input = form.elements.day;




function start() {
  console.log("started");
  //adds eventlistener to buttons

  input.addEventListener("input", selectDay);

  document.querySelectorAll("[data-action='filter']")
  .forEach(button => button.addEventListener("click", selectStage));
  //load my json
  loadJSON();
}

async function loadJSON() {


  const endpoint = "https://valkyriefest.herokuapp.com/schedule";


  const scheduleData = await fetch(endpoint);
  const data = await scheduleData.json();


  console.log(data);


  prepareData(data);



}



function prepareData(jsondata) {



  const stages = Object.entries(jsondata);
  stages.forEach(stage => {

    console.log(stage);

    const days = Object.entries(stage[1]);
    days.forEach(day => {

      console.log(day);

      const times = Object.entries(day[1]);

      times.forEach(time => {

     

        const act = Object.create(Act);

        act.stage = stage[0];
        act.day = day[0];
        act.start = time[1].start;
        act.end = time[1].end;
        act.artist = time[1].act;

        let fullDay;
        if (act.day === "tue") {
          fullDay = act.day + "sday";
        } else if (act.day === "wed") {
          fullDay = act.day + "nesday"
        } else if (act.day === "thu") {
          fullDay = act.day + "rsday"
        } else if (act.day === "sat") {
          fullDay = act.day + "urday"
        } else {
          fullDay = act.day + "day";
        }

        act.fullDay = fullDay.charAt(0).toUpperCase() + fullDay.slice(1);
        //console.log(schedule);

        allSchedule.push(act);


      });

    });
  });

  buildList(allSchedule);

}





//sets filter to value of input day field
function selectDay() {
  const inputday = input.value;
  const filter = inputday;
  console.log(`user selected: ${filter}`);
  setDay(filter);
}

/*changes the value of filterDay in the settings, and calls buildlist*/
function setDay(filter) {
  settings.filterDay = filter;
  buildList();
}

/*returns a filtered schedule list based on day*/
function filterListDay(filteredSchedule) {

  if (settings.filterDay === "mon") {
    filteredSchedule = filteredSchedule.filter(isMonday);
  } else if (settings.filterDay === "tue") {
    filteredSchedule = filteredSchedule.filter(isTuesday);
  } else if (settings.filterDay === "wed") {
    filteredSchedule = filteredSchedule.filter(isWednesday);
  } else if (settings.filterDay === "thu") {
    filteredSchedule = filteredSchedule.filter(isThursday);
  } else if (settings.filterDay === "fri") {
    filteredSchedule = filteredSchedule.filter(isFriday);
  } else if (settings.filterDay === "sat") {
    filteredSchedule = filteredSchedule.filter(isSaturday);
  } else if (settings.filterDay === "sun") {
    filteredSchedule = filteredSchedule.filter(isSunday);
  }

  function isMonday(schedule) {
    return schedule.day === "mon";
  }

  function isTuesday(schedule) {
    return schedule.day === "tue";
  }

  function isWednesday(schedule) {
    return schedule.day === "wed";
  }

  function isThursday(schedule) {
    return schedule.day === "thu";

  }
  function isFriday(schedule) {
    return schedule.day === "fri";

  }
  function isSaturday(schedule) {
    return schedule.day === "sat";

  } function isSunday(schedule) {
    return schedule.day === "sun";

  }

  return filteredSchedule;
}




function selectStage(event) {
  const filter = event.target.dataset.filter;
  
  console.log(`user selected: ${filter}`);
  setStage(filter);
}

/*changes the value of filterStage in the settings, and calls buildlist*/
function setStage(filter) {
  settings.filterStage = filter;
  buildList();
}


/*returns a filtered schedule list based on day*/
function filterListStage(filteredSchedule) {

  if (settings.filterStage === "Midgard") {
    filteredSchedule = filteredSchedule.filter(isMidgard);
  } else if (settings.filterStage === "Vanaheim") {
    filteredSchedule = filteredSchedule.filter(isVanaheim);
  } else if (settings.filterStage === "Jotunheim") {
    filteredSchedule = filteredSchedule.filter(isJotunheim);
  } 

  function isMidgard(schedule) {
    return schedule.stage === "Midgard";
  }

  function isVanaheim(schedule) {
    return schedule.stage === "Vanaheim";
  }

  function isJotunheim(schedule) {
    return schedule.stage === "Jotunheim";
  }


  return filteredSchedule;
}

/*builds the list based on the returned filtered schedule*/
function buildList() {
  const todaysSchedule = filterListDay(allSchedule);
  const byStageTodaysSchedule = filterListStage(todaysSchedule);


  
if( mediaQuery.matches){

  displayList(todaysSchedule);
  console.log(todaysSchedule);

  

 }else{
  displayList(byStageTodaysSchedule);
  console.log(byStageTodaysSchedule);

 }

}


/*clears the list, before calling display schedule for each act */
function displayList(schedule) {

  document.querySelector("#list1").innerHTML = "";
  document.querySelector("#list2").innerHTML = "";
  document.querySelector("#list3").innerHTML = "";
  schedule.forEach(displaySchedule);

}

function displaySchedule(act) {
  document.querySelector("#activeDay").textContent = act.fullDay;


if( act.artist !== "break"){
  const clone = document.querySelector("template").content.cloneNode(true);

  clone.querySelector("#artist").textContent = act.artist;
clone.querySelector("#time").textContent = `${act.start} - ${act.end}`;
clone.querySelector("#artist").addEventListener( "click", seeDetails);




if( mediaQuery.matches){

  if (act.stage == "Midgard") {

    document.querySelector("#list1").appendChild(clone);
 
  }
  if (act.stage == "Vanaheim") {

    document.querySelector("#list2").appendChild(clone);
  
  }

  if (act.stage == "Jotunheim") {
    document.querySelector("#list3").appendChild(clone);

  }

 }else{ 
   
  document.querySelector("#list1").appendChild(clone);
  document.querySelector("#table1 .table-title").textContent = settings.filterStage;
 
  
}
}
}


function seeDetails(){

  const id= this.textContent;
   console.log(id);
  
   window.location.href = `single.html?id=${id}`;
  
  }


