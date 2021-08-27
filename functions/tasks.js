require('dotenv').config();
const mongoose = require('mongoose');
let connection = null;
const connectDB = () => {
  if (connection === null)
    connection = mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
};

// Error fixed: "Cannot overwrite `Task` model once compiled."
const defineTaskModel = () => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const taskSchema = Schema({
    id: ObjectId,
    task: String,
    day: String,
    reminder: Boolean,
  });

  return mongoose.model('Task', taskSchema);
};
const Task = mongoose.models.Task || defineTaskModel();

const mapData = ({ _id, task, day, reminder }) => ({ id: _id, text: task, day, reminder });

const getPathParam = (path) => {
  const [, id] = path.replace(new RegExp('/api/tasks'), '').split('/');
  return id;
};

exports.handler = async (event, context, callback) => {
  const notSupportedMethod = {
    statusCode: 405,
    body: 'ERROR-405: Method Not Allowed.',
  };

  // GET            => get array of tasks
  // GET/:id        => get single task
  // POST           => add new task
  // PUT/:id        => update document with id
  // Delete/:id     => remove document with  id

  if (event.httpMethod === 'GET') {
    return await handleGetRequest(event, context, callback);
  } else if (event.httpMethod === 'POST') {
    return await handlePostRequest(event, context, callback);
  } else if (event.httpMethod === 'PUT') {
    return await handlePutRequest(event, context, callback);
  } else if (event.httpMethod === 'DELETE') {
    return await handleDeleteRequest(event, context, callback);
  } else {
    return notSupportedMethod;
  }
};

// GET            => get array of tasks
// GET?id=...     => get single task
async function handleGetRequest(event, context, callback) {
  try {
    const id = getPathParam(event.path);
    connectDB();
    let data;
    if (id) {
      const doc = await Task.findById(id);
      data = mapData(doc);
    } else {
      const taskList = await Task.find({});
      data = taskList.map(mapData);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'ERROR-500: Server Error.',
    };
  }

  //Just in case I forgot to return something somewhere, I send back server error
  return {
    statusCode: 500,
    body: 'ERROR-500: Server Error.',
  };
}

// POST           => add new task
async function handlePostRequest(event, context, callback) {
  try {
    connectDB();

    const { text: task, day, reminder } = JSON.parse(event.body);
    // const data = `Add new document: task: "${task}", day: "${day}", reminder: "${reminder}"`;

    const doc = await Task.create({ task, day, reminder });
    data = mapData(doc);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'ERROR-500: Server Error.',
    };
  }

  //Just in case I forgot to return something somewhere, I send back server error
  return {
    statusCode: 500,
    body: 'ERROR-500: Server Error.',
  };
}

// PUT?id=...     => update document with id
async function handlePutRequest(event, context, callback) {
  try {
    connectDB();
    const id = getPathParam(event.path);
    const { text: task, day, reminder } = JSON.parse(event.body);
    const doc = await Task.findOne({ _id: id });
    const updateObject = {};
    if (typeof task !== 'undefined') updateObject['task'] = task;
    if (typeof day !== 'undefined') updateObject['day'] = day;
    if (typeof reminder !== 'undefined') updateObject['reminder'] = reminder;

    await doc.updateOne(updateObject);

    const newDoc = await Task.findOne({ _id: id });
    data = mapData(newDoc);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'ERROR-500: Server Error.',
    };
  }

  //Just in case I forgot to return something somewhere, I send back server error
  return {
    statusCode: 500,
    body: 'ERROR-500: Server Error.',
  };
}

// Delete?id=...  => remove document with  id
async function handleDeleteRequest(event, context, callback) {
  try {
    connectDB();
    const id = getPathParam(event.path);
    const doc = await Task.deleteOne({ _id: id });
    const data = mapData(doc);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'ERROR-500: Server Error.',
    };
  }

  //Just in case I forgot to return something somewhere, I send back server error
  return {
    statusCode: 500,
    body: 'ERROR-500: Server Error.',
  };
}
