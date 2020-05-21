// Se pide construir un buscador de pokemons / películas / series / música / videojuegos / noticias / whatever que:
//     Vista 1(index.html):
//     -Pida los datos vía API REST a un webservice remoto -
//     Los muestre como un listado en pantalla(maestro) con una subselección de campos(mínimo "Nombre/Título"
//         y enlace a "Ver más", si bien estos dos pueden mostrarse como un mismo elemento)
// Vista 2(game.html):
//     -Muestre la ficha / descripción completa de ese ítem(detalle)(editado)

const url = "http://api.openweathermap.org/data/2.5/weather?q=london&appid=02feb22ecb0b428ff3c8953ab422fb3d&units=metric&lang=es"
const btnBuscar = document.getElementById('buscar')
const input = document.querySelector('input');
const log = document.getElementById('element');
const titulo = document.getElementById('titulo')

input.addEventListener('change', updateValue);
//btnBuscar.addEventListener('click', buscar)

function updateValue(e) {
    let city = e.srcElement.value;
    let link = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02feb22ecb0b428ff3c8953ab422fb3d&units=metric&lang=es`
    buscar(link)

}

//console.log(updateValue(e))


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

            function guardarLocalStorage() { //esto es una caca, borrar esta línea
                document.getElementById("myAnchor").addEventListener("click", function(event) {
                    event.preventDefault()
                    let myId = event.button.id; //y esta
                    window.location = "game.html"; //y esta 
                });
            }
            console.log(data);
            //.catch(err => console.log(err))
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