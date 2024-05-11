const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, 
       GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

var mockContactData = [
    {
      "_id": "650c5812c06bc031e32200a1",
      "firstName": "Bill",
      "lastName": "Gates",
      "email": "billgates@test.com",
      "favoriteColor": "Green",
      "birthday": "12/12/20"
    },
    {
      "_id": "6338cf4fc51624e0408341bc",
      "birthdate": "1/1/1970",
      "email": "bob@example.com",
      "favourite_color": "blue",
      "firstname": "Bob",
      "lastname": "Barker"
    },
    {
      "_id": "650c5812c06bc031e32200a2",
      "firstName": "Sarah",
      "lastName": "Birch",
      "email": "test@gmail.com",
      "favoriteColor": "Yellow",
      "birthday": "12/12/20"
    },
    {
      "_id": "650c5812c06bc031e32200a3",
      "firstName": "Larry",
      "lastName": "Ellison",
      "email": "larryellison@test.com",
      "favoriteColor": "Yellow",
      "birthday": "02/22/95"
    },
    {
      "_id": "6338d07ec51624e0408341bd",
      "birthdate": "1/1/1970",
      "email": "adam@example.com",
      "favourite_color": "blue",
      "firstname": "Adam",
      "lastname": "Sandler"
    }
  ]

const ContactType = new GraphQLObjectType({
    name: 'Contact',
    fields: () => ({
        id: { type: GraphQLID  },
        firstname: { type: GraphQLString }, 
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        favoriteColor: { type: GraphQLString },
        birthday: { type: GraphQLString }
    })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book 
//or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        contact: {
            type: ContactType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return mockContactData.find((item) => { return item.id == args.id});
            }
        }
    }
});
 
//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery
});