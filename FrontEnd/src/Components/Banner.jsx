import React from "react";
import "./Banner.css";

export default function Banner() {
  return (
    <div className="banner">
      <div className="slider" style={{ "--quantity": 10 }}>
        <div className="item" style={{ "--position": 1 }}>
          <img src="/images/dragon_1.jpg" alt="dragon 1" />
        </div>
        <div className="item" style={{ "--position": 2 }}>
          <img src="/images/dragon_2.jpg" alt="dragon 2" />
        </div>
        <div className="item" style={{ "--position": 3 }}>
          <img src="/images/dragon_3.jpg" alt="dragon 3" />
        </div>
        <div className="item" style={{ "--position": 4 }}>
          <img src="/images/dragon_4.jpg" alt="dragon 4" />
        </div>
        <div className="item" style={{ "--position": 5 }}>
          <img src="/images/dragon_5.jpg" alt="dragon 5" />
        </div>
        <div className="item" style={{ "--position": 6 }}>
          <img src="/images/dragon_6.jpg" alt="dragon 6" />
        </div>
        <div className="item" style={{ "--position": 7 }}>
          <img src="/images/dragon_7.jpg" alt="dragon 7" />
        </div>
        <div className="item" style={{ "--position": 8 }}>
          <img src="/images/dragon_8.jpg" alt="dragon 8" />
        </div>
        <div className="item" style={{ "--position": 9 }}>
          <img src="/images/dragon_9.jpg" alt="dragon 9" />
        </div>
        <div className="item" style={{ "--position": 10 }}>
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
    </div>
  );
}
