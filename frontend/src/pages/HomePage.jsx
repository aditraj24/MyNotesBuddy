import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimitUI from "../components/RateLimitUI";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
const homePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this note?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axiosInstance.get("/api/notes");
        setNotes(response.data);
        setIsRateLimit(false);
      } catch (error) {
        console.error("Error fetchin notes!");
        console.error(error.response);
        if (error.response?.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error("Failed to load notes!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      {isRateLimit && <RateLimitUI />}

      <div>
        {loading && <div>Loading notes...</div>}
        {notes.length > 0 && !isRateLimit && (
          <div className="grid gird-cols-1 md: grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default homePage;
