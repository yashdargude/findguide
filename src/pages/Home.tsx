import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
// Add your image here
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";
import { motion } from "framer-motion";

function Home() {
  const services = [
    {
      title: "Individual Therapy",
      image:
        "https://heartitout.in/home-new/assets/images/our-services/individual-vector.svg",
      link: "https://heartitout.in/therapists/?therapy=Individual",
    },
    {
      title: "Couples Therapy",
      image:
        "https://heartitout.in/home-new/assets/images/our-services/couple-vector.svg",
      link: "https://heartitout.in/therapists/?therapy=Couples",
    },
    {
      title: "Family Therapy",
      image:
        "https://heartitout.in/home-new/assets/images/our-services/family-vector.svg",
      link: "https://heartitout.in/therapists/?therapy=Family",
    },
    {
      title: "Geriatric Care",
      image:
        "https://heartitout.in/home-new/assets/images/our-services/geriatic-vector.svg",
      link: "https://heartitout.in/contact-us/",
    },
    {
      title: "Child Therapy",
      image:
        "https://heartitout.in/home-new/assets/images/our-services/child-vector.svg",
      link: "https://heartitout.in/therapists/?therapy=Child",
    },
    {
      title: "Psychiatry",
      image:
        "https://heartitout.in/home-new/assets/images/our-services/psych-vector.svg",
      link: "https://heartitout.in/therapists/?therapy=Psychiatric",
    },
    {
      title: "Career Counselling",
      image:
        "https://heartitout.in/home-new/assets/images/our-services/career-vector.svg",
      link: "https://heartitout.in/career-counselling/",
    },
  ];
  return (
    <div className="relative">
      <Header />
      <section className="mt-24 pt-4 pb-24 bg-gradient-radial from-gradientred via-gradientblue to-darkblue">
        <div className="container mx-auto w-full flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full mt-15">
            <h1
              className="mt-10 text-4xl md:text-5xl lg:text-6xl text-center font-extrabold tracking-tight mx-4 md:mx-56 lg:mx-80 
  bg-gradient-to-r from-red-500 via-orange-400 to-red-100 bg-clip-text text-transparent drop-shadow-lg"
            >
              FindYourGuide
            </h1>
            <h2 className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white text-center font-medium mt-2 tracking-wide">
              <span className="text-red-500 font-semibold">Find Hope</span>,
              <span className="text-orange-400 font-semibold"> Find Help</span>,
              <span className="text-white-300 font-semibold">
                {" "}
                FindYourGuide.
              </span>
            </h2>
            <br />
            <div className="mb-20 flex flex-col lg:flex-row gap-4 items-center justify-center mt-24">
              <motion.div
                className="text-white font-semibold text-center py-2 px-4 lg:px-6 lg:py-4 rounded-full 
    bg-black bg-opacity-30 border border-gray-400 shadow-lg shadow-yellow-500/50"
                whileHover={{
                  boxShadow: "0px 0px 15px rgba(212, 212, 212)", // Bright glow
                }}
              >
                🗓️ Seamless Booking
              </motion.div>
              <motion.div
                className="text-white font-semibold text-center py-2 px-4 lg:px-6 lg:py-4 rounded-full 
    bg-black bg-opacity-30 border border-gray-400 shadow-lg shadow-yellow-500/50"
                whileHover={{
                  boxShadow: "0px 0px 15px rgba(212, 212, 212)", // Bright glow
                }}
              >
                📠 Care on Demand
              </motion.div>
              <motion.div
                className="text-white font-semibold text-center py-2 px-4 lg:px-6 lg:py-4 rounded-full 
    bg-black bg-opacity-30 border border-gray-400 shadow-lg shadow-yellow-500/50"
                whileHover={{
                  boxShadow: "0px 0px 15px rgb(212, 212, 212)", // Bright glow
                }}
              >
                👆 Freedom to Choose
              </motion.div>
            </div>

            <p className="mb-10 text-gray-100 text-lg lg:text-2xl text-center font-medium tracking-normal lg:leading-9 px-6 lg:px-40 mt-8">
              <span className="text-gray-100">
                Feeling overwhelmed or lost?
              </span>
              <br />
              You’re not alone.{" "}
              <span className="text-red-400 font-medium">
                FindYourGuide
              </span>{" "}
              connects you with
              <span className="text-red-400"> experienced counselors</span> who
              truly listen and care.
              <br />
              Schedule{" "}
              <span className="text-red-400 font-semibold">
                appointments effortlessly
              </span>{" "}
              and take the first step toward a{" "}
              <span className="text-red-400 font-semibold">
                happier, healthier life.
              </span>
              <br />
              <span className="text-red-400 font-medium">
                You deserve support—start your journey today.
              </span>
            </p>
          </div>
          <br />
          <br />
          <br />
          <section className="mt-20 flex flex-col lg:flex-row items-center w-5/6 mx-auto px-0 gap-0">
            {/* Left: Image */}
            <div className="w-full lg:w-[45%] flex justify-center">
              <img
                src="https://d37v7cqg82mgxu.cloudfront.net/img/home/online-therapy-from-laptop.jpg"
                alt="Online Therapy"
                className="w-[80%] md:w-[70%] lg:w-[60%] rounded-lg shadow-lg 
               shadow-white drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]"
              />
            </div>

            {/* Right: Text */}
            <div className="w-full lg:w-1/2 px-0 mt-6 lg:mt-0">
              <h3 className="text-white text-2xl font-semibold uppercase tracking-wide">
                How Therapy Works
              </h3>
              <div className="mt-5 space-y-5">
                <div className="flex items-start">
                  <span className="text-4xl font-bold text-white mr-3">1</span>
                  <p className="text-white text-xl">
                    Get matched with a mental health professional.
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="text-4xl font-bold text-white mr-3">2</span>
                  <p className="text-white text-xl">
                    Develop a treatment plan with your therapist.
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="text-4xl font-bold text-white mr-3">3</span>
                  <p className="text-white text-xl">
                    Receive support, guidance, and develop new coping skills to
                    stay on track with your treatment plan.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* NEW SECTION - Image Right, Text Left */}
          <section className="mt-20 flex flex-col-reverse lg:flex-row items-center w-5/6 mx-auto px-0 gap-0  ">
            {/* Left: Text */}
            <div className="w-full lg:w-1/2 px-0 mt-6 lg:mt-0">
              <h3 className="text-white text-lg uppercase tracking-wide">
                Therapy for Any Issue
              </h3>
              <p className="text-white text-2xl font-semibold mt-4">
                Our licensed therapists are standing by to help
              </p>
              <p className="text-gray-100 text-md   mt-4">
                They are experts in many conditions, treatment approaches and
                navigating life’s challenges. Your therapist will provide:
              </p>
              <ul className="mt-4 text-white text-md font-sm space-y-3">
                <li>
                  <i className="fa-solid fa-check text-white"></i> Daily
                  messaging support to help you through tough moments.
                </li>
                <li>
                  <i className="fa-solid fa-check text-white"></i> Goals and a
                  plan to get there.
                </li>
                <li>
                  <i className="fa-solid fa-check text-white"></i> Tailored
                  guidance to improve habits and overcome challenges.
                </li>
              </ul>
            </div>

            {/* Right: Image with Floating Labels */}
            <div className="w-full lg:w-[50%] mt-20 flex justify-center relative">
              <img
                src="https://d37v7cqg82mgxu.cloudfront.net/img/home/licensed-therapists-for-any-issue.jpg"
                alt="Licensed Therapists"
                className="w-[80%] md:w-[70%] lg:w-[60%] rounded-lg shadow-lg 
               shadow-white drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]"
              />

              {/* Floating Badges */}
              <div className="absolute bottom-8 w-[70%] right-4 flex flex-wrap gap-2">
                {[
                  { icon: "fa-cloud", text: "Depression" },
                  { icon: "fa-cloud-bolt", text: "Anxiety" },
                  { icon: "fa-heart", text: "Relationships" },
                  { icon: "fa-arrows-rotate", text: "OCD" },
                  { icon: "fa-signs-post", text: "Life transitions" },
                  { icon: "fa-masks-theater", text: "Personality disorders" },
                  { icon: "fa-baby", text: "Parenting" },
                  { icon: "fa-people-roof", text: "Family issues" },
                  { icon: "fa-rainbow", text: "LGBTQIA+" },
                  { icon: "fa-person-shelter", text: "Loneliness" },
                ].map((badge, index) => (
                  <span
                    key={index}
                    className="badge rounded-full shadow-md bg-white text-gray-700 text-sm px-3 py-1 flex items-center gap-2"
                  >
                    <i className={`fa-solid ${badge.icon}`}></i> {badge.text}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section
            className="d-flex flex-column align-items-center md-5 mb-2 w-100 text-center mt-20"
            id="our-services-section"
          >
            {/* Title & Description - Stays in Column Layout */}
            <div
              className="mb-5 w-100 text-center py-20"
              id="our-services-content"
            >
              <h2
                className="mb-4 "
                style={{
                  fontSize: "2.8rem",
                  fontWeight: "700",
                  WebkitBackgroundClip: "text",
                  textShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                  color: "rgba(209, 16, 99, 0.9)", // Soft Cyan for a gentle contrast
                }}
              >
                Our Wellbeing Offerings
              </h2>

              <h3
                className="mx-auto text-white"
                style={{
                  maxWidth: "800px",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  lineHeight: "1.6",
                  color: "#E0F7FA", // Soft Cyan for a gentle contrast

                  textShadow: "0px 2px 4px rgba(255, 255, 255, 0.3)",
                  opacity: "0.9",
                }}
              >
                Our services are built to help you overcome your concerns
                effectively. We offer the widest range of mental health services
                provided by India’s best mental health professionals. You are in
                good hands.
              </h3>
            </div>

            {/* FIX: Only this div stays in a row */}
            <div
              className="flex flex-nowrap  overflow-x-auto w-100 px-3 h-full  justify-content-center"
              id="our-services-cards"
              style={{
                whiteSpace: "nowrap",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
                position: "relative",
              }}
            >
              {[
                {
                  href: "https://heartitout.in/contact-us/",
                  imgSrc:
                    "https://heartitout.in/home-new/assets/images/our-services/geriatic-vector.svg",
                  title: "Geriatric Care",
                },
                {
                  href: "https://heartitout.in/therapists/?therapy=Family",
                  imgSrc:
                    "https://heartitout.in/home-new/assets/images/our-services/family-vector.svg",
                  title: "Family Therapy",
                },
                {
                  href: "https://heartitout.in/therapists/?therapy=Couples",
                  imgSrc:
                    "https://heartitout.in/home-new/assets/images/our-services/couple-vector.svg",
                  title: "Couples Therapy",
                },
                {
                  href: "https://heartitout.in/therapists/?therapy=Individual",
                  imgSrc:
                    "https://heartitout.in/home-new/assets/images/our-services/individual-vector.svg",
                  title: "Individual Therapy",
                },
                {
                  href: "https://heartitout.in/therapists/?therapy=Child",
                  imgSrc:
                    "https://heartitout.in/home-new/assets/images/our-services/child-vector.svg",
                  title: "Child Therapy",
                },
                {
                  href: "https://heartitout.in/therapists/?therapy=Psychiatric",
                  imgSrc:
                    "https://heartitout.in/home-new/assets/images/our-services/psych-vector.svg",
                  title: "Psychiatry",
                },
                {
                  href: "https://heartitout.in/career-counselling/",
                  imgSrc:
                    "https://heartitout.in/home-new/assets/images/our-services/career-vector.svg",
                  title: "Career Counselling",
                },
              ].map((service, index, arr) => {
                const midIndex = Math.floor(arr.length / 2); // Middle image
                const distanceFromMid = Math.abs(index - midIndex); // How far from the middle?
                return (
                  <a
                    key={index}
                    href={service.href}
                    target="_blank"
                    className="p-4 text-center shadow-lg border bg-white position-relative"
                    style={{
                      minWidth: "220px",
                      minHeight: "260px",
                      flexShrink: 0,
                      borderRadius: "16px",
                      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                      marginRight: "-40px", // Overlapping effect
                      zIndex: 10 - distanceFromMid, // Middle image is on top
                      transform: `translateY(${distanceFromMid * 15}px)`, // Push side images down
                      transition: "all 0.3s ease-in-out",
                      background: "#F8F9FA", // Light background
                    }}
                  >
                    <img
                      src={service.imgSrc}
                      className="p-3 mx-auto block"
                      alt={service.title}
                      style={{ width: "130px", height: "130px" }}
                    />
                    <div className="d-flex align-items-center justify-content-center ">
                      <h4
                        className="card-title-services m-2"
                        style={{
                          fontSize: "19px",
                          color: "rgba(209, 16, 99, 0.9)",
                          fontWeight: "600",
                        }}
                      >
                        {service.title}
                      </h4>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <motion.img
          src={bg3}
          alt="Floating image"
          className="absolute w-1/6 h-1/12 rounded-full border-2 border-brightred shadow-2xl shadow-brightred right-10 top-10"
          whileHover={{
            x: [0, 10, -10, 10, 0], // Moves left & right
            y: [0, -10, 10, -10, 0], // Moves up & down
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating & Rotating Image on the Left */}
        <motion.img
          src={bg4}
          alt="Rotating Floating image"
          className="absolute w-1/12 h-1/12 rounded-full border-2 border-brightred shadow-2xl shadow-brightred left-10 top-20"
          animate={{
            x: [0, -10, 10, -10, 0], // Moves left & right
            y: [0, 10, -10, 10, 0], // Moves up & down
            rotateY: [0, 360], // Rotates 360 degrees
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </section>
      <section className="bg-brightred">
        <Footer />
        {/* <div className="container mx-auto h-screen"></div> */}
      </section>
    </div>
  );
}

export default Home;
