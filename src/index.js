let currentPage = 1;
let idPokemonGlobal = 0;
let namePokemonGlobal = "";

loadPage(currentPage);

$('#pokemons-container')[0].addEventListener("click", clickPokemon);
$('figure')[0].addEventListener("error", clickPokemon);


$('#search')[0].onclick = function(){
    const $pokemonID = Number($('#search-pokemon')[0].value);
    const $pokemonName = $('#search-pokemon')[0].value;
    if(!($pokemonID === idPokemonGlobal) && !($pokemonName === namePokemonGlobal)){
        if(!($pokemonID === NaN) && $pokemonID<808){
            $("#pokemon-images").empty();
            $("#pokemon-data").empty();
            $("#pokemons-container").addClass("d-none");
            $("#pokemon-container").removeClass("d-none");
            $("#page-number-buttons").addClass("d-none");
            $("#pokemon-number-buttons").removeClass("d-none");
            loadPokemon($pokemonID);
            disablePreviousPokemonButton($pokemonID);
        }else if(/^[a-z]+$/i.test($pokemonName)){
            $("#pokemon-images").empty();
            $("#pokemon-data").empty();
            $("#pokemons-container").addClass("d-none");
            $("#pokemon-container").removeClass("d-none");
            $("#page-number-buttons").addClass("d-none");
            $("#pokemon-number-buttons").removeClass("d-none");
            loadPokemon($pokemonName.toLowerCase());
            disablePreviousPokemonButton(idPokemonGlobal);
        }
    }
    return false; 
}

$('#previous-page')[0].onclick = function(){
    pageDown();
    return false;
}

$('#next-page')[0].onclick = function(){
    pageUp();
    return false;
}

$('#previous-pokemon')[0].onclick = function(){
    $("#pokemon-images").empty();
    $("#pokemon-data").empty();
    idPokemonGlobal--;
    $("h1")[0].innerHTML = "";
    dataPokemon(idPokemonGlobal);
    disablePreviousPokemonButton(idPokemonGlobal);
    changePage();
    return false;
}

$('#next-pokemon')[0].onclick = function(){
    $("#pokemon-images").empty();
    $("#pokemon-data").empty();
    idPokemonGlobal++;
    $("h1")[0].innerHTML = "";
    dataPokemon(idPokemonGlobal);
    disablePreviousPokemonButton(idPokemonGlobal);
    changePage();
    return false;
}

$('#home-page')[0].onclick = function(){
    idPokemonGlobal = 0;
    namePokemonGlobal = "";
    $("h1")[0].innerHTML = "Pokemones";
    $("#pokemon-images").empty();
    $("#pokemon-data").empty();
    $("#pokemons-container").removeClass("d-none");
    $("#pokemon-container").addClass("d-none");
    $("#page-number-buttons").removeClass("d-none");
    $("#pokemon-number-buttons").addClass("d-none");
}

function changeIcon(){
    $("#icon")[0].href=`https://pokeres.bastionbot.org/images/pokemon/${idPokemonGlobal}.png`
}

function pageUp(){
    currentPage++;
    loadPage(currentPage);
    disablePreviousButton(currentPage);
    disableNextButton(currentPage);
}

function pageDown(){
    currentPage--;
    loadPage(currentPage);
    disablePreviousButton(currentPage);
    disableNextButton(currentPage);
}

function clickPokemon(e){
    const element = e.target.parentElement.id;
    const id = Number(element.slice(8));
    idPokemonGlobal = (currentPage-1)*18 + id;
    if(!(id === 0)){
        $("#pokemons-container").addClass("d-none");
        $("#pokemon-container").removeClass("d-none");
        $("#page-number-buttons").addClass("d-none");
        $("#pokemon-number-buttons").removeClass("d-none");
        loadPokemon(idPokemonGlobal);
        disablePreviousPokemonButton(idPokemonGlobal);
    }
}

function loadPokemon(idPokemon){
    $("h1")[0].innerHTML = "";
    dataPokemon(idPokemon);
}

function dataPokemon(idPokemon){
    const URL = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    fetch(URL)
        .then(response => response.json())
        .then(responseJSON => {
            idPokemonGlobal = responseJSON.id;
            changePage();
            changeIcon();
            namePokemonGlobal = responseJSON.name;
            displayName(namePokemonGlobal);
            displayImages(idPokemonGlobal);
            displayId(idPokemonGlobal);
            displayHeight(responseJSON.height);
            displayWeight(responseJSON.weight);
            const numberAbilities = responseJSON.abilities.length;
            displayNumberAbilities(numberAbilities);
            responseJSON.abilities.forEach((ability,i) => {
                const abilityName = responseJSON.abilities[i]["ability"]["name"];
                const abilityInfo = responseJSON.abilities[i]["ability"]["url"]
                displayAbilities(abilityName,i);
                displayAbilityInfo(abilityInfo,i);
            });
        })
    .catch(error => console.error("FALLÓ data", error));
}

