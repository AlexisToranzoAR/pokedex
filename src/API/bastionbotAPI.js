export function loadImgBastionAPI(idPokemon){
    const bastionURL = `https://pokeres.bastionbot.org/images/pokemon/${idPokemon}.png`;
    return fetch(bastionURL)
        .then(response => {
            if(response.status === 200){
                return response.blob()
            }else{
                throw false;
            }
        })
        .then(blob => {
            return URL.createObjectURL(blob);
        })
}