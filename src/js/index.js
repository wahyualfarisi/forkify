import Search from './models/Search';
import { element, renderLoader, clearLoader } from './views/base';
import * as searchview from './views/searchView';

/**
     * Global state of the app
     * Search Object
     * Current Recipe Object
     * Shopping list object
     * Liked Recipes 
 */
const state = {};

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

        //4. Search for recipes
        await state.search.getReceipe();

        //5. render results on UI
        clearLoader()
        searchview.getRecipes(state.search.results)
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




