//weather app

const weatherform= document.querySelector(".weatherform");
const cityinput= document.querySelector(".cityinput");
const card= document.querySelector(".card");
const apikey="091cd496373c49d4e221292675da4fee";

weatherform.addEventListener("submit", async event=>{
    event.preventDefault();
    const city= cityinput.value;
    if(city){
        try{
            const weatherdata= await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("Please enter a city");
    }
});

async function getweatherdata(city){
    const apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response= await fetch(apiurl);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch data");
    }
    return await response.json();

}
function displayweatherinfo(data){
const{name: city, 
    main:{temp, humidity},
    weather:[{description, id}]}= data;

card.textContent="";
card.style.display="flex";

const citydisplay=document.createElement("h1");
const tempdisplay=document.createElement("p");
const humiditydisplay=document.createElement("p");
const descdisplay=document.createElement("p");
const weatheremoji=document.createElement("p");

citydisplay.textContent= city;
tempdisplay.textContent= `${(temp - 273.15).toFixed(1)}°C`;
humiditydisplay.textContent= `Humidity: ${humidity}%`;
descdisplay.textContent= description;
weatheremoji.textContent= getweatheremoji(id);

citydisplay.classList.add("citydisplay");
tempdisplay.classList.add("tempdisplay");
humiditydisplay.classList.add("humiditydisplay");
descdisplay.classList.add("descdisplay");
weatheremoji.classList.add("weatheremoji");


card.appendChild(citydisplay);
card.appendChild(tempdisplay);
card.appendChild(humiditydisplay);
card.appendChild(descdisplay);
card.appendChild(weatheremoji);

}
function getweatheremoji(weatherid){

}
function displayerror(messege){
    const errordisplay= document.createElement("p");
    errordisplay.textContent= messege;
    errordisplay.classList.add("errordisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);

}