# Pokedex

_Una pokedex basada en utlizar PokeAPI para la recoleccion de datos y ser mostrados al usuario en una interfaz agradable._

## Comenzando 🚀
_Se puede ver el funcionamiento de la pagina desde el siguiente link:_
[GitHub Pages](https://AlexisToranzoAR.github.io/pokedex/)

### Pre-requisitos 📋
_El unico prerequisito es tener instalado npm._
_Opcionalmente http-server para ejecutar las pruebas con cypress._

### Instalación 🔧

_Es necesario tener instalado NodeJS para utlizar npm, se lo puede instalar en el siguiente link:_
[NodeJS](https://nodejs.org/es/)

_Luego en la carpeta del proyecto ejecutar el siguiente comando para instalar los paquetes necesarios:_
```
npm install
```

## Ejecutando las pruebas ⚙️

_Para ejecutar las pruebas inicie http-server con el siguiente comando:_
```
http-server -c -1
```

_Luego para una prueba visual ejecute:_
```
npm run cypress-dev
```

_Para una prueba rapida en la consola ejecutar:_
```
npm run cypress-run
```

### Analisis de las pruebas end-to-end 🔩

_Estas pruebas analisan el correcto funcionamiento de toda la pagina, desde que cargue los datos correctos de los pokemones, el funcionamiento de cada boton y el perfecto funcionamiento de la herramienta de busqueda._

## Construido con 🛠️

* [PokeAPI](https://pokeapi.co/) - API utilizada
* [Npm](http://npmjs.com/) - Manejador de dependencias
* [Cypress](https://www.cypress.io/) - Pruebas automatizadas

## Licencia 📄

Este proyecto está bajo la Licencia GNU General Public License v3.0 - mira el archivo [LICENSE.md](LICENSE.md) para detalles.
