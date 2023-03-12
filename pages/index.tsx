import Image from "next/image";
import { Text } from "@mantine/core";
import Navbar from "../components/Navbar";
import Head from "next/head";
import ScrollIcon from "../components/ScrollIcon/ScrollIcon";
import { Grid } from '@mantine/core';
import FeatureCard from "../components/FeatureCard";
import { Blockquote } from "@mantine/core";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <>
      <Head>
        <title>Home | FPL Predictor</title>
      </Head>
      <div
        style={{ width: "100%", height: "100vh", backgroundColor: "white" }}
      >
        <Navbar />

        <div style={{ position: "absolute", marginLeft: "2rem", top: "25%" }}>
          <Text
            variant="gradient"
            gradient={{ from: '#fa736e', to: '#e69a97', deg: 45 }}
            sx={{ fontSize: "60pt", fontFamily: "cursive" }}
          >
            Welcome to 
          </Text>
          <Text
            variant="gradient"
            gradient={{ from: '#fa736e', to: '#e69a97', deg: 45 }}
            sx={{ fontSize: "100pt", fontFamily: "fantasy" }}
          >
            FPL Predictor
          </Text>
          <Text
            color={"#2e2e2d"}
            sx={{ fontSize: "20pt", fontFamily: "cursive" }}
          >
            Build your team in the best way possible!
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "right",
            marginRight: "2rem",
          }}
        >
          <Image
            src="/lineup.svg"
            alt="Logo"
            width={600}
            height={500}
            priority={true}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ScrollIcon />
        </div>
      </div>
      <div
        style={{ width: "100%", height: "100%", background: "linear-gradient(#fff,#f0afad,#fff)" }}
      >
        {/* <Navbar /> */}
        {/* <span style={{marginTop: "3rem"}}></span> */}
        <Grid justify="center">
          <Grid.Col span={3}>
            <FeatureCard data={bestXI} />
          </Grid.Col>
          <Grid.Col span={3} offset={1}>
            <FeatureCard data={captainData} />
          </Grid.Col>
          <Grid.Col span={3} offset={1}>
            <FeatureCard data={transferSuggestion} />
          </Grid.Col>
        </Grid>
        <Grid justify="space-evenly" style={{marginTop:"10px"}}>
          <Grid.Col span={3}>
            <FeatureCard data={bestPlayer} />
          </Grid.Col>
          <Grid.Col span={3}>
            <FeatureCard data={bestValueForMoney} />
          </Grid.Col>
        </Grid>
      </div>
      <div className={styles.lastPage}>
        <div style={{ display: "block" }}>
          <Image
            src="/default-monochrome-black.svg"
            alt="Logo"
            width={800}
            height={250}
            priority={true}
          />
          {/* <Blockquote color="indigo" cite="– Ted Lasso">
            The Harder You Work, the Luckier You Get
          </Blockquote> */}
        </div>
        <div style={{position:"absolute",bottom:"-270vh"}}>
          <Text sx={{}}>© 2023 FPL Predictor. All rights reserved.</Text>
        </div>
      </div>
    </>
  );
}

const captainData = {
  title: "Best Captain",
  description:
    "Choose the best pick for the captain of your FPL team. FPL Predictor will provide you the best option for your captain position for the next gameweek.",
  image: "/salah.jpg",
  badge: "only for you",
  badgeColor: "red",
  button: "Choose The Captian",
  buttonColor: "red",
  link:"/captain"
};
const bestXI = {
  title: "Team of the Week",
  description:
    "Find the highest scoring eleven for the upcoming gameweek. FPL Predictor will predict the points of the players and provide you the best XI",
  image: "/city.webp",
  badge: "overall",
  badgeColor: "blue",
  button: "Find The Best XI",
  buttonColor: "blue",
  link:"/teamoftheweek"
};
const transferSuggestion = {
  title: "Transfer Suggestion",
  description:
    "Get your transfer suggestions from FPL Predictor. It will provide you with the best transfer suggestion for the upcoming gameweek.",
  image: "/trans.png",
  badge: "only for you",
  badgeColor: "green",
  button: "Get Transfer Suggestions",
  buttonColor: "green",
  link:"/transfer"
};
const bestPlayer = {
  title: "Best Player",
  description:
    "Overall predicted highest point getter from FPL Predictor. It will provide you the name of the probable highest point getter of the upcoming gameweek.",
  image: "/kdb.jpg",
  badge: "Overall",
  badgeColor: "orange",
  button: "Know The Best Player",
  buttonColor: "orange",
  link:"/bestplayer"
};
const bestValueForMoney = {
  title: "Best Value for Money",
  description:
    "Overall predicted highest point getter for lower price from FPL Predictor. It will provide you the name of the player who will be the bang for the bucks.",
  image: "/rashford.webp",
  badge: "Overall",
  badgeColor: "cyan",
  button: "Find The Value for Money",
  buttonColor: "cyan",
  link:"/bestvalue"
};
