import express from "express";
import players from "./players";
import health from "./health";
import apiKey from "../functions/apiKey";

const app: express.Application = express();
app.use(express.json());
app.use(apiKey);

app.use("/players", players);
app.use("/health", health);

app.use("/", (_req, res) => {
  res.send("Hello world");
});

export default app;
