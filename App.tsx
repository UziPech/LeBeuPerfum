import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useVelocity, 
  useAnimationFrame 
} from 'framer-motion';
import { ShoppingBag, Menu, X, Search, ArrowRight, Star } from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  notes: string;
}

// --- Helper Functions ---
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Yara Pink",
    price: 270,
    image: "https://picsum.photos/id/1011/600/800",
    notes: "Sweet Orchid • Vanilla • Tropical Fruits",
  },
  {
    id: 2,
    name: "9pm Rebel",
    price: 280,
    image: "https://picsum.photos/id/1059/600/800",
    notes: "Bergamot • Wild Lavender • Amber Woods",
  },
  {
    id: 3,
    name: "Club de Nuit Iconic",
    price: 270,
    image: "https://picsum.photos/id/1027/600/800",
    notes: "Lemon • Ginger • Mint • Grapefruit",
  },
];

const MARQUEE_IMAGES = [
  "https://pngimg.com/uploads/perfume/perfume_PNG10275.png",
  "https://pngimg.com/uploads/perfume/perfume_PNG10281.png",
  "https://pngimg.com/uploads/perfume/perfume_PNG10252.png",
  "https://pngimg.com/uploads/perfume/perfume_PNG10234.png",
  "https://pngimg.com/uploads/perfume/perfume_PNG10237.png",
];

