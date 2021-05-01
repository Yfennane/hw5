// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector (`.get-weather`)
  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {
    // - Ignore the default behavior of the button
    event.preventDefault()
   
    // reset HTML of day forecast
    let dayforecast = document.querySelector(`.forecast`)
   dayforecast.innerHTML =`<div class="forecast space-y-4">
   <div class="text-center space-y-8">
  <div class=" forecasttitle font-bold text-3xl"> </div>
  </div>
  </div>`

    // - Get a reference to the element containing the user-entered location
    let locationfield = document.querySelector (`#location`)
    // - Get the user-entered location from the element's value
    let location = locationfield.value
    // - Get a reference to the element containing the user-entered number of days
    let NumberOfDaysfield = document.querySelector (`#days`)
    // - Get the user-entered number of days from the element's value
    let NumberOfDays = NumberOfDaysfield.value
    // - Check to see if the user entered anything for both Location and Number of days; if so:
    if (NumberOfDays.length > 0 && location.length > 0) { 
      // - Construct a URL to call the WeatherAPI.com API
    let url = `https://api.weatherapi.com/v1/forecast.json?key=7b866a40e3b74270a87154002212704&q=${location}&days=${NumberOfDays}`
      // - Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)
      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()
      // - Write the json-formatted data to the JavaScript console
    console.log(json)
      // - Store the data
      let locationNew = `${json.location.name}, ${json.location.region}`
      let weatherConditions = `${json.current.temp_f} and ${json.current.condition.text}`
      let forecastArray = json.forecast.forecastday

      // Get a reference for the location title
      let locationTitle = document.querySelector(`.current`)

      // Change the current location, average temperature and weather condition
      locationTitle.innerHTML = `
      <div class="text-center space-y-2">
      <div class="font-bold text-3xl">Current Weather for ${locationNew}</div>
      <div class="font-bold">
        <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="inline-block">
        <span class="temperature">${json.current.temp_f}</span>° 
        and
        <span class="conditions">${json.current.condition.text}</span>
      </div>
    </div>`

    // Get a reference for the number of days forecast title
    let forecastTitle = document.querySelector(`.forecasttitle`)

    // Change the number of days forecast title
    forecastTitle.innerHTML = `<div class=" forecast title font-bold text-3xl">${NumberOfDays} Days Forecast</div>`


    // Start loop and modify Div about forecast 
    
    for (let i=0; i < NumberOfDays++; i++ ) {
    
dayforecast.insertAdjacentHTML(`beforeend`,`<img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="mx-auto">
<h1 class=" text-center text-2xl text-bold text-gray-500">${forecastArray[i].date}</h1>
<h2 class=" text-center text-xl">High ${forecastArray[i].day.maxtemp_f}° – Low ${forecastArray[i].day.mintemp_f}°</h2>
<p class=" text-center text-gray-500">${forecastArray[i].day.condition.text}</h1>
</div>`) 
}
     
    }
// deal with empty forms
    else { 
      let locationTitle = document.querySelector(`.current`)
      locationTitle.innerHTML =`<div class=" text-center font-bold text-3xl">Make sure to input both forms</div>`
      let forecastTitle = document.querySelector(`.forecasttitle`)
      forecastTitle.innerHTML = ``}
  })
})
