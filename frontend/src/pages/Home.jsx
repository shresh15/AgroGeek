import { useNavigate } from "react-router-dom";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import imageone from "/src/assets/darkened_image1.png";
import imagetwo from "/src/assets/darkened_image2.png";
import imagethree from "/src/assets/darkened_image3.png";
import imagefour from "/src/assets/darkened_image4.png";
import logonew from "/src/assets/Logonew.png";
import collagepage from "/src/assets/collageremoved.png";
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
                including fallen leaves,woods and ayurvedic plants catering to
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
                className="text-5xl leading-loose text-left font-bold"
                style={{}}
              >
                Crisis We Can't Ignore
              </motion.h1>
              <motion.p style={{}} className="text-xl">
                The environmental problems that we are facing are vlearly
                depicted in some real-life images of our locality.Where the
                burning leaves,the woods which are being wasted after they the
                trees are cut down and the ayurvedi an dexotic plants that are
                of high importance being abundand in som eplaces which could be
                of high monetory value and could also benefit our health in
                various ways.
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
                width: "30vw",
                height: "55vh",
                backgroundImage: `url(${collagepage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="w-[25vw] h-[55vh] rounded-xl shadow-xl mt-[2vw] ml-[2vw]"
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
                className="text-6xl leading-loose text-left font-bold"
                style={{}}
              >
                Services We Provide
              </motion.h1>
              <motion.p style={{}} className="text-xl mr-5">
                We mainly focusing on the natural waste which are being produced
                and are trhying to utilise various exortic plants and ayurvedic
                plants for the use of the people. In this era most of the places
                consisting of natural tress and plants consists of a huge loads
                of natural waste so our service mainly aims to monitise the bi
                products and the natural services, that we obtain to inturned
                profit are business as well as natures conditions.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
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
        <div className="w-[33.3vw] h-[25vh]">
          <h1 className="text-center text-2xl mt-5">Contact Details</h1>
          <div className="flex flex-row justify-center items-center">
            <a href="#" target="blank">
              <svg
                className="m-2"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="70"
                height="70"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#3F51B5"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                ></path>
                <path
                  fill="#FFF"
                  d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                ></path>
              </svg>
            </a>
            <a href="#">
              <svg
                className="m-2"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="70"
                height="70"
                viewBox="0 0 48 48"
              >
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                  cx="19.38"
                  cy="42.035"
                  r="44.899"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#fd5"></stop>
                  <stop offset=".328" stop-color="#ff543f"></stop>
                  <stop offset=".348" stop-color="#fc5245"></stop>
                  <stop offset=".504" stop-color="#e64771"></stop>
                  <stop offset=".643" stop-color="#d53e91"></stop>
                  <stop offset=".761" stop-color="#cc39a4"></stop>
                  <stop offset=".841" stop-color="#c837ab"></stop>
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                ></path>
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                  cx="11.786"
                  cy="5.54"
                  r="29.813"
                  gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#4168c9"></stop>
                  <stop
                    offset=".999"
                    stop-color="#4168c9"
                    stop-opacity="0"
                  ></stop>
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                ></path>
                <path
                  fill="#fff"
                  d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                ></path>
                <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                <path
                  fill="#fff"
                  d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                ></path>
              </svg>
            </a>
            <a href="https://x.com/Status_Code_" target="_blank">
              <svg
                className="bg-white sm:m-7 m-2 mr-5"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 50 50"
              >
                <path d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
