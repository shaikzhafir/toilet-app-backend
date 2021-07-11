require('dotenv').config() 
const express = require('express')
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server')
const toiletsSchema = require('./models/toilets')
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors')
//const app = express()
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

async function startApolloServer() {
    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`
    type Book {
        title: String
        author: String
      }

      type Query {
        books: [Book]
      }

    `;
  
    // Provide resolver functions for your schema fields
    const resolvers = {
      Query: {
        books: () => books,
      },
    };
  
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
  
    const app = express();
    app.use(cors())

//allows express to parse json files 
app.use(express.json())


mongoose.connect(process.env.ATLAS_DATABASE_URL, {useNewUrlParser : true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.on('open',() => console.log('connected to db'))

//handles routes to /toilets
const toiletsRoute = require('./routes/toilets')
app.use('/api/toilets',toiletsRoute)

// handle routes to /reviews
const reviewsRoute = require('./routes/reviews')
app.use('/api/reviews', reviewsRoute)

// handle routes to /reply
const repliesRoute = require('./routes/replies')
app.use('/api/replies', repliesRoute)

    
    
    server.applyMiddleware({ app });
  
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
  }


//app.listen(process.env.PORT || 4000, () => console.log('lala'))

startApolloServer();