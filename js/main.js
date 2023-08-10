const contenedorTarjetas = document.getElementById('productos-conteiner')
const verCarrito = document.getElementById('shopping')
const conteinerCarrito = document.getElementById('conteiner-carrito')
const numeroCarrito = document.getElementById('carrito-numero')


let carrito = JSON.parse(localStorage.getItem('menu')) || [];


// ESTRUCTURA PRODUCTOS INDEX 

const baseDeDatos = async () => {

    const respuesta = await fetch("./datos/datos.json")
    const datosProductos = await respuesta.json()

    // settimeout
    const spinner = document.getElementById('spinner')
    spinner.style.display = 'flex'
    setTimeout(() => {

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
                     <p class="categoria">${product.categoria}</p>
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
                        })
                        localStorage.setItem('menu', JSON.stringify(carrito))  // guardo lo que modifico
                    }
                    carritoCantidad()
                })
            }
            agregarCarrito()
        }
        spinner.style.display = 'none'
    }, 1500)

    //filtrado
    // llamo a todos los botonos
    const filtroCategoria = document.querySelectorAll('.btn-filtro');
    filtroCategoria.forEach(button => {

        button.addEventListener('click', () => {
            //obtengo el atributo de cada categoria
            const categoria = button.getAttribute('data-category');
            // llamo la tarjeta
            const tarjetasProductos = document.querySelectorAll('.tarjeta-producto');

            tarjetasProductos.forEach(productCard => {
                const productoCategoria = productCard.querySelector('.categoria').textContent;
                // si es igual a todos o si es igual al atributo data-category del boton que apriete que se muestre
                if (categoria === 'todos' || productoCategoria === categoria) {
                    productCard.style.display = 'block';
                //sino que se oculte
                } else {
                    productCard.style.display = 'none';
                }
            });

            // cada boton seleccionado quede de un color

        });
    });

}
baseDeDatos()