let API = 'https://pokeapi.co/api/v2/pokemon/';

let f = document.querySelector('#form');
let input = document.querySelector('.pokemon');

let pokeCarta = document.querySelector('.pokeCarta');
let pokeName = document.querySelector('.pokeName');
let imgCont = document.querySelector('.imgCont');
let pokeImg = document.querySelector('.pokeImg');
let pokeId = document.querySelector('.pokeId');
let pokeTipos = document.querySelector('.pokeTipos');
let pokeStats = document.querySelector('.pokeStats');

let tipoColores = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

f.addEventListener('submit', (e) => {
    e.preventDefault();

    let nombrePokemon = input.value.trim();
    if (!nombrePokemon) return;

    obtenerPokemon(nombrePokemon);

    input.value = '';
});

let obtenerPokemon = async pokemon => {
    try {
        let respuesta = await fetch(API + pokemon.toLowerCase());

        if (!respuesta.ok) {
            throw new Error('No existe ese pokémon!');
        }

        let datos = await respuesta.json();
        datosPokemon(datos);

    } catch (error) {
        console.error('Error', error);
        noEncontrado();
    }
}

let noEncontrado = () => {
    pokeName.textContent = 'No existe ese pokémon!';
    pokeImg.setAttribute('src', 'img/pokemonshadow.png');
    pokeImg.style.background = '#fff'
    pokeId.textContent = '';
    pokeTipos.textContent = '';
    pokeStats.textContent = '';
}

let datosPokemon = datos => {
    let imgPokemon = datos.sprites.front_default;
    let { stats, types, } = datos;

    pokeName.textContent = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);
    pokeImg.setAttribute('src', imgPokemon);
    pokeId.textContent = `Nº ${datos.id}`;

    colorFondoPokemon(types);
    mostrarTipoPokemon(types);
    mostrarStatsPokemon(stats);
}

let colorFondoPokemon = types => {
    let colorUno = tipoColores[types[0].type.name];
    let colorDos = types[1] ? tipoColores[types[1].type.name] : tipoColores.default;

    pokeImg.style.background = `radial-gradient(${colorDos} 33%, ${colorUno} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

let mostrarTipoPokemon = types => {
    pokeTipos.innerHTML = '';

    types.forEach(tipo => {
        let tipoElement = document.createElement('div');

        tipoElement.style.color = tipoColores[tipo.type.name];
        tipoElement.textContent = tipo.type.name;

        pokeTipos.appendChild(tipoElement);
    });
}

let mostrarStatsPokemon = stats => {
    pokeStats.innerHTML = '';

    stats.forEach(stat => {
        let statElement = document.createElement('div');

        let statElementName = document.createElement('div');
        let statElementNro = document.createElement('div');

        statElementName.textContent = stat.stat.name;
        statElementNro.textContent = stat.base_stat;

        statElement.appendChild(statElementName);
        statElement.appendChild(statElementNro);

        pokeStats.appendChild(statElement);
    });
}