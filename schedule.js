
//indhent data
//split op efter scene
//split op efter dag
//vis data
//vis data efter input af dag/ scene

const form = document.querySelector("#theSchedule");
const input = form.elements.day;

const daySchedule = {
  stage: "stagename",
  day: "day",
  programme: {
    start: "",
    end:"",
    act:""

  }
   
  
};


async function getData() {


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


      const schedule = Object.create(daySchedule);

      schedule.stage = stage[0];
      schedule.day = day[0];
      schedule.programme.start = day[1];

      console.log(schedule);


displayData(schedule);
    });



  });


}


function displayData(today) {
  const inputday = input.value;

  const clone = document.querySelector("template").content.cloneNode(true);

if (today.day == inputday & today.stage == "Midgard"){
  const program = JSON.stringify(today.programme)
  clone.querySelector("[data-field=stage1").textContent = program;
}

  document.querySelector("#list tbody").appendChild(clone);


}

getData();