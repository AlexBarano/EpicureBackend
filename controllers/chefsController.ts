import { Request, Response } from "express";

import * as chefsHandler from "../handlers/chefsHandler";
import BadRequestError from "../errors/BadRequestError";

export const getChefs = async (req: Request, res: Response) => {
  try {
    const allChefs = await chefsHandler.getChefs();
    res.status(200).json({ chefs: allChefs });
  } catch (error) {
    res.status(400).json({ msg: "Error getting all the chefs", error });
  }
};

export const getChefById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError(`Please provide valid chef id`);
    }
    const chef = await chefsHandler.getChefById(id);
    res.status(200).json({ chef });
  } catch (error) {
    res.status(400).json({ msg: "Error getting chef by its id", error });
  }
};

export const createChef = async (req: Request, res: Response) => {
  try {
    const chefData = req.body;
    if (!chefData) {
      throw new BadRequestError(`Please provide valid chef values`);
    }
    await chefsHandler.createChef(chefData);
    res.status(201).json({ msg: "Created new chef" });
  } catch (error) {
    res.status(400).json({ msg: "Error creating new chef", error });
  }
};

export const deleteChef = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError(`Please provide valid chef id`);
    }
    await chefsHandler.deleteChef(id);
    res.status(200).json({ msg: `Deleted chef: ${id}` });
  } catch (error) {
    res.status(400).json({ msg: "Error deleting chef", error });
  }
};

export const updateChef = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chefData = req.body;
    if (!chefData || !id) {
      throw new BadRequestError(`Please provide valid chef values`);
    }
    await chefsHandler.updateChef(id, chefData);
    res.status(200).json({ msg: `updated chef: ${id}` });
  } catch (error) {
    res.status(400).json({ msg: "Error updating chef", error });
  }
};

export const getChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    const chef = await chefsHandler.getChefOfTheWeek();
    res.status(200).json({ chef });
  } catch (error) {
    res.status(400).json({ msg: "Error getting chef of the week", error });
  }
};
export const getChefsRestaurants = async (req: Request, res: Response) => {
  try {
    const { chefId } = req.params;
    if (!chefId) {
      throw new BadRequestError(`Please provide valid chef id`);
    }
    const restaurants = await chefsHandler.getChefsRestaurants(chefId);
    res.status(200).json({ restaurants });
  } catch (error) {
    res.status(400).json({ msg: "Error getting chef of the week", error });
  }
};
