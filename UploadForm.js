import React, { useState } from "react";

export default function UploadForm({ close, upload, count }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    upload({ id: count + 1, title, artist, category: "Painting", added: 2025, image });
  };

  return (
    <div style={{ position: "fixed", top: "20%", left: "30%", background: "#fff", padding: "20px", border: "1px solid #333" }}>
      <h3>Upload Artwork</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <input placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} /><br />
        <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} /><br />
        <button type="submit">Upload</button>
        <button type="button" onClick={close}>Cancel</button>
      </form>
    </div>
  );
}
