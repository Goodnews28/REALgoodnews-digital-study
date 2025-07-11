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
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-serif tracking-tight z-10 leading-tight max-w-3xl"
      >
        welcome to <span className="text-lime-300">goodnews’</span> digital study
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className={`text-lg md:text-2xl z-10 font-mono ${
            chaos ? 'glitch-text' : 'text-zinc-300'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {phrases[index]}
          <span className="animate-blink text-white ml-1">|</span>
        </motion.p>
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.07, backgroundColor: '#a3e635', color: '#0f0f0f' }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="z-10 mt-4 text-sm md:text-base font-mono border border-lime-300 px-6 py-2 rounded-full hover:bg-lime-300 hover:text-black transition-colors duration-300 shadow-md"
      >
        Start Exploring
      </motion.button>

      <OrbAssistant onChaos={() => setChaos(!chaos)} />

      <div id="explore" className="pt-40 text-sm text-zinc-400 z-10 font-mono">
        The exploration begins here...
      </div>

      <Footer />
    </main>
  )
}