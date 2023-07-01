//buscador o filtrador en la seccion productos.
const inputBuscar = document.querySelector("#buscar");
const articulosBuscar = document.querySelectorAll(".articulo");



inputBuscar.addEventListener("keyup", e=> {
    articulosBuscar.forEach(producto => {
  
        producto.textContent.includes(e.target.value)
            ?producto.classList.remove("filtro")
            :producto.classList.add("filtro")
    });
});

