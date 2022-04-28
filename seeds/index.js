const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const price = Math.floor(Math.random() * 20) + 10;
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "6237dd627fab907fc308a5f4",
      location: `${cities[random1000].city}, 
      ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dydzf1y9j/image/upload/v1649185553/YelpCamp/mt_tremblant_y4y4w0.jpg",
          filename: "YelpCamp/b7j8vcabgrtwvzc3qc8p",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      description:
        "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rem atque tenetur a blanditiis voluptas fugit harum cupiditate distinctio commodi, voluptatum, unde ab sint magnam quia iure illum suscipit saepe!",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
