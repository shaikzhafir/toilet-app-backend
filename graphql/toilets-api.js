const {RESTDataSource} = require('apollo-datasource-rest')


class ToiletsAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'http://localhost:4000/api/toilets'
    }

    async getToilets(){
        return this.get('/')
    }

    async getToilet(id){
        return this.get(`/${id}`)
    }

}

module.exports =  ToiletsAPI