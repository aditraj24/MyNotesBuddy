import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/api/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error("Error fetching note details", error);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Update note
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axiosInstance.put(`/api/notes/${id}`, { title, content });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    }
  };

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <input
          type="text"
          className="w-full text-3xl font-semibold border-none outline-none bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        {/* Content */}
        <textarea
          className="w-full min-h-60 resize-none border border-base-300 rounded-lg p-4 focus:outline-none focus:border-primary"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
        />

        {/* Save Button */}
        <button type="submit" className="btn btn-primary btn-sm">
          Save Note
        </button>
      </form>
      <Link
        to="/"
        className="text-sm text-primary hover:underline mt-4 inline-block"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default NoteDetailPage;
