// Pokémon array

let pokemonRepository = (function () {
  let pokemonList = [
      {
          name: 'Treecko',
          height: 0.5,
          types: ['Grass']
      },
      {
          name: 'Cyndaquil',
          height: 0.5,
          types: ['Fire']
      },
      {
          name: 'Dratini',
          height: 1.8,
          types: ['Dragon']
      }
  ];
  return {
      add: function (pokemon) {
          pokemonList.push(pokemon);
      },
      getAll: function () {
          return pokemonList;
      }
  };
})();


pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(pokemon.name + " height: " + pokemon.height + "<p>")
});
