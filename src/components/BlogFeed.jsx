import { motion } from 'framer-motion';

const posts = [
  {
    id: 'post-1',
    title: 'Designing for the Future: Interfaces that Feel Alive',
    excerpt: 'Exploring motion, depth, and tactility to craft interfaces that invite play and spark curiosity.',
    author: 'Nova Tran',
    date: 'Oct 12, 2025',
    tags: ['Design', 'Motion', 'UX'],
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'post-2',
    title: 'Realtime Collaboration Patterns for the Web',
    excerpt: 'Presence, cursors, and conflict resolution strategies for multi-user experiences.',
    author: 'Eli Stone',
    date: 'Oct 08, 2025',
    tags: ['Collaboration', 'Web', 'Engineering'],
    cover: 'https://images.unsplash.com/photo-1558286029-b2b4b3e51653?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'post-3',
    title: 'The Aesthetics of Noise: Embracing Grain in Digital Art',
    excerpt: 'From film grain to shader noise—adding texture to sterile pixels.',
    author: 'Kai Mercer',
    date: 'Oct 02, 2025',
    tags: ['Art', 'Shaders', 'Aesthetics'],
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop'
  }
];

export default function BlogFeed() {
  return (
    <section id="feed" className="relative">
      <div className="grid gap-6">
        {posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <div className="aspect-[16/7] w-full overflow-hidden">
              <img src={post.cover} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span>{post.date}</span>
                <span>•</span>
                <div className="flex gap-1.5 flex-wrap">
                  {post.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70">{t}</span>
                  ))}
                </div>
              </div>
              <h3 className="mt-3 text-xl md:text-2xl font-semibold">{post.title}</h3>
              <p className="mt-2 text-white/80">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-white/70">By {post.author}</div>
                <a href="#" className="text-sm font-medium text-violet-300 hover:text-violet-200">Read story →</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
