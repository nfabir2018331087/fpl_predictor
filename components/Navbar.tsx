import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Tooltip } from "@mantine/core";

export default function Navbar() {
  const router = useRouter();
  const redirectToHome = () => {
    router.push("/");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          // marginLeft: "1rem",
          cursor: "pointer",
          background: "linear-gradient(#f0afad,#fff)",
          // borderRadius: "10px",
          paddingLeft: "10px",
        }}
        onClick={redirectToHome}
      >
        <Tooltip
          label="Serious manager"
          color="gray"
          withArrow
          arrowPosition="center"
        >
          <Image
            style={{
              marginLeft : "1rem",
            }}
            src="/default-monochrome-black.svg"
            alt="Logo"
            width={250}
            height={80}
            priority={true}
          />
        </Tooltip>
      </div>
    </>
  );
}
