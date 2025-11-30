import React from "react";

export default function CategorySort({ setCategory, setSort, openUpload }) {
  return (
    <div style={{ padding: "10px" }}>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="Painting">Painting</option>
        <option value="Sculpture">Sculpture</option>
      </select>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="default">Default</option>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
        <option value="recent">Recent</option>
      </select>
      <button onClick={openUpload}>Upload Art</button>
    </div>
  );
}
