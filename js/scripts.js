//IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //pushes pokemon into the pokemonList array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //returns the pokemonList array
  function getAll() {
    return pokemonList;
  }
  
  //dynamically creates the list items and buttons and adds classes to them
  function addListItem(pokemon) {
    let pokemonUl = $('.pokemon-list');
    let listItem = $('<li></li>');
    listItem.addClass('group-list-item');
    let button = $('<button></button>');
    button.append(pokemon.name);
    button.addClass('custom-button', 'btn', 'btn-primary');
    button.attr('data-toggle', 'modal');
    button.attr('data-target', '#pokemonModal');
    listItem.append(button);
    pokemonUl.append(listItem);
    button.on('click', function() {
      showDetails(pokemon);
    });
  }

  //loads the pokemon list from an external API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      hideLoadingMessage();
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    })
    .catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  //loads the pokemon details from an external API
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(details) {
      hideLoadingMessage();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = details.abilities;
    })
    .catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  //once the pokemon details are loaded then show the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  //show loading message function
  function showLoadingMessage() {
    $('.loading').append('Loading...');
  }

  //hide loading message function
  function hideLoadingMessage() {
    $('.loading').empty();
  }

  //appends the pokemon details to the modal
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElementFront = $('<img class="modal-img">');
    imageElementFront.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');

    let typeContainer = '';

    pokemon.types.forEach(function(item) {
      typeContainer += item.type.name + ', ';
    });

    let typeElement = $('<p>' + 'Type : ' + typeContainer + '</p>');

    let abilitiesContainer = '';

    pokemon.abilities.forEach(function(item) {
      abilitiesContainer += item.ability.name + ', ';
    });

    let abilitiesElement = $('<p>' + 'Abilities : ' + abilitiesContainer + '</p>');

    let loadingMessage = $('<p class="loading">Loading...</p>');

    modalTitle.append(nameElement);
    modalBody.append(loadingMessage);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);

    hideLoadingMessage();
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})();

//load the list, then get all pokemon, then add list items
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
