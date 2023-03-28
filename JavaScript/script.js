// Función para generar el arreglo con los nombres y números de la función
function generarArregloFuncion() {
  let array = [];
  for (let i = 1; i <= 898; i++) {
    let num = i.toString().padStart(3, '0');
    array.push(num);
    array.push(PokedexInformacion.find(p => p.number === num).name.toLowerCase());
  }
  return array;
}
const arrFuncion = generarArregloFuncion(); // generar el arreglo
// Función para buscar la función por nombre o número
function busquedaFuncion(valor) {
  return arrFuncion.includes(valor);
}
const form = document.querySelector('form');
form.addEventListener('submit', busquedapokemon);
function busquedapokemon(evento) {
  // document.querySelector(".content-pokedex").style.display="block";
  evento.preventDefault(); // previene que el formulario se envíe
  const input = document.querySelector('#buscarpokemon');
  const valor = input.value.toLowerCase(); // convierte a minúsculas para comparar
  if (busquedaFuncion(valor)) {
    const pokemon = PokedexInformacion.find(p => {
      return p.name.toLowerCase() === valor || p.number === valor;
    });
    
    actualizarInformacionPokemon(pokemon);
  } else {
    alert('No se encontró una función con ese nombre o número.');
  }
  
  input.value = ''; // limpia el input después de la búsqueda
}

function actualizarInformacionPokemon(pokemon) {
  const nombre1 = document.querySelector('#pokemon-name-1');
  const nombre2 = document.querySelector('#pokemon-name-2');
  const nombre3 = document.querySelector('#pokemon-name-3');
  const tipo = document.querySelector('#pokemon-type');
  const imagen = document.querySelector('#pokemon-img');
  const peso = document.querySelector('#pokemon-weight');
  const habilidades = document.querySelector('#pokemon-moves');
  
  if (nombre1) {
    nombre1.textContent = pokemon.name;
  }
  if (nombre2) {
    nombre2.textContent = pokemon.name;
  }
  if (nombre3) {
    nombre3.textContent = pokemon.name;
  }
  if (tipo) {
    tipo.textContent = pokemon.type.join(', ');
  }
  if (imagen) {
    imagen.src = pokemon.ThumbnailImage;
  }
  if (peso) {
    peso.textContent = `Peso: ${pokemon.weight}`;
  }
  if (habilidades) {
    habilidades.textContent = `Habilidad: ${pokemon.abilities}`;
  }
}
