import { Rocket, Search, User } from 'lucide-react';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 grid place-items-center shadow-lg shadow-indigo-500/30">
            <Rocket size={18} className="text-white" />
          </div>
          <span className="font-semibold tracking-tight text-white">Immersion.blog</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#feed" className="hover:text-white transition-colors">Stories</a>
          <a href="#collab" className="hover:text-white transition-colors">Collaborate</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="Search" className="h-9 w-9 grid place-items-center rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors">
            <Search size={18} />
          </button>
          <button aria-label="Account" className="h-9 w-9 grid place-items-center rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
