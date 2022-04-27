import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChefSchema = new Schema({
  name: { type: String, required: [true, "Please provide a chef name"] },
  image: { type: String, default: "Some default chef image" },
  description: { type: String },
  isChefOfTheWeek: { type: Boolean, default: false },
});

export default mongoose.model("chef", ChefSchema);
