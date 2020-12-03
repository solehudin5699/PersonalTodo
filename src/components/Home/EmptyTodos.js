import React from "react";
import emptyIcon from "../../assets/images/todo-empty.png";

export default function LoadingIndicator() {
  return (
    <div
      style={{
        alignSelf: "center",
        justifySelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "30vh",
      }}>
      <img
        src={emptyIcon}
        style={{
          width: "30%",
        }}
        alt='Todos is empty'
      />
      <h6 style={{ color: "rgb(71, 93, 235)", textAlign: "center" }}>
        Your todos is still empty, let's to add your todos
      </h6>
    </div>
  );
}
