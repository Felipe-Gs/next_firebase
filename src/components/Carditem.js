import React, { useState } from "react";
import { Switch } from "@mui/material";
const Carditem = ({ titulo, tarefa, status, handleChecked }) => {
  const [checked, setChecked] = useState(false);
  // const handleChecked = () => {
  //   setChecked(!checked);
  // };
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
      <div>
        <Switch
          checked={status}
          onChange={handleChecked}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
    </div>
  );
};

export default Carditem;
