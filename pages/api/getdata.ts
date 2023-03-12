import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import preditions from "../../prediction1.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      console.log(req.query);
      const id = req.query.playerId;
      const allData = await axios.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const basicManager = await axios.get(
        "https://fantasy.premierleague.com/api/entry/" + id + "/"
      );
      const gw = basicManager.data.current_event;
      const player = await axios.get(
        "https://fantasy.premierleague.com/api/entry/" +
          id +
          "/event/" +
          gw +
          "/picks/"
      );
      const playerIds = player.data.picks.map((player) => player.element);
      const obj = {};
      for (let i = 0; i < playerIds.length; i++) {
        const id = playerIds[i];
        preditions.forEach((player) => {
          if (player.id === id) {
            obj[id] = player.xp;
          }
        });
      }
      const elements = allData.data.elements;
      console.log(obj);
      const players = elements.filter((player) =>
        playerIds.includes(player.id)
      );
      // find the max xps player
      let max = 0;
      let maxPlayer = {};

      let playerData = players.map((player) => {
        // make a image url like this https://resources.premierleague.com/premierleague/photos/players/110x140/p{player.photo}.png
        // remove .jpg from the end of the photo url
        const img = player.photo.split(".jpg");
        const image = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${img[0]}.png`;
        const xps = obj[player.id];
        if (obj[player.id] > max) {
          max = obj[player.id];
          maxPlayer = {
            id: player.id,
            name: player.web_name,
            team: player.team,
            position: player.element_type,
            points: player.total_points,
            price: player.now_cost,
            selected: player.selected_by_percent,
            image: image,
            xps: xps,
          };
        }
        return {
          id: player.id,
          name: player.web_name,
          team: player.team,
          position: player.element_type,
          points: player.total_points,
          price: player.now_cost,
          selected: player.selected_by_percent,
          image: image,
          xps: xps,
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
        captain: maxPlayer,
      };
      res.status(200).json({ data });
    } catch (err) {
      res.status(400).json({ name: "John Doe" });
      console.log(err);
    }
  }
}
