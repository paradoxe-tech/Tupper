import { DateTime } from "luxon";

export function parseDate(dateString: string, format: string): string {
  const parsed = DateTime.fromFormat(dateString, format);
  if (!parsed.isValid) {
    throw new Error(`Invalid date: ${dateString} does not match format ${format}`);
  }

  const date = parsed.toJSDate();
  
  let months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ];

  let res = `Le ${date.getDate()}`;
  res += ` ${months[date.getMonth()]}`;
  res += ` ${date.getFullYear()}`;
  
  let hours = date.getHours();
  let mins = date.getMinutes();

  if(hours + mins !== 0) {
    res += ` (${hours}:${mins})`;
  }

  return res;
}