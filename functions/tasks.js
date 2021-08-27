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

const mapData = ({ _id, task, day, reminder }) => ({ id: _id, text: task, day, reminder });

const Task = mongoose.models.Task || defineTaskModel();

exports.handler = async (event, context, callback) => {
  const notSupportedMethod = {
    statusCode: 405,
    body: 'ERROR-405: Method Not Allowed.',
  };

  // GET            => get array of tasks
  // POST           => add new task

  if (event.httpMethod === 'GET') {
    return await handleGetRequest(event, context, callback);
  } else if (event.httpMethod === 'POST') {
    return await handlePostRequest(event, context, callback);
  } else if (event.httpMethod === 'PUT') {
    return notSupportedMethod;
  } else if (event.httpMethod === 'DELETE') {
    return notSupportedMethod;
  } else {
    return notSupportedMethod;
  }
};

// GET            => get array of tasks
async function handleGetRequest(event, context, callback) {
  try {
    connectDB();
    let data;
    const taskList = await Task.find({});
    data = taskList.map(mapData);
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
