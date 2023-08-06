// VARIABLES
const datosPersonales = document.getElementById('datos-personales')

//ARRAY
compra = []

//LOADING

//GENERAR FORMULARIO
const generarFormulario = document.createElement('div')
generarFormulario.className = 'formulario-datos'
generarFormulario.innerHTML = `
<h1 id="titulo-datos"><span class="titulo-personal">Datos Personales </span></h1>

<form id="formulario" action="#">
  <div class="dato-nombre">
    <label for="nombre">Nombre</label>
    <input id="input-nombre" type="text">
  </div>
  <div class="dato-apellido">
    <label for="apellido">Apellido</label>
    <input id="input-apellido" type="text">
  </div>
  <div class="dato-email">
    <label for="email">Email</label>
    <input id="input-email" type="email">
  </div>
  <div class="dato-fecha">
    <label for="start">DD/MM/AA</label>
    <input type="date" id="input-fecha">
  </div>
</form>

<h2 class="dato-pago"><span class="titulo-pago">Datos de Pago</span></h2>

<form action="#" id="formulario-tarjeta" class="formulario-tarjeta">
  <div class="numero-tarjeta">
    <label for="inputNumero">Número Tarjeta</label>
    <input type="text" id="input-numero-tarjeta">
  </div>
  <div class="nombre-tarjeta">
    <label for="inputNombre">Nombre</label>
    <input type="text" id="input-nombre-tarjeta">
  </div>
  <div class="fecha-tarjeta">
    <div class="vencimiento"> Vencimiento
            <div class="grupo-select">
                <select name="mes" id="selectMes">
                    <option disabled selected>Mes</option>
                </select>        
            </div>
            <div class="grupo-select">
                <select name="year" id="selectYear">
                    <option disabled selected>Año</option>
                </select>
            </div>
    </div>
  </div>
  <div class="tarjeta-ccv">
     <label for="inputCCV">CCV</label>
     <input type="text" id="input-CCV">
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
    const inputNombreTarjeta = document.getElementById('input-nombre-tarjeta').value
    const inputNumeroTarjeta = document.getElementById('input-numero-tarjeta').value
    const inputCcv = document.getElementById('input-CCV').value

    const nuevaCompra = new Formulario(inputNombre, inputApellido, inputEmail, inputNacimiento, inputNombreTarjeta, inputNumeroTarjeta, inputCcv)
    compra.push(nuevaCompra)

    // GUARDO EN LOCALSTORAGE
    localStorage.setItem('compras', JSON.stringify(compra))
}

let btnComprar = document.getElementById('btn-comprar')
btnComprar.addEventListener ('click', (e)=>{
    // LIMPIAR TODOS LOS INPUT
    e.preventDefault();
    agregarCompra();
})




