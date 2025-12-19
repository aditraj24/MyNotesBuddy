import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimiter from "./middlewares/rateLimiter.middleware.js";

const app = express();


// middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(rateLimiter);

// routes import
import notesRoutes from "./routes/note.routes.js";

// routes declaration
app.use("/api/notes", notesRoutes);

export { app };
