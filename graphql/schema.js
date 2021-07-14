const { gql } = require("apollo-server");
const typeDefs = gql`
  type Toilet {
    name: String
    location: String
    lat: Float
    lng: Float
    rating: Int
    hasBidet: Boolean
    image_url: String
    numRating: Float
  }

  type Review {
    id: String
    reviewText: String
    toiletID: String
    date: String
    rating: Float
    replies: [Reply]
  }

  type Reply {
    id: String
    replyText: String
    date: String
  }

  type Query {
    
    toilets: [Toilet]!
    reviews: [Review]!
  }
`;

module.exports = typeDefs;
