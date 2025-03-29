import { useNavigate } from "react-router-dom";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import imageone from "/src/assets/darkened_image1.png";
import imagetwo from "/src/assets/darkened_image2.png";
import imagethree from "/src/assets/darkened_image3.png";
import imagefour from "/src/assets/darkened_image4.png";
import logonew from "/src/assets/Logonew.png";
import collage from "/src/assets/collage.png";
import { useState } from "react";
import { Link, Element } from "react-scroll";
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
    }, 6000);
  };

  return (
    <div className="text-white">
      {show && (
        <div className="w-[100vw] h-[100vh] bg-white flex flex-col justify-center items-center">
          <motion.div
            style={{
              width: 100,
              height: 100,
              boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.5)",
            }}
            animate={{
              scale: [0.5, 1, 1, 0.5, 0.5],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["10%", "10%", "50%", "50%", "10%"],
            }}
            transition={{
              duration: 2,
              ease: easeInOut,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="bg-black text-white w-20 h-20 flex justify-center items-center"
          >
            Loading ....
          </motion.div>
        </div>
      )}

      {!show && (
        <div
          id="first"
          className="h-screen flex flex-col justify-center items-center bg-gray-100"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${imageone})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col justify-center items-center z-50">
            <div className="bg top-5 fixed w-[90vw] lg:h-16 rounded-lg flex items-center z-1">
              <ul className="flex flex-row justify-between items-center w-full">
                <motion.li
                  whileHover={{ scale: 0.8 }}
                  className="p-2 ml-5 rounded-lg"
                >
                  <Link to="first" smooth={true} duration={500}>
                    Home
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 0.8 }}
                  className="p-2 rounded-lg"
                >
                  <Link to="second" smooth={true} duration={500}>
                    About Us
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 0.8 }}
                  className="p-2 rounded-lg"
                >
                  <Link to="third" smooth={true} duration={500}>
                    Seller
                  </Link>
                </motion.li>
                <div>
                  <h1 className="font-bold text-2xl">AgroGeek</h1>
                </div>
                <motion.li
                  whileHover={{ scale: 0.8 }}
                  className="p-2 rounded-lg"
                >
                  <Link to="fourth" smooth={true} duration={1500}>
                    Buyer
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 0.8 }}
                  className="p-2 rounded-lg"
                >
                  <Link to="/" smooth={true} duration={500}>
                    Services
                  </Link>
                </motion.li>
                <motion.button
                  onClick={handleNavigation}
                  whileHover={{ scale: 0.8 }}
                  className="p-2 mr-5 rounded-lg"
                >
                  Login/Signup
                </motion.button>
              </ul>
            </div>
          </div>

          {/* Parallax Effect on Heading */}
          <div className="flex flex-row">
            <div
              id="leftone"
              className="h-[100vh] w-[50vw] z-0 flex flex-col justify-center items-start pl-20"
            >
              <motion.h1
                id="text"
                className="text-7xl leading-loose text-left font-bold"
                style={{ y: yTransform }}
              >
                AgroGeek
              </motion.h1>
              <motion.p style={{ y: yTransform }} className="text-xl">
                Agrogeek is transforming the agricultural market with a
                cutting-edge online marketplace that directly connects farmers,
                suppliers, and buyers. By eliminating middlemen, we ensure fair
                pricing, transparency, and efficiency in agricultural trade. Our
                platform provides seamless access to a wide range of products,
                including crops, machinery, fertilizers, and seeds, catering to
                both small-scale farmers and large agribusinesses.
              </motion.p>
            </div>
            <div className="h-[100vh] w-[50vw] flex flex-col justify-center items-center">
              <motion.div
                style={{
                  width: "25vw",
                  height: "55vh",
                  backgroundImage: `url(${logonew})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  y: yTransform,
                }}
                className="w-[25vw] h-[55vh] bg-red-500 rounded-xl shadow-xl mt-[2vw] ml-[2vw]"
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
          <div className="h-[100vh] w-[50vw] flex flex-col justify-center items-center">
            <motion.div
              style={{
                scale,
                width: "25vw",
                height: "55vh",
                backgroundImage: `url(${collage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="w-[25vw] h-[55vh] bg-red-500 rounded-xl shadow-xl mt-[2vw] ml-[2vw]"
            >
              {/* <motion.img className="w-[10vw] h-[40vh]" src={logo} alt="" /> */}
            </motion.div>
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
