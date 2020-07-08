/* Global Variables */
link = 'http://api.openweathermap.org/data/2.5/weather?zip='
key = '&appid=0d002347fe543ee21f35b26cc949411c'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let generate = document.getElementById('generate');
let zipElement = document.getElementById('zip');
let userElement = document.getElementById('feelings');

generate.addEventListener('click', function(){
    zip = zipElement.value;
    console.log(zip);
    zipElement.value = "";
    getWeather(link, zip, key).then(function(data){
        tempF = kelvinToFarenheit(data.main.temp);
        console.log(tempF);
        userFeelings = userElement.value;
        postData('/add', {temp:tempF, date:newDate, feelings:userFeelings}) //issue here
    });
});


function kelvinToFarenheit(tempK){
    tempF = (tempK - 273.15) * 9/5 + 32;
    return Math.round(tempF);
}

const getWeather = async(link, zip, key) =>{
    const url = link+zip+key;
    console.log(url);
    const result = await fetch(url);
    try{
        const data = await result.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


const retreiveData = async()=>{
    url = "/all";
    console.log(url);
    const request = await fetch(url);
    try{
        const allData = await request.json();
    } catch(error) {
        console.log("error", error);
    }
}


const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),   
  });

    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
    console.log("error", error);
    }
}
