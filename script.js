const containerPokemons = document.getElementById('pokemon')
const allContainer = document.getElementById("contener")
let count = document.getElementById("licznik")
let favoritePokemons = []

let pageUrl


const fetchPokemons = (isClick = false, favoritePokemon) => {

  const fetchUrl = isClick ? pageUrl : "https://pokeapi.co/api/v2/pokemon/"
  const checkFavoritUrl = !favoritePokemon ? fetchUrl : fetchUrl + favoritePokemon
  fetch(checkFavoritUrl)
    .then(response => response.json())
    .then(data => {
      pageUrl = data.next
      displayPokemon(data.results)
    }
    )
}


const saveToLocalStorage = (emptyArr = false) => {
  console.log(emptyArr)
  if (emptyArr === true){
    favoritePokemons = []    
    location.reload() 
  }

  localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
  
}

const loadFromLocalStorage = () => {
  if (localStorage.getItem('favoritePokemons')) {
    favoritePokemons = [...JSON.parse(localStorage.getItem('favoritePokemons'))]
  }
  else {
    favoritePokemons = [];
  }
}
let score
const countFavoritePokemons = () => {
  score = favoritePokemons.length
  count.innerHTML = score
}

const btnDeleteList = document.getElementById('qwerty')
btnDeleteList.addEventListener("click", function(){
saveToLocalStorage(emptyArr = true)
console.log("co akrualnie w local", localStorage.getItem('favoritePokemons'))

})

// TODO: funkcje do dodawania listy ulubionych 
const addNewFavoritePokemon = findId => {
  favoritePokemons.push(findId)
  saveToLocalStorage();
  countFavoritePokemons()
   const found = [...JSON.parse(localStorage.getItem('favoritePokemons'))]
  found.find(el => {
    if(Number(findId) === el){
      document.getElementById(`poke${findId}`).style.display = "none"
      }
  })
}

const btnShowFavoriteList = document.getElementById("listaFav")
count = document.getElementById("licznik")
btnShowFavoriteList.addEventListener("click", function () {
  containerPokemons.innerHTML = ''
  const btnloadMore = document.getElementById("button")
  btnloadMore.style.display = 'none'
  for (const favoritePokemon of favoritePokemons) {
    let urlFavorite = "https://pokeapi.co/api/v2/pokemon/" + favoritePokemon

    fetch(urlFavorite)
      .then(response => response.json())
      .then(data => {
        displayFavoritePokemon(data, favoritePokemon)
      })
  }
})
const fetchFavoriteSinglePokemon = (urFavlSinglePokemon2) => {

  fetch(urFavlSinglePokemon2)
    .then(response => response.json())
    .then(data => {
      const boxWithPokemon = ` <div class = "single" > <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" /><div> PokemonID = ${data.id} </div>
      <div> <span> name = ${data.name} </span> </div> <div> <span> weight = ${data.weight} </span> </div> <div> height = ${data.height} cm </div>
       <button id= "backToListBtn"> Back To The List </div>  `
      containerPokemons.innerHTML = boxWithPokemon
      btnLoadMore.style.display = "none"
      btnscroll.style.display = "none"
      const goBackToTheList = document.getElementById("backToListBtn")
      goBackToTheList.addEventListener("click", function () {

        fetchPokemons()
        goBackToTheList.style.display = "none"
        containerPokemons.innerHTML = ""
        btnLoadMore.style.display = "block"
      })
    })

}

const displayFavoritePokemon = (results, findId) => {
  let pokemonsList = []
  pokemonsList.push(results)

  pokemonsList.map(pokemon => {

    const listNamePokemons = document.createElement("li");
    const listBtnFavorite = document.createElement("div");

    const htmlbtnAdd2 = `<div id = "BtnAddToFavorite2"><button onclick="addNewFavoritePokemon(${findId})" id = "addToFavorite2"></button> </div>`
    const htmlPoke2 = ` 
          <div>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${findId}.png" />
          ${pokemon.name}
          </div>`
    listNamePokemons.innerHTML = htmlPoke2
    listBtnFavorite.innerHTML = htmlbtnAdd2

    containerPokemons.appendChild(listNamePokemons)
    containerPokemons.appendChild(listBtnFavorite)
  })
}


const displayPokemon = (results) => {
  results.map(pokemon => {
    const listNamePokemons = document.createElement("li");
    const listBtnFavorite = document.createElement("div");

    listNamePokemons.setAttribute("data-url", pokemon.url)
    const splitUrl = pokemon.url.split("/")
    const findId = splitUrl[splitUrl.length - 2]
    const htmlbtnAdd = `<div id = "BtnAddToFavorite"><button onclick="addNewFavoritePokemon(${findId})" id = "poke${findId}" class="addToFavorite">+</button> </div>`
    const htmlPoke = ` 
          <div>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${findId}.png" />
          ${pokemon.name}
          </div>`
    listNamePokemons.innerHTML = htmlPoke
    listBtnFavorite.innerHTML = htmlbtnAdd

    containerPokemons.appendChild(listNamePokemons)

    // const found = [...JSON.parse(localStorage.getItem('favoritePokemons'))]
    // console.log("ulubione tablica", found)
    
    // found.find(el => Number(findId) === el ? null : containerPokemons.appendChild(listBtnFavorite))

    // containerPokemons.appendChild(listBtnFavorite)
    //     found.find(el => {
    //       if(Number(findId) === el){
    //         document.getElementById(`poke${findId}`).style.display = "none"
    //         }
    //     })
  })

  let takeSinglePokemon = document.querySelectorAll('.pokemon li');
  for (const elem of takeSinglePokemon) {
    elem.addEventListener("click", () => {
      let urlSinglePokemon = elem.getAttribute("data-url")
      fetchSinglePokemon(urlSinglePokemon)
    })
  }

}

let btnLoadMore = document.getElementById('button')
btnLoadMore.addEventListener("click", function () {
  fetchPokemons(isClick = true)
})

fetchPokemons()

//Przycisk dodaj do listy ulubionych
let takeSinglePokemon2 = document.querySelectorAll('.pokemon div');



const fetchSinglePokemon = (urlPokemona) => {

  fetch(urlPokemona)
    .then(response => response.json())
    .then(data => {
      const boxWithPokemon = ` <div class = "single" > <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" /><div> PokemonID = ${data.id} </div>
      <div> <span> name = ${data.name} </span> </div> <div> <span> weight = ${data.weight} </span> </div> <div> height = ${data.height} cm </div>
       <button id= "backToListBtn"> Back To The List </div>  `
      containerPokemons.innerHTML = boxWithPokemon
      btnLoadMore.style.display = "none"
      btnscroll.style.display = "none"
      const goBackToTheList = document.getElementById("backToListBtn")
      goBackToTheList.addEventListener("click", function () {

        fetchPokemons()
        goBackToTheList.style.display = "none"
        containerPokemons.innerHTML = ""
        btnLoadMore.style.display = "block"
      })
    })

}




// Przycisk Przenieś do 
const btnscroll = document.getElementById("przycisk")
const punkt = document.getElementById("button")
btnscroll.addEventListener('click', function (e) {
  const s1 = punkt.getBoundingClientRect()
  punkt.scrollIntoView({ behavior: 'smooth' })
})



loadFromLocalStorage();
countFavoritePokemons()