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
            <p>Temperatura: ${parseInt((data.main.temp)-273.15)}&#176;C</p>
            <p>Humedad: ${data.main.humidity}&#37</p>
            <p>Viento: ${parseInt((data.wind.speed)/0.62137)} Km/s</p>
            <p>Ubicación: <ul>
                            <li>Latitud: ${data.coord.lat}</li> 
                            <li>Longitud: ${data.coord.lon} m/s</li></ul></p>
            <p>${data.weather[0].description}</p>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;

            console.log(data);

        })
}



// 3) Comunicarlos
// MPA-- > localStorage
// index.html:
//     Al hacer click en un "enlace"...

// function loadDetail(event) {
//     event.preventDefault();

//     let myId = event.target.id;

//     En los enlaces tendré que guardar el id de cada elemento en el localStorage

//     Cargar detail.html
//     window.location = "detail.html";
// }
// detail.html:
//     El id que le pasará a su fetch lo obtiene del localStorage

//lo pruebo



// function obtener_localStorage() {
//     if (localStorage.getItem("valor  ")) {

//     }
//     let valorDevalor = localStorage.getItem("valor  ")
// }


// guardar_localstorage() // solo almacena strings, si tengo objetos, tengo que pasar por JSON.stringify

// function guardar_localstorage() {
//     let loquequierguardar = ["lo que quiera que sea"]
// };
// localStorage.setItem("valor ", valor);
// localStorage.setItem("valor".JSON.stringify(valor));