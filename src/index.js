import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

const selectInputEl = document.querySelector( '.breed-select' );
const catItemEl = document.querySelector( '.cat-info' );

selectInputEl.addEventListener( 'input', checkInput );

let allCatsArray = {};

fetchBreeds().then( data => {
  allCatsArray = data;
  console.log( allCatsArray );
  getValuesToInput( allCatsArray );
} ).catch( err => console.log( err ) );

function getValuesToInput( array ) {
  let markup = [];
  array.map( ( element ) => {
    markup.push(`<option value=${element.id}>${element.name}</option>`)
  } );
  selectInputEl.innerHTML = markup.join( ' ' );
}

function checkInput( event ) {
  fetchCatByBreed(event.target.value)
    .then( data => {
      let dataInfo = data[0].breeds[0];
      console.log( dataInfo );
      catItemEl.innerHTML = `<img src=${data[0].url} alt=${dataInfo.name} width=500/>
      <h2>${dataInfo.name}</h2>
      <p>${dataInfo.description}</p>
      <p>
        <span>Temperament: </span>
        ${dataInfo.temperament}
      </p>`;
} ).catch( err => console.log( err ) );
}

















