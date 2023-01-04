const { projects, clients } = require('../sampleData');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = require('graphql');

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Root Query Type
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Query for all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parentValue, args) {
        return clients;
      },
    },
    // Query for specific client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
