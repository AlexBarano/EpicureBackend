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
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError(`Please provide valid restaurant id`);
    }
    await restaurantsHandler.deleteRestaurant(id);
    res.status(200).json({ msg: `Deleted restaurant: ${id}` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting restaurant", error });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError(`Please provide valid restaurant id`);
    }
    await restaurantsHandler.updateRestaurant(id, req.body);
    res.status(200).json({ msg: `updated restaurant: ${id}` });
  } catch (error) {
    res.status(500).json({ msg: "Error updating restaurant", error });
  }
};

export const updatePopularRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError(`Please provide valid restaurant id`);
    }
    await restaurantsHandler.updatePopularRestaurant(id);
    res.status(200).json({ msg: `updated popular restaurant` });
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
