import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="navbar bg-base-100 shadow-md px-4 md:px-8">
      
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          My Notes Buddy
        </Link>
      </div>

      {/* Right: Action */}
      <div className="flex-none">
        <Link
          to="/create"
          className="btn btn-primary gap-2"
        >
          <PlusIcon size={18} />
          <span className="hidden sm:inline">Create Note</span>
        </Link>
      </div>

    </header>
  );
};

export default Navbar;
