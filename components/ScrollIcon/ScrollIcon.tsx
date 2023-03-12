import React from "react";
import style from "./ScrollIcon.module.css";
import { Tooltip } from "@mantine/core";
export default function Navbar() {
  return (
    <>
      <Tooltip
        label="Scroll Down"
        color="gray"
        withArrow
        arrowPosition="center"
      >
        <div className={style.arrow}></div>
      </Tooltip>
    </>
  );
}
