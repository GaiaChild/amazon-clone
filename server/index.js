const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose')

const stripe = require('stripe')(process.env.STRIPE_KEY)

require('dotenv').config()

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true}));
app.use(express.json());

const uri = process.env.ATLAS_URI;

let productsRouter = null;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
    productsRouter = require('./routes/product')
    app.use('/products', productsRouter)
}) 

// API Routes
app.get('/', (req,res) => res.status(200).send('Hello World'))

app.post('/payments/create', async (req, res) => {
    const total =  req.query.total;

    console.log(`Payment received for the amount $ ${total/100}`)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr"
    });

    res.status(201).send({clientSecret: paymentIntent.client_secret})
})

// Listen Command
const port = process.env.PORT || 5000
app.listen(port, () => console.log("Server is running"))