import Header from "@/components/custom/Header";
import heroImg from "../assets/Screenshot 2024-05-22 104942.png";
import Footer from "@/components/custom/Footer";

function Home() {
  return (
    <div className="relative">
      <Header />
      <section className="mt-24 pt-4 pb-24 bg-gradient-radial from-gradientred via-gradientblue to-darkblue">
        <div className="container mx-auto w-full flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white  text-center tracking-tight font-semibold leading-tight mx-4 md:mx-56 lg:mx-80">
              FindYourGuide: Your One-Stop Shop for Counseling Appointments
            </h1>

            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center mt-24">
              <div className="text-white font-semibold text-center bg-white bg-opacity-20 py-2 px-4  lg:px-6 lg:py-4  rounded-full">
                🗓️ Seamless Booking
              </div>
              <div className="text-white font-semibold text-center bg-white bg-opacity-20 py-2 px-4  lg:px-6 lg:py-4 rounded-full">
                📠 Care on Demand
              </div>
              <div className="text-white font-semibold text-center  bg-white bg-opacity-20 py-2 px-4  lg:px-6 lg:py-4 rounded-full">
                👆 Freedom to Choose
              </div>
            </div>

            <p className="text-white text-opacity-50 text-xl lg:text-3xl text-center lg:text-center font-semibold tracking-normal lg:leading-10 px-2  lg:px-32 mt-10 text-wrap">
              Feeling overwhelmed or lost? FindYourGuide connects you with
              qualified counselors who specialize in a variety of areas.
              Schedule appointments with ease and embark on a personalized path
              to mental well-being. Find the support you deserve, and start your
              journey to a happier, healthier you today.
            </p>
          </div>
          <div className="w-full grid place-items-center mt-12 px-4">
            <img
              src={heroImg}
              alt="Hero image"
              className="w-full md:w-[70%] lg:w-[60%] rounded-md border-2 border-brightred shadow-2xl shadow-brightred "
            />
          </div>
        </div>
      </section>
      <section className=" bg-brightred">
        <div className="container mx-auto h-screen"></div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
