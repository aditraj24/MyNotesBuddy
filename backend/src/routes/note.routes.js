import { Router } from "express";
import {
  createNewNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controllers/note.controller.js";

const router = Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNewNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
