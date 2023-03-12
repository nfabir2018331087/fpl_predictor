import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const id = 71956;
      const allData = await axios.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const basicManager = await axios.get(
        "https://fantasy.premierleague.com/api/entry/" + id + "/"
      );
      const gw = basicManager.data.current_event-1;
      const player = await axios.get(
        "https://fantasy.premierleague.com/api/entry/" + id + "/event/" + gw + "/picks/"
      );

      const elements = allData.data.elements;
      const players = elements.filter((player) =>
        playerIds.includes(player.id)
      );
      let playerData = players.map((player) => {
        // make a image url like this https://resources.premierleague.com/premierleague/photos/players/110x140/p{player.photo}.png
        // remove .jpg from the end of the photo url
        const img = player.photo.split(".jpg");
        const image = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${img[0]}.png`;
        return {
          id: player.id,
          name: player.web_name,
          team: player.team,
          position: player.element_type,
          points: player.total_points,
          price: player.now_cost,
          selected: player.selected_by_percent,
          image: image,
        };
      });
      // divide player data by position 1 = GK, 2 = DEF, 3 = MID, 4 = FWD
      const gk = playerData.filter((player) => player.position === 1);
      const def = playerData.filter((player) => player.position === 2);
      const mid = playerData.filter((player) => player.position === 3);
      const fwd = playerData.filter((player) => player.position === 4);
      playerData = { gk, def, mid, fwd };
      const managerData = {
        name: basicManager.data.name,
        currentEvent: basicManager.data.current_event,
        points: basicManager.data.summary_overall_points,
        rank: basicManager.data.summary_overall_rank,
        value: basicManager.data.summary_event_points,
      };
      const data = {
        manager: managerData,
        players: playerData,
      };
      res.status(200).json({ data });
    } catch (err) {
      res.status(400).json({ name: "John Doe" });
      console.log(err);
    }
  }
}
