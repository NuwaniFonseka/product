const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pleaese enter product name"],
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  } //allows us to have two more extra fields
  /* used to automatically manage 
  createdAt and updatedAt fields in your schema 
  
  {
  "_id": "607d2a8e8f8c5e001f647e5f",
  "name": "Sample Product",
  "quantity": 10,
  "price": 29.99,
  "image": "product-image-url",
  "createdAt": "2024-07-30T12:00:00.000Z",
  "updatedAt": "2024-07-30T12:00:00.000Z"
}
  */
);


const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;