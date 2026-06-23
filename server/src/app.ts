import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import tripRoutes from "./routes/trip.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Trao Travel Planner API Running",
  });
});

export default app;
