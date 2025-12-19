import { AlertTriangle, Clock } from "lucide-react";

const RateLimitUI = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center gap-4">
          {/* Icon */}
          <div className="flex justify-center text-warning">
            <AlertTriangle size={40} />
          </div>

          {/* Title */}
          <h2 className="card-title justify-center text-lg font-bold">
            Too Many Requests
          </h2>

          {/* Message */}
          <p className="text-sm text-base-content/70">
            You’ve made too many requests in a short period of time.
          </p>

          <p className="flex items-center justify-center gap-2 text-sm">
            <Clock size={16} />
            Please wait a few seconds and try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitUI;
