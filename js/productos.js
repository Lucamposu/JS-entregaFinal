/*
async function getJSONData() {
  const response = await fetch('../data/db.json');
  const jsonData = await response.json();
}


getJSONData();

async function mostrarProducto() {
  
    const arrayProd = jsonData.map((element, index) => {
      return `
        <div class="articulo">
          <img class="articuloImg" src="${element.imagen}" alt="${element.nombre}">
          <h2 class="articuloTitle">${element.nombre}</h2>
          <h2 class="articuloPrecio">${element.precio}</h2>
          <a role="button" class="consultasEnca" id="botonComprar">agregar al carrito</a>
        </div>
      `;
    }).join("");
  
    // Agregar el HTML generado al elemento deseado en tu página
    const container = document.getElementById(".productosVole"); // Cambia "container" por el ID del contenedor en tu HTML
    container.innerHTML = arrayProd;
  }
  
  mostrarProducto();

*/
async function getJSONData() {
  const response = await fetch('../data/db.json');
  const jsonData = await response.json();
}


getJSONData();
const contenedor = document.querySelector(".productosVole");

const renderServicios = (arr) => {
  contenedor.innerHTML = "";
  // función que genere la vista de los servicios
  let html;
  for (const item of arr) {
    const { nombre, imagen, precio } = item;

    html = `
    <div class="articulo">
      <img class="articuloImg" src="${element.imagen}" alt="${element.nombre}">
      <h2 class="articuloTitle">${element.nombre}</h2>
      <h2 class="articuloPrecio">${element.precio}</h2>
      <a role="button" class="consultasEnca" id="botonComprar">agregar al carrito</a>
    </div>
     `;

    contenedor.innerHTML += html;
  }
};

