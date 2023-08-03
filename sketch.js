//
let locationFlag;
let currPosition;
let weatherLocation;
let userInterface;
let url;

const data = null;

const successCallback = (position) => {
  locationFlag = true;
  currPosition = position;
  console.log(currPosition);

  let latString = currPosition.coords.latitude;
  let lonString = currPosition.coords.longitude;

  const apikey = "4467cd00da5d2515c1a1fdea8344e922";
  url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latString +
    "&lon=" +
    lonString +
    "&appid=" +
    apikey +
    "&units=imperial";

  loadJSON(url, gotData);
};

const errorCallback = (error) => {
  // Change the location variable to false
  locationFlag = false;
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

// Access user for location permission
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

var weather;

function setup() {
  frameRate(1);
  createCanvas(400, 400);
  
  // Provide the UI
  userInterface = new UI(locationFlag, currPosition, weather);
  // console.log(weather);
}

function gotData(data) {
  weather = data;
}

function draw() {
  if (!weather) {
    userInterface.loadingDataPage();
  } else {
    //Generate background
    push();
    fill(userInterface.backgroundDis(weather));
    rect(0, 0, width, height);
    pop();
    
    //Generate clouds and other various UI elements
    push();
    userInterface.showGrass();
    userInterface.rain(weather);
    userInterface.showSun(weather);
    userInterface.cloudsToDisplay(weather);
    pop();

    userInterface.showTheLocation(weather.name);
    userInterface.showTheTemperature(weather.main.temp);
    userInterface.displayOtherInformation(weather);
    
    
    
    if (frameCount == 10) {
      console.log(weather);
    }

  }
}
