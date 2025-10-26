import { useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import Hero3D from './components/Hero3D.jsx';
import BlogFeed from './components/BlogFeed.jsx';
import LiveCollabPanel from './components/LiveCollabPanel.jsx';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('antialiased');
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      <NavBar />
      <main>
        <Hero3D />
        <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-16 relative z-10">
          <div className="lg:col-span-2">
            <BlogFeed />
          </div>
          <div className="lg:col-span-1">
            <LiveCollabPanel />
          </div>
        </section>
      </main>
      <footer className="mt-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 text-sm text-white/60">
          <p>© {new Date().getFullYear()} Immersion.blog — Built for interactive, collaborative stories.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
