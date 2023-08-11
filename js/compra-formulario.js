// VARIABLES
const tituloCarritoVacio = document.getElementById('titutlo-carrito-vacio')
const datosPersonales = document.getElementById('datos-personales')

//ARRAY
compra = []

//GENERAR FORMULARIO

const generarFormulario = document.createElement('div')
generarFormulario.className = 'formulario-datos'
generarFormulario.innerHTML = `
         <h1 id="titulo-datos"><span class="titulo-personal">Datos Personales </span></h1>
  
         <form id="formulario" action="#">
            <div class="dato-nombre">
              <label for="nombre" class="nombre-validacion">Nombre</label>
              <input id="input-nombre" type="text" class="input">
            </div>
            <div class="dato-apellido">
              <label for="apellido">Apellido</label>
              <input id="input-apellido" type="text" class="input">
            </div>
            <div class="dato-email">
              <label for="email">Email</label>
              <input id="input-email" type="email" class="input">
            </div>
            <div class="dato-fecha">
              <label for="start">Fecha de nacimiento</label>
              <input type="date" id="input-fecha" class="input">
            </div>
        </form>
  
         <h2 class="dato-pago"><span class="titulo-pago">Datos de Pago</span></h2>
  
        <form action="#" id="formulario-tarjeta" class="formulario-tarjeta">
            <div class="numero-tarjeta">
             <label for="inputNumero">Número Tarjeta</label>
             <input type="text" id="input-numero-tarjeta" class="input">
            </div>
            <div class="nombre-tarjeta">
              <label for="inputNombre">Nombre</label>
              <input type="text" id="input-nombre-tarjeta" class="input">
            </div>
            <div class="fecha-tarjeta">
              <div class="vencimiento"> Vencimiento
                <div>
                  <input id="tarjeta-vencimiento" class="input" type="month" value="2023-08" min="2024-02" max="2030-12">    
                </div>
              </div>
             </div>
            <div class="tarjeta-ccv">
              <label for="inputCCV">CCV</label>
               <input type="text" id="input-CCV" class="input">
            </div> 
        </form>
        <div class="btn-compra">
          <button type="submit" id="btn-comprar" class="btn-comprar">Finalizar Comprar</button>
         </div>
      `
datosPersonales.append(generarFormulario)


//LOCALSTORAGE
//Si el LocalStorage tiene datos, los agrego al Array compra
if (localStorage.getItem('compras')) {
  let guardarCompra = JSON.parse(localStorage.getItem('compras'));

  for (let i = 0; i < compra.length; i++) {
    guardarCompra.push(compra[i]);
  }
}

// FUNCION AGREGAR DATOS

function agregarCompra() {

  const inputNombre = document.getElementById('input-nombre').value
  const inputApellido = document.getElementById('input-apellido').value
  const inputEmail = document.getElementById('input-email').value
  const inputNacimiento = document.getElementById('input-fecha').value
  const inputNumeroTarjeta = document.getElementById('input-numero-tarjeta').value
  const inputNombreTarjeta = document.getElementById('input-nombre-tarjeta').value
  const inputVencimiento = document.getElementById('tarjeta-vencimiento').value
  const inputCcv = document.getElementById('input-CCV').value

  const nuevaCompra = new Formulario(inputNombre, inputApellido, inputEmail, inputNacimiento, inputNumeroTarjeta, inputNombreTarjeta, inputVencimiento, inputCcv)
  compra.push(nuevaCompra)

  // GUARDO EN LOCALSTORAGE
  localStorage.setItem('compras', JSON.stringify(compra))
}

// FINALIZAR COMPRA - click

let btnComprar = document.getElementById('btn-comprar')
btnComprar.addEventListener('click', (e) => {
  // evitar que se recargue
  e.preventDefault();
  // se guarden los productos
  agregarCompra();
  //se limpien los input
  limpiarFormulario()
  // mensaje de compra exitosa
  swal({
    title: "Su Compra fue Exitosa",
    text: "Muchas gracias!",
    icon: "success",
  });
})

// LIMPIAR LOS INPUTS
function limpiarFormulario() {
  let formularioDatosPersonales = document.getElementById('formulario').reset()
  let formularioTarjeta = document.getElementById('formulario-tarjeta').reset()
}