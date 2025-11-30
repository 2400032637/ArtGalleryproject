import React from "react";

export default function Gallery({ artworks, wishlist, toggleWishlist, openModal }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: "10px" }}>
      {artworks.map((art) => (
        <div key={art.id} style={{ border: "1px solid #333", padding: "5px", width: "200px" }}>
          <img src={art.image} alt={art.title} style={{ width: "100%" }} onClick={() => openModal(art)} />
          <h4>{art.title}</h4>
          <p>{art.artist}</p>
          <button onClick={() => toggleWishlist(art.title)}>
            {wishlist.includes(art.title) ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      ))}
    </div>
  );
}
