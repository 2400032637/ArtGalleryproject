import ArtCard from "./ArtCard";

export default function Gallery({ artworks, wishlist, toggleWishlist, openModal }) {
  if (artworks.length === 0)
    return <p className="no-data">No artworks found</p>;

  return (
    <main id="gallery">
      {artworks.map((art, i) => (
        <ArtCard
          key={i}
          art={art}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          openModal={openModal}
        />
      ))}
    </main>
  );
}
