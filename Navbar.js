import React from "react";

export default function Navbar({ search, setSearch, openDrawer }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#ccc" }}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={openDrawer}>Wishlist</button>
    </div>
  );
}
