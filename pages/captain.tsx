import Image from "next/image";
// import { Inter } from "@next/font/google";
import styles from "../styles/Page.module.css";
import PlayerShow from "../components/PlayerShow";
import Navbar from "../components/Navbar";
import { Button } from "@mantine/core";
import React, { useState } from "react";
import { Text, Center, Loader } from "@mantine/core";
import axios from "axios";
// const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";

export default function Captain() {
  const [isloading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [playerId, setPlayerId] = useState("");
  const [def, setDef] = useState([]);
  const [mid, setMid] = useState([]);
  const [fwd, setFwd] = useState([]);
  const [gk, setGk] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [name, setName] = useState("");
  const [point, setPoint] = useState("");
  const [rank, setRank] = useState("");

  const handleSearchButton = async () => {
    setButtonClicked(true);

    setIsLoading(true);
    try {
      let data = await axios.get("/api/getdata?playerId=" + playerId);
      data = data.data.data;
      console.log(data);
      const { players } = data;
      const { manager } = data;
      const { captain } = data;
      setCaptain(captain);
      setDef(players.def);
      setMid(players.mid);
      setFwd(players.fwd);
      setGk(players.gk);
      setRank(manager.rank);
      setName(manager.name);
      setPoint(manager.points);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Best Captain | FPL Predictor</title>
      </Head>
      <Navbar />
      <div style = {{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "10%",
        paddingRight: "10%",
        minHeight: "100vh",
        backgroundImage: "url('/field1.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }} 
      >  
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.search}
              onChange={(e) => {
                setPlayerId(e.target.value);
              }}
            />
            <span
              className={styles.searchText}
              onClick={() => handleSearchButton()}
            >
              Search
            </span>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.player}>
              <div className={styles.cardContainer}>
                {gk.length == 0 ? (
                  <div className={styles.name}>No Data Found</div>
                ) : null}

                {gk.map((item) => (
                  <PlayerShow
                    title={item.name}
                    position={item.position}
                    point={item.points}
                    image={item.image}
                    xps={item.xps}
                    price = {item.price}
                  />
                ))}
              </div>
              <div className={styles.cardContainer}>
                {def.map((item) => (
                  <PlayerShow
                    title={item.name}
                    position={item.position}
                    point={item.points}
                    image={item.image}
                    xps={item.xps}
                    price = {item.price}
                  />
                ))}
              </div>
              <div className={styles.cardContainer}>
                {mid.map((item) => (
                  <PlayerShow
                    title={item.name}
                    position={item.position}
                    point={item.points}
                    image={item.image}
                    xps={item.xps}
                    price = {item.price}
                  />
                ))}
              </div>

              <div className={styles.cardContainer}>
                {isloading && (
                  <Loader color="yellow" size="xl" variant="bars" />
                )}
                {fwd.map((item) => (
                  <PlayerShow
                    title={item.name}
                    position={item.position}
                    point={item.points}
                    image={item.image}
                    xps={item.xps}
                    price = {item.price}
                  />
                ))}
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.name}>Name: {name}</div>
              <div className={styles.name}>Point: {point}</div>
              <div className={styles.name}>Rank: {rank}</div>

              {captain ? (
                <>
                  <div className={styles.name}>Captain:</div>
                  <div 
                  style={{
                    marginLeft: "80px",
                  }}
                  >
                    <PlayerShow
                      title={captain.name}
                      position={captain.position}
                      point={captain.points}
                      image={captain.image}
                      xps={captain.xps}
                      price = {captain.price}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
