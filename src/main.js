let currentPage = 1;
let idPokemonGlobal = 0;
let namePokemonGlobal = "";
let status = 0;

loadPage(currentPage);

$('#pokemons-container').click(clickPokemon);

$('#search').on("click", function(){
    clickSearch();
    return false; 
});

$('#previous-page').on("click", function(){
    pageDown();
    return false;
});

$('#next-page').on("click", function(){
    pageUp();
    return false;
});

$('#previous-pokemon').on("click", function(){
    previousPokemon();
    return false;
});

$('#next-pokemon').on("click", function(){
    nextPokemon();
    return false;
});

$('#home-page').on("click", function(){
    homePage();
    return false;
});

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
        disableNavPokemonButton(idPokemonGlobal);
    }
}

function clickSearch(){
    const $pokemonID = Number($('#search-pokemon')[0].value);
    const $pokemonName = $('#search-pokemon')[0].value.toLowerCase();
    if(!($pokemonID === idPokemonGlobal) && !($pokemonName === namePokemonGlobal)){
        if(!($pokemonID === NaN) && $pokemonID<808){
            $("#abilities-info").empty();
            $("#img-poke").attr("src","");
            $("#pokemons-container").addClass("d-none");
            $("#pokemon-container").removeClass("d-none");
            $("#page-number-buttons").addClass("d-none");
            $("#pokemon-number-buttons").removeClass("d-none");
            loadPokemon($pokemonID);
            disableNavPokemonButton($pokemonID);
        }else if(/^[a-z]+$/i.test($pokemonName)){
            console.log("hola")
            loadPokemon($pokemonName)
                .then((response) => {
                    if(response){
                        $("#abilities-info").empty();
                        $("#img-poke").attr("src","");
                        $("#pokemons-container").addClass("d-none");
                        $("#pokemon-container").removeClass("d-none");
                        $("#page-number-buttons").addClass("d-none");
                        $("#pokemon-number-buttons").removeClass("d-none");
                        disableNavPokemonButton(idPokemonGlobal);
                    }else{
                        alert("Pokemon no encontrado, asegurece de haberlo escrito correctamente")
                    }
                })
        }else{
            alert("Pokemon no encontrado, aegurece de haber escrito la id correctamente")
        }
    }
}

function pageDown(){
    $('#preloader').fadeIn();
    currentPage--;
    loadPage(currentPage);
    disableNavButton(currentPage);
}

function pageUp(){
    $('#preloader').fadeIn();
    currentPage++;
    loadPage(currentPage);
    disableNavButton(currentPage);
}

function previousPokemon(){
    $("#abilities-info").empty();
    $("#img-poke").attr("src","");
    idPokemonGlobal--;
    $("h1").html("");
    loadPokemon(idPokemonGlobal);
    disableNavPokemonButton(idPokemonGlobal);
    changePage();
}

function nextPokemon(){
    $("#abilities-info").empty();
    $("#img-poke").attr("src","");
    idPokemonGlobal++;
    $("h1").html("");
    loadPokemon(idPokemonGlobal);
    disableNavPokemonButton(idPokemonGlobal);
    changePage();
}

function homePage(){
    idPokemonGlobal = 0;
    namePokemonGlobal = "";
    $("h1").html("Pokemones");
    $("#abilities-info").empty();
    $("#img-poke").attr("src","");
    $("#pokemons-container").removeClass("d-none");
    $("#pokemon-container").addClass("d-none");
    $("#page-number-buttons").removeClass("d-none");
    $("#pokemon-number-buttons").addClass("d-none");
}

function loadPokemon(idPokemon){
    const URL = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    return fetch(URL)
        .then(response => {
            if(!(response.status === 200)){
                throw false;
            }
            return response.json()
        })
        .then(responseJSON => {
            idPokemonGlobal = responseJSON.id;
            changePage();
            changeIcon();
            namePokemonGlobal = responseJSON.name;
            $("h1").html("");
            displayName(namePokemonGlobal);
            displayImages(idPokemonGlobal);
            displayId(idPokemonGlobal);
            displayHeight(responseJSON.height);
            displayWeight(responseJSON.weight);
            const numberAbilities = responseJSON.abilities.length;
            displayNumberAbilities(numberAbilities);
            responseJSON.abilities.forEach((ability,i) => {
                const abilityName = responseJSON.abilities[i]["ability"]["url"];
                const abilityInfo = responseJSON.abilities[i]["ability"]["url"];
                displayAbilities(abilityName,abilityInfo,i);
            });
            return true;
        })
        .catch(error => {
        console.error(`FALLÓ OBTENIENDO INFORMACION DEL POKEMON "${idPokemon}"`, error);
        return false;
        });
}

function changePage(){
    const pageNumber = Math.ceil(idPokemonGlobal / 18);
    if(pageNumber>currentPage){
        while(pageNumber>currentPage){
            currentPage++;
        }
        disableNavButton(currentPage);
        loadPage(currentPage);
    }else if(pageNumber<currentPage){
        while(pageNumber<currentPage){
            currentPage--;
        }
        disableNavButton(currentPage);
        loadPage(currentPage);
    }
}

