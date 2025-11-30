import React from "react";

export default function Drawer({ open, close, wishlistArt }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", top: 0, right: 0, width: "300px", height: "100%", background: "#eee", padding: "10px" }}>
      <button onClick={close}>Close</button>
      <h3>Wishlist</h3>
      {wishlistArt.length === 0 && <p>No items</p>}
      {wishlistArt.map((art) => (
        <div key={art.id}>
          <p>{art.title}</p>
        </div>
      ))}
    </div>
  );
}
