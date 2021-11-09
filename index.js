const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

//username: zarif_db_user
//pass: EhoBfZOUzSssTE8K

const uri = "mongodb+srv://akhlukbhai:Fmq3MVKQjz4DhNxP@cluster0.shqip.mongodb.net/Tours?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('Connected To Database');
        const database = client.db("Tours");
        const toursCollection = database.collection("toursCollection");
        const ordersCollection = database.collection("orders ");
        //find single tour
        app.get('/tours/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const tour = await toursCollection.findOne(query)
            res.json(tour)
        })
        // get tours 
        app.get('/tours', async (req, res) => {
            const cursor = toursCollection.find({})
            const tours = await cursor.toArray()
            res.send(tours)
        })

        // //post api
        // app.post('/orders', async (req, res) => {
        //     const newUser = req.body
        //     const result = await ordersCollection.insertOne(newUser)
        //     console.log('got new user', req.body);
        //     console.log('added user', result);
        //     res.json(result)
        // })

        // post api 
        app.post('/orders', async (req, res) => {
            const newUser = req.body
            console.log('hitting the post', newUser);
            const result = await ordersCollection.insertOne(newUser)
            console.log(result);
            res.json(result)

        })

        // post api on tour
        app.post('/tours', async (req, res) => {
            const newUser = req.body
            console.log('hitting the post', newUser);
            const result = await toursCollection.insertOne(newUser)
            console.log(result);
            res.json(result)

        })

        //get single order
        app.get('/orders/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const tour = await ordersCollection.findOne(query)
            res.json(tour)
        })



        // DELETE API
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        })
        //get order
        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({})
            const orders = await cursor.toArray()
            res.send(orders)
        })
      


        //   const result = await toursCollection.insertOne(doc);
        //   console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('running assignment 11')
})
app.get('/test',(req,res)=>{
    res.send('testing assignment 11')
})

app.listen(port, () => {
    console.log('Running From Port', port);
})
