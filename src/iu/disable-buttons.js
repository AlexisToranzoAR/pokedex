export function disableNavButton(currentPage){
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

export function disableNavPokemonButton(idPokemon){
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