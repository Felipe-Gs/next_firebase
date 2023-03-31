import React from "react";

const Carditem = ({ titulo, tarefa }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "15%",
        backgroundColor: "grey",
        alignItems: "center",
        display: "flex",
        borderRadius: "10px",
        marginTop: "20px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ padding: "10px" }}>
        <p>{titulo}</p>
        <p>{tarefa}</p>
      </div>
      <p style={{ marginRight: "10px" }}>Status</p>
    </div>
  );
};

export default Carditem;
