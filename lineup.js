
const Band ={
  name: "A Perfect Circle",
    members: [
    
    ],
    genre: "",
    logoCredits: "",
    logo: "",
    bio: ""
}




async function getData() {


    const endpoint = "https://valkyriefest.herokuapp.com/bands";


        const schedule = await fetch(endpoint);
        const data = await schedule.json();
      
      
       
      
        console.log(data);
      }

     function prepareData(){




     }
    
      getData();