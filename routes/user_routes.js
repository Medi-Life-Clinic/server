import express from "express";
import { User } from "../db/db";

const router = express.Router();

// Get all users
router.get('/', async (request, response) => {
    try {
        const users = await User.find();
        response.send(users);
        } catch (error) {
            response.status(500).send
            ({ error: "Error fetching users" });
            }});


export default router;