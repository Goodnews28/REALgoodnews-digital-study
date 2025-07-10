import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import "./app/globals.css";

const phrases = [
  "where curiosity meets code",
  "where stories unfold",
  "where Goodnews prototypes alternate futures",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [chaosMode, setChaosMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (input.trim().toLowerCase() === ":chaosmode") {
      setChaosMode(true);
      setTimeout(() => setChaosMode(false), 5000); // reset after 5s
      setInput("");
    }
  }, [input]);

  return (
    <main
      className={`relative flex flex-col items-center justify-center min-h-screen text-[#EDEDED] px-4 text-center space-y-6 transition-all duration-500 overflow-hidden ${
        chaosMode ? "bg-pink-800 rotate-1" : "bg-[#121212]"
      }`}
    >
      <Head>
        <title>Goodnews Digital Study</title>
      </Head>

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[60vw] h-[60vw] bg-pink-600 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[40vw] h-[40vw] bg-purple-700 opacity-20 rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2 animate-spin-slow" />
        <div className="stars absolute inset-0 z-[-1]" />
      </div>

      <h1 className="text-5xl md:text-6xl font-serif">
        welcome to goodnews' digital study
      </h1>

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="text-xl md:text-2xl font-sans"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {phrases[index]}
        </motion.p>
      </AnimatePresence>

      <button
        onClick={() => {
          const explore = document.getElementById("explore");
          if (explore) explore.scrollIntoView({ behavior: "smooth" });
        }}
        className="text-lg font-semibold border px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
      >
        Start Exploring
      </button>

      <div id="explore" className="pt-40 text-sm text-gray-400">
        The exploration begins here...
      </div>

      {/* Chat Assistant */}
      <div className="fixed bottom-6 right-6 max-w-xs w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1f1f1f] border border-white/20 rounded-xl px-4 py-3 shadow-lg"
        >
          <p className="text-sm mb-1 text-gray-300">Ask the Study Assistant</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border border-white/30 rounded px-3 py-1 text-sm text-white focus:outline-none"
            placeholder="e.g. what's the vibe today?"
          />
        </motion.div>
      </div>

      {/* Optional: Glitch text if chaos mode is active */}
      {chaosMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 left-4 text-pink-300 text-2xl font-mono animate-pulse"
        >
          CHAOS MODE ACTIVE
        </motion.div>
      )}
    </main>
  );
}
