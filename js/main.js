const contenedorTarjetas = document.getElementById('productos-conteiner')
const verCarrito = document.getElementById('shopping')
const conteinerCarrito = document.getElementById('conteiner-carrito')

let carrito = JSON.parse(localStorage.getItem('menu')) || [];


// ESTRUCTURA PRODUCTOS INDEX 

const baseDeDatos = async () => {

    const respuesta = await fetch("./datos/datos.json")
    const datosProductos = await respuesta.json()

    console.log(datosProductos)

    for (const product of datosProductos) {
        //genero la estructura
        const tarjetas = document.createElement('div')
        tarjetas.className = 'tarjeta-producto'
        tarjetas.innerHTML = `
                 <img class="menu-img" src="./img/${product.img}" alt="">
                 <p class="menu-title">${product.nombre}</p>
                 <p class="ingredientes">${product.descripcion}</p>
                 <p class="price">$${product.precio} </p>
                 <button class = "menu-boton"> Agregar al Carrito </button>
                `

        contenedorTarjetas.appendChild(tarjetas)

        // AGREGAR AL CARRITO - FUNCION

        function agregarCarrito() {
            let agregarAlCarrito = tarjetas.querySelector('.menu-boton')
            agregarAlCarrito.addEventListener('click', () => {

                //toastify
                Toastify({
                    text: "Se agrego al Carrito!",
                    duration: 1000
                }).showToast();

                // para que no se repitan los productos en el carrito

                const repetir = carrito.some((repetirProducto) => repetirProducto.id === product.id)

                if (repetir) {
                    carrito.map((prod) => {
                        if (prod.id === product.id) {
                            prod.cantidad++
                        }
                    })
                } else {
                    carrito.push({
                        id: product.id,
                        nombre: product.nombre,
                        precio: product.precio,
                        cantidad: product.cantidad,
                        descuento: product.descuento
                    })
                    localStorage.setItem('menu', JSON.stringify(carrito))  // guardo lo que modifico
                }
            })
        }
        agregarCarrito()
    }
}
baseDeDatos()
