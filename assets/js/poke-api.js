
///representar como um objeto
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDatail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDatail.id
  pokemon.name = pokeDatail.name

  const types = pokeDatail.types.map((typesSlot) => typesSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDatail.sprites.other.dream_world.front_default

  return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json()) /// vai entrar na URL do pokemnon pra pegar os detalhes e tranformar em json
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then((response) => response.json()) /// pegando a lista e transformando em json porque vem um HTTP Response
    .then((jsonBody) => jsonBody.results) /// pegando o json e caputurando só o resultado dos pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))  /// pegando o detalhe dos pokemon em mais um fatch la na função de cima e pegando os detalhes
    .then((detailRequests) => Promise.all(detailRequests)) /// Promise vai epgar todos os detalhes das urls que passamos e vai da o detalhe e jogou para o reponse la de dentro da função e transformou em json
    .then((pokemonsDetails) => pokemonsDetails)  /// agora a gente tem a lista em mãos
}

Promise.all([
  fetch(`https://pokeapi.co/api/v2/pokemon/1`),
  fetch(`https://pokeapi.co/api/v2/pokemon/2`),
  fetch(`https://pokeapi.co/api/v2/pokemon/3`),
  fetch(`https://pokeapi.co/api/v2/pokemon/4`),

]).then((results) => {
  console.log(results)
})