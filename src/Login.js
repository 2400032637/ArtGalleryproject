import React from "react";

export default function Login({ onLogin }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login to Art Gallery</h2>
      <button onClick={onLogin}>Login</button>
    </div>
  );
}
