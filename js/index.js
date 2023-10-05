const japflix = "https://japceibal.github.io/japflix_api/movies-data.json"
const boton = document.getElementById("btnBuscar")
const busqueda = document.getElementById("inputBuscar")
const contenedor = document.getElementById("lista")


function cargar(arr) {
    for (let peli of arr) {
    }
}

function setPeliID(id) {
    localStorage.setItem("PeliID", id);
    let idDePeli = localStorage.getItem('PeliID');
}

let indice = 0
function buscar(array) {
    contenedor.innerHTML = "";
    if (busqueda.value) {
        for (let peli of array) {
            if (peli.title.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                peli.tagline.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                peli.overview.toLowerCase().includes(busqueda.value.toLowerCase()) 
                // peli.genero.toLowerCase().includes(busqueda.value.toLowerCase())
            ) {
                contenedor.innerHTML += `<br>
                 <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" 
                data-bs-target="#peli${peli.id}" aria-controls="offcanvasTop" onClick="setPeliID(${peli.id})">
                <div style="color: white;" >${peli.title} ${showStars(peli.vote_average / 2)} 
                <p style="color: white;">${peli.tagline}</p></div></button>

                <div  class="offcanvas offcanvas-top" id="peli${peli.id}" tabindex="-1" aria-labelledby="offcanvasTopLabel">
                  <div class="offcanvas-header " >
                  <div> <h5 class="offcanvas-title" id="offcanvasTopLabel">${peli.title}</h5> </div> <br>
                  <div><p>${peli.overview}</p> </div>
                  
                  <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Ver detalles
              </button>
              <ul class="dropdown-menu dropdown-menu-dark ">
              <li><a class="dropdown-item" href="#">Año: ${peli.release_date}</a></li>
              <li><a class="dropdown-item" href="#">Duración: ${peli.runtime} minutos</a></li>
              <li><a class="dropdown-item" href="#">Presupuesto: $ ${peli.budget}</a></li>
              <li><a class="dropdown-item" href="#">Ganancias: $ ${peli.revenue}</a></li>
              </ul>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
                  </div>
                </div>
                `;
            }
        }
    }
}

const pongo_titulo = document.getElementById("offcanvasTopLabel")

function id(peli) {
    localStorage.setItem("peliid", peli.id);
}


fetch(japflix).then(function (response) {
    return response.json();
}).then(function (data) {
    cargar(data);
    boton.addEventListener('click', () => {
        buscar(data);
    })
})

function showStars(rate) {
    if (rate == 1)
        return `
    <span style="color:yellow">★</span><span style="color:grey">☆☆☆☆</span>
    `
    if (rate == 2)
        return `
    <span style="color:yellow">★★</span><span style="color:grey">☆☆☆</span>`
    if (rate == 3)
        return `
    <span style="color:yellow">★★★</span><span style="color:grey">☆☆</span>`
    if (rate == 4)
        return `
    <span style="color:yellow">★★★★</span><span style="color:grey">☆</span>`
    else
        return `
    <span style="color:yellow">★★★★★</span>`
}