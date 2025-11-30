import React from "react";

export default function ArtModal({ data, close }) {
  return (
    <div style={{ position: "fixed", top: "20%", left: "30%", background: "#fff", padding: "20px", border: "1px solid #333" }}>
      <h3>{data.title}</h3>
      <p>{data.artist}</p>
      <img src={data.image} alt={data.title} style={{ width: "100%" }} />
      <button onClick={close}>Close</button>
    </div>
  );
}