function changeIcon(){
    const URL = `https://pokeres.bastionbot.org/images/pokemon/${idPokemonGlobal}.png`;
    const altURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemonGlobal}.png`;
    fetch(URL)
        .then(response => {
            if(response.status === 200){
                $("#icon").attr("href",URL);
            }else{
                throw false;
            }
        })
        .catch(() => {
            fetch(altURL)
                .then(() => {
                    $("#icon").attr("href",altURL);
                })
        })
}

function displayName(name){
    $("h1").html(firstCapitalLetter(name));
}

function displayImages(idPokemon){
    const elementNumber = idPokemon-18*(currentPage-1);
    const imgSrc = $(`#element-${elementNumber} img`).attr("src");
    if(imgSrc === ""){
        const firstURL = `https://pokeres.bastionbot.org/images/pokemon/${idPokemon}.png`;
        const altURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`
        fetch(firstURL)
            .then(response => {
                if(!(response.status === 200)){
                    throw false;
                }
                return response.blob()
            })
            .then(blob => {
                const img = URL.createObjectURL(blob);
                $(`#img-poke`).attr("src",img);
            })
            .catch(() => {
                fetch(altURL)
                    .then(response => response.blob())
                    .then(blob => {
                        const img = URL.createObjectURL(blob);
                        $(`#img-poke`).attr("src",img);
                    })
                    .catch((error) => console.error(`FALLO CARGAR IMAGEN POKEMON "${idPokemon}"`,error))
            })
    }else{
        $(`#img-poke`).attr("src",imgSrc);
    }
}

function displayId(idPokemon){
    $("#id-poke").html(`ID: ${idPokemon}`);
}

function displayHeight(height){
    $("#height-poke").html(`Altura: ${height/10}m`);    
}

function displayWeight(weight){
    $("#weight-poke").html(`Peso: ${weight/10}kg`);
}

function displayNumberAbilities(number){
    $("#abilities").html("Habilidades ");
    $("#abilities").append($(`<span class="badge badge-primary badge-pill">${number}</span>`))
}

function displayAbilities(abilityNameUrl,abilityInfoUrl,i){
    nameAbilityPokemon(abilityNameUrl).then(name => {
        $("#abilities-info").append($(`<li class="list-group-item" id="ability-${i}">${firstCapitalLetter(name)}:</li>`));
        displayAbilityInfo(abilityInfoUrl,i);
    });
}

function nameAbilityPokemon(URL){
    return fetch(URL)
        .then(response => response.json())
        .then(responseJSON => {
            return responseJSON.names[4].name;
        })
        .catch(error => {
            console.error("FALLÓ MOSTRAR NOMBRE HABILIDAD", error)
        });
}

function displayAbilityInfo(URL,i){
    dataAbilityPokemon(URL).then(info => {
        $(`#ability-${i}`).append($(`<p class="mb-0">${info}</p>`));
    });
}

function dataAbilityPokemon(URL){
    return fetch(URL)
        .then(response => response.json())
        .then(responseJSON => {
            return responseJSON.flavor_text_entries[23].flavor_text;
        })
        .catch(() => {
            return fetch(URL)
                .then(response => response.json())
                .then(responseJSON => {
                    return responseJSON.effect_entries[0].effect;
                })
                .catch(error => console.error("FALLÓ MOSTRAR INFO HABILIDADES", error))
            
        })
}

function disableNavButton(currentPage){
    if(currentPage === 1){
        $('#previous-page').prop('disabled', true).addClass("default");
    }else{
        $('#previous-page').prop('disabled', false).removeClass("default");
    }
    if(currentPage === 45){
        $('#next-page').prop('disabled', true).addClass("default");
    }else{
        $('#next-page').prop('disabled', false).removeClass("default");
    }
}

function disableNavPokemonButton(idPokemon){
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

function loadPage(number){
    cleanFiguresChilds();
    const pokemones = 18 * number;
    let element = 0;
    for(let i=pokemones-17; i<=pokemones; i++){
        element++;
        createFigure(element,i);
    }
}

function cleanFiguresChilds(){
    $(`.name-poke`).html("");
    $(`.img-poke`).attr("src","");
}

function createFigure(element,idPokemon){
    loadImage(element,idPokemon)
    namePokemon(idPokemon)
        .then(response => {
            $(`#element-${element} .name-poke`).html(firstCapitalLetter(response));
            $(`#element-${element}`).removeClass('d-none');

        })
        .catch(() => {
            $(`#element-${element}`).addClass('d-none');
        })
}

function loadImage(element,idPokemon){
    const firstURL = `https://pokeres.bastionbot.org/images/pokemon/${idPokemon}.png`;
    const altURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`
    fetch(firstURL)
        .then(response => {
            if(!(response.status === 200)){
                throw false;
            }
            return response.blob()
        })
        .then(blob => {
            const img = URL.createObjectURL(blob);
            $(`#element-${element} .img-poke`).attr("src",img);
            
        })
        .catch(() => {
            fetch(altURL)
                .then(response => response.blob())
                .then(blob => {
                    const img = URL.createObjectURL(blob);
                    $(`#element-${element} .img-poke`).attr("src",img);
                })
                .catch((error) => console.error(`FALLO CARGAR IMAGEN POKEMON "${idPokemon}" EN MAIN`,error))
        })
}

function namePokemon(idPokemon){
    const URL = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    return fetch(URL)
        .then(response => response.json())
        .then(responseJSON => {
            return responseJSON.name;
        })
        .catch((error) => console.error(`FALLO AL OBTENER NOMBRE DEL POKEMON "${idPokemon}"`, error))
}

function firstCapitalLetter(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}
