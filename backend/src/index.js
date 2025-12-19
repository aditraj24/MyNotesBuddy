import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import express from "express";
import cors from "cors";

import rateLimiter from "./middlewares/rateLimiter.middleware.js";
import path from "path";
import notesRoutes from "./routes/note.routes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(rateLimiter);
}

// routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/notes", notesRoutes);

// production frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
