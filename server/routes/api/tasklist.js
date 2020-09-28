const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  console.log('get task...')
  const tasklist = await loadTasksCollection();
  res.send(await (await tasklist.find({}).toArray()).sort().reverse());
});

// Add Post
router.post('/', async (req, res) => {
  const tasklist = await loadTasksCollection();
  console.log(req.body)
  await tasklist.insertOne({
    task: req.body.task,
    dateCreateed: new Date()
  });
  res.status(201).send();
});


router.delete('/:id', async (req, res) => {
    const tasklist = await loadTasksCollection();
    console.log(req.params.id)
    await tasklist.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send({});
  });

async function loadTasksCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://daro:1234@fullstackdeveloper.hbl1n.mongodb.net/my_tasklist?retryWrites=true&w=majority',{useUnifiedTopology:true,useNewUrlParser:true},
    {
      useNewUrlParser: true
    }
  );

  return client.db('my_tasklist').collection('posts');
}

module.exports = router;

