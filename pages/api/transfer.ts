import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import preditions from "../../prediction1.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hello");
  if (req.method === "POST") {
    try {
      const { position, data } = req.body;

      console.log(position, data);
      const allData = await axios.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const el = preditions.filter(
        (player) => player.position === position - 1
      );
      el.sort((a, b) => {
        return b.xp - a.xp;
      });
      const elements = allData.data.elements;
      // return the first element that doest match the id with data.id in data array
      const player = el.find((player) => {
        return !data.find((d: { id: number; }) => d.id === player.id);
      });
      const playerData = elements.find((el: { id: number; }) => el.id === player.id);
      const img = playerData.photo.split(".jpg");
      const image = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${img[0]}.png`;
      const a = {
        id: playerData.id,
        name: playerData.web_name,
        position: playerData.element_type,
        team: playerData.team,
        price: playerData.now_cost,
        xps: player.xp,
        image,
        points: playerData.total_points,
      };

      res.status(200).json({ data: a });
    } catch (err) {
      console.log(err);
      res.status(400).json({ name: "John Doe" });
    }
  }
}
