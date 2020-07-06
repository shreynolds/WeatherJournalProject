/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const retreiveData = async(url='')=>{
    console.log(url);
    const request = await fetch(url);
    try{
        const allData = request.json();
    } catch(error) {
        console.log("error", error);
    }
}

retreiveData('/all');