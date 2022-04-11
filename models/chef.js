import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChefSchema = new Schema({
  name: String,
  image: String,
  description: String,
  restaurants: [Schema.Types.ObjectId],
});

export default mongoose.model("chef", ChefSchema);