function dataAbilityPokemon(URL){
    return fetch(URL)
        .then(response => response.json())
        .then(responseJSON => {
            return responseJSON.flavor_text_entries[23].flavor_text;
        })
    .catch(error => console.error("FALLÓ dataAbility", error));
}

function displayName(name){
    $("h1")[0].innerHTML = firstCapitalLetter(name);
}

function displayImages(idPokemon){
    const imagePokemon = `https://pokeres.bastionbot.org/images/pokemon/${idPokemon}.png`;
    const imageFrontDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
    const imageBackDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${idPokemon}.png`
    const imageFrontShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${idPokemon}.png`
    const imageBackShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${idPokemon}.png`
    $('#pokemon-images').append($(`<img src=${imagePokemon} class="figure-img img-fluid rounded">`));
    //$('#pokemon-images').append($(`<img src=${imageFrontDefault} class="figure-img img-fluid rounded" width="300" display: block>`));
    //$('#pokemon-images').append($(`<img src=${imageBackDefault} class="figure-img img-fluid rounded" width="300">`));
    //$('#pokemon-images').append($(`<img src=${imageFrontShiny} class="figure-img img-fluid rounded" width="300">`));
    //$('#pokemon-images').append($(`<img src=${imageBackShiny} class="figure-img img-fluid rounded" width="300">`));

}

function displayId(idPokemon){
    $("#pokemon-data").append($(`<p class="card-text">ID: ${idPokemon}</p>`));
}

function displayHeight(height){
    $("#pokemon-data").append($(`<p class="card-text">Altura: ${height/10}m</p>`));    
}

function disablePreviousButton(currentPage){
    if(currentPage === 1){
        $('#previous-page').prop('disabled', true).addClass("default");
    }else{
        $('#previous-page').prop('disabled', false).removeClass("default");
    }
}

function disablePreviousPokemonButton(idPokemon){
    if(idPokemon === 1){
        $('#previous-pokemon').prop('disabled', true).addClass("default");
    }else{
        $('#previous-pokemon').prop('disabled', false).removeClass("default");
    }
    if(idPokemon === 807){
        $('#next-pokemon').prop('disabled', true).addClass("default");
    }else{
        $('#next-pokemon').prop('disabled', false).removeClass("default");
    }
}

function displayWeight(weight){
    $("#pokemon-data").append($(`<p class="card-text">Peso: ${weight/10}kg</p>`));
}

function displayAbilities(abilities,i){
    const ability = firstCapitalLetter(abilities);
    $("#pokemon-data ul").append($(`<li class="list-group-item" id="ability-${i}">${ability}:</li>`));
    
}

function displayAbilityInfo(URL,i){
    dataAbilityPokemon(URL).then(info => {
        $(`#ability-${i}`).append($(`<p class="mb-0">${info}</p>`));
    });
}

function displayNumberAbilities(number){
    $("#pokemon-data").append($(`<p class="mb-0">Habilidades <span class="badge badge-primary badge-pill">${number}</></p>`));
    $("#pokemon-data").append($(`<ul class="list-group list-group-flush"></ul>`));
}

function disableNextButton(currentPage){
    if(currentPage === 45){
        $('#next-page').prop('disabled', true).addClass("default");
    }else{
        $('#next-page').prop('disabled', false).removeClass("default");
    }
}

function changePage(){
    const pageNumber = Math.ceil(idPokemonGlobal / 18);
    if(pageNumber>currentPage){
        while(pageNumber>currentPage){
            currentPage++;
        }
        disablePreviousButton(currentPage);
        disableNextButton(currentPage);
        loadPage(currentPage);
    }else if(pageNumber<currentPage){
        while(pageNumber<currentPage){
            currentPage--;
        }
        disablePreviousButton(currentPage);
        disableNextButton(currentPage);
        loadPage(currentPage);
    }
}

function namePokemon(idPokemon){
    const URL = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    return fetch(URL)
        .then(response => response.json())
        .then(responseJSON => {
            return responseJSON.name;
        })
    .catch(error => console.error("FALLÓ name", error));
}

function loadPage(number){
    deleteFiguresChilds();
    const pokemones = 18 * number;
    let element = 0;
    for(let i=pokemones-17; i<=pokemones; i++){
        element++;
        createFigure(element,i);
    }
}

function deleteFiguresChilds(){
    $("figure").empty();
}

function createFigure(element,idPokemon){
    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${idPokemon}.png`;
    $(`#element-${element}`).append($(`<img src=${imageUrl} class="figure-img img-fluid rounded">`));
    namePokemon(idPokemon).then(response => $(`#element-${element}`).append($(`<figcaption class="figure-caption text-center">${firstCapitalLetter(response)}</figcaption>`)));
}

function firstCapitalLetter(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function loadAlternativeImage(element, idPokemon){
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
    $(`#element-${element}`).append($(`<img src=${imageUrl} class="figure-img img-fluid rounded">`));
    namePokemon(idPokemon).then(response => $(`#element-${element}`).append($(`<figcaption class="figure-caption text-center">${firstCapitalLetter(response)}</figcaption>`)));
}
