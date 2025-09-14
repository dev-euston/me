"use client";
import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function Home() {
  // Smooth cursor-following glow
  useEffect(() => {
    const cursorLight = document.createElement("div");
    cursorLight.className =
      "cursor-light pointer-events-none fixed w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 opacity-30 blur-3xl transform -translate-x-1/2 -translate-y-1/2";
    document.body.appendChild(cursorLight);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth follow: change 0.2 for trailing effect
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;
      cursorLight.style.left = `${currentX}px`;
      cursorLight.style.top = `${currentY}px`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeChild(cursorLight);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hiddenTextRef = document.querySelector('.cursor-proximity') as HTMLElement;
      if (!hiddenTextRef) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < 200) {
        hiddenTextRef.style.display = "block";
        hiddenTextRef.style.opacity = `${Math.min(1, (200 - dist) / 200)}`;
      } else {
        hiddenTextRef.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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

      {/* Hidden console magic text */}
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <p
          className="cursor-proximity absolute text-white opacity-0 text-3xl font-mono"
          style={{ mixBlendMode: "screen" }}
        >
          {"{ console.log('✨ Magic behind the code ✨'); }"}
        </p>
      </div>
    </div>
  );
}
