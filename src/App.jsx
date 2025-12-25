import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Home from "./components/Home";

export default function App() {
  const scrollRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ----- INIT LOCOMOTIVE -----
    const loco = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08,
    });

    loco.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? loco.scrollTo(value, { duration: 0, disableLerp: true })
          : loco.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    // ----- CANVAS -----
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function onResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    }

    window.addEventListener("resize", onResize);

    const frameCount = 300;
    const currentFrame = { frame: 0 };
    const images = [];

    const src = (i) => `/male${String(i).padStart(4, "0")}.png`;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = src(i + 1);
      images.push(img);
    }

    images[0].onload = draw;

    function draw() {
      const img = images[currentFrame.frame];
      if (!img) return;

      const h = canvas.height;
      const w = canvas.width;

      const scale = Math.max(w / img.width, h / img.height);
      const x = w / 2 - (img.width / 2) * scale;
      const y = h / 2 - (img.height / 2) * scale;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    // ----- SCROLL ANIMATION -----
    gsap.to(currentFrame, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "#pages",
        start: "top top",
        end: "bottom+=100% bottom", // 👈 FIX
        scrub: 0.5,
        scroller: scrollRef.current,
      },
      onUpdate: draw,
    });

    // ----- PIN PAGES -----
    ["#page1", "#page2", "#page3", "#page4", "#page5", "#page6"].forEach((id) => {
      ScrollTrigger.create({
        trigger: id,
        scroller: scrollRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
      });
    });

    ScrollTrigger.addEventListener("refresh", () => loco.update());
    ScrollTrigger.refresh();

    return () => loco.destroy();
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] z-10 pointer-events-none"
      />

      <div ref={scrollRef} data-scroll-container>
        <div id="pages" className="text-black">
          <section id="page1" className="min-h-[120vh] bg-[#F1F1F1]  ">
            <Home />
          </section>

          <section id="page2" className="min-h-[120vh] flex bg-[#F1F1F1]  ">
            <div className="w-1/2 h-full  flex flex-col pl-28">
              <h3 className="text-[2vh]  leading-[1.4] font-[gilroy] mt-[14vw] leading-[1.3] text-zinc-500">
                CYBERFICTION / KEY WORLD
              </h3>
              <h1 className="text-[3vw] leading-[1.5] font-[gilroy] text-black font-bold ">
                HAVE FUN
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                LET'S PLAY
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                JUST BE TOGETHER
              </h1>
            </div>
            <div className="w-1/2 h-full   flex flex-col pr-20 text-right">
              <h1 className="text-[3vw] leading-[1.5] font-[gilroy] mt-[25vw] text-black font-bold ">
                MAKE STORY
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                TAKE A CHANCE
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                BUILD AND OWNED
              </h1>
              <h3 className="text-[2vh]  leading-[1.4] font-[gilroy]  leading-[1.3] text-zinc-500">
                ..AND MAINTAIN GOOD HUMANITY
              </h3>
            </div>
          </section>

          <section id="page3" className="min-h-[120vh] bg-[#F1F1F1]  flex ">
            <div className="w-1/2 h-full  flex flex-col pl-32">
              <h3 className="text-[2vh]  leading-[1.4] font-[gilroy] mt-[18vw] leading-[1.3] text-zinc-500">
                CYBERFICTION / HAVE FUN
              </h3>
              <h1 className="text-[3vw] leading-[1.5] font-[gilroy] text-black font-bold ">
                LET'S
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                HAVE FUN
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                TOGETHER
              </h1>
            </div>
            <div className="w-1/2 h-full   flex flex-col pr-15 text-right">
              <h3 className="text-[2vh]  leading-[1.3] font-[gilroy] mt-[27vw] text-zinc-500">
                LET'S HAVE A BLAST! LET'S JUST THROW AWAY AGE, GENDER, REGION,{" "}
                <br /> STATUS, ETC., DON'T COMPETE, DON'T FIGHT, COOPERATE AND
                SHARE <br /> WITH EACH OTHER AND ENJOY IT TOGETHER! SO THAT YOU
                CAN STAND <br /> THERE IN THE NOT-TOO-DISTANT FUTURE AND DREAM
                OF ANOTHER NEW <br /> FUTURE
              </h3>
            </div>
          </section>

          <section id="page4" className="min-h-[120vh] bg-[#F1F1F1] flex ">
            <div className="w-1/2 "></div>
            <div className="w-1/2 h-full   flex flex-col pr-28 text-right">
              <h3 className="text-[2vh]  leading-[1.4] font-[gilroy] mt-[25vw]  text-zinc-500">
                CYBERFICTION / PLAYGROUND
              </h3>
              <h1 className="text-[3vw] leading-[1.5] font-[gilroy]  text-black font-bold ">
                CYBERFIELD
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                IS OUR
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                PLAYGROUND
              </h1>
            </div>
          </section>
          <section id="page5" className="min-h-[100vh] bg-[#F1F1F1] flex ">
            <div className="w-1/2 "></div>
            <div className="w-1/2 h-full   flex flex-col pr-28 text-right">
              <h3 className="text-[2vh]  leading-[1.4] font-[gilroy] mt-[25vw]  text-zinc-500">
                CYBERFICTION / PLAYGROUND
              </h3>
              <h1 className="text-[3vw] leading-[1.5] font-[gilroy]  text-black font-bold ">
                ABDUL
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                WAHAB
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
               CHEEMA
              </h1>
            </div>
          </section>
          <section id="page6" className="min-h-[100vh] bg-[#F1F1F1] flex ">
            <div className="w-1/2 "></div>
            <div className="w-1/2 h-full   flex flex-col pr-28 text-right">
              <h3 className="text-[2vh]  leading-[1.4] font-[gilroy] mt-[25vw]  text-zinc-500">
                CYBERFICTION / PLAYGROUND
              </h3>
              <h1 className="text-[3vw] leading-[1.5] font-[gilroy]  text-black font-bold ">
               ADEEL
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                QASIM
              </h1>
              <h1 className="text-[3vw]  leading-[1.5] font-[gilroy] text-black font-bold">
                CHEEMA
              </h1>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
