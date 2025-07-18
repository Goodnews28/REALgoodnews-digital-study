'use client'

import { useState, useEffect, useRef } from 'react'
import StarsCanvas from './components/StarsCanvas'
import Nav from './components/Nav'
import OrbAssistant from './components/OrbAssistant'
import Footer from './components/Footer'
import ChaosModeStyle from './components/ChaosMode'
import { motion, AnimatePresence } from 'framer-motion'

const phrases = [
  'where curiosity meets code',
  'where stories unfold',
  'where imagination takes flight',
  'where ideas become reality',
  'where creativity knows no bounds',
  'where Goodnews prototypes alternate futures'
]

export default function Home() {
  const [index, setIndex] = useState(0)
  const [chaos, setChaos] = useState(false)
  const synthRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.currentTime = 0
      synthRef.current.play().catch(() => {})
    }
  }, [index])

  return (
    <main
      className={`ml-20 md:ml-56 relative flex flex-col items-center justify-center min-h-screen px-6 md:px-12 text-center space-y-8 overflow-hidden transition-colors duration-500 ${
        chaos
          ? 'bg-black text-lime-300 font-crt glitch'
          : 'bg-gradient-to-br from-[#0e0e0e] via-[#111] to-[#141414] text-white'
      }`}
    >
      <audio
        ref={synthRef}
        src="/synth-blip.wav"
        preload="auto"
        className="hidden"
      />

      <StarsCanvas />
      <Nav onChaosToggle={() => setChaos(!chaos)} />

      {chaos && <ChaosModeStyle />}

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-display md:text-6xl lg:text-7xl font-serif tracking-tight z-10 leading-tight max-w-4xl gpu-accelerated"
      >
        welcome to <span className="accent-primary">goodnews&apos;</span> digital study
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className={`text-subheading md:text-2xl lg:text-3xl z-10 font-mono smooth-transition ${
            chaos ? 'glitch-text' : 'text-zinc-300'
          }`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {phrases[index]}
          <span className="animate-blink accent-primary ml-1">|</span>
        </motion.p>
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="z-10 mt-8 btn-secondary font-mono gpu-accelerated"
      >
        Start Exploring
      </motion.button>

      <OrbAssistant onChaos={() => setChaos(!chaos)} />

      <motion.div 
        id="explore" 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="pt-40 pb-20 z-10 space-y-8 max-w-4xl"
      >
        <div className="text-center space-y-6">
          <h2 className="text-heading text-white font-serif">The exploration begins here...</h2>
          <p className="text-body text-zinc-400 font-mono max-w-2xl mx-auto">
            Navigate through my digital study to discover projects, essays, and ideas that blur the lines between creativity and code.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05, y: -2 }}
              className="btn-primary font-mono smooth-transition"
            >
              View Projects
            </motion.a>
            <motion.a
              href="/essays"
              whileHover={{ scale: 1.05, y: -2 }}
              className="btn-secondary font-mono smooth-transition"
            >
              Read Essays
            </motion.a>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05, y: -2 }}
              className="btn-secondary font-mono smooth-transition"
            >
              About Me
            </motion.a>
          </div>
        </div>
      </motion.div>

      <Footer />
    </main>
  )
}