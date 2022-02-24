//IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {

    let pokemonUl = $(".pokemon-list");
    let listItem = $("<li></li>");
    listItem.addClass("group-list-item");
    let button = $("<button></button>");
    button.append(pokemon.name);
    button.addClass("custom-button","btn","btn-primary");
    button.attr("data-toggle","modal");
    button.attr("data-target","#pokemonModal");
    listItem.append(button);
    pokemonUl.append(listItem);
    button.on("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showLoadingMessage() {
    $('.loading').append("Loading pokemon...");
  }

  function hideLoadingMessage() {
    $('.loading').empty();
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElementFront = $('<img class="modal-img">');
    imageElementFront.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "Height : " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "Weight : " + pokemon.weight + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
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

//END FUNCTIONS
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
