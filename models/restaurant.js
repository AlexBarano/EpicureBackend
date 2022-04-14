import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String, required: [true, "Please provide a restaurant name"] },
  image: { type: String, default: "Some default restaurant image" },
  chef: {
    type: Schema.Types.ObjectId,
    required: [true, "Please provide the chef"],
    ref: "chef",
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  signatureDish: {
    type: Schema.Types.ObjectId,
    default: null,
  },
});

export default mongoose.model("restaurant", RestaurantSchema);
