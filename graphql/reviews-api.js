const {RESTDataSource} = require('apollo-datasource-rest')


class ReviewsAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'http://localhost:4000/api/reviews'
    }

    async getReviews(){
        return this.get('/')
    }

    async getReview(id){
        return this.get(`/${id}`)
    }

}

module.exports =  ReviewsAPI