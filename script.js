
const pokemonBusqueda = document.getElementById('buscarpokemon');

function busquedapokemon() {
  const namePokemon = pokemonBusqueda.value.toLowerCase();
  const pokemonEncontrado = pokedexinformacion.find(pokemon => pokemon.name.toLowerCase() === namePokemon);

  if (pokemonEncontrado) {
    mostrarDetallesPokemon(pokemonEncontrado);
  } else {
    alert('No se encontró un pokemon con ese nombre');
  }
}

function mostrarDetallesPokemon(pokemon) {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');

  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <h2 id="pokemon-name">${pokemon.name}</h2>
    <img id="pokemon-img" src="${pokemon.ThumbnailImage}">
    <p id="pokemon-type">Tipo: ${pokemon.type}</p>
    <p id="pokemon-weight">Peso: ${pokemon.weight}</p>
    <p id="pokemon-moves">Movimiento: ${pokemon.abilities}</p>
  `;
  modal.style.display = 'block';

  const closeModalBtn = modal.querySelector('.close');
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}