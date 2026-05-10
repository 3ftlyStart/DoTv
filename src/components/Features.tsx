import { motion } from 'motion/react';
import { Smartphone, Tv, Sparkles, Youtube } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Smartphone className="text-blue-500" />,
      title: "Mobile Remote",
      description: "Use your phone's keyboard to quickly type passwords and search for cinematic masterpieces."
    },
    {
      icon: <Sparkles className="text-purple-500" />,
      title: "Smart Discovery",
      description: "Find what to watch based on what you've enjoyed before. Personalized rows just for you."
    },
    {
      icon: <Youtube className="text-red-500" />,
      title: "Live TV Rows",
      description: "Browse live TV shows and news directly from your home screen without switching apps."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            Smarter entertainment <br />
            <span className="text-white/40">for a smarter home.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
