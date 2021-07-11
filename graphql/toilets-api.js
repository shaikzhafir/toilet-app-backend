const {RESTDataSource} = require('apollo-datasource-rest')


class ToiletsAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'localhost:4000/api/toilets'
    }

    async getToilets(id){
        return this.get('/')
    }

    async getToilet(id){
        return this.get(`/${id}`)
    }

}