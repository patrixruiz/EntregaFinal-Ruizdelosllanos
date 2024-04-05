class Compra {
    constructor(producto, precio) {
        this.producto = producto;
        this.precio = precio;

    }
    valorDeCompra() {
        return this.producto.precio * this.cantidad
    }
}

const arrProductos = [];

const recibirProductos = async () => {

    try {
        const prods = await fetch("../elementos/productos.json");
        const data = await prods.json();
        data.forEach(producto => {
            arrProductos.push(producto);
        })
    }
    catch {
        console.log(err);
    }


}
recibirProductos();


//asignacion de Constantes y variables


const buscar = document.querySelector(".buscador--barra");
const contenidoDinamicoTarjetas = document.querySelector(".cardContainer");
const contenedorAuxiliar = document.querySelector(".contenedorAuxiliar");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorCarrito = document.getElementById("carrito");
let botoncitos = document.querySelectorAll(".boton-compra");
const PTotal = document.querySelector(".precio-total-articulos");
const articulosDelCarrito = document.querySelector(".articulos-añadidos");
const botonBorrarCarrito = document.createElement('button');
botonBorrarCarrito.textContent = "Vaciar Carrito";
botonBorrarCarrito.classList.add("boton-borrar");
contenedorCarrito.append(botonBorrarCarrito);
const botonFinalizarCompra = document.createElement("button");
botonFinalizarCompra.textContent = "FinalizarCompra";
botonFinalizarCompra.classList.add("boton-borrar");
contenedorCarrito.append(botonFinalizarCompra)


//Vaciar Carrito
function borrarCarrito() {

    carrito.splice(0);
    localStorage.removeItem("carrito");
    articulosDelCarrito.innerHTML = "";
    PTotal.innerText = "El carrito esta Vacio";


}

botonBorrarCarrito.addEventListener("click", () => {
    borrarCarrito();
});


function mostrarContenidoCarrito() {
    let precioTotal = 0;
    if (carrito.length == 0) {

    }
    else {
        carrito.forEach((element) => {
            const { producto, precio } = element;
            articulosDelCarrito.innerHTML +=
                `<li>${producto} : ${precio}<li>`
            precioTotal += precio
            PTotal.innerText = `$ ${precioTotal}`
        })
    }

}

//funcionalidad para terminar la compra

function TerminarCompar() {
    let arrPrecios = [];
    carrito.map((element) => {
        arrPrecios.push(element.precio);
    })
    let ValorFinal = arrPrecios.reduce((acc, actual) => {
        return acc + actual;

    }, 0)
    carrito.length != 0
        ? Swal.fire(`Compra Realizada, Precio total: ${ValorFinal} `)


        : Swal.fire({
            title: "<strong>El carrito esta vacio</strong>",
            icon: "warning",
            html: `
    `,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: `
    Volver a la tienda
    `,
        })

}

botonFinalizarCompra.addEventListener("click", () => {
    TerminarCompar();
    borrarCarrito();
})



//mostrar todos los articulos cuando se cargue la pagina

function mostrarProductos() {
    let productos = "";
    arrProductos.forEach((element) => {
        const { nombre, precio, img } = element;
        productos += (
            `<div class="card1">
        <div><img src="${img}" alt="${nombre}"></div>
        <p class="nombre">${nombre}</p>
        <button class="boton-compra" data-valor="${precio}" data-producto="${nombre}">Añadir al carrito</button >
        <p>Precio: $${precio}</p>
        </div>`)
    });
    contenidoDinamicoTarjetas.innerHTML += productos;

}

setTimeout(()=>{
    window.onload = mostrarProductos();
    window.onload = mostrarContenidoCarrito();
}, 300)


//barra buscadora de articulos


buscar.addEventListener("keyup", () => {
    contenidoDinamicoTarjetas.innerHTML = ""
    let html = "";
    let tarjetas = arrProductos.filter((el) => {
        return el.nombre.includes(buscar.value);
    })
    if (tarjetas.length == 0) {
        contenidoDinamicoTarjetas.innerHTML = `<div> <h1>Lo Sentimos, No hemos encontrado ningun articulo con ese nombre</h1> </div>`
    }
    tarjetas.forEach(element => {
        const { nombre, precio, img } = element;
        html += (`<div class="card1">
        <div><img src="${img}" alt="${nombre}"></div>
        <p class="nombre">${nombre}</p>
        <button class="boton-compra" data-valor="${precio}" data-producto="${nombre}">Añadir al carrito</button >
        <p>Precio: $${precio}</p>
        </div>`)
    });
    contenidoDinamicoTarjetas.innerHTML += html;
    contenedorAuxiliar.appendChild(contenidoDinamicoTarjetas)

});

botoncitos = document.querySelectorAll(".boton-compra");

contenedorAuxiliar.addEventListener("click", (e) => {
    if (e.target.classList.contains("boton-compra")) {
        const precio = e.target.getAttribute("data-valor");
        const precioNumero = parseFloat(precio);
        const nombre = e.target.getAttribute("data-producto");
        const compra = new Compra(nombre, precioNumero);
        carrito.push(compra);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        articulosDelCarrito.innerHTML = ""
        let precioTotal = 0;
        carrito.forEach((element) => {
            const { producto, precio } = element;
            articulosDelCarrito.innerHTML +=
                `<li>${producto} : ${precio}<li>`
            precioTotal += precio
        })
        PTotal.innerText = `$ ${precioTotal}`
    }
})        
