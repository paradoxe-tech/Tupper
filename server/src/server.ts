import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = path.resolve(__dirname, "../../");
const app = express();

// express middlewares for url and json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiPath = path.join(ROOT, '/server/src/api');
for(let endpoint of fs.readdirSync(apiPath)) {
  let imported = await import(path.join(apiPath, endpoint));
  imported.default(app, ROOT);
}

// serve static files from the React app
app.use(express.static(path.join(ROOT, "/client/dist")));
app.use(express.static(path.join(ROOT, "/public")));

// serve the React app for any route !== /api
app.get("*", (req, res) => {
  res.sendFile(path.join(ROOT, "/client/dist/index.html"));
});

const PORT = process.env.port || 8080;
app.listen(PORT);