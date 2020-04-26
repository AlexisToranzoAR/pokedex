import{
    pageDown,
    pageUp,
    previousPokemon,
    nextPokemon,
    homePage
} from '../iu/buttons.js'
import{ clickSearch } from '../search-pokemon/search.js'

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