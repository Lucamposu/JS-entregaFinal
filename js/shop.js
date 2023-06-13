const carrito = document.querySelectorAll("#botonComprar");

let carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];

carrito.forEach((element) => {

    element.addEventListener("click", agregarCarrito);

});

function agregarCarrito(event){

    const button = event.target;
    const articulo = button.closest(".articulo");
    const articuloTitle = articulo.querySelector(".articuloTitle").textContent;
    const articuloPrecio = articulo.querySelector(".articuloPrecio").textContent;
     
    // Si el carrito no tiene elementos, no buscar si existe algun articulo
    if(carritoItems.length > 0) {

        // Verificar si el artículo ya está en el carrito
        let existente = carritoItems.find(item => item.title === articuloTitle);

        if (existente) {

            // Si el artículo ya está en el carrito, aumentar la cantidad en 1
            existente.cantidad += 1;

        } else {

            // Si el artículo no está en el carrito, agregarlo con cantidad 1
                let nuevoArticulo = {
                title: articuloTitle,
                precio: articuloPrecio,
                cantidad: 1
            };
            carritoItems.push(nuevoArticulo);
        }
    } else {

        // Si el carrito no tiene productos, directamente agregamos un articulo nuevo
            let nuevoArticulo = {
            title: articuloTitle,
            precio: articuloPrecio,
            cantidad: 1
        };

        carritoItems.push(nuevoArticulo);
    }

    guardarCarritoEnLocalStorage();

    Toastify({
        text: "Producto agregado: " + articuloTitle,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #cdad91, #cdad91)",
        },
        onClick: function(){}
    }).showToast();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carritoItems));
}

// container donde quiere incluir los articulos
const carritoContainer = document.getElementById("carritoContainer");

// HTML para mostrar los elementos del carrito
const carritoHTML = carritoItems.map((articulo) => {
    return `
        <tr class="articulo">
            <td>${articulo.title}</td>
            <td>${articulo.precio}</td>
            <td>${articulo.cantidad}</td>
            <td>${articulo.precio * articulo.cantidad}</td>
        </tr>
    `;
}).join("");

// HTML en el contenedor del carrito
carritoContainer.innerHTML = carritoHTML;

// Calcular el total y modificar texto en html
let paragraph = document.getElementById("total");
let finalizarBoton = document.querySelector(".finalizarBoton")

function totalCarrito(carrito) {
    if(carrito){
        let total = 0;

        carrito.forEach((element) => {
            total = total + (Number(element.precio) * element.cantidad);
        });

        return total;
    }
}

paragraph.textContent = totalCarrito(carritoItems);

// Borrar lo guardado en el localStorage una vez apretado el boton finalizar compra
finalizarBoton.addEventListener("click", limpiarCarrito);

function limpiarCarrito() {
  // Borrar los datos del localStorage
  localStorage.removeItem("carrito");
  
  // Vacíar el arreglo de carritoItems
  carritoItems = [];

  // Actualizar el contenido del carrito en el HTML
  carritoContainer.innerHTML = "";
  
  // Actualizar el total en el HTML
  paragraph.textContent = totalCarrito(carritoItems);

  // Mensaje al tocar boton
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Compra realizada con exito',
    showConfirmButton: false,
    timer: 1500
  }).then(() => {
    // Redireccionar al inicio
    window.location.href = "/index.html";
  });
}
