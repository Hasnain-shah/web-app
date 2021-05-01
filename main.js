const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '166a37c7';
const APP_KEY = '8a55d26b0d8a9d185dd03231f6ec71fe'


searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});
async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);   
}
function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(results =>{
    generatedHTML +=
    `
  <div class="item">
    <img src="${results.recipe.image}" alt="">
    <div class="flex-container">
     <h1 class="tittle">${results.recipe.label}</h1>
     <a class="view-button" href="${results.recipe.url}"target= "_blank">View Recipe</a>
    </div>
    <p class="item-data">Calories:${results.recipe.calories.toFixed(2)}</p>
    <p class="item-data">ingredients:${results.recipe.ingredientLines}</p>
  </div>
   `
})
searchResultDiv.innerHTML = generatedHTML
}