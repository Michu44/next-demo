// Calls the Open Meteo API to get the current weather in New York
async function getWeather() {
    // New York City coordinates
    let latitude = 40.73;
    let longitude = -73.93;

    // Fetches the data from the API
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
    const data = await response.json()
    // Data is the JSON response from the API
    // in the following format:
    // "current": {
    //     "time": "2022-01-01T15:00"
    //     "temperature_2m": 2.4, "weathercode": 3,
    //     "windspeed_10m": 11.9, "winddirection": 95.0,
    // },
    // "hourly": {
    //     "time": ["2022-07-01T00:00","2022-07-01T01:00", ...]
    //     "windspeed_10m": [3.16,3.02,3.3,3.14,3.2,2.95, ...],
    //     "temperature_2m": [13.7,13.3,12.8,12.3,11.8, ...],
    //     "relativehumidity_2m": [82,83,86,85,88,88,84,76, ...],
    // }
    return data;
}

async function getBackgroundImage() {
    const response = await fetch('https://api.unsplash.com/search/photos/?query=new york city&per_page=1&orientation=landscape&client_id=' + process.env.UNSPLASH_ACCESS_KEY)
    const data = await response.json()
    return data;
}

export default async function Home() {
    var weatherForecast = await getWeather();
    var getBackground = await getBackgroundImage();
    var imgURL = getBackground.results[0].urls.full;
    var imgAuthor = getBackground.results[0].user.name;
    var altImg = getBackground.results[0].description + " by " + imgAuthor;
    return (
        <div>
            <h1>Current Weather in New York</h1>
            <p>Temperature: {weatherForecast.current.temperature_2m}</p>
            <img src={imgURL} alt={altImg} />
        </div>
    )
}