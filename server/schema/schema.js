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

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: { 
      type: ClientType,
      resolve(parentValue, args) {
        return clients.find((client) => client.id === parentValue.clientId);
      }, 
    },
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
    // Query for all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parentValue, args) {
        return projects;
      },
    },
    // Query for specific project
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
