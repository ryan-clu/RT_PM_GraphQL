const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
});

module.exports = mongoose.model('Project', ProjectSchema);

/* 
Create Mongoose schema for Project Model in our MongoDB

MongoDB terminology:
- Collection = Table
- Record = Row/Entry

- Whenever a new record (row/entry) is created in a collection (table), an id for that record is 
automatically generated and assigned behind the scenes. It's an underscore id. 
Under the hood that underscore id that is created is a mongoose ObjectId.
- clientId of ProjectSchema has type mongoose.Schema.Types,ObjectId because we want it to reference the
collection id of the client who this project is assigned to.

- clientId we want to relate it to another collection/table - here projects being realted to clients 
and thus we make a reference(ref) to the name of the associated mongoose model. 
*/