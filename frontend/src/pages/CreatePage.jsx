import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/api/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Try again later.");
      } else {
        toast.error("Failed to create note.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="text-sm text-primary hover:underline">
            ← Back
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Create Note
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Title"
              className="w-full text-xl font-medium bg-transparent border-b border-base-300 focus:border-primary focus:outline-none py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <textarea
              placeholder="Start writing your note..."
              className="w-full min-h-60 resize-none bg-transparent border border-base-300 rounded-lg p-4 focus:outline-none focus:border-primary"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link to="/" className="btn btn-ghost btn-sm">
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-sm"
            >
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
