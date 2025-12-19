import { Link } from "react-router";
import { FileText, Pencil, Trash2 } from "lucide-react";

const NoteCard = ({ note, onDelete }) => {
  return (
    <div className="relative">
      {/* Edit & Delete buttons */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        
        {/* Edit */}
        <Link
          to={`/note/${note._id}`}
          onClick={(e) => e.stopPropagation()}
          className="btn btn-xs btn-ghost text-info hover:bg-info/10"
        >
          <Pencil size={14} />
        </Link>

        {/* Delete */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note._id);
          }}
          className="btn btn-xs btn-ghost text-error hover:bg-error/10"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Card */}
      <Link to={`/note/${note._id}`}>
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="card-body gap-3">
            
            {/* Title */}
            <h2 className="card-title flex items-center gap-2 text-primary">
              <FileText size={18} />
              {note.title}
            </h2>

            {/* Content */}
            <p className="text-sm text-base-content/70 line-clamp-3">
              {note.content}
            </p>

            {/* Footer */}
            <div className="card-actions justify-end">
              <span className="text-xs text-primary font-medium">
                View Note →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
