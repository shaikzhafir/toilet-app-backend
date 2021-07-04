import Toilet from '../models/toilets'


const resolvers = {
  Mutation: {
    addToilet(parent, args, context, info) {
      const { location, lat, lng, hasBidet, name, rating } = args;
      const toiletObj = new Toilet({
        location,
        lat,
        lng,
        hasBidet,
        name,
        rating,
      })

      return toiletObj.save()
        .then(result => {
            return {...result._doc}
        })
        .catch(err => {
            console.error(err);
        })
    },
  },
};
