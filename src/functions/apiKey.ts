import express from "express";

function apiKey(req: express.Request, _res: express.Response, next: express.NextFunction) {
  const key = req.headers["x-api-key"];
  if (key === process.env.API_KEY) {
    next();
  }
}

export default apiKey;
