const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { Course } = require("./resolvers/Course");
const { Genre } = require("./resolvers/Genre");
const { db } = require("./database");

// relationship between db, typeDefs, resolvers
// db contains objects with all the fields
// eg db.courses = [{id: 1, name: "Course 1", description: "Description 1", price: 100, discount: true, genreId: 1}]
// typeDefs contains the schema of the objects
//   including Course
// .     Course {
//          id: ID!
//          ...
//          genre: Genre
//        }
//    this describes the Course object and its fields in Query Explorer ie in Explore, we won't see genreId field but genre field
//    genre field is resolved by resolvers.Course
//  resolvers.Course contains the logic to resolve the Course object
//    including the genre field
//    Course: {
//      genre: (parent, args, context) => {
//        const db = context.db;
//        const genreId = parent.genreId;
//        return db.genres.find(item => item.id === genreId);
//      }

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation, Course, Genre },
  context: { db }
});

server.listen().then(({ url }) => console.log(`Server is running at ${url}`));
