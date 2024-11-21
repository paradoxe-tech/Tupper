import fs from "fs";
import path from "path";
import { Place } from "../../../shared/types";

export default async function run(app, ROOT: string) {
  app.get("/api/places", async (req, res) => {
    try {
      let dataPath = path.join(ROOT, "/data/places.json");
      let data: Place[] = JSON.parse(
        fs.readFileSync(dataPath, {
          encoding: "utf-8",
        }),
      );

      for (let place of data) {
        let coords = [0, 0];
        let result = await placeToCoords(place);
        if (result) coords = result;

        let [lng, lat] = coords;
        place["latitude"] = lat;
        place["longitude"] = lng;
      }

      res.json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
}

async function placeToCoords(place: Place): Promise<[number, number]> {
  if (!place.city || !place.country) {
    console.error(`Insufficient data to determine coordinates`);
    return [0, 0];
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        `${place.address}, ${place.city}, ${place.country}`,
      )}`,
    );

    const data = await response.json();

    if (data.length === 0) return [0, 0];

    const { lon, lat } = data[0];
    return [parseFloat(lon), parseFloat(lat)];
  } catch (e) {
    return [0, 0];
  }
}
