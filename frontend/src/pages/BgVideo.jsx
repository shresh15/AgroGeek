import React from "react";
import weatherbg from "../assets/weatherbg.mp4";
import "./BgVideo.css";
function BgVideo() {
  return (
    <div className="container">
      <video src={weatherbg} muted loop autoPlay></video>
    </div>
  );
}

export default BgVideo;
