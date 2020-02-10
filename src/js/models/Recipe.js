import axios from 'axios';



export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try{
            const res        = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            this.title       = res.data.recipe.title;            
            this.author      = res.data.recipe.publisher;
            this.img         = res.data.recipe.image_url;
            this.url         = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;


            
        }catch(error) {
            console.log(error)
        }
    }

    calcTime() {
        const numIn = this.ingredients.length;
        const periods = Math.ceil(numIn / 3) 
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon','cups', 'pounds'];
        const unitShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units = [...unitShort, 'kg', 'g']


        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();

            unitsLong.forEach((current , index) => {
               ingredient = ingredient.replace(current, unitShort[index] )
            })

            // 2. Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ")

            // 3. Parse ingredients into count , unit and ingredients
            const arrIng = ingredient.split(' ')
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2) );

            let objIng;
            if(unitIndex > -1) {
                //there is a unit
                //ex: 4 1/2 cups, arrCount is [4, 1/2];
                //ex: 4 cups , arrCount  is [4]
                const arrCount = arrIng.slice(0 , unitIndex);

                let count;
                if(arrCount.length === 0){
                    count = eval(arrIng[0].replace('-','+'))
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex  + 1).join('+')
                }

            }else if(parseInt(arrIng[0], 10)){
                //there is no unit , but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }
            else if(unitIndex === -1){
                //there is no unit and not a number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;

        })
        this.ingredients = newIngredients;
    }


}