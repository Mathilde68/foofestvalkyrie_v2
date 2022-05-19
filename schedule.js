
//indhent data
//split op efter scene
//split op efter dag
//vis data
//vis data efter input af dag/ scene


"use strict";

window.addEventListener("DOMContentLoaded", start);

const form = document.querySelector("#theSchedule");

const input = form.elements.day;
let inputday;
const Act = {
  stage: "stagename",
  day: "day",
    start: "",
    end: "",
    artist: ""

  
};

const allSchedule=[];



const settings = {
  filterDay: "mon",
  filterStage:""
  
}


function start() {
  console.log("started");
  //adds eventlistener to button

  input.addEventListener("input", selectFilter);
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

    const days = Object.entries(stage[1]);
    days.forEach(day => {

      const times = Object.entries(day[1]);

      times.forEach( time => {

      const act = Object.create(Act);
        
      act.stage = stage[0];
      act.day = day[0];
      act.start = time[1].start;
      act.end = time[1].end;
      act.artist = time[1].act;

      //console.log(schedule);

    allSchedule.push(act);
    
    
      });

    });
  });

  buildList(allSchedule);

}




//sets filter to value of input day field
function selectFilter() {
  inputday = input.value
  const filter = inputday;
  console.log(`user selected: ${filter}`);
  setFilter(filter);
}

/*changes the value of filterDay in the settings, and calls buildlist*/
function setFilter(filter) {
  settings.filterDay = filter;
  buildList();
}

/*returns a filtered schedule list based on day*/
function filterList (filteredSchedule){

  if (settings.filterDay === "mon") {
    filteredSchedule = filteredSchedule.filter(isMonday);
} else if (settings.filterDay === "tue") {
    filteredSchedule = filteredSchedule.filter(isTuesday);
} else if (settings.filterDay === "wed") {
    filteredSchedule = filteredSchedule.filter(isWednesday);
} else if (settings.filterDay === "thu") {
    filteredSchedule = filteredSchedule.filter(isThursday);
}else if (settings.filterDay === "fri") {
  filteredSchedule = filteredSchedule.filter(isFriday);
}else if (settings.filterDay === "sat") {
  filteredSchedule = filteredSchedule.filter(isSaturday);
}else if (settings.filterDay === "sun") {
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

}function isSunday(schedule) {
  return schedule.day === "sun";

}

return filteredSchedule;
}

/*builds the list based on the returned filtered schedule*/
function buildList(){
  const todaysSchedule = filterList(allSchedule);
  displayList(todaysSchedule);
  
}

/*clears the list, before calling display schedule for each act */
function displayList(schedule){

  document.querySelector("#schedulelist").innerHTML = "";
  schedule.forEach(displaySchedule);
  
}

function displaySchedule(act) {


  const clone = document.querySelector("template").content.cloneNode(true);

  if ( act.stage == "Midgard") {
   
    clone.querySelector("[data-field=stage1").textContent = act.artist;
  }
  if ( act.stage == "Vanaheim") {
  
    clone.querySelector("[data-field=stage2").textContent = act.artist;
  }
  if ( act.stage == "Jotunheim") {

    clone.querySelector("[data-field=stage3").textContent = act.artist;
  }

  document.querySelector("#schedulelist").appendChild(clone);


}

