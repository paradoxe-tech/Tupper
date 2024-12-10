import fs from 'fs';
import path from 'path';
import { identifier } from '../../../shared/identifier';
import { Contact } from '../../../shared/types';

export default function run(app, ROOT:string) {
  app.get("/api/family/:identifier", async (req, res) => {
    try {
      let dataPath = path.join(ROOT, '/data/contacts.json');
      let contacts: Contact[] = JSON.parse(fs.readFileSync(dataPath, {
        encoding: "utf-8"
      }));

      let target = contacts.find(contact => identifier(contact) == req.params.identifier)
      if(target) {
        let [familyNames, edges] = listFamily(target, contacts);
        
        res.status(200).json({
          family: contacts.filter(c => familyNames.has(identifier(c))),
          edges: edges
        });
        
      } else res.status(500).send("No contact found for this id");
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  });
}

type Edge = {
  source: string;
  target: string;
}

function listFamily(contact: Contact, contacts: Contact[]): [Set<string>, Edge[]] {
  let nodes: Set<string> = new Set()
  let edges: Edge[] = []
  const familyTypes = ["parent", "child"]
  
  function rec(contact: Contact): void {
    nodes.add(identifier(contact))
    
    for(let [type, targetIdentifier] of contact.relations) {
      let target = contacts.find(c => identifier(c) == targetIdentifier);

      if(familyTypes.includes(type) && target && !nodes.has(targetIdentifier)) {
        rec(target)
        
        if(type == "child") edges.push({
          source: identifier(contact),
          target: targetIdentifier
        })

        if(type == "parent") edges.push({
          source: targetIdentifier,
          target: identifier(contact)
        })
        
      }
    }
  }

  rec(contact)
  return [nodes, edges]
}