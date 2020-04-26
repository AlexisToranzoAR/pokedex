export function firstCapitalLetter(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function searchBlobImgSrc(idPokemon){
    const currentPage = $('#pokemons-container').data('page-number');
    const elementNumber = idPokemon-18*(currentPage-1);
    const imgSrc = $(`#element-${elementNumber} img`).attr("src");
    return imgSrc;
}