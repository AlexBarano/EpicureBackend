import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DishSchema = new Schema({
  name: String,
  price: Number,
  ingredients: [String],
  tags: [String],
  Restaurant: Schema.Types.ObjectId,
});

export default mongoose.model("dish", DishSchema);
