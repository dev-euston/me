"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    const cursorLight = document.createElement("div");
    cursorLight.className = "cursor-light pointer-events-none fixed w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 opacity-30 blur-3xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150";
    document.body.appendChild(cursorLight);

    const moveLight = (e: MouseEvent) => {
      cursorLight.style.left = `${e.clientX}px`;
      cursorLight.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveLight);
    return () => {
      window.removeEventListener("mousemove", moveLight);
      document.body.removeChild(cursorLight);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center text-white">
      {/* Floating magical shapes */}
      <motion.div
        className="absolute w-20 h-20 bg-purple-500 rounded-full opacity-50"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-pink-500 rounded-full opacity-30"
        animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Main content */}
      <motion.div
        className="z-10 text-center px-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Hi, I’m Euston</h1>
        <p className="text-xl md:text-2xl mb-8">
          Software Engineer & Magic Enthusiast
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white font-semibold transition"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-white rounded-full text-white font-semibold hover:bg-white hover:text-gray-900 transition"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>

      {/* Hidden magical text revealed by cursor proximity */}
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <p
          className="text-white opacity-0 hover:opacity-80 transition-opacity duration-500 text-3xl font-mono"
          style={{
            mixBlendMode: "screen",
          }}
        >
          {"{ console.log('✨ Magic behind the code ✨'); }"}
        </p>
      </div>
    </div>
  );
}
