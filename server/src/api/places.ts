import fs from 'fs';
import path from 'path';
import { Place } from '../../../shared/types';

export default function run(app, ROOT:string) {
  app.get("/api/places", async (req, res) => {
    try {
      let dataPath = path.join(ROOT, '/data/places.json');
      let data: Place[] = JSON.parse(fs.readFileSync(dataPath, {
        encoding: "utf-8"
      }));

      res.json(data)
    } catch (err) {
      res.status(500).send(err)
    }
  });
}