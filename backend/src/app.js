import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimiter from "./middlewares/rateLimiter.middleware.js";
// routes import
import notesRoutes from "./routes/note.routes.js";
// import path from "path";
const app = express();
// const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
    })
  );
}

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(rateLimiter);



// routes declaration
app.use("/api/notes", notesRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
//   });
// }
export { app };
