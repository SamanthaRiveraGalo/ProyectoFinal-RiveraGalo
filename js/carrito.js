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
    modalEncabezado.className = ('encabezado')
    modalEncabezado.innerHTML = `
    <h1 class="encabezado-titulo"> Carrito </h1>
    <img class="carrito-logo" src="./assets/logo.png">
    <p class = "cierre-boton" > x </i> </p>
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
           <span class="boton-eliminar"> Eliminar </span>

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
    <p class = "total-titulo"> Precio Total: $ ${total} </p>
    <div class="descuento-producto"> 
      <input type="text" id="cupon">
      <button id="aplicar-cupon"> Aplicar Descuento </button>
      <p>El cupon de descuento del 10% es: JAVASCRIPT</p>
      <p> Total con Descuento: $ ${totalDescuento}</p>
    </div>
    <div class="comprar"> 
      <button id="comprar">Comprar</button>
    </div>
    `
    conteinerCarrito.append(totalCarrito);

    // DESCUENTO

    const descuento = document.getElementById('aplicar-cupon')
    const cupon = document.getElementById('cupon')

    descuento.onclick = ()=>{
        // aca tendria que ir un if?
        // si descuento === 'javascript = total con descuento
        // else = total
    }
    

    //sweetAlert

    let comprar = totalCarrito.querySelector('#comprar')
    comprar.onclick = () => {
        swal({
            text: 'Su compra fue exitosa',
            icon: 'success',
        });
    }

}


// Eliminar el producto por ID
const eliminarProductos = (id) => {
    const encontrarId = carrito.find((el) => el.id === id);

    carrito = carrito.filter((productoId) => {
        return productoId !== encontrarId;
    });

    localStorage.setItem('menu', JSON.stringify(carrito));
    carritoModal();
};
