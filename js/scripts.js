//list of pokemon
let pokemonList = [
  {name: "Bulbasaur", height: 0.7 , type:['grass','poison']},
  {name: "Charmander", height: 0.6, type: ['fire']},
  {name: "Squirtle", height: 0.5, type: ['water']},
  {name: "Caterpie", height: 0.3, type: ['bug']},
  {name: "Weedle", height: 0.3, type: ['bug','poison']}
];

// for (let i=0; i < pokemonList.length; i++){ //loops through pokemonList
//   if (pokemonList[i].height > 0.6) { //finds tallest pokemon
//     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - Wow, that's big!" + "<br>");
//   } else { //outputs other pokemon
//     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>");
//   }
// }

pokemonList.forEach(function(pokemon) {
  if (pokemon.height > 0.6) { //finds tallest pokemon
    document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")" + " - Wow, that's big!" + "</p>");
  } else { //outputs other pokemon
    document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")" + "</p>");
  }
});
