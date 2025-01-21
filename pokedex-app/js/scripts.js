// Pokémon array
let pokemonList = [
  {
    name: 'Treecko',
    height: 0.5,
    type: ['Grass']
  },
  {
    name: 'Cyndaquil',
    height: 0.5,
    type: ['Fire']
  },
  {
    name: 'Dratini',
    height: 1.8,
    type: ['Dragon']
  },
];

// Loop code to write the Pokémon names + biggest Pokémon
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1) {
    message = "- Wow, that's big!";
  } else {
    message = "";
  }
  document.write(
    `${pokemonList[i].name} (height: ${pokemonList[i].height})
      ${message} 
      <br>`
  );
}