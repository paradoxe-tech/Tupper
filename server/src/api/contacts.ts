import fs from 'fs';
import path from 'path';

export default function run(app, ROOT:string) {
  app.get("/api/contacts", async (req, res) => {
    try {
      let dataPath = path.join(ROOT, '/data/contacts.json');
      let data = fs.readFileSync(dataPath);
      data = JSON.parse(data);
      res.json(data)
    } catch (err) {
      res.status(500).send(err)
    }
  });
}