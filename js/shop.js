const carrito = document.querySelectorAll("#botonComprar");
let carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoContainer = document.getElementById("carritoContainer");
const paragraph = document.getElementById("total");
const finalizarBoton = document.querySelector(".finalizarBoton");


const fetchApi= async ()=>{

    const response= await fetch('./data/db.json');
    const data= await response.json()
    
  }

carrito.forEach((element) => {

    element.addEventListener("click", agregarCarrito);

});

function agregarCarrito(event) {

    const button = event.target;
    const articulo = button.closest(".articulo");
    const articuloTitle = articulo.querySelector(".articuloTitle").textContent;
    const articuloPrecio = articulo.querySelector(".articuloPrecio").textContent;

    // Si el carrito no tiene elementos, no buscar si existe algun articulo
    if (carritoItems.length > 0) {

        // Verificar si el artículo ya está en el carrito
        let existente = carritoItems.find((item) => item.title === articuloTitle);

        if (existente) {

            // Si el artículo ya está en el carrito, aumentar la cantidad en 1
            existente.cantidad += 1;

        } else {

            // Si el artículo no está en el carrito, agregarlo con cantidad 1
            let nuevoArticulo = {
                title: articuloTitle,
                precio: articuloPrecio,
                cantidad: 1,
            };

            carritoItems.push(nuevoArticulo);
        }

    } else {

        // Si el carrito no tiene productos, directamente agregamos un articulo nuevo
        let nuevoArticulo = {
            title: articuloTitle,
            precio: articuloPrecio,
            cantidad: 1,
        };

        carritoItems.push(nuevoArticulo);
    }

    guardarCarritoEnLocalStorage();


    //cartel que aparece al tocar el boton de agregar al carrito
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
        onClick: function () {},
    }).showToast();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carritoItems));
}




//funcion para calcular el precio total
function totalCarrito(carrito) {

    if (carrito) {
        let total = 0;

        carrito.forEach((element) => {
            total = total + Number(element.precio) * element.cantidad;
        });

        return total;
    }
}

function actualizarCarritoHTML() {

    // HTML para mostrar los elementos del carrito
    const carritoHTML = carritoItems.map((articulo, index) => {
            return `
                <tr class="articulo" data-index="${index}">
                    <td>${articulo.title}</td>
                    <td>${articulo.precio}</td>
                    <td>
                        <button class="btn-disminuir" data-index="${index}">-</button>
                        <span>${articulo.cantidad}</span>
                        <button class="btn-aumentar" data-index="${index}">+</button>
                    </td>
                    <td>${articulo.precio * articulo.cantidad}</td>
                </tr>
            `;
        })
        .join("");

    carritoContainer.innerHTML = carritoHTML;
    
    carritoContainer.addEventListener("click", (event) => {

        if (event.target.classList.contains("btn-disminuir")) {
            disminuirCantidad(event);
        } else if (event.target.classList.contains("btn-aumentar")) {
            aumentarCantidad(event);
        }

    });

    paragraph.textContent = totalCarrito(carritoItems);
}

//funcion para aumentar la cantidad de productos desde el carrito
function disminuirCantidad(event) {

    const index = event.target.dataset.index;

    if (carritoItems[index].cantidad > 1) {
        carritoItems[index].cantidad--;
        guardarCarritoEnLocalStorage();
        actualizarCarritoHTML();
    }
}

//funcion para aumentar la cantidad de productos desde el carrito
function aumentarCantidad(event) {

    const index = event.target.dataset.index;

    carritoItems[index].cantidad++;

    guardarCarritoEnLocalStorage();
    actualizarCarritoHTML();
}


paragraph.textContent = totalCarrito(carritoItems);

// Borrar lo guardado en el localStorage una vez apretado el boton finalizar compra
finalizarBoton.addEventListener("click", limpiarCarrito);

function limpiarCarrito() {

    // Borrar los datos del localStorage
    localStorage.removeItem("carrito");
    
    carritoItems = [];

    // Actualizar el contenido del carrito en el HTML
    carritoContainer.innerHTML = "";

    // Actualizar el total en el HTML
    paragraph.textContent = totalCarrito(carritoItems);

    // Mensaje al tocar boton
    Swal.fire({

        position: "center",
        icon: "success",
        title: "Compra realizada con éxito",
        showConfirmButton: false,
        timer: 1500,
    }).then(() => {
        window.location.href = "/index.html";
    });
}


function init() {
    actualizarCarritoHTML();

    botonComprar.addEventListener("click", agregarCarrito);
    finalizarBoton.addEventListener("click", limpiarCarrito);
}

init();
