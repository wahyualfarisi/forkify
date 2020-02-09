import { element } from './base';

export const getInput = () => element.searchInput.value;

export const clearInput = () => {
    element.searchInput.value = ''
}

export const clearResults = () => {
    element.searchResultList.innerHTML = ''
    element.searchResPages.innerHTML = ''
}

const limitRecipeTitle = (title , limit = 17) => {
    const newTitle = [];

    if(title.length > limit) {
        title.split(' ').reduce( (acc , cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur)
            }
            return acc + cur.length
        }, 0)

        //return the result
        return `${newTitle.join(' ')} ...`
    }

    return title;

}

const renderRecipes = recipes => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipes.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipes.image_url}" alt="${recipes.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipes.title)}</h4>
                    <p class="results__author">${recipes.publisher}</p>
                </div>
            </a>
        </li>
    `
    element.searchResultList.insertAdjacentHTML('beforeend', markup)
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`

const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if(page === 1 && pages > 1){
        //Only Button to go to next page
        button = createButton(page , 'next')
    }else if(page < pages){
        // both button 
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    }
    else if (page === pages && pages > 1){
        //only button to go to prev page 
        button = createButton(page, 'prev')
    }
    
    element.searchResPages.insertAdjacentHTML('afterbegin', button );
}

export const getRecipes = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end   = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipes);

    //render button
    renderButton(page , recipes.length , resPerPage)
}