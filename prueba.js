const url = "http://api.openweathermap.org/data/2.5/weather?q=london&appid=02feb22ecb0b428ff3c8953ab422fb3d&units=metric&lang=es"
const btnBuscar = document.getElementById('buscar')
const input = document.querySelector('input');
const log = document.getElementById('element');
const titulo = document.getElementById('titulo')


btnBuscar.addEventListener('click', updateValue); // repito input y buttom en game.html

function updateValue() {
    const city = document.querySelector('input').value
    if (city.length < 1) {
        alert("Introduce el nombre de una ciudad")
    } else {
        let link = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02feb22ecb0b428ff3c8953ab422fb3d&units=metric&lang=es`
        buscar(link)

    }
}

function renderDetail(data) {
    guardar_localstore(data)
    event.preventDefault()
    window.location = "game.html"

}

function buscar(link) {
    fetch(link)

    .then(response => response.json())
        .then(data => {
            let evento = document.getElementById('buscador');

            evento.innerHTML = `<h1><a href="game.html" id="myAnchor">${data.name}</a>
            </h1>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <p>El cielo se presenta con ${data.weather[0].description}</p>
            <p>la temperatura actual es de ${parseInt(data.main.temp)}&#176;C </p>
            <p>con una humedad relativa del ${data.main.humidity}&#37;</p>
            <p>y velocidad de viento a ${data.wind.speed}m/s</p>`
            document.getElementById("myAnchor").addEventListener("click", () => renderDetail(data))
        })
        .catch(function(error) {
            alert('El nombre ingresado no es válido')
        })
}


function guardar_localstore(data) {
    let ciudad = data
    localStorage.setItem("ciudad", JSON.stringify(ciudad))
}


let ciudadOk = JSON.parse(localStorage.getItem("ciudad"))
if (ciudadOk !== null) {
    localStorage.removeItem("ciudad");
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudadOk.name}&appid=02feb22ecb0b428ff3c8953ab422fb3d&=metric&lang=es`)

    .then(response => response.json())
        .then(data => {

            let detalle = document.getElementById('detail'); // cambiar esto
            detalle.innerHTML = `<h1>${data.name}</h1>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <p>Ubicación: <ul>
            <li>Latitud: ${data.coord.lat}</li> 
            <li>Longitud: ${data.coord.lon}</li></ul></p>
            <p>País ${data.sys.country}</p>
            <p>Salida del Sol ${data.sys.sunrise}</p> 
            <p>Puesta de Sol ${data.sys.sunset}</p>
            <p>${data.weather[0].description}</p>
            <p>Temperatura: ${parseInt((data.main.temp)-273.15)}&#176;C</p>
            <p>Sensación térmica: ${parseInt((data.main.feels_like)-273.15)}&#176;C</p>
            <p>Temperatura minima: ${parseInt((data.main.temp_min)-273.15)}&#176;C</p>
            <p>Temperatura máxima: ${parseInt((data.main.temp_max)-273.15)}&#176;C</p>
            <p>Presión atmosférica: ${parseInt((data.main.pressure)-273.15)}hPa</p>
            <p>Humedad: ${data.main.humidity}&#37</p>
            <p>Visibilidad ${data.visibility} m</p>
            <p>Viento: ${parseInt((data.wind.speed)/0.62137)} m/s</p>
            <p>Nubes ${data.clouds.all}</p>
            `;

            console.log(data);

        })
} //pintando un mapa