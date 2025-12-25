import { useNavigate } from "react-router-dom";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import imageone from "/src/assets/darkened_image1.png";
import imagetwo from "/src/assets/darkened_image2.png";
import imagethree from "/src/assets/darkened_image3.png";
import imagefour from "/src/assets/darkened_image4.png";
import logonew from "/src/assets/Logonew.png";
import collagepage from "/src/assets/collageremoved.png";
import { useEffect, useRef } from "react";
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

  // FIXED SCROLL LOGIC
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjusted for your fixed navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="text-white">
      {!show && (
        <Element name="first">
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
                <div className="bg top-5 fixed w-[60vw] lg:h-16 rounded-lg flex items-center z-[100]">
                  <ul className="flex flex-row justify-between items-center w-full">
                    <motion.li
                      whileHover={{ scale: 0.8 }}
                      style={{ cursor: "pointer" }}
                      className="p-2 ml-5 rounded-lg"
                      onClick={() => scrollToSection("first")}
                    >
                      Home
                    </motion.li>
                    <motion.li
                      whileHover={{ scale: 0.8 }}
                      className="p-2 rounded-lg"
                      onClick={() => scrollToSection("second")}
                      style={{ cursor: "pointer" }}
                    >
                      About Us
                    </motion.li>
                    <div>
                      <h1 className="font-bold text-2xl">AgroGeek</h1>
                    </div>
                    <motion.li
                      whileHover={{ scale: 0.8 }}
                      className="p-2 rounded-lg"
                      onClick={() => scrollToSection("third")}
                      style={{ cursor: "pointer" }}
                    >
                      Services
                    </motion.li>
                    <motion.button
                      onClick={handleNavigation}
                      className="p-2 mr-5 rounded-lg bg-blue-800"
                    >
                      <motion.span whileHover={{ scale: 0.8 }}>
                        Login
                      </motion.span>
                    </motion.button>
                  </ul>
                </div>
              </div>
            </div>

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
                  cutting-edge online marketplace that directly connects
                  farmers, suppliers, and buyers. By eliminating middlemen, we
                  ensure fair pricing, transparency, and efficiency in
                  agricultural trade.
                </motion.p>
              </div>
              <div className="lg:h-[100vh] lg:w-[50vw] md:h-[50vh] md:w-[100vw] flex flex-col justify-center items-center">
                <motion.img
                  style={{ y: yTransform }}
                  src={logonew}
                  alt=""
                  className="lg:w-[25vw] lg:h-[55vh] md:w-[20vw] h-[50vh] rounded-xl"
                />
              </div>
            </div>
          </div>
        </Element>
      )}

      {/* ABOUT US SECTION */}
      <Element name="second">
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
            <div className="h-[100vh] w-[50vw] z-0 flex flex-col justify-center items-start pl-10">
              <motion.div style={{ scale }}>
                <motion.h1 className="text-5xl leading-loose text-left font-bold">
                  Crisis We Can't Ignore
                </motion.h1>
                <motion.p className="text-xl">
                  The environmental problems that we are facing are clearly
                  depicted in some real-life images of our locality. Where the
                  burning leaves, the woods which are being wasted. Ayurvedic
                  Companies are importing plants from foreign whereas they are
                  available in their land as well.
                  <br />
                  We are forming a link between the potential buyers and the
                  nature via sellers.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </Element>

      {/* SERVICES SECTION */}
      <Element name="third">
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
                  width: "30vw",
                  height: "55vh",
                  backgroundImage: `url(${collagepage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="rounded-xl shadow-xl mt-[2vw] ml-[2vw]"
              />
            </div>
            <motion.div
              style={{ x: xTransform }}
              className="h-[100vh] w-[50vw] z-0 flex flex-col justify-center items-start pl-10"
            >
              <motion.div>
                <motion.h1 className="text-6xl leading-loose text-left font-bold">
                  Services We Provide
                </motion.h1>
                <motion.p className="text-xl mr-5">
                  We mainly focusing on the natural waste which are being
                  produced and are trying to utilise various exotic plants.
                  Bringing together the business plan of utilizing nature's
                  waste and <br />
                  unutilized plants to a benificial and healthy ecosystem.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Element>

      {/* FOOTER */}
      <div
        id="fourth"
        className="h-screen flex justify-center items-center bg-gray-100 flex-row justify-between"
        style={{
          width: "100vw",
          height: "25vh",
          backgroundImage: `url(${imagefour})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-[33.3vw] h-[25vh] flex flex-col justify-center items-center">
          <div>
            <h1 className="text-3xl ml-5">Stay In Touch......</h1>
            <p className="text-wrap mr-5 ml-5 mt-5">
              To get the best services available Solving problems by bridging
              the gap between clients and business owners.
            </p>
          </div>
        </div>
        <div className="w-[33.3vw] h-[25vh] flex flex-col justify-start items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl mb-4 mt-5">Team Members</h1>
            <p className="text-xl">Shrestha Chakraborty</p>
            <p className="text-xl">Aritra Mukhopadhyay</p>
            <p className="text-xl">Suman Singha</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
