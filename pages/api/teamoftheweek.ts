import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import predictions from "../../prediction1.json";

const round = (value: number, precision: number) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const id = 3880968;
      const allData = await axios.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const basicManager = await axios.get(
        "https://fantasy.premierleague.com/api/entry/" + id + "/"
      );
      const gw = basicManager.data.current_event;
      const gks = predictions.filter((player) => player.position === 0);
      const defs = predictions.filter((player) => player.position === 1);
      const mids = predictions.filter((player) => player.position === 2);
      const fwds = predictions.filter((player) => player.position === 3);
      predictions.sort((a, b) => {
        return b.xp - a.xp;
      }); 
      gks.sort((a, b) => {
        return b.xp - a.xp;
      });
      defs.sort((a, b) => {
        return b.xp - a.xp;
      });
      mids.sort((a, b) => {
        return b.xp - a.xp;
      });
      fwds.sort((a, b) => {
        return b.xp - a.xp;
      });
      let playerIds = [
        gks[0].id,
      ];
      for (let i = 0; i < 3; i++) {
        playerIds.push(defs[i].id);
      }
      for (let i = 0; i < 2; i++) {
        playerIds.push(mids[i].id);
      }
      for (let i = 0; i < 1; i++) {
        playerIds.push(fwds[i].id);
      }
      let extras = []
      for (let i = 3; i < 5; i++) {
        extras.push(defs[i]);
      }
      for (let i = 2; i < 5; i++) {   
        extras.push(mids[i]);
      }
    
      for (let i = 1; i < 3; i++) {
        extras.push(fwds[i]);
      }
      extras.sort((a, b) => {
        return b.xp - a.xp;
      });
      for (let i = 0; i < 4; i++) {
        playerIds.push(extras[i].id);
      }
      const obj = {};
      for (let i = 0; i < playerIds.length; i++) {
        const id = playerIds[i];
        predictions.forEach((player) => {
          if (player.id === id) {
            obj[id] = Math.round(player.xp);
          }
        });
      }

      // const total_xps = xps.reduce((a, b) => a + b, 0);
      const elements = allData.data.elements;
      const players = elements.filter((player) => playerIds.includes(player.id));

      let value = 0.0;
      let bestValue = {};
      let highestPoint = 0;
      let bestPlayer = {};
      let p = ["NONE", "GK", "DEF", "MID", "FWD"];
      let playerData = players.map((player) => {
        const img = player.photo.split(".jpg");
        const position = player.element_type;
        const xps = obj[player.id];
        const image = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${img[0]}.png`;
        if (obj[player.id] > highestPoint) {
          highestPoint = obj[player.id];
          bestPlayer = {
            id: player.id,
            name: player.web_name,
            fname: player.first_name,
            sname:player.second_name,
            team: player.team,
            position: position,
            points: player.total_points,
            price: player.now_cost,
            selected: player.selected_by_percent,
            image: image,
            xps: xps,
            gw: gw,
          };
        }

        if (obj[player.id]/(player.now_cost/10) > value) {
          value = obj[player.id]/(player.now_cost/10);
          bestValue = {
            id: player.id,
            name: player.web_name,
            fname: player.first_name,
            sname:player.second_name,
            team: player.team,
            position: position,
            points: player.total_points,
            price: player.now_cost,
            selected: player.selected_by_percent,
            image: image,
            xps: xps,
            gw: gw,
          };
        }

        return {
          id: player.id,
          name: player.web_name,
          team: player.team,
          position: position,
          points: player.total_points,
          price: player.now_cost,
          selected: player.selected_by_percent,
          image: image,
          xps: xps, 
            // const player = await axios.get(
            //   "https://fantasy.premierleague.com/api/dream-team/" + gw + "/"
            // );
            // const playerIds = player.data.team.map((player) => player.element);
        };
      });
      // calculate total points
      const total_points = playerData.reduce((a, b) => a + b.xps, 0);
      // divide player data by position 1 = GK, 2 = DEF, 3 = MID, 4 = FWD
      const gk = playerData.filter((player) => player.position === 1);
      const def = playerData.filter((player) => player.position === 2);
      const mid = playerData.filter((player) => player.position === 3);
      const fwd = playerData.filter((player) => player.position === 4);
      playerData = { gk, def, mid, fwd };
      const managerData = {
        gw: gw,
        total_points: total_points,
       
      };
      const data = {
        manager: managerData,
        players: playerData,
        bestPlayer: bestPlayer,
        bestValue: bestValue,
      };
      res.status(200).json({ data });
    } catch (err) {
      res.status(400).json({ name: "John Doe" });
      console.log(err);
    }
  }
}
