import { Organization } from "./types";

export function organizationsTitles(orgas: Organization[]): string[] {
  function recAux(orga: Organization): string[] {
    if(orga.childs.length == 0) return [`${orga.title} à ${orga.name}`];
    return orga.childs.flatMap(subOrga => {
      return recAux(subOrga).map(part => `${part} à ${orga.name}`)
    })
  }

  return orgas.flatMap(orga => recAux(orga))
}