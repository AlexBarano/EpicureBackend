import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String, required: [true, "Please provide a restaurant name"] },
  image: { type: String, default: "Some default restaurant image" },
  chef: { type: Schema.Types.ObjectId },
  dishes: { type: [Schema.Types.ObjectId] },
});
export default mongoose.model("restaurant", RestaurantSchema);
