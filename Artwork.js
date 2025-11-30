const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
  title: String,
  artist: String,
  category: String,
  added: Number,
  price: String,
  image: String
});

module.exports = mongoose.model("Artwork", ArtworkSchema);