// --- Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.22,1,0.36,1] ${
          isScrolled ? 'bg-beige-50/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Menu Icon */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-beige-900/5 rounded-full transition-colors group"
          >
            <Menu className="w-6 h-6 text-beige-900 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <div className="flex flex-col items-center cursor-pointer group">
            <div className="relative flex items-center justify-center">
               <span className="font-serif text-4xl tracking-tighter font-medium z-10 relative">
                 VP
               </span>
               <span className="absolute whitespace-nowrap text-[0.5rem] tracking-[0.4em] uppercase font-sans font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-beige-50/90 px-2 py-1">
                 Vogue Perfum
               </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-beige-900/5 rounded-full transition-colors hidden sm:block group">
              <Search className="w-5 h-5 text-beige-900 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            </button>
            <button className="p-2 hover:bg-beige-900/5 rounded-full transition-colors relative group">
              <ShoppingBag className="w-5 h-5 text-beige-900 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-beige-50 h-screen w-full flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-2xl tracking-widest">VP</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-beige-900" strokeWidth={1} />
              </button>
            </div>
            <div className="flex flex-col space-y-8 font-serif text-3xl">
              {['Collections', 'New Arrivals', 'About', 'Contact'].map((item, i) => (
                <motion.a 
                  key={item} 
                  href="#" 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="hover:text-gold-500 transition-colors w-fit"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const GoldDust: React.FC = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: `${p.y}%`, x: `${p.x}%` }}
          animate={{ 
            opacity: [0, 0.6, 0], 
            y: [`${p.y}%`, `${p.y - 20}%`],
            x: [`${p.x}%`, `${p.x + (Math.random() > 0.5 ? 5 : -5)}%`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            width: p.size,
            height: p.size,
          }}
          className="absolute rounded-full bg-gold-400/60 blur-[1px]"
        />
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // --- Animation Variants ---
  const title = "VOGUE PERFUM";
  
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 120, filter: "blur(12px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: {
        duration: 1.4,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  // --- Scroll Transforms ---
  const yBottleScroll = useTransform(scrollY, [0, 1000], [0, 250]);
  
  // Global Text container scroll effects (Fade out slightly later to show off the letter movement)
  const scaleTextContainer = useTransform(scrollY, [0, 600], [1, 0.9]); 
  const opacityTextContainer = useTransform(scrollY, [200, 600], [1, 0]); 

  // Individual Letter Scroll Effects (Subtle Up/Down)
  // "Impunity" -> Imponencia. Large movements.
  // CRITICAL: Starts strictly at 0 to ensure initial alignment is perfect.
  const yLetterUp = useTransform(scrollY, [0, 600], [0, -100]); // Moves Up on Scroll
  const yLetterDown = useTransform(scrollY, [0, 600], [0, 100]); // Moves Down on Scroll
  
  // Explosion Parallax
  const scaleExplosion = useTransform(scrollY, [0, 500], [1, 1.5]);
  const opacityExplosion = useTransform(scrollY, [0, 300], [0.6, 0]);

  // --- Mouse Interaction ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]); 
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const currentMouseX = (e.clientX - rect.left) / width - 0.5;
    const currentMouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(currentMouseX);
    y.set(currentMouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#F5F2ED] perspective-2000"
    >
      {/* 1. Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FFFFFF_0%,_#F5F2ED_60%,_#E6E0D4_100%)] z-0" />
      <div className="absolute inset-0 bg-noise opacity-30 z-0" />

      {/* 2. Particles (Subtle) */}
      <GoldDust />

      {/* 3. Clean CSS Explosion (Replaces Image) */}
      <motion.div 
        style={{ 
          scale: scaleExplosion, 
          opacity: opacityExplosion,
          background: 'radial-gradient(circle, rgba(200,180,140,0.4) 0%, rgba(245,242,237,0) 70%)',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full z-[1] pointer-events-none blur-[80px]"
      />

      {/* 4. Brand Name (Z-Index 5, Fully Visible) */}
      <motion.div 
        variants={titleContainerVariants}
        initial="hidden"
        animate="visible"
        style={{ scale: scaleTextContainer, opacity: opacityTextContainer }}
        // ROBUST CENTERING: inset-0 with flex center ensures it fills screen and centers content exactly.
        className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none select-none"
      >
        <h1 className="font-serif font-black text-[10vw] md:text-[12vw] leading-none text-black tracking-tighter flex whitespace-nowrap">
          {title.split("").map((char, i) => {
             // Pattern Adjustment based on user arrows:
             // O (index 1, Odd) -> Arrow UP
             // G (index 2, Even) -> Arrow DOWN
             // U (index 3, Odd) -> Arrow UP
             // Therefore: Odd -> UP, Even -> DOWN
             const isEven = i % 2 === 0;
             return (
              <motion.span 
                key={i} 
                variants={letterVariants} 
                // Adjusted: Even goes Down, Odd goes Up
                style={{ y: isEven ? yLetterDown : yLetterUp }}
                className="inline-block relative"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
             );
          })}
        </h1>
      </motion.div>

      {/* 5. Bottle Container (Z-Index 20) */}
      <motion.div 
        style={{ rotateX, rotateY, y: yBottleScroll, transformStyle: "preserve-3d" }}
        className="relative z-20 w-full max-w-lg aspect-[3/4] flex items-center justify-center pointer-events-none"
      >
        {/* Floating Animation Loop */}
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ 
                y: [0, -20, 0], 
                opacity: 1 
            }} 
            transition={{ 
                y: {
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                },
                opacity: {
                    duration: 1.2,
                    delay: 0.2
                }
            }}
            className="relative w-full h-full flex items-center justify-center"
        >
            <img 
                src="https://pngimg.com/uploads/perfume/perfume_PNG10275.png" 
                alt="Jean Paul Gaultier Le Male"
                className="w-auto h-[55vh] max-h-[600px] object-contain"
                style={{ 
                  filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.2))" // Tighter, cleaner shadow
                }}
            />
            
            {/* Gloss Reflection (Subtle) */}
            <motion.div 
                style={{ 
                    x: useTransform(mouseX, [-0.5, 0.5], [-80, 80]),
                    opacity: useTransform(mouseY, [-0.5, 0.5], [0, 0.2]) 
                }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none mix-blend-soft-light rounded-full"
            />
        </motion.div>
      </motion.div>

      {/* 6. Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F5F2ED] via-[#F5F2ED]/90 to-transparent z-40 pointer-events-none" />

      {/* 7. Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-beige-900/40">Scroll</span>
        <motion.div 
            animate={{ height: [0, 50, 0], y: [0, 0, 10] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] bg-beige-900/30"
        />
      </motion.div>
    </section>
  );
};

interface VelocityScrollProps {
    images: string[];
    baseVelocity: number;
}

const VelocityMarquee: React.FC<VelocityScrollProps> = ({ images, baseVelocity = 100 }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Velocity effect: change direction or speed based on scroll
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap py-16 bg-[#F5F2ED] border-y border-beige-900/5 z-20 relative">
            <motion.div className="flex flex-nowrap gap-16" style={{ x }}>
                {/* Repeat images multiple times to ensure seamless loop */}
                {[...images, ...images, ...images, ...images].map((src, i) => (
                    <div key={i} className="relative aspect-[3/4] w-[200px] shrink-0 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100 hover:scale-105">
                         <img src={src} className="w-full h-full object-contain" alt={`Collection item ${i}`} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden mb-6 bg-white aspect-[3/4] shadow-sm">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full w-full p-8"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </motion.div>
        
        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <button className="w-full bg-beige-900 text-beige-50 font-sans text-[10px] tracking-widest uppercase py-4 hover:bg-gold-500 transition-colors">
              Add to Collection
            </button>
        </div>
      </div>

      <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-xl text-beige-900 mb-1">{product.name}</h3>
            <p className="font-sans text-[10px] text-beige-900/50 uppercase tracking-widest">{product.notes}</p>
          </div>
          <span className="font-serif italic font-medium text-beige-900">${product.price}</span>
      </div>
    </motion.div>
  );
};

const ProductGrid: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-beige-50 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-beige-900/10 pb-8"
        >
          <div>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-500 mb-4 block">
                The Collection
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-beige-900">
                Signatures
              </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 font-sans text-xs tracking-widest uppercase hover:text-gold-500 transition-colors mt-8 md:mt-0">
              View All <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section className="py-32 px-6 overflow-hidden bg-white relative z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-20">
        <motion.div 
          className="flex-1 w-full relative"
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
            <div className="absolute -top-10 -left-10 w-full h-full border border-beige-900/20 z-0"></div>
            <div className="aspect-[4/5] bg-beige-100 relative overflow-hidden z-10">
                <img 
                src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=2574&auto=format&fit=crop" 
                alt="Perfume creation process"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]"
                />
            </div>
        </motion.div>
        
        <motion.div 
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-block p-4 rounded-full border border-beige-900/10 mb-8">
            <Star className="w-4 h-4 text-gold-500" fill="currentColor" />
          </div>
          <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-[0.9]">
            The Art of <br/>
            <span className="italic text-beige-900/50">Invisible</span> Wear
          </h2>
          <p className="font-sans text-sm text-beige-900/60 leading-loose mb-10 max-w-md mx-auto md:mx-0">
            A perfume is like a piece of clothing, a message, a way of presenting oneself, a costume that differs according to the woman who wears it.
          </p>
          <button className="group flex items-center gap-3 border-b border-beige-900 pb-1 font-sans text-xs tracking-[0.2em] uppercase hover:text-gold-500 hover:border-gold-500 transition-colors mx-auto md:mx-0">
            Read The Journal
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1917] text-beige-100 py-24 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24">
            <div className="mb-12 md:mb-0">
                <span className="font-serif text-6xl md:text-8xl tracking-tighter opacity-20 block mb-8">VP</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32">
                <div>
                    <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase mb-8 text-beige-100/30">Explore</h4>
                    <ul className="space-y-4 font-serif text-2xl text-beige-100/80">
                    <li className="hover:text-gold-400 cursor-pointer transition-colors hover:translate-x-2 duration-300 block">Fragrances</li>
                    <li className="hover:text-gold-400 cursor-pointer transition-colors hover:translate-x-2 duration-300 block">Collections</li>
                    <li className="hover:text-gold-400 cursor-pointer transition-colors hover:translate-x-2 duration-300 block">Gifts</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase mb-8 text-beige-100/30">Connect</h4>
                    <ul className="space-y-4 font-sans text-xs text-beige-100/50">
                    <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Twitter</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Pinterest</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center font-sans text-[10px] text-beige-100/20 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Vogue Perfum. Paris - Tokyo - New York.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-beige-50">
      <Navbar />
      <main>
        <Hero />
        <VelocityMarquee images={MARQUEE_IMAGES} baseVelocity={-1} />
        <ProductGrid />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;