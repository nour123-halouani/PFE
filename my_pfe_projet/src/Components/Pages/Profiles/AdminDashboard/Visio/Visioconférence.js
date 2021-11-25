import React, { useState } from "react";

function Visioconférence() {
  const [room, setRoom] = useState(null);

  const onSubmit = () => {
    window.location.assign(`/Visioconférence/video/${room}`);
  };
  return (
    <center >
      <input type="text" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
    </center>
  );
}

export default Visioconférence;