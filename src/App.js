import React, { useState } from "react";

// ==== CAPTCHA COMPONENT ====
function CaptchaLogin({ onSuccess }) {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let str = "";
    for (let i = 0; i < 5; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  const handleVerify = () => {
    if (userInput.toUpperCase() === captcha) {
      alert("Captcha Verified!");
      onSuccess();
    } else {
      alert("Wrong Captcha, Try Again!");
      setCaptcha(generateCaptcha());
      setUserInput("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <input placeholder="Email" /><br />
      <input placeholder="Password" type="password" /><br /><br />
      <div style={{
        margin: "10px auto",
        fontSize: "26px",
        fontWeight: "bold",
        width: "170px",
        border: "1px solid #000",
        padding: "8px",
        userSelect: "none",
        letterSpacing: "6px"
      }}>
        {captcha}
      </div>
      <input
        placeholder="Type Captcha"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ marginTop: "10px" }}
      /><br />
      <button onClick={handleVerify} style={{ marginTop: "15px" }}>Verify & Login</button>
      <p
        style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
        onClick={() => setCaptcha(generateCaptcha())}
      >
        Refresh Captcha
      </p>
    </div>
  );
}

// ==== MAIN APP ====
export default function App() {
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
      category: "Painting",
      description: "A portrait of Lisa Gherardini, wife of Francesco del Giocondo.",
      price: "$1,000,000",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg"
    },
    {
      id: 2,
      title: "The Scream",
      artist: "Edvard Munch",
      category: "Painting",
      description: "Expressionist painting showing a figure with an agonized expression.",
      price: "$120,000",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg"
    },
    {
      id: 3,
      title: "Girl with a Pearl Earring",
      artist: "Johannes Vermeer",
      category: "Painting",
      description: "Portrait of a girl wearing a pearl earring.",
      price: "$800,000",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg"
    },
    { id: 5, title: "Persistence of Memory", artist: "Salvador Dalí", category: "Painting", added: 2019, price: "$500,000", image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg" }, { id: 8, title: "The Last Supper", artist: "Leonardo da Vinci", category: "Painting", added: 2016, price: "$900,000", image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg" }
  ]);

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");
  const [modalData, setModalData] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [brightness, setBrightness] = useState(100);
  const [viewMode, setViewMode] = useState("grid");

  // Toggle wishlist
  const toggleWishlist = (title) => {
    setWishlist(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  // Add to cart
  const addToCart = (art) => {
    if (!cart.some(item => item.id === art.id)) {
      setCart(prev => [...prev, { ...art, buyer: { name: "", email: "", contact: "", address: "" } }]);
    }
    setDrawerOpen(true);
  };

  // Filtered artworks
  const getFilteredArtworks = () => {
    let filtered = artworks;
    if (search)
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.artist.toLowerCase().includes(search.toLowerCase())
      );
    if (category !== "all")
      filtered = filtered.filter(a => a.category === category);
    if (sort === "title")
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "artist")
      filtered = [...filtered].sort((a, b) => a.artist.localeCompare(b.artist));
    return filtered;
  };

  // ==== Navbar ====
  const Navbar = () => (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px", background: "#2196F3" }}>
      <button onClick={() => setSettingsOpen(!settingsOpen)}
        style={{ fontSize: "20px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
        ⚙️
      </button>
    </div>
  );

  // ==== Category + Sort ====
  const CategorySort = () => (
    <div style={{ padding: "10px" }}>
      <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "5px", width: "150px" }} />
      <select onChange={e => setCategory(e.target.value)} style={{ padding: "5px", marginLeft: "5px" }}>
        <option value="all">All</option>
        <option value="Painting">Painting</option>
        <option value="Sculpture">Sculpture</option>
      </select>
      <select onChange={e => setSort(e.target.value)} style={{ padding: "5px", marginLeft: "5px" }}>
        <option value="default">Default</option>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
      </select>
    </div>
  );

  // ==== Gallery ====
  const Gallery = () => (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      padding: "10px",
      filter: `brightness(${brightness}%)`,
      fontSize: `${fontSize}px`
    }}>
      {getFilteredArtworks().map(art => (
        <div key={art.id} style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "5px",
          width: viewMode === "grid" ? "220px" : "100%",
          display: "flex",
          flexDirection: viewMode === "grid" ? "column" : "row",
          cursor: "pointer",
          transition: "0.3s",
          boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
          backgroundColor: "#fff",
          alignItems: "center",
          gap: "5px",
        }}>
          <img
            src={art.image}
            alt={art.title}
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
            onClick={() => setModalData(art)}
          />
          <div>
            <h4 style={{ margin: "5px 0", color: "#333" }}>{art.title}</h4>
            <p style={{ margin: "2px 0", color: "#555" }}>{art.artist}</p>
            <p style={{ margin: "2px 0", fontWeight: "bold" }}>{art.price}</p>
            <button style={{ backgroundColor: "#FF4081", color: "#fff", border: "none", padding: "3px 6px", borderRadius: "4px" }} onClick={() => toggleWishlist(art.title)}>
              {wishlist.includes(art.title) ? "♥" : "♡"}
            </button>
            <button style={{ backgroundColor: "#4CAF50", color: "#fff", border: "none", padding: "3px 6px", borderRadius: "4px", marginLeft: "5px" }} onClick={() => addToCart(art)}>Buy</button>
          </div>
        </div>
      ))}
    </div>
  );

  // ==== Cart Drawer ====
  const CartDrawer = () => {
    if (!drawerOpen) return null;

    const handleInputChange = (index, field, value) => {
      setCart(prev => {
        const updated = [...prev];
        updated[index].buyer[field] = value;
        return updated;
      });
    };

    const removeItem = (index) => {
      setCart(prev => prev.filter((_, i) => i !== index));
    };

    const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[$,]/g, "")), 0);

    const handleBuyAll = () => {
      const incomplete = cart.some(item => !item.buyer.name || !item.buyer.email);
      if (incomplete) { alert("Please fill Name and Email for all items before buying."); return; }
      const timestamp = new Date().toLocaleString();
      const purchased = cart.map(item => ({ ...item, purchasedAt: timestamp }));
      setOrders(prev => [...prev, ...purchased]);
      setCart([]);
      alert("Purchase successful! Orders added.");
      setDrawerOpen(false);
    };

    return (
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "480px",
        height: "100%",
        background: "#f0f4f8",
        boxShadow: "-4px 0 10px rgba(0,0,0,0.2)",
        padding: "15px",
        overflowY: "auto",
        zIndex: 999
      }}>
        <h2 style={{ textAlign: "center" }}>Your Cart ({cart.length})</h2>
        <button style={{ float: "right", marginBottom: "10px" }} onClick={() => setDrawerOpen(false)}>Close</button>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item, i) => (
          <div key={i} style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
            background: "#fff"
          }}>
            <img src={item.image} alt={item.title} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "5px" }} />
            <h4>{item.title}</h4>
            <p><b>Artist:</b> {item.artist}</p>
            <p><b>Price:</b> {item.price}</p>
            <input type="text" placeholder="Full Name" value={item.buyer.name} onChange={e => handleInputChange(i, "name", e.target.value)} style={{ width: "100%", margin: "5px 0", padding: "5px" }} />
            <input type="email" placeholder="Email" value={item.buyer.email} onChange={e => handleInputChange(i, "email", e.target.value)} style={{ width: "100%", margin: "5px 0", padding: "5px" }} />
            <input type="text" placeholder="Contact Number" value={item.buyer.contact} onChange={e => handleInputChange(i, "contact", e.target.value)} style={{ width: "100%", margin: "5px 0", padding: "5px" }} />
            <input type="text" placeholder="Address" value={item.buyer.address} onChange={e => handleInputChange(i, "address", e.target.value)} style={{ width: "100%", margin: "5px 0", padding: "5px" }} />
            <button onClick={() => removeItem(i)} style={{ background: "red", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Remove</button>
          </div>
        ))}
        {cart.length > 0 && (
          <div style={{ textAlign: "center" }}>
            <h3>Total: ${totalAmount.toLocaleString()}</h3>
            <button onClick={handleBuyAll} style={{ background: "#4CAF50", color: "#fff", border: "none", padding: "10px 20px", fontSize: "16px", borderRadius: "6px", cursor: "pointer" }}>Buy All</button>
          </div>
        )}
      </div>
    );
  };

  // ==== Art Modal ====
  const ArtModal = () => {
    if (!modalData) return null;
    return (
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#fff", padding: "20px", border: "2px solid #FF9800", borderRadius: "10px", width: "400px", maxHeight: "80vh", overflowY: "auto", textAlign: "center" }}>
        <img src={modalData.image} alt={modalData.title} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }} />
        <h3>{modalData.title}</h3>
        <p>Artist: {modalData.artist}</p>
        <p>{modalData.description}</p>
        <button onClick={() => setModalData(null)}>Close</button>
      </div>
    );
  };

  // ==== Upload Form ====
  const UploadForm = () => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [cat, setCat] = useState("Painting");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");

    const uploadArtwork = () => {
      if (!title || !artist || !price || !image) {
        alert("Please fill all fields");
        return;
      }
      setArtworks(prev => [...prev, { id: prev.length + 1, title, artist, category: cat, price, image, description: "" }]);
      setUploadOpen(false);
    };

    return (
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#fff", padding: "20px", border: "2px solid #2196F3", borderRadius: "10px" }}>
        <h3>Upload Artwork</h3>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
        <input placeholder="Artist" value={artist} onChange={e => setArtist(e.target.value)} /><br />
        <select value={cat} onChange={e => setCat(e.target.value)}>
          <option>Painting</option>
          <option>Sculpture</option>
        </select><br />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} /><br />
        <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} /><br />
        {image && <img src={image} width="120" alt="preview" />}<br /><br />
        <button onClick={uploadArtwork}>Upload</button>
        <button onClick={() => setUploadOpen(false)}>Cancel</button>
      </div>
    );
  };

  // ==== Settings Panel ====
  const SettingsPanel = () => {
    if (!settingsOpen) return null;

    return (
      <div style={{ position: "fixed", top: "10%", left: "10%", background: "#FFF3E0", padding: "20px", border: "2px solid #FF9800", borderRadius: "10px", width: "400px" }}>
        <h3>Settings / Orders</h3>
        <button style={{ display: "block", margin: "5px 0" }} onClick={() => setDrawerOpen(true)}>Wishlist / Cart</button>
        <button style={{ display: "block", margin: "5px 0" }} onClick={() => setUser(null)}>Logout</button>
        <button style={{ display: "block", margin: "5px 0" }} onClick={() => setUploadOpen(true)}>Upload Artwork</button>
        <hr />
        <label>Font Size: {fontSize}px</label>
        <input type="range" min="12" max="24" value={fontSize} onChange={e => setFontSize(e.target.value)} /><br />
        <label>Brightness: {brightness}%</label>
        <input type="range" min="50" max="150" value={brightness} onChange={e => setBrightness(e.target.value)} /><br />
        <label>View Mode</label>
        <select value={viewMode} onChange={e => setViewMode(e.target.value)}>
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
        <hr />
        <h4>All Orders:</h4>
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.map((o, idx) => (
          <div key={idx} style={{ borderBottom: "1px solid #ccc", marginBottom: "5px", paddingBottom: "5px" }}>
            <p><b>Artwork:</b> {o.title} - <b>{o.price}</b></p>
            <p><b>Name:</b> {o.buyer.name}</p>
            <p><b>Email:</b> {o.buyer.email}</p>
            <p><b>Contact:</b> {o.buyer.contact}</p>
            <p><b>Address:</b> {o.buyer.address}</p>
            <p><i>Purchased At: {o.purchasedAt}</i></p>
          </div>
        ))}
        <button style={{ marginTop: "10px" }} onClick={() => setSettingsOpen(false)}>Close</button>
      </div>
    );
  };

  if (!user) return <CaptchaLogin onSuccess={() => setUser({ email: "user@example.com" })} />;

  return (
    <>
      <Navbar />
      <CategorySort />
      <Gallery />
      <CartDrawer />
      {uploadOpen && <UploadForm />}
      {modalData && <ArtModal />}
      {settingsOpen && <SettingsPanel />}
    </>
  );
}
