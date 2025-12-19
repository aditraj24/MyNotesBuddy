import mongoose from "mongoose";

// 1- create a schema
// 2- create a model based on that schema

// schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// make a model based on above schema

const Note = mongoose.model("Note",noteSchema);

export default Note;