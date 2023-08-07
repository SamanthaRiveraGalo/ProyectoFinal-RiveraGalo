// CLICK CARRITO

verCarrito.addEventListener('click', carritoModal);


// CARRITO

function carritoModal() {

    // para limpiar todo
    conteinerCarrito.innerHTML = '';

    // para que cuando aprete de nuevo el carrito lo pueda ver 
    conteinerCarrito.style.display = 'grid'

    // ESTRUCTURA CARRITO
    //Encabezado

    const modalEncabezado = document.createElement('div')
    modalEncabezado.className = ('offcanvas-header encabezado')
    modalEncabezado.innerHTML = `
      <h5 class="offcanvas-title encabezado-titulo" id="offcanvasRightLabel">Carrito</h5>
      <img class="carrito-logo" src="./assets/logo.png">
      <button type="button" class="btn-close cierre-boton" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    `
    conteinerCarrito.append(modalEncabezado)

    //boton de cierre

    let cierreCarrito = modalEncabezado.querySelector('.cierre-boton')
    cierreCarrito.onclick = (e) => {
        conteinerCarrito.style.display = 'none'
    }

    modalEncabezado.append(cierreCarrito)

    //BODY-CARRITO

    for (const product of carrito) {

        const carritoProductos = document.createElement('div')
        carritoProductos.className = 'carrito-productos'
        carritoProductos.innerHTML = `
           <p class="carrito-nombre"> ${product.nombre} </p>
           <p class="carrito-precio"> $${product.precio} </p>
           <div class="conteiner-cantidad">
             <span class="restar-cantidad"> - </span>
             <p> ${product.cantidad} </p>  
             <span class="sumar-cantidad"> + </span>
           </div>
           <p> Total: $ ${product.cantidad * product.precio} </p>
           <p class="boton-eliminar"> Eliminar </p>

     `
        conteinerCarrito.append(carritoProductos);

        // FUNCIONES

        //SUMAR
        let sumarCantidad = carritoProductos.querySelector('.sumar-cantidad')
        sumarCantidad.addEventListener('click', () => {
            product.cantidad++
            localStorage.setItem('menu', JSON.stringify(carrito))   // guarde los cambios
            carritoModal()
        })

        // RESTAR
        let restarCantidad = carritoProductos.querySelector('.restar-cantidad')
        restarCantidad.addEventListener('click', () => {
            if (product.cantidad !== 1) {
                product.cantidad--
            }
            localStorage.setItem('menu', JSON.stringify(carrito))  // guarde los cambios
            carritoModal()
        })

        // ELIMINAR CADA PRODUCTO
        let eliminar = carritoProductos.querySelector('.boton-eliminar')
        eliminar.addEventListener('click', () => {
            eliminarProductos(product.id)
        })

    }

    // TOTAL

    const total = carrito.reduce((acumulador, el) => acumulador + el.precio * el.cantidad, 0)


    // FOOTER-CARRITO

    const totalCarrito = document.createElement('div')
    totalCarrito.className = ('total-carrito')
    totalCarrito.innerHTML = `
    <p class = "total-titulo"> Precio Total: $ <span id="precio-Total"> ${total} </span> </p>
    <div class="descuento-conteiner"> 
      <div class="conteiner-cupon">
        <input type="text" id="cupon">
        <button id="aplicar-cupon"> Aplicar Descuento </button>
      </div>
      <p class="title-cupon">El cupon de descuento del 10% es: JAVASCRIPT</p>
    </div>
    <div class="comprar-conteiner"> 
      <a href="pages/formulario.html"><button id="comprar">Iniciar Compra</button></a>
    </div>
    `
    conteinerCarrito.append(totalCarrito);

    // CUPON DE DESCUENTO

    const btnDescuento = document.getElementById('aplicar-cupon')
    const inputCupon = document.getElementById('cupon')

    btnDescuento.onclick = () => {
        if (inputCupon.value === 'JAVASCRIPT') {
            const descuento = total * 0.1
            const totalConDescuento = total - descuento
            const precioTotalElement = document.getElementById('precio-Total')
            precioTotalElement.textContent = totalConDescuento.toFixed(2)
        }
    }

    // CLICK EN INICIAR COMPRA

    let comprar = totalCarrito.querySelector('#comprar')
    comprar.onclick = () => {
        // que se limpie el carrito entero
        conteinerCarrito.innerHTML = '';
        // vaciar el arrey carrito
        carrito = []
        // y guardar tamb los cambios en el storage es decir que se reinicie
        localStorage.removeItem('menu')
        // que se pinte de nuevo el html
        carritoModal()
    }
}

// ELIMINAR PRODUCTOS

const eliminarProductos = (id) => {
    const index = carrito.findIndex((el) => el.id === id);

    if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem('menu', JSON.stringify(carrito));
        carritoModal();
    }
}