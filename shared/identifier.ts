import { Contact } from './types';

export function identifier(c: Contact): string {
  return `${c.civil.first} ${c.civil.last}`;
}