import React from "react";
import { SpinnerCircular } from "spinners-react";

export default function LoadingIndicator() {
  return (
    <div
      style={{
        alignSelf: "center",
        justifySelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30vh",
      }}>
      <SpinnerCircular
        secondaryColor='transparent'
        thickness={50}
        style={{
          color: "rgb(71, 93, 235)",
        }}
        size='20%'
      />
    </div>
  );
}
