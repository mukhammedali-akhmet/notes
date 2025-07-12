import Note from "../models/Note.js"

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to get notes" })
    }
}

export const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.status(200).json(note)
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: "Failed to get note" })
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content })

        await newNote.save(
            res.status(201).send({ message: "new note created successfully" })
        )
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to create" })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
            title,
            content
        }, { new: true })
        if (!updatedNote) return res.status(404).json({ message: "note not found" })
        res.status(200).json({ message: "note updated successfully" })
    } catch (error) {
        res.status(500).send(error)
    }
}