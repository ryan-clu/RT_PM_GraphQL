const { projects, clients } = require('../sampleData'); // original test data
const Project = require('../models/Project'); // bring in our mongoose/MongoDB Project Model
const Client = require('../models/Client'); // bring in our mongoose/MongoDB Client Model

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLEnumType,
  GraphQLNonNull,
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
  }, // End of Query Fields
});

// Root Mutation Type
const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    // Add client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }, // we do not want null fields
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
        // Client.create({
        //   name: args.name,
        //   email: args.email,
        //   phone: args.phone,
        // });
      },
    },
    // Delete client
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Client.findByIdAndRemove(args.id);
        // return Client.findByIdAndDelete(args.id);
      },
    },
    // Add project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },
    // Delete project
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    // Update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }, // need to input an id to find
        name: { type: GraphQLString }, // do not need non null b/c don't necessarily need to change
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate', // can not have same name as enum previously
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(parentValue, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true } // if entry/row not there to update, will create this entry.
        );
      },
    },
  }, // End of Mutation fields
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
