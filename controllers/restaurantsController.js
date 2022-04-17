import * as restaurantsHandler from "../handlers/restaurantsHandler.js";
import BadRequestError from "../errors/BadRequestError.js";

/*
  ==== fix in these functions: ====
  check if params exists
  ****search before uploading
  ****try catch with schema operations
  ****status codes with good and bad operations 
  ****add handlers here
*/

export const getRestaurants = async (req, res) => {
  try {
    const allRestaurants = await restaurantsHandler.getRestaurants();
    res.status(200).json({ restaurants: allRestaurants });
  } catch (error) {
    res.status(500).json({ msg: "Error getting all the restaurants", error });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const parsedData = req.body;
    if (!parsedData) {
      throw new BadRequestError("Please provide valid restaurant data");
    }
    await restaurantsHandler.createRestaurant(parsedData);
    res.status(201).json({ msg: parsedData });
  } catch (error) {
    res.status(500).json({ msg: "Error creating new restaurant", error });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      throw new BadRequestError(`Please provide valid restaurant id`);
    }
    await restaurantsHandler.deleteRestaurant(restaurantId);
    res.status(200).json({ msg: `Deleted restaurant: ${restaurantId}` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting restaurant", error });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { restaurantData } = req.body;
    if (!restaurantId) {
      throw new BadRequestError(`Please provide valid restaurant id`);
    }
    await restaurantsHandler.updateRestaurant(restaurantId, restaurantData);
    res.status(200).json({ msg: `updated restaurant: ${restaurantId}` });
  } catch (error) {
    res.status(500).json({ msg: "Error updating restaurant", error });
  }
};

export const updatePopularRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      throw new BadRequestError(`Please provide valid restaurant id`);
    }
    await restaurantsHandler.updatePopularRestaurant(restaurantId);
    res
      .status(200)
      .json({ msg: `updated popular restaurant: ${restaurantId}` });
  } catch (error) {
    res.status(500).json({ msg: "Error updating popular restaurant", error });
  }
};

export const getPopularRestaurants = async (req, res) => {
  try {
    const popularRestaurants = await restaurantsHandler.getPopularRestaurants();
    res.status(200).json({ popularRestaurants });
  } catch (error) {
    res.status(500).json({ msg: "Error getting popular restaurant", error });
  }
};

export const getSignatureDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    if (!dishId) {
      throw new BadRequestError(`Please provide valid dish id`);
    }
    const signatureDish = await restaurantsHandler.getSignatureDish(dishId);
    res.status(200).json({ signatureDish });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error getting signature dish of restaurant", error });
  }
};

export const getSignatureDishes = async (req, res) => {
  try {
    const signatureDishes = await restaurantsHandler.getAllSignatureDishes();
    res.status(200).json({ signatureDishes });
  } catch (error) {
    res.status(500).json({ msg: "Error getting signature dishes", error });
  }
};

export const getRestaurantsOfChefId = async (req, res) => {
  try {
    const { chefIf } = req.params;
    if (!chefIf) {
      throw new BadRequestError(`Please provide valid chef id`);
    }
    const restaurants = await restaurantsHandler.getRestaurantsOfChefId(chefIf);
    res.status(200).json({ restaurants });
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error getting restaurants of chef: ${chefIf}`, error });
  }
};
