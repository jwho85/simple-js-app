//IIFE
let pokemonRepository = (function () {
  let pokemonList = [
    {name: "Bulbasaur", height: 0.7 , type:['grass','poison']},
    {name: "Charmander", height: 0.6, type: ['fire']},
    {name: "Squirtle", height: 0.5, type: ['water']},
    {name: "Caterpie", height: 0.3, type: ['bug']},
    {name: "Weedle", height: 0.3, type: ['bug','poison']}
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  
  function addListItem(pokemon) {
    let pokemonUl = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('custom-button');
    listItem.appendChild(button);
    pokemonUl.appendChild(listItem);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

// for (let i=0; i < pokemonList.length; i++){ //loops through pokemonList
//   if (pokemonList[i].height > 0.6) { //finds tallest pokemon
//     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - Wow, that's big!" + "<br>");
//   } else { //outputs other pokemon
//     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>");
//   }
// }

pokemonRepository.getAll().forEach(function(pokemon) {

  pokemonRepository.addListItem(pokemon);

  // let pokemonUl = document.querySelector('.pokemon-list');
  // let listItem = document.createElement('li');
  // let button = document.createElement('button');
  // button.innerText = pokemon.name;
  // button.classList.add('custom-button');
  // listItem.appendChild(button);
  // pokemonUl.appendChild(listItem);

  // if (pokemon.height > 0.6) { //finds tallest pokemon
  //   document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")" + " - Wow, that's big!" + "</p>");
  // } else { //outputs other pokemon
  //   document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")" + "</p>");
  // }
});
