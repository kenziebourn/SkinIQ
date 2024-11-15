
require('dotenv').config();

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_DB_URI;

// Set up Express app
const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 3000;

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
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// MongoDB query to check if ingredients exist
async function checkIngredientsInDb(ingredients) {
  try {
    console.log('Checking ingredients:', ingredients);
    const database = client.db('SkinIQ');  // Change to your database name
    const ingredientsCollection = database.collection('Ingredients');  // Change to your collection name
    console.log('Ingredients Collection:', ingredientsCollection);
    // Search for ingredient in db 
    const foundIngredients = [];
    const notFoundIngredients = [];
    for (let ingredient of ingredients) {
      //console.log('Checking:', ingredient);
      const result = await ingredientsCollection.findOne({ name: { $regex: new RegExp(ingredient, 'i') } });
      //console.log('Result:', result);
      if (result) {
        console.log('Found:', ingredient);
        foundIngredients.push(ingredient);

      } else {
        console.log('Not found:', ingredient);
        notFoundIngredients.push(ingredient);
      }
    }
    return { found: foundIngredients, notFound: notFoundIngredients };
  } catch (error) {
    console.error('Error querying MongoDB:', error);
    return { error: 'An error occurred while querying the database.' };
  }
}

// GET request to check if ingredients exist in the database
app.get('/check-ingredient', async (req, res) => {
  const { ingredient } = req.query;

  if (!ingredient) {
    return res.status(400).json({ error: 'Ingredient query parameter is required' });
  }

  const ingredientArray = ingredient.split(','); // Split the comma-separated list of ingredients
  const result = await checkIngredientsInDb(ingredientArray);

  if (result.error) {
    return res.status(500).json({ error: result.error });
  }

  return res.status(200).json({
    found: result.found,
    notFound: result.notFound
  });
});

// Start the server and connect to the database
async function startServer() {
  await run(); // Connect to MongoDB before starting the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer().catch((error) => console.error('Error starting the server:', error));
