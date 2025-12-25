import React from "react";
import weatherbg from "../assets/weatherbg.mp4";
import "./BgVideo.css";
const BgVideo = () => (
  <video
    autoPlay
    loop
    muted
    className="fixed top-0 left-0 w-full h-full object-cover -z-10"
  >
    <source src="/bg.mp4" type="video/mp4" />
  </video>
);

export default BgVideo;
