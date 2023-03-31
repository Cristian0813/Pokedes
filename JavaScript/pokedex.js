// FUNCIÓN PARA GENERAR EL ARREGLO CON LOS NOMBRES Y NÚMEROS
function generarArregloFuncion() {
  let array = [];
  for (let i = 1; i <= 898; i++) {
    let num = i.toString().padStart(3, '0');
    array.push(num);
    array.push(PokedexInformacion.find(p => p.number === num).name.toLowerCase());
  }
  return array;
}
// FUNCION DEL BOTON ATRAS
const botonAtras = document.getElementById("boton-atras");
  botonAtras.addEventListener("click", () => {
  window.scrollTo(0, 0);
  document.querySelector(".content-pokedex").style.display = "none";
  document.querySelector(".seccion-card").style.display = "block"
});
const BotonAtras = document.getElementById("img-atras");
BotonAtras.addEventListener("click", () => {
  window.scrollTo(0, 0);
  document.querySelector(".content-pokedex").style.display = "none";
  document.querySelector(".seccion-card").style.display = "block";
});
// FUNCIÓN PARA BUSCAR EL POKEMON POR NOMBRE Y/O NÚMERO, ARREGLO PARA LA FUNCIÓN
const arrFuncion = generarArregloFuncion();
function busquedaFuncion(valor) {
  return arrFuncion.includes(valor);
}
// FORMULARIO DE BUSQUE EN EL INPUT
  const form = document.querySelector('form');
  form.addEventListener('submit', busquedapokemon);

 // FUCNION PARA LA BUSQUEDA DEL POKÉMON USANDO EL METODO EVENTO
 function busquedapokemon(evento, nombrePokemon = "") {
  evento.preventDefault();
  document.querySelector(".content-pokedex").style.display = "block";
  document.querySelector(".seccion-card").style.display = "none";

  let pokemon;
  if (nombrePokemon !== "") {
    pokemon = PokedexInformacion.find(p => p.name.toLowerCase() === nombrePokemon);
  } else {
    const input = document.querySelector('#buscarpokemon');
    const valor = input.value.toLowerCase();
    if (busquedaFuncion(valor)) {
      pokemon = PokedexInformacion.find(p => {
        return p.name.toLowerCase() === valor || p.number === valor;
      });
    } else {
      alert('No se encontró un Pokémon con ese nombre o número.');
      document.querySelector(".content-pokedex").style.display = "none";
      document.querySelector(".seccion-card").style.display = "block";
      input.value = '';
      return;
    }
    input.value = '';
  }
  actualizarInformacionPokemon(pokemon);
}

// FUNCIÓN PARA MOSTRAR EL RESULTADO EN EL HTML
function actualizarInformacionPokemon(pokemon) {
  const nombres = document.querySelectorAll('[id^="pokemon-name-"]');
  nombres.forEach(nombre => {
    if (pokemon.name) {
      nombre.textContent = pokemon.name;
    }
  });

  const tipo = document.querySelector('#pokemon-type');
  if (tipo) {
    tipo.textContent = `Tipo: ${pokemon.type.join(', ')}`;
  }
  const imagen = document.querySelector('#pokemon-img');
  if (imagen) {
    imagen.src = pokemon.ThumbnailImage;
  }
  const peso = document.querySelector('#pokemon-weight');
  if (peso) {
    peso.textContent = `Peso: ${pokemon.weight}`;
  }
  const habilidades = document.querySelector('#pokemon-moves');
  if (habilidades) {
    habilidades.textContent = `Habilidad: ${pokemon.abilities}`;
  }
  const debilidades = document.querySelector('#pokemon-weakness');
  if (debilidades) {
    debilidades.textContent = `Debilidad: ${pokemon.weakness.join(', ')}`;
  }
}

//SE REALIZA FUNCION DE UNA LISTA PARA REALIZAR LA BUSQUEDA
const datalist = document.getElementById('opciones');
const nombresPokemonesAgregados = {};
function llenarOpciones() {
  for (let i = 0; i < PokedexInformacion.length; i++) {
    const pokemon = PokedexInformacion[i];
    const nombrePokemon = pokemon.name;
    // VERIFICA SI EL NOMBRE YA FUE AGREGADO
    if (nombresPokemonesAgregados[nombrePokemon]) {
      continue;
    }
    nombresPokemonesAgregados[nombrePokemon] = true;

    const opcionPokemon = document.createElement("option");
    opcionPokemon.value = pokemon.name;
    datalist.appendChild(opcionPokemon);
  }
}
window.onload = llenarOpciones;

// FUNCION PARA MOSTRAR LOS POKEMONES EN TARJETAS Y QUE NO SE REPITAN
const listaPokemones = document.getElementById("lista-pokemones");
const nombresPokemonesMostrados = {};
for (let i = 0; i < PokedexInformacion.length; i++) {
  const pokemon = PokedexInformacion[i];
  const nombrePokemon = pokemon.name;
  if (nombresPokemonesMostrados[nombrePokemon]) {
    continue;
  }
  nombresPokemonesMostrados[nombrePokemon] = true;
  
  const div = document.createElement("div");
  div.addEventListener("click", event => {
    const nombrePokemon = event.currentTarget.querySelector(".pokemon-nombre").textContent.toLowerCase();
    busquedapokemon(event, nombrePokemon);
  });
  div.classList.add("pokemon-card");
  div.innerHTML = `
    <p class="pokemon-numero"> ${pokemon.number}</p>
    <img class="pokemon-imagen" src="${pokemon.ThumbnailImage}" alt="${nombrePokemon}">
    <p class="pokemon-nombre">${nombrePokemon}</p>
  `;
  listaPokemones.appendChild(div);
}
