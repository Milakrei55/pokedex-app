// Declaration of pokemon array with each object
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    function add(pokemon) {
      pokemonList.push(pokemon)
    }

    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");

      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener("click", function(event) {
        pokemonRepository.showDetails(pokemon);
      });
    }
  
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showModal(title, text, img) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerText = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let pokemonName = document.createElement('h1');
      pokemonName.innerText = title;

      let pokemonHeight = document.createElement('p');
      pokemonHeight.innerText = text;

      let pokemonImage = document.createElement('img');
      pokemonImage.setAttribute('src', img);
      pokemonImage.setAttribute('width', '50%');
      pokemonImage.setAttribute('height', '50%');

      modal.appendChild(closeButtonElement);
      modal.appendChild(pokemonName);
      modal.appendChild(pokemonHeight);
      modal.appendChild(pokemonImage);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');

      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    }

    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
  
    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        showModal(
          pokemon.name,
          "Height: " + pokemon.height,
          pokemon.imageUrl
        );
      });
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  
  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
