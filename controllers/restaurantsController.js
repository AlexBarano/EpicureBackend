import * as restaurantsHandler from "../handlers/restaurantsHandler.js";

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
    await restaurantsHandler.createRestaurant(parsedData);
    res.status(201).json({ msg: parsedData });
  } catch (error) {
    res.status(500).json({ msg: "Error creating new restaurant", error });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const idToDelete = req.params.id;
    await restaurantsHandler.deleteRestaurant(idToDelete);
    res.status(200).json({ msg: `Deleted restaurant: ${idToDelete}` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting restaurant", error });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    await restaurantsHandler.updateRestaurant(idToUpdate, req.body);
    res.status(200).json({ msg: `updated restaurant: ${idToUpdate}` });
  } catch (error) {
    res.status(500).json({ msg: "Error updating restaurant", error });
  }
};
