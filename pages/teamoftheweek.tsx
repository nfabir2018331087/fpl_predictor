import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { Text, Center, Loader } from "@mantine/core";
import PlayerShow from "../components/PlayerShow";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Team() {
  const [def, setDef] = useState([]);
  const [mid, setMid] = useState([]);
  const [fwd, setFwd] = useState([]);
  const [gk, setGk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPoint, setTotalPoint] = useState(0);
  const [gw, setGW] = useState(1);
  const round = (value: number, precision: number) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };
  useEffect(() => {
    const f = async () => {
      try {
        let data = await axios.get("/api/teamoftheweek");
        data = data.data.data;
        console.log(data);
        const { players } = data;
        const { manager } = data;
        setDef(players.def);
        setMid(players.mid);
        setFwd(players.fwd);
        setGk(players.gk);
        setTotalPoint(manager.total_points);
        setGW(manager.gw);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    f();
  }, []);

  return (
    <>
      <Head>
        <title>Best XI | FPL Predictor</title>
      </Head>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "url(/field1.jpg)",
          // filter: "blur(5px)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Navbar />
        <Center>
          <div>
            <Text>
              {" "}
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "bolder",
                  color: "black",
                }}
              >
                GameWeek {gw} |{" "}
              </span>{" "}
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "bolder",
                  color: "black",
                }}
              >
                Team of the week
              </span>{" "}
            </Text>
            <div style={{borderBottom:"2px solid black"}}></div>
            <Text
              style={{
                fontSize: "23px",
                fontWeight: "bold",
                color: "#bf7883",
                marginLeft: "80px",
                marginBottom: "20px"
              }}
            >
              Predicted Total Points:
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bolder",
                  color: "red",
                  marginBottom: "20px"
                }}
              >
                {" "}
                {round(totalPoint, 0)}
              </span>
            </Text>
          </div>
        </Center>
        {/* <div style={{ display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",left:"auto",right:"auto" }}>
          <Text> GameWeek 18 | Team of the Week</Text>
          <Text>Predicted Point</Text>
          <Text> 89</Text>
          <Text> Team</Text>
        </div> */}

        <div
          style={{
            display: "block",
            marginLeft: "20%",
            marginRight: "20%",
            width: "60%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* gk */}
            {loading && <Loader color="yellow" size="xl" variant="bars" />}
            {gk.map((item) => (
              <PlayerShow
                key={item.id}
                title={item.name}
                position={item.position}
                point={item.points}
                image={item.image}
                xps={item.xps}
                price={item.price}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* df */}

            {def.map((item) => (
              <PlayerShow
                key={item.id}
                title={item.name}
                position={item.position}
                point={item.points}
                image={item.image}
                xps={item.xps}
                price={item.price}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* mf */}

            {mid.map((item) => (
              <PlayerShow
                key={item.id}
                title={item.name}
                position={item.position}
                point={item.points}
                image={item.image}
                xps={item.xps}
                price={item.price}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* fw */}
            {fwd.map((item) => (
              <PlayerShow
                key={item.id}
                title={item.name}
                position={item.position}
                point={item.points}
                image={item.image}
                xps={item.xps}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
