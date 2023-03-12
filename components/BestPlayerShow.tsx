import { createStyles, Paper, Text, Title, Button, Badge } from "@mantine/core";
import { IconBorderLeft } from "@tabler/icons";
import Image from "next/image";
import { VariableDeclaration } from "typescript";

interface ArticleCardImageProps {
  title1: string;
  title2: string;
  position: string;
  point: string;
  image: string;
  xps: string;
  price: string;
  handleClick?: () => void;
}

export default function PlayerShow({
  title1,
  title2,
  position,
  point,
  image,
  xps,
  price,
  handleClick,
}: ArticleCardImageProps) {
  // define a function that return a number two digits after the decimal point
  const pos = {
    1: "GK",
    2: "DEF",
    3: "MID",
    4: "FWD",
  }
  return (
    <Paper
      shadow="xl"
      p="xs"
      radius="lg"
      sx={{
        background: "linear-gradient(darkgray,black)",
        backgroundPosition: "center",
        height: "500px",
        width: "480px",
      }}
      onClick={handleClick && (() => handleClick(position))}
    >
      <div style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between"
      }}>
       <Badge size = "xl" color="cyan" >Total Points: {point}</Badge>
       <Badge size = "xl" color="pink" >Position: {pos[position]}</Badge>
      </div>
       
      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Image
          src={image}
          alt="Logo"
          width={210}
          height={225}
          priority={true}
          style={{
            // display:"flex",
            // justifyContent:"center",
            // alignItems:"center",
            // paddingLeft:"45px",
            borderRadius:"50%",
    
          }}
        />
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px"
      }}>
      <div
        style={{
            
          backgroundColor: "lightgray",
          width: "345px",
          height:"150px",
          paddingTop: "10px",
          textAlign: "center",
          borderRadius:"10px",
        }}
      >
        {/* <Text style={{fontSize:"15px"}} >{pos[position]}</Text> */}
        <Title style={{fontSize:"40px"}} order={3}>{title1+" "+title2}</Title>
        {/* <Title style={{fontsize:"25px"}} order={3}>{team}</Title> */}
        <Title style={{fontSize:"25px"}} order={3}>Predicted Points: {Math.round(xps)}</Title>
        <Text style={{fontSize: "20px", textDecoration: "Bold"}}>Current Price: {price/10}m</Text>
      </div>
      </div>
    </Paper>
  );
}
