import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DishSchema = new Schema({
  image: { type: String, default: "Some dish picture" },
  name: { type: String, required: [true, "Please provide a dish name"] },
  price: { type: Number, min: 0, default: 0 },
  ingredients: { type: [String] },
  tags: { type: [String] },
  restaurant: {
    type: Schema.Types.ObjectId,
    required: [true, "Please provide the restaturant id"],
    ref: "restaurant",
  },
});

export default mongoose.model("dish", DishSchema);
