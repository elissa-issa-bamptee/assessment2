 AOS.init();

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
const links = navLinks.querySelectorAll("a");
 links.forEach(link => {
 link.addEventListener("click", () => {
 navLinks.classList.remove("show");
 });
});

function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}

const contactBtn=document.getElementById("contact-btn");
const contactForm = document.querySelector(".contact-form");
let isContactVisible=false;

contactBtn.addEventListener("click",()=>{
  if (!isContactVisible){
    contactBtn.textContent="Hide contact form";
    contactForm.style.display="block";
  }
  else{
     contactBtn.textContent="If you would like to get in contact click here";
     contactForm.style.display="none";
    }
    isContactVisible=!isContactVisible;
})

contactBtn.addEventListener("click",()=>{
  playSound("./assets/audios/surprise-sound-effect-99300.mp3"); 
});

const API_KEY="51b50278d7c14a5d957131203252506";
const weatherBtn = document.getElementById("get-weather");
const weatherInfo = document.getElementById("weather-info");
const city= "Beirut";


async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data: " + response.status);
  }

  const data = await response.json();
  return data;
}


weatherBtn.addEventListener("click", () => {
  weatherInfo.innerHTML = "Loading...";

  getWeather(city)
    .then(data => {
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const iconUrl = "https:" + data.current.condition.icon;

      weatherInfo.innerHTML = `
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Condition:</strong> ${condition}</p>
      `;

      const iconImg = document.createElement("img");
      iconImg.src = iconUrl;
      iconImg.alt = condition;
      weatherInfo.appendChild(iconImg);
    })

    .catch(error => {
      weatherInfo.textContent = "Error: " + error.message;
    });
});
