import background from "../assets/images/background.jpg";
import imageOne from "../assets/images/imageOne.jpg";
import imageTwo from "../assets/images/imageTwo.jpg";
import masked from "../assets/images/maskedEmo.png";
import lionPose from "../assets/images/lionPose.jpg";
import buffalo from "../assets/images/buffaloSwim.jpg";
import painthands from "../assets/images/paintedHands.jpg";
import floatingBoat from "../assets/images/floatingBoat.jpg";
import treeRoots from "../assets/images/treeRoots.jpg";
import menu from "../assets/Icons/menu.svg";
import fb from "../assets/Icons/fb.webp";
import exx from "../assets/Icons/x.png";
import linkedIn from "../assets/Icons/lin.webp";
import yt from "../assets/Icons/yt.svg";

const LandingPage = () => {
  return (
    <main className="grid place-items-center    bg-white">
      {/* Header section */}
      <header className="relative  w-[95vw] h-[70vh] grid place-items-center mt-4 font-semibold">
        {/* Background image and shadow */}
        <div className="relative ">
          <img
            src={background}
            alt="woman in nature"
            className=" h-[70vh] relative z-0 rounded-[12px]"
          />
          <div className="bg-black absolute z-10 top-0 -bottom-0 left-0 -right-0 rounded-[8px] opacity-25"></div>
        </div>
        {/* Header navigation list */}
        <div className="absolute text-white top-10 left-10 right-10 grid opacity-100 text-center grid-cols-2">
          <ul className="flex align-center justify-between w-[30vw]">
            <li className=" hidden md:inline-block">Home</li>
            <li className=" hidden md:inline-block">About Us</li>
            <li className=" hidden md:inline-block">Values</li>
            <li className=" hidden md:inline-block">Blogs</li>
            <li className=" md:hidden inline-block">
              <img src={menu} alt="controller" className="w-[20px] h-[20px]" />
            </li>
          </ul>

          <div className="flex align-center justify-self-end">
            <button className="bg-green-400 text-white py-2 px-8 rounded-[12px]">
              Donate
            </button>
          </div>
        </div>

        {/* Welcome text */}
        <div className="grid absolute top-54 left-[15%] md:left-[30%] text-center w-[60vw] md:w-[40vw] place-items-center">
          <h1 className="text-white text-3xl md:text-4xl ">
            {"Together, let's Make a Difference for Future Generations"}
          </h1>

          <button className="bg-green-400 text-white mt-8 w-[40vw] md:w-[18vw] rounded-[8px] py-2">
            Join Us
          </button>
        </div>
      </header>

      {/* Hero section */}
      <section className="grid  grid-cols-1 md:grid-cols-2 w-[95vw] place-items-center  mt-8 mb-16">
        <div className="grid h-[20vh]">
          <h1 className="font-bold mb-2">JOIN THE CLIMATE MOVEMENT</h1>
          <p className="text-sm w-[95vw] md:w-[40vw]">
            Climate Wavers is committed to raising awareness and driving actions
            to address the urgent challenges of climate change with AI-powered
            solutions. Be part of the change today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={imageOne}
              alt="nature"
              className="relative w-[95vw] md:w-[23vw] h-[20vh] md:h-[15vw] rounded-[12px]"
            />
            <p className="text-white absolute top-[40%] left-2 right-2 text-sm">
              Climate Wavers empowers individuals to make a difference through
              AI-driven disaster response, collective action and advocacy.
            </p>
          </div>
          {/*  */}
          <div className="relative">
            <img
              src={imageTwo}
              alt="nature"
              className="relative w-[95vw] md:w-[23vw] h-[20vh] md:h-[15vw] rounded-[12px] "
            />
            <p className="text-white absolute top-[40%] left-2 right-2 text-sm">
              Climate Wavers empowers individuals to make a difference through
              AI-driven disaster response, collective action and advocacy.
            </p>
          </div>
        </div>
      </section>

      {/* {About section} */}
      <section className="grid  grid-cols-1 md:grid-cols-2 w-[95vw] pt-8 md:pt-16 place-items-center mb-16">
        <img
          src={masked}
          alt="infectious"
          className="w-[90vw] md:w-[40vw] h-[50vh] md:h-[50vh] "
        />
        <div className="grid py-10 md:py-16 ">
          <p className="font-bold">About Us</p>
          <h2 className="text-green-500 font-bold text-2xl">
            Empowering Change for a Sustainable Future
          </h2>

          <p className="text-sm">
            At Climate Wavers, we are dedicated to protecting our planet and
            fostering a sustainable future for generations to come. Our mission
            is to empower individuals and communities to take actions against
            climate change and effective disaster response through education,
            advocacy, collective effort and cutting-edge AI driven solutions.
          </p>

          <button className="border border-green-400 w-[20vh] mt-4 md:mt-2 py-2 text-green-500 rounded-[10px]">
            READ MORE +
          </button>
        </div>
      </section>

      {/* lion in wild section */}
      <section className="grid  relative">
        <img
          src={lionPose}
          alt="wild grass with lion"
          className="h-[80vh] relative"
        />
        <div className="absolute md:bottom-12 bottom-2 left-3 md:left-10 md:w-[30vw] w-[90vw] border p-2  rounded-[12px] isolate   bg-white/20 shadow-lg ring-1 ring-black/5">
          <h2 className="text-white font-semibold text-[14px] mb-[15px] ">
            SACRED TREE RITUALS AND PRACTICES:
          </h2>
          <p className="text-white text-sm">
            An exploration of the different rituals and practices associated
            with sacred trees in moonsoon Asia. including festivals, offerings
            and other traditions.
          </p>
        </div>
      </section>

      {/* commitment section */}
      <section className=" grid w-[100vw] place-items-center bg-gradient-to-r from-blue-500 to-cyan-500  pt-4">
        <hr className="text-white w-[100vw]" />
        <div className="grid place-items-center text-center mt-16 mb-16 md:w-[60vw] w-[80vw]">
          <h1 className="font-bold text-white text-[18px]">OUR COMMITMENT</h1>

          <h2 className="text-white font-semibold mb-4">
            Empowering Change for a Sustainable Future
          </h2>

          <p className="text-white text-sm">
            Driving Positive Impact Through Local Restuarants. This subtitle
            emphasizes how your food delivery platform can empower local
            eateries, promote sustainability and create a positive change in the
            community.
          </p>
        </div>

        {/* couresel */}
        <div className="grid my-16 w-[95vw] ">
          <div className="carousel rounded-box">
            <div className="carousel-item px-2">
              <img
                src={lionPose}
                alt="Burger"
                className="w-[300px] h-[300px] rounded-[14px]"
              />
            </div>
            <div className="carousel-item px-2">
              <img
                src={lionPose}
                alt="Burger"
                className="w-[300px] h-[300px] rounded-[14px]"
              />
            </div>
            <div className="carousel-item px-2">
              <img
                src={lionPose}
                alt="Burger"
                className="w-[300px] h-[300px] rounded-[14px]"
              />
            </div>
            <div className="carousel-item px-2">
              <img
                src={lionPose}
                alt="Burger"
                className="w-[300px] h-[300px] rounded-[14px]"
              />
            </div>
            <div className="carousel-item px-2">
              <img
                src={lionPose}
                alt="Burger"
                className="w-[300px] h-[300px] rounded-[14px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nature info */}
      <section className="grid ">
        <img src={buffalo} alt="swimming animals" className="h-[70vh]" />
      </section>

      {/* Blog section */}
      <section className="grid place-items-center my-16 ">
        <div className="grid w-[70vw] mb-16">
          <p className="">BLOG</p>

          <h2 className="text-green-600 font-bold mb-4 font-[18px]">
            Browse our blog today and discover the magic of sacred trees!
          </h2>

          <p className="text-green-400">
            From the comprehensive insights into different types of sacred trees
            to explorations of their historical roles and contemplory issues,
            our blog acts as a perfect destination for those intrigued by this
            enlightening subject.
          </p>
        </div>

        {/* slider */}
        <div className="grid w-[95vw] place-items-center my-8">
          <div className="carousel rounded-box">
            <div className="carousel-item px-2">
              <img
                src={treeRoots}
                alt="Burger"
                className="w-[300px] h-[300px] rounded-[18px]"
              />
            </div>
            <div className="carousel-item px-2">
              <img
                src={painthands}
                alt="Burger"
                className="w-[300px] h-[300px] rounded-[18px]"
              />
            </div>
            <div className="carousel-item px-2">
              <img
                src={floatingBoat}
                alt="Burger"
                className="w-[300px] h-[300px] rounded-[18px]"
              />
            </div>
          </div>
          <button className="border border-green-600 rounded-[14px] text-green-600 my-8 px-8  py-2">
            GO TO BLOG
          </button>
        </div>
      </section>

      {/* Countdown section */}
      <section className="grid place-items-center text-center pb-16 w-[80vw]">
        <p className="text-md text-green-500 my-4">
          Climate Wavers, a startup committed to environmental sustainability,
          has made significant strides in fulfilling our mision to protect the
          environment supported by AI-driven insights and data analytics.
        </p>
        <div className="grid my-4 py-2">
          <h1 className="text-black text-2xl md:text-4xl">
            76<span className="text-md">y </span>
            {""}
            211<span className="text-md">d </span>
            {""}
            08<span className="text-md">h </span>
            {""}
            52<span className="text-md">m </span>
            {""}
            37<span className="text-md">s </span>
            {""}
          </h1>
          <p className="text-sm text-black my-4 mb-16">
            Time left Till The end of Rainforest If Current Trend Continue
          </p>
          <button className="border text-black border-black font-semibold px-8 py-2 rounded-[12px]">
            DISCOVER MORE
          </button>
        </div>
      </section>

      {/* Footer content */}
      <footer className="grid md:grid-cols-4 grid-cols-1  place-items-center pt-8 pb-16 mb-8 gap-8 w-[84vw]">
        <div className="mb-8">
          <p className="text-black">
            Subscribe to save the sacred tree via email{" "}
            <span className="text-sm">Subscribe to our monthly newsletter</span>
          </p>
        </div>
        {/* info */}
        <div className="grid grid-cols-4 mb-12">
          <div className="col-span-1 rotate-90 font-semibold">INFORMATIONS</div>
          <ul className="col-span-3 list-none pl-8">
            <li>-Traffic report</li>
            <li>-Transparency report</li>
            <li>-FAQ</li>
          </ul>
        </div>
        {/* About */}
        <div className="grid grid-cols-4 mb-8">
          <div className="col-span-1 rotate-90 font-semibold">SERVICES</div>
          <ul className="list-none col-span-3 pl-8">
            <li>-About Us</li>
            <li>-Contact Us</li>
            <li>-Consulting</li>
          </ul>
        </div>
        {/* Connect */}
        <div className="grid grid-cols-4 mb-8 ">
          <div className="col-span-1 origin-center rotate-90 font-semibold">
            CONNECT
          </div>
          <ul className="col-span-3 list-none grid gap-8  grid-cols-3 pl-6">
            <li>
              <img src={fb} alt="facebook" className="h-[20px] w-[20px]" />
            </li>
            <li>
              <img src={yt} alt="youtube" className="h-[20px] w-[20px]" />
            </li>
            <li>
              <img src={exx} alt="X" className="h-[20px] w-[20px]" />
            </li>
            <li>
              <img
                src={linkedIn}
                alt="linked in"
                className="h-[20px] w-[20px]"
              />
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
