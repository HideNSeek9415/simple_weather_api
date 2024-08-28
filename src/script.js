const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5'
let unit = 'metric'
let city = 'Hanoi'

const search_btn = document.getElementById('search')
const search_text = document.getElementById('search-text')
const fahrenheit = document.getElementById('fahrenheit')
const celsius = document.getElementById('celsius')
const weather_icon = document.getElementById('weather-icon')
const weather_state = document.getElementById('weather-state')
const weather_location = document.getElementById('weather-location')
const weather_temperature = document.getElementById('weather-temperature')
const weather_min_temperature = document.getElementById('weather-min-temp')
const weather_max_temperature = document.getElementById('weather-max-temp')
const weather_humidity = document.getElementById('weather-humidity')
const weather_feel_like = document.getElementById('weather-feel-like')
const weather_pressure = document.getElementById('weather-pressure')
const weather_wind = document.getElementById('weather-wind')

const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);

function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

const getWeather = () => {

    const temp_symbol = unit == 'metric' ? 'C' : 'F'
    const dist_symbol = unit == 'metric' ? 'm/s' : 'mph'


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`)
        .then(res => res.json())
        .then(data => {
            console.log(city)
            weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
            weather_state.innerHTML = `${capitalizeFirstLetter(data.weather[0].description)}`
            weather_location.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
            weather_temperature.innerHTML = `${data.main.temp}&#176${temp_symbol}`
            weather_min_temperature.innerHTML = `${data.main.temp_min}&#176${temp_symbol}`
            weather_max_temperature.innerHTML = `${data.main.temp_max}&#176${temp_symbol}`
            weather_humidity.innerHTML = `${data.main.humidity}%`
            weather_feel_like.innerHTML = `${data.main.feels_like}&#176${temp_symbol}`
            weather_pressure.innerHTML = `${data.main.pressure} hPA`
            weather_wind.innerHTML = `${data.wind.speed} ${dist_symbol}`
        })
}

getWeather()

fahrenheit.addEventListener('click', () => {
    unit = 'imperial'
    getWeather()
})

celsius.addEventListener('click', () => {
    unit = 'metric'
    getWeather()
})


search_text.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        city = search_text.value
        search_text.value = ''
        getWeather()
    }
})

search_btn.addEventListener('click', () => {
    city = search_text.value
    search_text.value = ''
    getWeather()
})

setInterval(() => {
    getWeather()
}, 3000000);