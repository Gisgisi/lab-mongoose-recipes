const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'

const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

let newRecipes =
{
  title: "Hamburger",
  level: "Amateur Chef",
  ingridients: ["ham", "buns", "salad", "pickles", "tomato"],
  cuisine: "American",
  dishType: "main_course",
  image: "https://bit.ly/3NrcDSh",
  duration: 40,
  creator: 'Shirin',
}

//Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const numOne = Recipe.create(newRecipes);
    return numOne;
    // Run your code here, after you have insured that the connection was made
  })
  .then((result) => {
    console.log(result.title)
    Recipe.insertMany(data);
  })
  .then(() => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    Recipe.findOneAndUpdate(filter, update, { new: true });
    console.log("success!");
  })
  .then(() => {
    Recipe.findByIdAndDelete("6635af13d45b0e5a208941136");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()