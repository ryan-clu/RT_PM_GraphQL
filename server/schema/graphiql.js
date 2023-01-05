/* GraphiQL Queries & Mutations

query {
  client (id:"1") {
    id,
    name,
    email,
    phone,
  }
}

query {
  clients {
    id,
    name,
		email,
    phone,
  }
}

query {
  projects {
    id,
    name,
    description,
    status
  }
}

query {
  project (id:"1") {
    id,
    name,
    description,
    status,
    client {
      id,
      name,
    },
  }
}

mutation {
  addClient(name: "Mr.Test", email:"test@test.com", phone:"111-111-2222"){
    id,
    name,
    email,
    phone,
  }
}

mutation {
  deleteClient(id: "63b7071d4b6fde42406be47d") {
    name,
    email,
    phone,
  }
}

mutation {
  addProject(name: "Test Project", description: "Test", status: new, clientId: "63b703ce16093d9b3b17291c") {
    id,
    name,
    description,
    status,
    client{
      id,
      name,
    }
  }
}

mutation {
  deleteProject(id: "63b70c771fdf61e0ec5e080b") {
    id,
    name,
    description,
    status,
    client {
      name
    }
  }
}

mutation {
  updateProject(id: "63b7152cc0d4b8eec3c38e44", name: "Test Project - Modified", status: progress, description: "Test - updated."){
    name,
    description,
    status,
    client{
      id,
      name,
    }
  }
}

*/