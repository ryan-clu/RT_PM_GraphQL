const { projects, clients } = require('../sampleData'); // original test data
const Project = require('../models/Project'); // bring in our mongoose/MongoDB Project Model
const Client = require('../models/Client'); // bring in our mongoose/MongoDB Client Model

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
        return Client.findById(parentValue.clientId);
        // return clients.find((client) => client.id === parentValue.clientId);
        // recall clientId comes from the Project model / projects sample data.
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
        return Client.find();
        // return clients;
      },
    },
    // Query for specific client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return Client.findById(args.id);
        // return clients.find((client) => client.id === args.id);
      },
    },
    // Query for all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parentValue, args) {
        return Project.find();
        // return projects;
      },
    },
    // Query for specific project
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return Project.findById(args.id);
        // return projects.find((project) => project.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
