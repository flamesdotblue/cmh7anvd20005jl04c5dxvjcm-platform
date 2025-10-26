import { useEffect, useMemo, useRef, useState } from 'react';
import { Share2, Users } from 'lucide-react';

function randomColor() {
  const colors = ['#8b5cf6', '#22d3ee', '#a78bfa', '#60a5fa', '#34d399', '#f472b6', '#f59e0b'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function randomName() {
  const animals = ['Orchid', 'Nebula', 'Quasar', 'Photon', 'Pixel', 'Nova', 'Comet', 'Cosmo'];
  return animals[Math.floor(Math.random() * animals.length)] + '-' + Math.floor(100 + Math.random() * 899);
}

export default function LiveCollabPanel() {
  const [userId] = useState(() => crypto.randomUUID());
  const [username, setUsername] = useState(() => localStorage.getItem('ib-username') || randomName());
  const [color, setColor] = useState(() => localStorage.getItem('ib-color') || randomColor());
  const [peers, setPeers] = useState({});
  const [note, setNote] = useState('');
  const channelRef = useRef(null);
  const textareaRef = useRef(null);

  const presence = useMemo(() => ({ id: userId, username, color }), [userId, username, color]);

  useEffect(() => {
    localStorage.setItem('ib-username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('ib-color', color);
  }, [color]);

  useEffect(() => {
    const ch = new BroadcastChannel('immersion-blog-collab');
    channelRef.current = ch;

    const heartbeat = () => {
      ch.postMessage({ type: 'presence', presence });
    };

    const interval = setInterval(heartbeat, 2500);
    heartbeat();

    const onMessage = (e) => {
      const msg = e.data;
      if (!msg) return;
      if (msg.type === 'presence' && msg.presence?.id !== userId) {
        setPeers((prev) => ({ ...prev, [msg.presence.id]: { ...msg.presence, x: prev[msg.presence.id]?.x ?? 0.5, y: prev[msg.presence.id]?.y ?? 0.5, lastSeen: Date.now() } }));
      }
      if (msg.type === 'cursor' && msg.userId !== userId) {
        setPeers((prev) => ({ ...prev, [msg.userId]: { ...(prev[msg.userId] || {}), ...msg.data, lastSeen: Date.now() } }));
      }
      if (msg.type === 'note' && msg.userId !== userId) {
        setNote(msg.value);
      }
      if (msg.type === 'leave') {
        setPeers((prev) => {
          const p = { ...prev };
          delete p[msg.userId];
          return p;
        });
      }
    };

    ch.addEventListener('message', onMessage);

    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      ch.postMessage({ type: 'cursor', userId, data: { ...presence, x, y } });
    };
    window.addEventListener('mousemove', onMouseMove);

    const gc = setInterval(() => {
      setPeers((prev) => {
        const now = Date.now();
        const next = { ...prev };
        for (const k of Object.keys(next)) {
          if (now - (next[k].lastSeen || 0) > 7000) delete next[k];
        }
        return next;
      });
    }, 3000);

    const onBeforeUnload = () => {
      ch.postMessage({ type: 'leave', userId });
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      clearInterval(interval);
      clearInterval(gc);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('beforeunload', onBeforeUnload);
      ch.removeEventListener('message', onMessage);
      ch.close();
    };
  }, [userId, presence]);

  const peerList = Object.values(peers);

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied! Open in another tab to try local realtime collaboration.');
    } catch (e) {
      console.error(e);
    }
  };

  const handleNoteChange = (v) => {
    setNote(v);
    channelRef.current?.postMessage({ type: 'note', userId, value: v });
  };

  return (
    <section id="collab" className="relative">
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md" style={{ background: color }} />
            <div>
              <div className="text-sm font-medium">Live Collab Room</div>
              <div className="text-xs text-white/60">Local realtime via BroadcastChannel</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={copyShareLink} className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/15">
              <Share2 size={14} /> Share link
            </button>
          </div>
        </div>

        <div className="p-4 grid gap-4">
          <div className="grid gap-2">
            <label className="text-xs text-white/70">Display name</label>
            <div className="flex gap-2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                title="Color"
                className="w-12 h-10 p-1 bg-black/30 border border-white/10 rounded-md"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-white/70">Shared note</label>
              <div className="flex items-center gap-1 text-xs text-white/60"><Users size={14} /> {peerList.length + 1} online</div>
            </div>
            <textarea
              ref={textareaRef}
              value={note}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Type here and open this page in another tab to collaborate in real-time."
              rows={8}
              className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            <p className="text-[11px] text-white/50">Tip: Move your mouse to see live cursors. This demo uses browser-local realtime for easy testing.</p>
          </div>
        </div>
      </div>

      {peerList.map((p) => (
        <Cursor key={p.id} username={p.username} color={p.color} x={p.x} y={p.y} />
      ))}
    </section>
  );
}

function Cursor({ username, color, x = 0.5, y = 0.5 }) {
  const left = Math.max(0, Math.min(1, x)) * window.innerWidth;
  const top = Math.max(0, Math.min(1, y)) * window.innerHeight;
  return (
    <div className="fixed pointer-events-none z-50" style={{ left, top, transform: 'translate(-20%, -60%)' }}>
      <div className="relative">
        <svg width="22" height="22" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
          <path d="M3 2l7.5 17 2.2-6.5L19 10 3 2z" />
        </svg>
        <div className="absolute left-4 top-0 -translate-y-1/2 px-2 py-0.5 rounded-md text-[11px] bg-black/70 border border-white/10 whitespace-nowrap" style={{ color }}>
          {username}
        </div>
      </div>
    </div>
  );
}
