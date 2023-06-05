import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.style.display = 'none';
error.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
  })
  .catch(error => {
    console.log(error);
    loader.style.display = 'none';
    error.style.display = 'block';
  });

breedSelect.addEventListener('change', () => {
    catInfo.style.display = "none";
  loader.style.display = 'block';

  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      renderCatInfo(cat);
      loader.style.display = 'none';
      catInfo.style.display = 'block';
    })
    .catch(error => {
      console.log(error);
      loader.style.display = 'none';
      error.style.display = 'block';
    });
});

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = '';
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function renderCatInfo(cat) {
  catInfo.innerHTML = `
    <div class="renderCatInfo">
      <div>  
        <img src="${cat.image}" alt="${cat.name}"  height='500'>
      </div>
      <div> 
        <h2>${cat.name}</h2>
        <p>${cat.description}</p>
        <p><b>Temperament: </b>${cat.temperament}</p>
      </div>
    </div>
  `;
}
