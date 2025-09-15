import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import PortfolioLoadingScreen from "./PortfolioLoadingScreen";

export default function Banner() {
  const [showLoading, setShowLoading] = useState(false);
  const [targetRoute, setTargetRoute] = useState("");
  const navigate = useNavigate();

  const handleDragonClick = (dragonId) => {
    // Determine route based on dragon item
    let route = "";
    if (dragonId >= 1 && dragonId <= 5) {
      route = "/portfolio-generator/portfolio1";
    } else if (dragonId >= 6 && dragonId <= 10) {
      route = "/portfolio-generator/portfolio2";
    }
    
    if (route) {
      setTargetRoute(route);
      setShowLoading(true);
    }
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    navigate(targetRoute);
  };

  return (
    <div className="banner">
      <div   className="slider" style={{ "--quantity": 10 }}>
        <div id="dragon-item-1" className="item" style={{ "--position": 1 }} onClick={() => handleDragonClick(1)}>
          <img src="/images/dragon_1.jpg" alt="dragon 1" />
        </div>
        <div id="dragon-item-2" className="item" style={{ "--position": 2 }} onClick={() => handleDragonClick(2)}>
          <img src="/images/dragon_2.jpg" alt="dragon 2" />
        </div>
        <div id="dragon-item-3" className="item" style={{ "--position": 3 }} onClick={() => handleDragonClick(3)}>
          <img src="/images/dragon_3.jpg" alt="dragon 3" />
        </div>
        <div id="dragon-item-4" className="item" style={{ "--position": 4 }} onClick={() => handleDragonClick(4)}>
          <img src="/images/dragon_4.jpg" alt="dragon 4" />
        </div>
        <div id="dragon-item-5" className="item" style={{ "--position": 5 }} onClick={() => handleDragonClick(5)}>
          <img src="/images/dragon_5.jpg" alt="dragon 5" />
        </div>
        <div id="dragon-item-6" className="item" style={{ "--position": 6 }} onClick={() => handleDragonClick(6)}>
          <img src="/images/dragon_6.jpg" alt="dragon 6" />
        </div>
        <div id="dragon-item-7" className="item" style={{ "--position": 7 }} onClick={() => handleDragonClick(7)}>
          <img src="/images/dragon_7.jpg" alt="dragon 7" />
        </div>
        <div id="dragon-item-8" className="item" style={{ "--position": 8 }} onClick={() => handleDragonClick(8)}>
          <img src="/images/dragon_8.jpg" alt="dragon 8" />
        </div>
        <div id="dragon-item-9" className="item" style={{ "--position": 9 }} onClick={() => handleDragonClick(9)}>
          <img src="/images/dragon_9.jpg" alt="dragon 9" />
        </div>
        <div id="dragon-item-10" className="item" style={{ "--position": 10 }} onClick={() => handleDragonClick(10)}>
          <img src="/images/dragon_10.jpg" alt="dragon 10" />
        </div>
      </div>

      <div className="content">
        <h1 data-content="CSS ONLY">ORIGIN</h1>
        <div className="author">
          <h2>Think Tank</h2>
          <p>
            <b>portfolio Design</b>
          </p>
          <p>Built with Origin</p>
        </div>
        <div className="model"></div>
      </div>
      
      {/* Loading Screen */}
      <PortfolioLoadingScreen 
        isVisible={showLoading} 
        onComplete={handleLoadingComplete} 
      />
    </div>
  );
}
