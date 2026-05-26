import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  Share2, 
  ShoppingBag, 
  Zap,
  Info,
  Check,
  UserCheck
} from 'lucide-react';

const ProductDetails = () => {
  const products = [
    {
      id: "m-ring",
      title: "Elite Scholar Smart Ring",
      subtitle: "GuruBramha Bespoke Accessories",
      price: "₹3,499",
      originalPrice: "₹6,999",
      discount: "50% OFF",
      rating: 4.9,
      reviewsCount: 128,
      description: "The ultimate digital smart ring companion for modern scholars. Crafted with high-tech black zirconia ceramic and custom polished 18k rose gold inner lining.",
      images: [
        { src: '/ring-main.png', alt: 'GuruBramha Scholar Ring Main View' },
        { src: '/ring-wear.png', alt: 'GuruBramha Scholar Ring Worn on Hand' },
        { src: '/ring-box.png', alt: 'GuruBramha Scholar Ring Luxury Box' }
      ],
      highlights: [
        { icon: <Zap className="text-rose-400" size={20} />, title: "NFC Scholar Tap", desc: "Instant contactless login & vault unlock" },
        { icon: <Sparkles className="text-rose-400" size={20} />, title: "Premium Ceramic & Rose Gold", desc: "Hypoallergenic, ultra-scratch-resistant" },
        { icon: <ShieldCheck className="text-rose-400" size={20} />, title: "1-Year Warranty", desc: "Complete insurance cover for tech & plating" }
      ],
      hasSizes: true,
      sizes: ['6', '7', '8', '9', '10', '11']
    },
    {
      id: "w-bracelet",
      title: "Aura Pearl Smart Bracelet",
      subtitle: "GuruBramha Elegant Collection",
      price: "₹4,299",
      originalPrice: "₹8,599",
      discount: "50% OFF",
      rating: 4.9,
      reviewsCount: 142,
      description: "Exquisite high-grade smart bracelet. Perfectly combining elegant freshwater pearls with high-end tech-enabled 18k rose gold metallic links and secure NFC access.",
      images: [
        { src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800', alt: 'Aura Pearl Bracelet Main' },
        { src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', alt: 'Aura Pearl Bracelet Studio' },
        { src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', alt: 'Aura Pearl Box Packaging' }
      ],
      highlights: [
        { icon: <Zap className="text-rose-400" size={20} />, title: "Contactless Scholar Sync", desc: "Unlock academic profile & files in a breeze" },
        { icon: <Sparkles className="text-rose-400" size={20} />, title: "Freshwater Pearls", desc: "Lustrous, individually hand-selected organic pearls" },
        { icon: <ShieldCheck className="text-rose-400" size={20} />, title: "IPX8 Waterproof", desc: "Completely swim-proof and daily water-resistant" }
      ],
      hasSizes: false
    },
    {
      id: "w-ring",
      title: "Athena Smart Ring",
      subtitle: "Bespoke Jewelry Suite",
      price: "₹3,999",
      originalPrice: "₹7,999",
      discount: "50% OFF",
      rating: 4.9,
      reviewsCount: 88,
      description: "Elegant polished rose gold smart ring featuring a brilliant solitaire diamond accent. Extremely lightweight profile, designed to match seamlessly with delicate jewelry.",
      images: [
        { src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800', alt: 'Athena Ring Main' },
        { src: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800', alt: 'Athena Ring Detail' },
        { src: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800', alt: 'Athena Ring Packaging' }
      ],
      highlights: [
        { icon: <Zap className="text-rose-400" size={20} />, title: "Micro NFC Chipset", desc: "Ultra-compact tech inside a ultra-slim band profile" },
        { icon: <Sparkles className="text-rose-400" size={20} />, title: "18k Rose Gold Plating", desc: "Luxury mirror finish over medical-grade steel core" },
        { icon: <ShieldCheck className="text-rose-400" size={20} />, title: "Solitaire CZ Diamond", desc: "Premium brilliant cut diamond setting for maximum sparkle" }
      ],
      hasSizes: true,
      sizes: ['5', '6', '7', '8', '9']
    },
    {
      id: "m-watch",
      title: "Chronos Titan Smartwatch",
      subtitle: "Elite Tech Suite",
      price: "₹7,999",
      originalPrice: "₹14,999",
      discount: "46% OFF",
      rating: 4.8,
      reviewsCount: 94,
      description: "A premium smartwatch blending clean classic watch aesthetics with high-performance digital scholar integration. Premium silver titan chassis with quick-swap Italian leather straps.",
      images: [
        { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', alt: 'Chronos Titan Watch Main' },
        { src: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800', alt: 'Chronos Titan Watch Wear' },
        { src: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800', alt: 'Chronos Titan Luxury Box' }
      ],
      highlights: [
        { icon: <Zap className="text-rose-400" size={20} />, title: "AMOLED Always-On", desc: "Retina display with luxury custom watchfaces" },
        { icon: <Sparkles className="text-rose-400" size={20} />, title: "Academic Sync", desc: "Syncs schedules, hackathons & alerts in real time" },
        { icon: <ShieldCheck className="text-rose-400" size={20} />, title: "Sapphire Crystal", desc: "Completely bulletproof scratch-resistant display glass" }
      ],
      hasSizes: false
    },
    {
      id: "m-folio",
      title: "Signature Leather Folio",
      subtitle: "Executive Scholar Essentials",
      price: "₹2,499",
      originalPrice: "₹4,999",
      discount: "50% OFF",
      rating: 5.0,
      reviewsCount: 62,
      description: "Genuine full-grain Nappa leather folio designed to carry your documents, tablets, and academic notebook in maximum style. Features an embedded NFC profile smart-tag.",
      images: [
        { src: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800', alt: 'Signature Folio Main' },
        { src: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', alt: 'Signature Folio Open' },
        { src: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800', alt: 'Signature Suite Set' }
      ],
      highlights: [
        { icon: <Zap className="text-rose-400" size={20} />, title: "Smart Profile Tag", desc: "Share your CV Architect profile with a simple tap" },
        { icon: <Sparkles className="text-rose-400" size={20} />, title: "Full Grain Leather", desc: "Hand-stitched premium Nappa leather that ages beautifully" },
        { icon: <ShieldCheck className="text-rose-400" size={20} />, title: "Secure Organizer", desc: "Padded pockets for devices & secure document sleeves" }
      ],
      hasSizes: false
    },
    {
      id: "w-organizer",
      title: "Siren Leather Organizer",
      subtitle: "Elegant Scholar Essentials",
      price: "₹2,899",
      originalPrice: "₹5,299",
      discount: "45% OFF",
      rating: 4.8,
      reviewsCount: 54,
      description: "Luxury blush pink pebbled leather organizer featuring gold-plated hardware. Securely holds your passport, scholar cards, CV, and pen with high-security smart NFC integrations.",
      images: [
        { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800', alt: 'Siren Organizer Main' },
        { src: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?w=800', alt: 'Siren Organizer Detail' },
        { src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800', alt: 'Siren Desk Setup' }
      ],
      highlights: [
        { icon: <Zap className="text-rose-400" size={20} />, title: "NFC Smart Share", desc: "Instantly tap to share digital business cards & resumes" },
        { icon: <Sparkles className="text-rose-400" size={20} />, title: "Blush Nappa Leather", desc: "Ultra-soft premium leather texture with gold accents" },
        { icon: <ShieldCheck className="text-rose-400" size={20} />, title: "RFID Protection", desc: "Anti-skimming tech to protect cards & secure documents" }
      ],
      hasSizes: false
    }
  ];

  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('8');
  const [isFavorite, setIsFavorite] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', transform: 'scale(1)' });
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentProduct = products[activeProductIndex];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      transform: 'scale(2.2)',
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', transform: 'scale(1)' });
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const switchProduct = (idx) => {
    setActiveProductIndex(idx);
    setActiveImageIndex(0);
    if (products[idx].hasSizes) {
      setSelectedSize(products[idx].sizes[1]);
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Ananya Sharma",
      rating: 5,
      date: "May 20, 2026",
      comment: "Absolutely stunning! The quality looks incredibly premium. Syncs seamlessly with the GuruBramha app.",
      verified: true
    },
    {
      id: 2,
      name: "Rohan Verma",
      rating: 5,
      date: "May 18, 2026",
      comment: "Love the NFC capability. Unlocking my Academic Vault with a simple tap of my gear feels like living in the future.",
      verified: true
    },
    {
      id: 3,
      name: "Priyanka K.",
      rating: 5,
      date: "May 12, 2026",
      comment: "Extremely lightweight and scratch-resistant. Wearing it 24/7. Packaging was also super luxurious!",
      verified: true
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-white via-slate-50/50 to-white text-slate-800 font-sans antialiased py-20 px-4 sm:px-8 md:px-12 max-w-[1400px] mx-auto rounded-[48px] shadow-2xl border border-slate-100/80 my-16 overflow-hidden">
      
      {/* Rose Gold Accent Background Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-100/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Premium Header and Unified Product Tabs */}
      <div className="flex flex-col items-center mb-16 text-center space-y-6">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-rose-400">GuruBramha Premium Suite</span>
        <h2 className="text-4xl sm:text-5xl font-serif text-slate-900 tracking-wide font-light">The Luxury Scholar Store</h2>
        
        {/* Unified Product Cards / Thumbnails Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full pt-4">
          {products.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => switchProduct(idx)}
              className={`p-4 rounded-[24px] border transition-all flex flex-col items-center text-center bg-white hover:shadow-md ${
                activeProductIndex === idx 
                  ? 'border-rose-400 shadow-md ring-2 ring-rose-200/50 scale-102' 
                  : 'border-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden mb-3 bg-slate-50">
                <img src={prod.images[0].src} alt={prod.title} className="w-full h-full object-cover" />
              </div>
              <h4 className={`text-xs font-black tracking-tight line-clamp-1 ${
                activeProductIndex === idx ? 'text-rose-500' : 'text-slate-700'
              }`}>{prod.title}</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-1">{prod.price}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Side: Product Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative aspect-[4/3] sm:aspect-square bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100 cursor-zoom-in group shadow-inner">
            
            {/* Main Interactive Zoom Area */}
            <div 
              className="w-full h-full relative overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.img 
                key={currentProduct.id + "-" + activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={currentProduct.images[activeImageIndex].src} 
                alt={currentProduct.images[activeImageIndex].alt} 
                className="w-full h-full object-cover transition-transform duration-100 ease-out"
                style={zoomStyle}
              />
              <img 
                src={currentProduct.images[activeImageIndex].src} 
                alt={currentProduct.images[activeImageIndex].alt} 
                className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none opacity-40"
              />
            </div>

            {/* Slider Navigation Buttons */}
            <button 
              onClick={() => setActiveImageIndex(prev => (prev === 0 ? currentProduct.images.length - 1 : prev - 1))}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 border border-slate-100 z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setActiveImageIndex(prev => (prev === currentProduct.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 border border-slate-100 z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Decorative Luxury Tag */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md border border-rose-100 text-rose-500 text-[10px] font-bold tracking-[0.2em] rounded-full uppercase shadow-sm flex items-center gap-2">
              <Sparkles size={12} className="animate-pulse text-rose-400" /> GIVA Inspired Luxury
            </div>
          </div>

          {/* Thumbnail Selectors */}
          <div className="flex gap-4 justify-center">
            {currentProduct.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white ${
                  activeImageIndex === idx 
                    ? 'border-rose-400 shadow-md scale-105' 
                    : 'border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-xl" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Header info */}
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-rose-400">{currentProduct.subtitle}</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 mt-2 mb-3 tracking-wide">{currentProduct.title}</h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < 4 ? "fill-rose-300 text-rose-300" : "fill-slate-200 text-slate-200"} />
                  ))}
                  <span className="text-sm font-bold text-slate-800 ml-1">{currentProduct.rating}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-xs font-bold text-slate-400 tracking-wide">{currentProduct.reviewsCount} Verified Scholars</span>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-slate-500 text-sm leading-relaxed">{currentProduct.description}</p>

            {/* Price & Offer Card */}
            <div className="bg-slate-50/50 backdrop-blur-md p-6 rounded-[24px] border border-slate-100/80 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-rose-200/10 rounded-full blur-xl transition-all group-hover:scale-150"></div>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-serif font-black text-slate-900">{currentProduct.price}</span>
                <span className="text-lg line-through text-slate-400 font-medium">{currentProduct.originalPrice}</span>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">{currentProduct.discount}</span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 mt-2 tracking-wide">Inclusive of all luxury taxes & lifetime custom app sync.</p>
              
              {/* GIVA Inspired Soft Blue Offer banner */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Zap size={14} className="fill-current" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Use Code <span className="text-rose-500 font-black">BRAMHA10</span> for extra 10% Off</p>
                  <p className="text-[10px] text-slate-400">Exclusive Scholar Launch Offer.</p>
                </div>
              </div>
            </div>

            {/* Size Selector if available */}
            {currentProduct.hasSizes && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 tracking-wide">Select Size (US)</label>
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs font-black text-rose-500 hover:text-rose-600 underline tracking-wider"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {currentProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-slate-900 text-white shadow-md scale-105 border-2 border-slate-900'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* highlights list */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {currentProduct.highlights.map((h, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-400 flex-shrink-0">
                    {h.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{h.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* CTAs (Standard Desktop CTAs) */}
          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => triggerToast(`Successfully added ${currentProduct.title} to your luxury cart!`)}
              className="flex-1 py-4 px-6 border border-slate-800 text-slate-800 font-bold hover:bg-slate-900 hover:text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-sm tracking-widest uppercase hover:shadow-lg active:scale-95"
            >
              <ShoppingBag size={18} /> Add To Cart
            </button>
            <button 
              onClick={() => triggerToast(`Redirecting to secure premium checkout for ${currentProduct.title}...`)}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-sm tracking-widest uppercase shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-[1.02] active:scale-95"
            >
              Buy Now
            </button>
            <button 
              onClick={() => {
                setIsFavorite(!isFavorite);
                triggerToast(isFavorite ? 'Removed from your premium Wishlist' : 'Added to your premium Wishlist!');
              }}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-center hover:scale-105 active:scale-95 ${
                isFavorite 
                  ? 'bg-rose-50 border-rose-300 text-rose-500' 
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
            >
              <Heart size={20} className={isFavorite ? "fill-current" : ""} />
            </button>
          </div>

          {/* Delivery & Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="text-slate-400" size={18} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RotateCcw className="text-slate-400" size={18} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">15 Day Return</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <UserCheck className="text-slate-400" size={18} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secure Sync</span>
            </div>
          </div>

        </div>

      </div>

      {/* Reviews & Scholar Testimonials Section */}
      <section className="mt-20 pt-16 border-t border-slate-100">
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-400">Voices of Experience</span>
          <h2 className="text-3xl font-serif text-slate-900 mt-2 mb-3">Scholar Endorsements</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">See how academic pioneers are using the smart accessories to elevate their digital identities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div key={r.id} className="bg-slate-50/50 backdrop-blur-md p-8 rounded-[32px] border border-slate-100/80 flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-rose-300 text-rose-300" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{r.date}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">"{r.comment}"</p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs font-black text-slate-800">{r.name}</span>
                <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check size={10} /> Verified Scholar
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Suite Items */}
      <section className="mt-20 pt-16 border-t border-slate-100">
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-400">Complete the Look</span>
          <h2 className="text-3xl font-serif text-slate-900 mt-2 mb-3">The Premium Academic Suite</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Leather Vault Binder", price: "₹1,299", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300" },
            { name: "Sleek Metal Pen Pro", price: "₹699", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300" },
            { name: "Premium Desk Pad", price: "₹999", img: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=300" },
            { name: "Minimal NFC Card", price: "₹499", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300" }
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden bg-slate-50 border border-slate-100 mb-4 relative shadow-sm">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-all"></div>
              </div>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-rose-500 transition-colors line-clamp-1">{item.name}</h4>
              <p className="text-xs font-serif font-black text-slate-500 mt-1">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Sticky CTA Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 p-4 flex items-center justify-between gap-4 z-[99] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400">Total Price</span>
          <span className="text-lg font-serif font-black text-slate-900">{currentProduct.price}</span>
        </div>
        <div className="flex gap-2 flex-grow justify-end">
          <button 
            onClick={() => triggerToast(`Successfully added ${currentProduct.title} to your luxury cart!`)}
            className="p-3 border border-slate-800 text-slate-800 rounded-xl hover:bg-slate-900 hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
          </button>
          <button 
            onClick={() => triggerToast(`Redirecting to secure premium checkout for ${currentProduct.title}...`)}
            className="flex-grow py-3 px-6 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold rounded-xl text-xs tracking-widest uppercase shadow-lg shadow-rose-200 max-w-[180px]"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl p-8 max-w-md w-full border border-slate-100 relative"
            >
              <button 
                onClick={() => setShowSizeGuide(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors"
              >
                ✕
              </button>
              <h3 className="text-xl font-serif text-slate-900 mb-6">Ring Size Guide</h3>
              
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">Wrap a strip of paper or string around your finger, mark the point of overlap, and measure the circumference in millimeters.</p>
                <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-inner">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="p-4">US Size</th>
                        <th className="p-4">Circumference (mm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                      {(currentProduct.id.includes('ring') ? (currentProduct.id.includes('m-') ? ['6 (51.8 mm)', '7 (54.4 mm)', '8 (56.9 mm)', '9 (59.5 mm)', '10 (62.1 mm)', '11 (64.6 mm)'] : ['5 (49.3 mm)', '6 (51.8 mm)', '7 (54.4 mm)', '8 (56.9 mm)', '9 (59.5 mm)']) : ['6 (51.8 mm)', '7 (54.4 mm)', '8 (56.9 mm)', '9 (59.5 mm)']).map((row, i) => {
                        const [sz, circ] = row.split(' ');
                        return (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="p-4 font-bold text-slate-800">{sz}</td>
                            <td className="p-4">{circ.replace(/[()]/g, '')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Premium Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[1001] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <Check size={14} />
            </div>
            <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProductDetails;
