import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getReceipe() {
        try{
            const results = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.results =  results.data.recipes
        }catch(error) {
            console.log(error)
        }
    }

}