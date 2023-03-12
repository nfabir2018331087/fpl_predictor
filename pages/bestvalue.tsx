import Navbar from "../components/Navbar";
import BestPlayerShow from "../components/BestPlayerShow";
import Head from "next/head";
import { Text, Center, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";


export default function bestPlayer(){
    const [best, setValuablePlayer] = useState({fname:'any', sname: 'name',position:'pos',point:'point',xps:'xp',price:'$'});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const f = async () => {
          try {
            let data = await axios.get("/api/teamoftheweek");
            data = data.data.data;
            console.log(data);
            const { bestValue } = data;
            setValuablePlayer(bestValue);
            setLoading(false);
            console.log(bestPlayer);
          } catch (err) {
            setLoading(false);
            console.log(err);
          }
        };
        f();
      }, []);
    return( 
        <>
        <Head>
        <title>Best Player | FPL Predictor</title>
        </Head>
        <Navbar />
        <div style = {{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10%",
            paddingRight: "10%",
            height: "100vh",
            backgroundImage: "url('/field1.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
        }}>
            <Center>
            <div>
            <Text>
              {" "}
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "bolder",
                  color: "black",
                }}
              >
                Predicted Best Value for Money Player for GameWeek {best.gw} {" "}
              </span>
            </Text>         
            <div style={{borderBottom:"2px solid black"}}></div>            
            </div>
            </Center>
            <Center>
            <div style={{
                marginTop: "50px",
                    
            }}  >
            <BestPlayerShow
                      title1={best.fname}
                      title2={best.sname}
                      position={best.position}
                      point={best.points}
                      image={best.image}
                      xps={best.xps}
                      price = {best.price}
                    /> 
            </div>
            </Center>            
        </div> 
        </>   
    );
}