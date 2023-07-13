import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

new SlimSelect({
  select: '#slim-select'
})

const selectInputEl = document.querySelector( '.breed-select' );
const catItemEl = document.querySelector( '.cat-info' );
const loaderEl = document.querySelector( '.loader' );
const errorEl = document.querySelector( '.error' );

selectInputEl.addEventListener( 'input', checkInput );

let allCatsArray = {};

fetchBreeds().then( data => {
  allCatsArray = data;
  getValuesToInput( allCatsArray );
  loaderEl.classList.add( 'hidden' );
} ).catch( err => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!') );

function getValuesToInput( array ) {
  let markup = [];
  array.map( ( element ) => {
    markup.push(`<option value=${element.id}>${element.name}</option>`)
  } );
  selectInputEl.innerHTML = markup.join( ' ' );
}

function checkInput( event ) {
  loaderEl.classList.remove( 'hidden' );
  fetchCatByBreed(event.target.value)
    .then( data => {
      let dataInfo = data[0].breeds[0];
      catItemEl.innerHTML = `<img class="cat-img" src=${data[0].url} alt=${dataInfo.name} width=500/>
      <div class="info-wrapper">
        <h2>${dataInfo.name}</h2>
        <p>${dataInfo.description}</p>
          <p>
            <span>Temperament:</span>
            ${dataInfo.temperament}
          </p>
        </div>`;      
      loaderEl.classList.add( 'hidden' );
} ).catch( err => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!') );
}

















