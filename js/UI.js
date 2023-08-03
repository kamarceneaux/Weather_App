
function makeCloud(cloudx, cloudy) {
  fill(250)
  noStroke();
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx + 10, cloudy + 10, 70, 50);
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
}

class UI {
  //Handles the User Interface of the Application
  
  constructor(location, geolocationData, weatherData) {
    this.location = location;
    this.geolocationData = geolocationData;
    this.weatherData = weatherData;
    
    //Generate background
  }
  
  getLocationData(){
    return this.geolocationData;
  }
  
  errorPage(){
    square(30, 20, 340);
    textSize(38);
    let s = 'LOCATION PREVILEGES MUST BE ON FOR THE APPLICATION TO WORK';
    text(s, 35, 55, 340, 340); // Text wraps within text box
  }
  
  loadingDataPage(){
    square(30, 20, 340);
    textSize(38);
    let s = 'Data is loading in!';
    text(s, 35, 55, 340, 340); // Text wraps within text box
  }
  
  coverScreen(){
    square(width, height, 0, 0);
  }
  
  showTheLocation(city){
    push();
    textSize(26);
    textAlign(CENTER);
    text(`${city}`,width / 2, 50);
    pop();
  }
  
  showTheTemperature(temp){
    push();
    textSize(96);
    textAlign(CENTER);
    text(`${round(temp)}°`,(width / 2) + 5, 145);
    pop();
  }
  
  backgroundDis(weath){
    if(weath.weather[0].main == "Clouds" || weath.weather[0].main == "Rain"){
      return "#7397AD";
    }else{
      return "#119BEF";
    }
  }
  
  showGrass(weather){
    fill("#207A06");
    rect(0, 300, width, 100);
  }
  
  showSun(weath){
    if(weath.weather[0].main !== "Rain" || weath.weather[0].main !== "Snow"){
      if(weath.clouds.all < 45){
        fill("rgb(244,158,46)");
        ellipse(0, 0, 185);
      }
    }
    
  }
  
  rain(weath){
    // Generate rain drops for a event
    
    if(weath.weather[0].main == "Rain"){
      if(weath.clouds.all > 75){
        for(let i = 0; i < 80; i++){
          fill(0, 0, 255);

          // Draw the raindrop
          ellipse(random(15, 450), random(130, 385), 5, 15);
          
        }
      }else if(weath.clouds.all > 45){
        for(let i = 0; i < 35; i++){
          fill(0, 0, 255);

          // Draw the raindrop
          ellipse(random(15, 450), random(130, 385), 5, 15);
          
        }
      }else{
        for(let i = 0; i < 20; i++){
          fill(0, 0, 255);

          // Draw the raindrop
          ellipse(random(15, 450), random(130, 385), 5, 15);
          
        }
      }
    }
  }
  
  cloudsToDisplay(weath){
    //Take the value of the clouds and generate clouds
    let cloudPerc = weath.clouds.all;
    let generateClouds = map(cloudPerc, 0, 100, 0, 8);
    if(generateClouds > 1){
      for(let i = 0; i < generateClouds; i++){
        let randomX = random(25, 365);
        let randomY = random(35, 100);
        makeCloud(randomX, randomY);
      }
    }
  }
  
  displayOtherInformation(weath){
    //Text at the bottom of the screen
    let description = weath.weather[0].description;
    description.toUpperCase();
    
    push();
    textSize(18);
    textAlign(CENTER);
    text(`Wind Speed: ${weath.wind.speed}mph | ${description}`,width / 2, 350);
    pop();
  }
  
  
  
  
}
