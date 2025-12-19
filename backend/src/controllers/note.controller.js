import Note from "../models/note.model.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1}) ; // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error(`Error in getAllNotes controller: ${error}`);
    res.status(500).json({ message: "Internal server error!!" });
  }
}

export async function getNoteById(req, res) {
  try {
    const requiredNote = await Note.findById(req.params.id);
    if (!requiredNote)
      return res.status(400).json({ message: "Note not found!!" });
    res.status(200).json(requiredNote);
  } catch (error) {
    console.error(`Error in getNoteById controller: ${error}`);
    res.status(500).json({ message: "Internal server error!!" });
  }
}

export async function createNewNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title: title, content: content });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(`Error in createNote controller: ${error}`);
    res.status(500).json({ message: "Internal server error!!" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found!!" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(`Error in updateNote controller: ${error}`);
    res.status(500).json({ message: "Internal server error!!" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found!!" });
    res.status(200).json({ message: "Note deleted succesfully" });
  } catch (error) {
    console.error(`Error in deleteNote controller: ${error}`);
    res.status(500).json({ message: "Internal server error!!" });
  }
}
