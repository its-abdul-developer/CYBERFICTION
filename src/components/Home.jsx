import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen">
      <nav className=" flex justify-between items-center py-2 px-12 font-[gilroy]">
        <h2>
          <b>CYBER</b>FICTION
        </h2>
        <button className="bg-black text-white py-1.5 px-3.5 text-[1.6vh] rounded-full font-[gilroy]">
          April 2023
        </button>
      </nav>
      <div className=" pt-10  flex flex-col justify-center h-full relative overflow-hidden pl-15">
        <div
          id="loop"
          className="flex absolute top-[20%] h-[25%] w-[100%] text-[10vw] whitespace-nowrap"
        >
          <h1>
            <b>CYBER</b>FICTION IS THE{" "}
            <b>
              <i>REAL</i>
            </b>{" "}
            <span>STORY</span> IN THE{" "}
            <span>
              <i>METAVERSE.</i>
            </span>
          </h1>
          <h1>
            <b>CYBER</b>FICTION IS THE{" "}
            <b>
              <i>REAL</i>
            </b>{" "}
            <span>STORY</span> IN THE{" "}
            <span>
              <i>METAVERSE.</i>
            </span>
          </h1>
          <h1>
            <b>CYBER</b>FICTION IS THE{" "}
            <b>
              <i>REAL</i>
            </b>{" "}
            <span>STORY</span> IN THE{" "}
            <span>
              <i>METAVERSE.</i>
            </span>
          </h1>
        </div>
        <h3 className="text-[2vh] font-[gilroy] leading-[1.3] text-zinc-500">
          CYBERFICTION AIMS TO BE A DECENTRALIZED COMMUNITY THAT CAN <br />
          CREATE NEW VALUES AND PROFITS THROUGH PLAY IN THE VIRTUAL <br />{" "}
          WORLD.
        </h3>
        <h4 className="text-[1.7vh] font-[gilroy] ml-[21vw] leading-0">
          ...SCROLL TO READ
        </h4>
      </div>
    </div>
  );
};

export default Home;
