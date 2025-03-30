import { useNavigate } from "react-router-dom";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import imageone from "/src/assets/darkened_image1.png";
import imagetwo from "/src/assets/darkened_image2.png";
import imagethree from "/src/assets/darkened_image3.png";
import imagefour from "/src/assets/darkened_image4.png";
import logonew from "/src/assets/Logonew.png";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Element } from "react-scroll";

import ImageSlider from "./ImageSlider";
import "/public/home.css";

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.6], [-800, -50]);
  const xTransform = useTransform(scrollYProgress, [0, 0.6], [1000, 0]);

  const yTransform = useTransform(scrollY, [0, 200], [0, -250]);
  const scale = useTransform(scrollY, [0, 600], [0, 1]);

  const [show, setShow] = useState(false);

  const handleNavigation = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      navigate("/register");
    }, 0);
  };

  return (
    <div className="text-white">
      {!show && (
        <div
          id="first"
          className="h-screen flex flex-col justify-center items-center bg-gray-100 flex-wrap"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${imageone})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="lg:block">
            <div className="flex flex-col justify-center items-center z-50">
              <div className="bg top-5 fixed w-[60vw] lg:h-16 rounded-lg flex items-center z-1">
                <ul className="flex flex-row justify-between items-center w-full">
                  <motion.li
                    whileHover={{ scale: 0.8 }}
                    style={{ cursor: "pointer" }}
                    className="p-2 ml-5 rounded-lg"
                  >
                    <Link
                      to="first"
                      style={{ cursor: "pointer" }}
                      smooth={true}
                      duration={500}
                    >
                      Home
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 0.8 }}
                    className="p-2 rounded-lg"
                  >
                    <Link
                      to="second"
                      style={{ cursor: "pointer" }}
                      smooth={true}
                      duration={500}
                    >
                      About Us
                    </Link>
                  </motion.li>
                  {/* <motion.li
                    whileHover={{ scale: 0.8 }}
                    className="p-2 rounded-lg"
                  >
                    <Link
                      to="third"
                      style={{ cursor: "pointer" }}
                      smooth={true}
                      duration={500}
                    >
                      Seller
                    </Link>
                  </motion.li> */}
                  <div>
                    <h1 className="font-bold text-2xl">AgroGeek</h1>
                  </div>
                  {/* <motion.li
                    whileHover={{ scale: 0.8 }}
                    className="p-2 rounded-lg"
                  >
                    <Link
                      to="fourth"
                      style={{ cursor: "pointer" }}
                      smooth={true}
                      duration={1000}
                    >
                      Buyer
                    </Link>
                  </motion.li> */}
                  <motion.li
                    whileHover={{ scale: 0.8 }}
                    className="p-2 rounded-lg"
                  >
                    <Link
                      to="/"
                      style={{ cursor: "pointer" }}
                      smooth={true}
                      duration={500}
                    >
                      Services
                    </Link>
                  </motion.li>
                  <motion.button
                    onClick={handleNavigation}
                    className="p-2 mr-5 rounded-lg bg-blue-800"
                  >
                    <motion.span whileHover={{ scale: 0.8 }}>Login</motion.span>
                  </motion.button>
                </ul>
              </div>
            </div>
          </div>

          {/* Parallax Effect on Heading */}
          <div className="lg:flex lg:flex-row md:flex md:flex-col justify-center items-center md:justify-center md:items-center">
            <div
              id="leftone"
              className="lg:h-[100vh] lg:w-[50vw] md:h-[50vh] md:w-[100vw] z-0 md:flex md:flex-col md:justify-center md:items-start md:pl-20 lg:pt-0 md:pt-10 lg:text-left md:text-center"
            >
              <motion.h1
                id="text"
                className="text-7xl leading-loose text-left font-bold lg:text-left md:text-center"
                style={{ y: yTransform }}
              >
                AgroGeek
              </motion.h1>
              <motion.p
                style={{ y: yTransform }}
                className="lg:text-xl lg:block md:hidden"
              >
                Agrogeek is transforming the agricultural market with a
                cutting-edge online marketplace that directly connects farmers,
                suppliers, and buyers. By eliminating middlemen, we ensure fair
                pricing, transparency, and efficiency in agricultural trade. Our
                platform provides seamless access to a wide range of products,
                including crops, machinery, fertilizers, and seeds, catering to
                both small-scale farmers and large agribusinesses.
              </motion.p>
            </div>
            <div className="lg:h-[100vh] lg:w-[50vw] md:h-[50vh] md:w-[100vw] flex flex-col justify-center items-center">
              {/* <motion.div
                style={{
                  width: "25vw",
                  height: "55vh",
                  // backgroundImage: `url(${logonew})`,
                  // backgroundRepeat: "no-repeat",
                  // backgroundSize: "cover",
                  y: yTransform,
                }}
                className="w-[25vw] h-[55vh] bg-red-500 rounded-xl shadow-xl mt-[2vw] ml-[2vw]"
              /> */}
              <motion.img
                style={{ y: yTransform }}
                src={logonew}
                alt=""
                className="lg:w-[25vw] lg:h-[55vh] md:w-[20vw] h-[50vh] rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
      <div
        id="second"
        className="h-screen flex flex-col justify-center items-center bg-gray-100"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${imagetwo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-row">
          <div className="h-[100vh] w-[50vw] flex flex-col justify-center items-center mt-20 top-[70px]">
            <ImageSlider />
          </div>
          <div
            id="leftone"
            className="h-[100vh] w-[50vw] z-0 flex flex-col justify-center items-start pl-10"
          >
            <motion.div
              className=""
              style={{
                scale,
              }}
            >
              <motion.h1
                id="text"
                className="text-7xl leading-loose text-left font-bold"
                style={{}}
              >
                AgroGeek
              </motion.h1>
              <motion.p style={{}} className="text-xl">
                Agrogeek is transforming the agricultural market with a
                cutting-edge online marketplace that directly connects farmers,
                suppliers, and buyers. By eliminating middlemen, we ensure fair
                pricing, transparency, and efficiency in agricultural trade. Our
                platform provides seamless access to a wide range of products,
                including crops, machinery, fertilizers, and seeds, catering to
                both small-scale farmers and large agribusinesses.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
      <div
        id="third"
        className="h-screen flex flex-col justify-center items-center bg-gray-100"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${imagethree})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-row">
          <div className="h-[100vh] w-[50vw] flex flex-col justify-center items-center">
            <motion.div
              style={{
                x,
                width: "25vw",
                height: "55vh",
                backgroundImage: `url(${logonew})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="w-[25vw] h-[55vh] bg-red-500 rounded-xl shadow-xl mt-[2vw] ml-[2vw]"
            >
              {/* <motion.img className="w-[10vw] h-[40vh]" src={logo} alt="" /> */}
            </motion.div>
          </div>
          <motion.div
            style={{ x: xTransform }}
            id="leftone"
            className="h-[100vh] w-[50vw] z-0 flex flex-col justify-center items-start pl-10"
          >
            <motion.div>
              <motion.h1
                id="text"
                className="text-7xl leading-loose text-left font-bold"
                style={{}}
              >
                AgroGeek
              </motion.h1>
              <motion.p style={{}} className="text-xl">
                Agrogeek is transforming the agricultural market with a
                cutting-edge online marketplace that directly connects farmers,
                suppliers, and buyers. By eliminating middlemen, we ensure fair
                pricing, transparency, and efficiency in agricultural trade. Our
                platform provides seamless access to a wide range of products,
                including crops, machinery, fertilizers, and seeds, catering to
                both small-scale farmers and large agribusinesses.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div
        id="fourth"
        className="h-screen flex flex-col justify-center items-center bg-gray-100"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${imagefour})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default Home;
