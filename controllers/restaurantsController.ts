import { Request, Response } from "express";

import * as restaurantsHandler from "../handlers/restaurantsHandler";
import BadRequestError from "../errors/BadRequestError";

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const allRestaurants = await restaurantsHandler.getRestaurants();
    res.status(200).json({ restaurants: allRestaurants });
  } catch (error) {
    res.status(400).json({ msg: "Error getting all the restaurants", error });
  }
};
export const getPopularRestaurants = async (req: Request, res: Response) => {
  try {
    const popularRestaurants = await restaurantsHandler.getPopularRestaurants();
    res.status(200).json({ popularRestaurants: popularRestaurants });
  } catch (error) {
    res.status(400).json({ msg: "Error getting popular restaurants", error });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      throw new BadRequestError(`Please provide valid restaurant id`);
    }
    const restaurant = await restaurantsHandler.getRestaurantById(restaurantId);
    res.status(200).json({ restaurant });
  } catch (error) {
    res.status(400).json({ msg: `Error getting restaurant`, error });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const parsedData = req.body;
    if (!parsedData) {
      throw new BadRequestError("Please provide valid restaurant data");
    }
    await restaurantsHandler.createRestaurant(parsedData);
    res.status(201).json({ msg: parsedData });
  } catch (error) {
    res.status(400).json({ msg: "Error creating new restaurant", error });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      throw new BadRequestError(`Please provide valid restaurant id`);
    }
    await restaurantsHandler.deleteRestaurant(restaurantId);
    res.status(200).json({ msg: `Deleted restaurant: ${restaurantId}` });
  } catch (error) {
    res.status(400).json({ msg: "Error deleting restaurant", error });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const restaurantData = req.body;
    if (!restaurantId) {
      throw new BadRequestError(`Please provide valid restaurant id`);
    }
    await restaurantsHandler.updateRestaurant(restaurantId, restaurantData);
    res.status(200).json({ msg: `updated restaurant: ${restaurantId}` });
  } catch (error) {
    res.status(400).json({ msg: "Error updating restaurant", error });
  }
};
