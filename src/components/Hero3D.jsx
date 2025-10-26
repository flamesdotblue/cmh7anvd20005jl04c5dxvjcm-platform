import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero3D() {
  return (
    <section className="relative" aria-label="Hero">
      <div className="relative h-[72vh] md:h-[78vh] lg:h-[86vh]">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b12]/10 via-[#0b0b12]/20 to-[#0b0b12]" />
          <div className="absolute inset-0 opacity-[0.35]" style={{
            background: 'radial-gradient(1200px 600px at 50% 0%, rgba(137, 92, 255, 0.35), rgba(15, 15, 25, 0.2) 60%, transparent 100%)'
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
            mixBlendMode: 'soft-light'
          }} />
        </div>

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
            >
              Immersive stories. Real-time collaboration.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-4 max-w-2xl text-white/80"
            >
              A modern, clean blog for interactive, futuristic narratives. Build together with live presence and shared notes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <a href="#feed" className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors">
                Explore Stories
              </a>
              <a href="#collab" className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium bg-white/10 hover:bg-white/15 border border-white/15 transition-colors">
                Join Live Collaboration
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
