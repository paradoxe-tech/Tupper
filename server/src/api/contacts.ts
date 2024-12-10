import fs from 'fs';
import path from 'path';
import { identifier } from '../../../shared/identifier';
import { Contact } from '../../../shared/types';

const couples: {[key: string]: string} = {
  "parent": "child",
  "child": "parent"
}

export default function run(app, ROOT:string) {
  app.get("/api/contacts", async (req, res) => {
    try {
      let dataPath = path.join(ROOT, '/data/contacts.json');
      let data: Contact[] = JSON.parse(fs.readFileSync(dataPath, {
        encoding: "utf-8"
      }));

      for(let contact of data) {
        let contactIdent = identifier(contact)
        for(let [type, targetIdent] of contact.relations) {
          let target = data.find(c => identifier(c) == targetIdent)
          if(target) {
            let relType = type
            if(type in couples) relType = couples[type]
            
            let relExists = target.relations
              .find(r => r[0] == relType && r[1] == contactIdent)
            
            if(!relExists) {
              target.relations.push([relType, contactIdent])
            }
          }
        }
      }
      
      res.json(data)
    } catch (err) {
      res.status(500).send(err)
    }
  });
}