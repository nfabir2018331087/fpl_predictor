import { createStyles, Paper, Text, Title, Button, Badge } from "@mantine/core";
import { IconBorderLeft } from "@tabler/icons";
import Image from "next/image";
import { VariableDeclaration } from "typescript";

interface ArticleCardImageProps {
  title: string;
  position: string;
  point: string;
  image: string;
  xps: string;
  price: string;
  handleClick?: () => void;
}

export default function PlayerShow({
  title,
  position,
  point,
  image,
  xps,
  price,
  handleClick,
}: ArticleCardImageProps) {
  // define a function that return a number two digits after the decimal point
  const round = (value: number, precision: number) => {
    // check number is not a number 
    let multiplier = Math.pow(10, precision || 0);
    let result = Math.round(value * multiplier) / multiplier;
    if (isNaN(result)) {
      return "?";
    }
    return Math.round(value * multiplier) / multiplier;
  };
  const pos = {
    1: "GK",
    2: "DEF",
    3: "MID",
    4: "FWD",
  }
  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      sx={{
        background: "linear-gradient(darkgray,black)",
        backgroundPosition: "center",
        height: "173px",
        width: "180px",
      }}
      onClick={handleClick && (() => handleClick(position))}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
       <Badge color="cyan" >TP: {point}</Badge>
       <Badge color="pink" > {pos[position]}</Badge>
      </div>
       
      <div>
        <Image
          src={image}
          alt="Logo"
          width={110}
          height={75}
          priority={true}
          style={{
            // display:"flex",
            // justifyContent:"center",
            // alignItems:"center",
            paddingLeft:"45px",
            borderRadius:"50%",
    
          }}
        />
      </div>
      <div
        style={{
          backgroundColor: "lightgray",
          width: "145px",
          height:"70px",
          paddingTop: "5px",
          textAlign: "center",
          borderRadius:"10px",
        }}
      >
        {/* <Text style={{fontSize:"15px"}} >{pos[position]}</Text> */}
        <Title style={{fontSize:"20px"}} order={3}>{title}</Title>
        <Title style={{fontSize:"15px"}} order={3}>Points: {round(xps,0)}</Title>
        <Title style={{fontSize:"10px"}} order={3}>Current Price: {price/10}m</Title>
      </div>
    </Paper>
  );
}
