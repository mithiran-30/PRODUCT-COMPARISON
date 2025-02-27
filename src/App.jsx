import React, { useState } from "react";
import "./App.css";

// Login Page Component
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      onLogin();
    } else {
      alert("Please enter username and password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to Mobile Comparison</h1>
        <p>Login to compare the latest mobiles</p>
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

// Navigation Bar Component
const NavBar = ({ onLogout, onShowComparison }) => {
  return (
    <nav className="navbar">
      <h1>Mobile Comparison App</h1>
      <div>
        <button onClick={onShowComparison} className="compare-button">
          Show Comparison
        </button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

// Comparison Page Component
const ComparisonPage = ({ selectedMobiles, onBack }) => {
  // Function to calculate the best product
  const calculateBestProduct = () => {
    let bestProduct = null;
    let bestScore = -1;

    selectedMobiles.forEach((mobile) => {
      let score = 0;
      score += parseInt(mobile.ram); // Higher RAM = better
      score += parseInt(mobile.storage.split("/")[0]); // Higher base storage = better
      score += parseInt(mobile.battery.replace("mAh", "")); // Higher battery = better
      score += parseInt(mobile.camera.split("MP")[0]); // Higher main camera = better

      if (score > bestScore) {
        bestScore = score;
        bestProduct = mobile;
      }
    });

    return bestProduct;
  };

  const bestProduct = calculateBestProduct();

  return (
    <div className="comparison-page">
      <h2>Comparison</h2>
      <div className="comparison-container">
        <table>
          <thead>
            <tr>
              <th>Specification</th>
              <th>{selectedMobiles[0].brand} {selectedMobiles[0].model}</th>
              <th>{selectedMobiles[1].brand} {selectedMobiles[1].model}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Display</td>
              <td>{selectedMobiles[0].display}</td>
              <td>{selectedMobiles[1].display}</td>
            </tr>
            <tr>
              <td>Processor</td>
              <td>{selectedMobiles[0].processor}</td>
              <td>{selectedMobiles[1].processor}</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>{selectedMobiles[0].ram}</td>
              <td>{selectedMobiles[1].ram}</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>{selectedMobiles[0].storage}</td>
              <td>{selectedMobiles[1].storage}</td>
            </tr>
            <tr>
              <td>Camera</td>
              <td>{selectedMobiles[0].camera}</td>
              <td>{selectedMobiles[1].camera}</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>{selectedMobiles[0].battery}</td>
              <td>{selectedMobiles[1].battery}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{selectedMobiles[0].price}</td>
              <td>{selectedMobiles[1].price}</td>
            </tr>
          </tbody>
        </table>
        <div className="best-product">
          <h3>🏆 Best Product: {bestProduct.brand} {bestProduct.model}</h3>
          <p>This product has the highest overall score based on specifications.</p>
        </div>
      </div>
      <button onClick={onBack} className="back-button">
        Back to Home
      </button>
    </div>
  );
};

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMobiles, setSelectedMobiles] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [theme, setTheme] = useState("#ffffff"); // Background theme

  // Sample mobile data with working web image URLs
  const mobiles = [
    {
      id: 1,
      brand: "Apple",
      model: "iPhone 15 Pro",
      display: "6.1-inch Super Retina XDR",
      processor: "A17 Pro",
      ram: "8GB",
      storage: "128GB/256GB/512GB/1TB",
      camera: "48MP + 12MP + 12MP",
      battery: "3274mAh",
      price: "$999",
      image: "https://via.placeholder.com/300x200?text=iPhone+15+Pro", // Placeholder image
      theme: "#f5f5f7", // Light gray theme
    },
    {
      id: 2,
      brand: "Samsung",
      model: "Galaxy S23 Ultra",
      display: "6.8-inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 2",
      ram: "8GB/12GB",
      storage: "256GB/512GB/1TB",
      camera: "200MP + 12MP + 10MP + 10MP",
      battery: "5000mAh",
      price: "$1199",
      image: "https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-s918-413546-sm-s918bzkgins-thumb-534606516?$216_216_PNG$",
      theme: "#1428a0", // Samsung blue theme
    },
    {
      id: 3,
      brand: "Google",
      model: "Pixel 8 Pro",
      display: "6.7-inch OLED",
      processor: "Google Tensor G3",
      ram: "12GB",
      storage: "128GB/256GB/512GB",
      camera: "50MP + 48MP + 48MP",
      battery: "5050mAh",
      price: "$999",
      image: "https://store.google.com/intl/en/googlephone/images/pixel-8-pro/top-mobile.png?w=320&h=167",
      theme: "#4285f4", // Google blue theme
    },
    {
      id: 4,
      brand: "OnePlus",
      model: "11 5G",
      display: "6.7-inch Fluid AMOLED",
      processor: "Snapdragon 8 Gen 2",
      ram: "8GB/16GB",
      storage: "128GB/256GB",
      camera: "50MP + 48MP + 32MP",
      battery: "5000mAh",
      price: "$799",
      image: "https://image01.oneplus.net/shop/2023/01/04/10/1/7e1f7e9e-8a1f-4f3f-9f9f-9f9f9f9f9f9f.png",
      theme: "#f5010c", // OnePlus red theme
    },
    {
      id: 5,
      brand: "Xiaomi",
      model: "13 Pro",
      display: "6.73-inch AMOLED",
      processor: "Snapdragon 8 Gen 2",
      ram: "8GB/12GB",
      storage: "128GB/256GB/512GB",
      camera: "50MP + 50MP + 50MP",
      battery: "4820mAh",
      price: "$999",
      image: "https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-13-pro/specs-header.png",
      theme: "#ff6900", // Xiaomi orange theme
    },
    {
      id: 6,
      brand: "Oppo",
      model: "Find X6 Pro",
      display: "6.82-inch AMOLED",
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB/512GB",
      camera: "50MP + 50MP + 50MP",
      battery: "5000mAh",
      price: "$1199",
      image: "https://image.oppo.com/content/dam/oppo/common/mkt/specs/find-x6-pro-en.png",
      theme: "#0088cc", // Oppo blue theme
    },
    {
      id: 7,
      brand: "Vivo",
      model: "X90 Pro",
      display: "6.78-inch AMOLED",
      processor: "MediaTek Dimensity 9200",
      ram: "12GB",
      storage: "256GB/512GB",
      camera: "50MP + 50MP + 12MP",
      battery: "4870mAh",
      price: "$1099",
      image: "https://www.vivo.com/content/dam/vivo/in/vivo-x90-pro-plus/images/overview/vivo-x90-pro-plus-overview-1.png",
      theme: "#000000", // Vivo black theme
    },
    {
      id: 8,
      brand: "Realme",
      model: "GT 3",
      display: "6.74-inch AMOLED",
      processor: "Snapdragon 8+ Gen 1",
      ram: "8GB/12GB",
      storage: "128GB/256GB",
      camera: "50MP + 8MP + 2MP",
      battery: "4600mAh",
      price: "$699",
      image: "https://www.realme.com/content/dam/realme/in/gt-3/images/overview/gt-3-overview-1.png",
      theme: "#ff3a44", // Realme red theme
    },
    {
      id: 9,
      brand: "Asus",
      model: "ROG Phone 7",
      display: "6.78-inch AMOLED",
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB/16GB",
      storage: "256GB/512GB",
      camera: "50MP + 13MP + 5MP",
      battery: "6000mAh",
      price: "$1299",
      image: "https://www.asus.com/content/dam/asus/in/rog-phone-7/images/overview/rog-phone-7-overview-1.png",
      theme: "#ff0033", // Asus red theme
    },
    {
      id: 10,
      brand: "Sony",
      model: "Xperia 1 V",
      display: "6.5-inch OLED",
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB/512GB",
      camera: "48MP + 12MP + 12MP",
      battery: "5000mAh",
      price: "$1399",
      image: "https://www.sony.com/content/dam/sony/in/xperia-1-v/images/overview/xperia-1-v-overview-1.png",
      theme: "#0000ff", // Sony blue theme
    },
  ];

  const handleCompare = (mobile) => {
    if (selectedMobiles.includes(mobile)) {
      setSelectedMobiles(selectedMobiles.filter((item) => item !== mobile));
      setTheme("#ffffff"); // Reset background theme
    } else {
      if (selectedMobiles.length < 2) {
        setSelectedMobiles([...selectedMobiles, mobile]);
        setTheme(mobile.theme); // Set background theme based on the selected mobile
      } else {
        alert("You can compare only 2 mobiles at a time.");
      }
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedMobiles([]);
    setShowComparison(false);
    setTheme("#ffffff"); // Reset background theme
  };

  const handleShowComparison = () => {
    if (selectedMobiles.length === 2) {
      setShowComparison(true);
    } else {
      alert("Please select exactly 2 mobiles to compare.");
    }
  };

  return (
    <div className="App" style={{ backgroundColor: theme }}>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : showComparison ? (
        <ComparisonPage
          selectedMobiles={selectedMobiles}
          onBack={() => setShowComparison(false)}
        />
      ) : (
        <>
          <NavBar onLogout={handleLogout} onShowComparison={handleShowComparison} />
          <div className="mobile-list">
            {mobiles.map((mobile) => (
              <div
                key={mobile.id}
                className="mobile-card"
                style={{ borderColor: mobile.theme }}
              >
                <img
                  src={mobile.image}
                  alt={`${mobile.brand} ${mobile.model}`}
                  className="mobile-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found"; // Fallback image
                  }}
                />
                <h2>{mobile.brand} {mobile.model}</h2>
                <div className="specs">
                  <p><strong>Display:</strong> {mobile.display}</p>
                  <p><strong>Processor:</strong> {mobile.processor}</p>
                  <p><strong>RAM:</strong> {mobile.ram}</p>
                  <p><strong>Storage:</strong> {mobile.storage}</p>
                  <p><strong>Camera:</strong> {mobile.camera}</p>
                  <p><strong>Battery:</strong> {mobile.battery}</p>
                  <p><strong>Price:</strong> {mobile.price}</p>
                </div>
                <button
                  onClick={() => handleCompare(mobile)}
                  style={{ backgroundColor: mobile.theme }}
                >
                  {selectedMobiles.includes(mobile) ? "Remove" : "Compare"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;