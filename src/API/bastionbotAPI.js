export function loadImgBastionAPI(idPokemon) {
  const bastionURL = `https://pokeres.bastionbot.org/images/pokemon/${idPokemon}.png`;
  return fetch(bastionURL)
    .then((response) => {
      if (response.status === 200) {
        return response.blob();
      }
      throw new Error();
    })
    .then((blob) => URL.createObjectURL(blob));
}
