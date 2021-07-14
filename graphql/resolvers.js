//import Toilet from '../models/toilets'


module.exports =  {
  Query: {
   
    toilets : async (_, __, { dataSources }) => {
      return dataSources.toiletsAPI.getToilets();
    },
    reviews : async (_, __, { dataSources }) => {
      return dataSources.reviewsAPI.getReviews();
    }
  },
  // Mutation: {
  //   addToilet(parent, args, context, info) {
  //     const { location, lat, lng, hasBidet, name, rating } = args;
  //     const toiletObj = new Toilet({
  //       location,
  //       lat,
  //       lng,
  //       hasBidet,
  //       name,
  //       rating,
  //     })

  //     return toiletObj.save()
  //       .then(result => {
  //           return {...result._doc}
  //       })
  //       .catch(err => {
  //           console.error(err);
  //       })
  //   },
  // },
};
