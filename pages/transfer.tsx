import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Page.module.css";
import PlayerShow from "../components/PlayerShow";
import Navbar from "../components/Navbar";
import { Button } from "@mantine/core";
import React, { useState } from "react";
import { Text, Center, Loader } from "@mantine/core";
import axios from "axios";
import Head from "next/head";

export default function Captain() {
  const [isloading, setIsLoading] = useState(false);

  const [playerId, setPlayerId] = useState("");
  const [def, setDef] = useState([]);
  const [mid, setMid] = useState([]);
  const [fwd, setFwd] = useState([]);
  const [gk, setGk] = useState([]);
  const [captain, setCaptain] = useState({});
  const [name, setName] = useState("");
  const [point, setPoint] = useState("");
  const [rank, setRank] = useState("");
  const [transfer, setTransfer] = useState(null);
  const handleSearchButton = async () => {
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
  const handleClick = async (position) => {
    console.log(position);
    let data = [];
    if (position == 1) data = gk;
    else if (position == 2) data = def;
    else if (position == 3) data = mid;
    else if (position == 4) data = fwd;
    try {

      const res = await axios.post("/api/transfer", {
        data,
        position
      });
      setTransfer(res.data.data);
      console.log(res.data);
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Transfer Suggestion | FPL Predictor</title>
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
      }}>
        
        {/* <div className={styles.container}> */}
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
            <div className={styles.player1}>
              <div className={styles.cardContainer}>
                {gk.length == 0 ? (
                  <div className={styles.name}>No Data Found</div>
                ) : null}

                {gk.map((item) => (
                  <PlayerShow
                  key={item.id}
                    title={item.name}
                    position={item.position}
                    point={item.points}
                    image={item.image}
                    xps={item.xps}
                    price = {item.price}
                    handleClick={handleClick}
                  />
                ))}
              </div>
              <div className={styles.cardContainer}>
                {def.map((item) => (
                  <PlayerShow
                  key={item.id}
                    title={item.name}
                    position={item.position}
                    point={item.points}
                    image={item.image}
                    xps={item.xps}
                    price = {item.price}
                    handleClick={handleClick}
                  />
                ))}
              </div>
              <div className={styles.cardContainer}>
                {mid.map((item) => (
                  <PlayerShow
                  key={item.id}
                    title={item.name}
                    position={item.position}
                    point={item.points}
                    image={item.image}
                    xps={item.xps}
                    price = {item.price}
                    handleClick={handleClick}
                  />
                ))}
              </div>

              <div className={styles.cardContainer}>
                {isloading && (
                  <Loader color="yellow" size="xl" variant="bars" />
                )}
                {fwd.map((item) => (
                  <PlayerShow
                  key={item.id}
                    title={item.name}
                    position={item.position}
                    point={item.points}
                    image={item.image}
                    xps={item.xps}
                    price={item.price}
                    handleClick={handleClick}
                  />
                ))}
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.name}>Name: {name}</div>
              <div className={styles.name}>Point: {point}</div>
              <div className={styles.name}>Rank: {rank}</div>

              {transfer ? (
                <>
                  <div className={styles.name}>Your Transfer : </div>
                  <div
                    style={{
                      marginLeft: "130px",
                    }}
                  >
                    <PlayerShow
                    key={transfer.id}
                      title={transfer.name}
                      position={transfer.position}
                      point={transfer.points}
                      image={transfer.image}
                      xps={transfer.xps}
                      price={transfer.price}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        {/* </div> */}
      </div>
    </>
  );
}
