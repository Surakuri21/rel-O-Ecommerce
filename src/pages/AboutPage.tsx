import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const timeline = [
    { year: '1987', title: 'The Beginning', desc: 'Founded in Geneva by master horologist Henri Aurelis with a vision to create timepieces of unparalleled beauty.' },
    { year: '1998', title: 'First Manufacture', desc: 'Opened our first in-house movement manufacture, producing entirely original calibres.' },
    { year: '2008', title: 'Global Recognition', desc: 'Awarded the Grand Prix d\'Horlogerie for our revolutionary tourbillon movement.' },
    { year: '2017', title: 'New Horizons', desc: 'Launched our sustainable initiative, using recycled precious metals and ethical sourcing.' },
    { year: '2026', title: 'The Future', desc: 'Continuing to push the boundaries of what is possible in mechanical watchmaking.' },
  ];

  return (
    <div className="pt-28 lg:pt-32">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=1920&q=80" alt="Atelier" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[10px] tracking-[0.4em] uppercase text-champagne mb-4">Our Story</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-serif text-5xl lg:text-7xl tracking-wide">Crafted with Purpose</motion.h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Our Philosophy</p>
            <h2 className="font-serif text-3xl lg:text-4xl tracking-wide mb-8">The Pursuit of Perfection</h2>
            <p className="text-warm-gray leading-relaxed text-lg">
              At AURELIS, we believe that a timepiece is more than an instrument for measuring time — it is a statement of values, 
              a companion through life's most meaningful moments, and a legacy to be passed through generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src="https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80" alt="Watch movement" className="w-full aspect-[4/3] object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne">Craftsmanship</p>
            <h2 className="font-serif text-3xl lg:text-4xl tracking-wide">Every Detail Matters</h2>
            <p className="text-warm-gray leading-relaxed">
              Each AURELIS movement is assembled by a single master watchmaker over the course of several weeks. 
              From the hand-beveling of each bridge to the precise regulation of the escapement, 
              no detail is too small to deserve attention.
            </p>
            <p className="text-warm-gray leading-relaxed">
              Our artisans train for a minimum of seven years before they are entrusted with the creation of a complete movement. 
              This dedication to mastery ensures that every AURELIS timepiece meets our exacting standards of excellence.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <p className="font-serif text-3xl text-champagne">312</p>
                <p className="text-xs text-warm-gray mt-1">Components</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-champagne">40+</p>
                <p className="text-xs text-warm-gray mt-1">Hours per watch</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-champagne">7</p>
                <p className="text-xs text-warm-gray mt-1">Years training</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-4">Heritage</p>
            <h2 className="font-serif text-3xl lg:text-4xl tracking-wide">Our Journey Through Time</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex items-center gap-8 mb-16 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <p className="font-serif text-2xl text-champagne mb-2">{item.year}</p>
                  <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-warm-gray">{item.desc}</p>
                </div>
                <div className="w-4 h-4 bg-champagne rounded-full border-4 border-ivory z-10 shrink-0" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-obsidian text-ivory">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl tracking-wide">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Precision', desc: 'Every component is manufactured to tolerances measured in microns, ensuring accuracy that defines our craft.' },
              { title: 'Innovation', desc: 'We continuously push the boundaries of mechanical watchmaking, developing new materials and complications.' },
              { title: 'Sustainability', desc: 'Our commitment to ethical sourcing and responsible manufacturing ensures a legacy we can be proud of.' },
            ].map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center">
                <h3 className="font-serif text-xl mb-4 text-champagne">{value.title}</h3>
                <p className="text-sm text-soft-gray leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl lg:text-4xl tracking-wide mb-6">Discover Our Timepieces</h2>
          <p className="text-warm-gray max-w-lg mx-auto mb-8">Each watch tells a story of dedication, artistry, and the relentless pursuit of perfection.</p>
          <Link to="/shop" className="bg-obsidian text-ivory px-10 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors">
            Shop Collection
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
