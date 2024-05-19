const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: `Tortilla de patatas`,
      level: `Easy Peasy`,
      ingredients: [`potatoes`, `eggs`, `onion`, `olive oil`],
      cuisine: `Spanish`,
      dishType: `main_course`,
      image: `https://images.media-allrecipes.com/images/75131.jpg`,
      duration: 30,
      creator: `Chef Pepe`,
    })
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((res) => {
    res.forEach((data) => console.log(data.title))
    return Recipe.findOneAndUpdate(
      { title: `Rigatoni alla Genovese` },
      { duration: 100 }
    )
  })
  .then(() => Recipe.deleteOne({ titel: `Carrot Cake` }))
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .finally(() => {
    mongoose.disconnect()
  })