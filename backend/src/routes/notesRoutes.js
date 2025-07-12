import express from "express"
import { createNote, getAllNotes, getNote, updateNote } from "../controllers/notesController.js"

const router = express.Router()

router.get("/", getAllNotes)
router.get("/:id", getNote)
router.post("/", createNote)
router.put("/:id", updateNote)

export default router
