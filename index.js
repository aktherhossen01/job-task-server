const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()

const port = process.env. PORT || 5000;



app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0fn0ukt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const taskCollection = client.db('task-management').collection('task')
    const registerCollection = client.db('task-management').collection('register')
    const reCollection = client.db('task-management').collection('re')

    app.post('/re',async(req,res)=>{
      const query = req.body;
      const result = await reCollection.insertOne(query)
      res.send(result)
    })
    app.get('/re',async(req,res)=>{
      const result= await reCollection.find().toArray()
      res.send(result)
    })

    app.post('/register',async(req,res)=>{
        const query = req.body;
        const result = await registerCollection.insertOne(query)
        res.send(result)
    })


    app.get('/task',async(req,res)=>{
        const result = await taskCollection.find().toArray()
        res.send(result)
    })
    // app.get('/task/:id',async(req,res)=>{
      
    //   const result = await  taskCollection.findOne().toArray()
    // })
    app.post('/task',async (req,res)=>{
        const query = req.body;
        const result = await taskCollection.insertOne(query)
        res.send(result)
    })
    app.delete('/taskData/:id',async(req,res)=>{
      const id = req.params.id;
      console.log(id);
      
      const filter = {_id: new ObjectId(id)}
      const result = await taskCollection.deleteOne(filter)
      res.send(result)
    })


    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })