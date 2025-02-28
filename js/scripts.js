let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "detailsUrl" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("Invalid Pokémon format");
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      let pokemonListElement = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      listPokemon.classList.add("list-group-item", "pokemon-item");
      listPokemon.setAttribute("data-toggle", "modal");
      listPokemon.setAttribute("data-target", "#pokemonModal");
  
      // Set the text and make the entire pokemon li clickable to open modal
      listPokemon.innerText = pokemon.name;
      listPokemon.addEventListener("click", function () {
        showDetails(pokemon);
      });
  
      pokemonListElement.appendChild(listPokemon);
    }
  
    function loadList() {
      return fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
          json.results.forEach((item) => {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
            addListItem(pokemon);
          });
        })
        .catch((error) => console.error("Error loading Pokémon list:", error));
    }
  
    function loadDetails(pokemon) {
      return fetch(pokemon.detailsUrl)
        .then((response) => response.json())
        .then((details) => {
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.weight = details.weight;
          pokemon.types = details.types
            .map((typeInfo) => typeInfo.type.name)
            .join(", ");
          pokemon.abilities = details.abilities
            .map((abilityInfo) => abilityInfo.ability.name)
            .join(", ");
        })
        .catch((error) => console.error("Error loading Pokémon details:", error));
    }
  
    // Modal content
    function showDetails(pokemon) {
      loadDetails(pokemon).then(() => {
        let modalTitle = document.querySelector(".modal-title");
        let modalBody = document.querySelector(".modal-body");
  
        modalTitle.innerText = pokemon.name;
        modalBody.innerHTML = `
                  <div class="row">
                      <div class="col-md-6 text-left">
                          <img src="${pokemon.imageUrl}" class="img-fluid" alt="${pokemon.name}">
                      </div>
                      <div class="col-md-6">
                          <p><strong>Height:</strong> ${pokemon.height}</p>
                          <p><strong>Weight:</strong> ${pokemon.weight}</p>
                          <p><strong>Types:</strong> ${pokemon.types}</p>
                          <p><strong>Abilities:</strong> ${pokemon.abilities}</p>
                      </div>
                  </div>
              `;
      });
    }
  
    // Dynamic search function for filtering Pokémon list
    function searchPokemon(event) {
      let searchInput = event.target.value.toLowerCase();
      let pokemonItems = document.querySelectorAll(".pokemon-list .pokemon-item");
  
      pokemonItems.forEach((item) => {
        let pokemonName = item.innerText.toLowerCase();
        if (pokemonName.includes(searchInput)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      showDetails: showDetails,
      searchPokemon: searchPokemon,
    };
  })();
  
  // Load and display the Pokémon list and attach search event listener
  document.addEventListener("DOMContentLoaded", function () {
    pokemonRepository.loadList().then(() => {
      let searchInput = document.querySelector(".form-control[type='search']");
      if (searchInput) {
        searchInput.addEventListener("input", pokemonRepository.searchPokemon);
      } else {
        console.error("Search bar not found in the DOM.");
      }
    });
  });
  