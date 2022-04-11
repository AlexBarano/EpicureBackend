import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: String,
  image: String,
  chef: Schema.Types.ObjectId,
  dishes: [Schema.Types.ObjectId],
});
export default mongoose.model("restaurant", RestaurantSchema);
