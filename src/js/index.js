import Search from './models/Search';
import Recipe from './models/Recipe';
import { element, renderLoader, clearLoader } from './views/base';
import * as searchview from './views/searchView';
import * as recipeView from './views/recipeView';

/**
     * Global state of the app
     * Search Object
     * Current Recipe Object
     * Shopping list object
     * Liked Recipes 
 */
const state = {};

//SEARCH CONTROLLER
const controlSearch = async () => {
    //1 . get query from the view
    const query = searchview.getInput();

    if(query){
        //2. new search object and add to state
        state.search = new Search(query);

        //3. prepare UI results
        searchview.clearInput();
        searchview.clearResults();
        renderLoader(element.searchRes)

        try {
             //4. Search for recipes
            await state.search.getReceipe();

            //5. render results on UI
            clearLoader()
            searchview.getRecipes(state.search.results)
        } catch (error) {
            alert('something error with search')
        }
       
    }
}

element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
})

element.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10) ;
        searchview.clearResults();
        searchview.getRecipes(state.search.results, goToPage)
        
    }
})

//RECIPE CONTROLLER
const controlRecipe = async () => {
    //GET id from url
    const id = window.location.hash.replace('#', ' ');

    if(id){
        recipeView.clearRecipe()    
        //Prepare UI for changes
        // renderLoader(element.recipe)
        //Create new Recipe Object
        state.recipe = new Recipe(id)

        try {
            //Get Recipe data and parse ingredients
            await state.recipe.getRecipe()
            state.recipe.parseIngredients();

            //Calculate Servings and time 
            state.recipe.calcServings();
            state.recipe.calcTime();
            

            //Render Recipe 
            recipeView.renderRecipe(state.recipe)

        } catch (error) {
            alert('error processing recipe')
        }
        

    }
    
}

['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe) );