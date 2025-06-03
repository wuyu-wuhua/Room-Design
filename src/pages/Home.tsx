import React, { useState, useRef, useEffect } from 'react';
// import ScrollingImageGallery from '../components/ScrollingImageGallery'; // Removed this import
import { AnimatedImageBackground } from '../components/AnimatedImageBackground'; // Added this import
import AccordionItem from '../components/AccordionItem';
import { cn } from '../lib/utils';
import { ScratchToReveal } from "../components/magicui/ScratchToReveal";
import { INTERIOR_STYLES } from '../data/styles';
import { Link } from 'react-router-dom';
import { Marquee } from '../components/magicui/marquee';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

// Data for sections, you can expand this based on interiorai.com content
const heroData = {
  superTitle: "AI Room Design - Free AI Interior Generator",
  title: "AI-powered Room Design, Try for Free!",
  subTitle: "Upload your room photo or enter your needs, and AI will generate multiple design styles in seconds. Enjoy free AI room design forever and unlock new possibilities for your space.",
  features: [
    "📷 Upload your room photo, AI auto Room Design",
    "🎨 Multiple styles to meet your needs",
    "💡 Free AI Room Design Experience",
    "🛋️ AI Interior Design, professional results",
    "✏️ Download and share your designs"
  ],
  ctaText: "Try Free AI Room Design →",
  googleCtaText: "Sign Up with Google"
};

const companies = ["Netflix", "Berkeley University", "Accenture", "Mercedes-Benz"]; // Add more as needed
const publications = ["New York Times", "Arch Daily", "TechCrunch", "MSN", "Yahoo! News"];

interface FaqItem {
  question: string;
  answer: string;
  isOpenInitially?: boolean;
}

const faqData: FaqItem[] = [
  { question: "How do I start an AI room design?", answer: "Simply upload a photo or sketch, select your preferred style, and let our AI generate stunning interior concepts in seconds." },
  { question: "Is my uploaded data and design private?", answer: "Yes, all your uploads and generated designs are securely stored and only visible to you unless you choose to share them." },
  { question: "Can the AI recommend styles for my space?", answer: "Absolutely! Our AI analyzes your room and suggests the most suitable styles based on your preferences and room features." },
  { question: "How can I export or download my AI designs?", answer: "You can export your favorite designs in high resolution with a single click, ready for sharing or printing." },
  { question: "Does the platform support team collaboration?", answer: "Yes, you can invite team members to view, comment, and co-create on your design projects in real time." },
  { question: "Is there a mobile version or app?", answer: "Our web app is fully responsive and works great on mobile devices. A dedicated app is coming soon!" },
  { question: "What new features are planned for the future?", answer: "We are working on AR visualization, more style packs, and direct furniture shopping from your AI designs." },
];

function ScratchToRevealDemo({ image = "/images/drawing.jpg", revealImage = "/images/drawing1.jpg" }) {
  return (
    <div className="relative w-[400px] h-[300px] flex items-center justify-center">
      <ScratchToReveal
        width={400}
        height={300}
        minScratchPercentage={60}
        className="overflow-hidden rounded-2xl border-2 bg-gray-100"
        image={image}
        revealImage={revealImage}
      />
    </div>
  );
}

function BeforeAfterClipSlider() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-full h-full select-none flex items-center justify-center">
      <img src="/images/back.jpg" alt="before" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
      <img
        src="/images/photo.jpg"
        alt="after"
        className="absolute inset-0 h-full object-cover rounded-lg"
        style={{
          width: '100%',
          height: '100%',
          clipPath: `inset(0 ${100 - pos}% 0 0)`
        }}
      />
      <div
        className="absolute top-0 bottom-0 z-20 flex flex-col items-center"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-1 h-full bg-white/80 rounded-full shadow" />
        <div className="w-6 h-6 bg-pink-500 border-4 border-white rounded-full shadow-lg mt-[-18px] cursor-pointer"
          style={{ touchAction: 'none' }}
          onPointerDown={e => {
            const move = (ev: PointerEvent) => {
              const parent = (e.target as HTMLElement).parentElement?.parentElement as HTMLElement;
              if (!parent) return;
              const rect = parent.getBoundingClientRect();
              let x = ev.clientX - rect.left;
              x = Math.max(0, Math.min(x, rect.width));
              setPos((x / rect.width) * 100);
            };
            const up = () => {
              window.removeEventListener('pointermove', move);
              window.removeEventListener('pointerup', up);
            };
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', up);
          }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={e => setPos(Number(e.target.value))}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 z-10 opacity-0 pointer-events-none"
        tabIndex={-1}
        aria-label="对比滑块"
      />
    </div>
  );
}

function UploadSimulation() {
  const [img, setImg] = useState<string | null>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImg(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
        {img ? (
          <img src={img} alt="preview" className="max-h-80 rounded-lg shadow-lg object-contain" />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0-3 3m3-3 3 3"/><rect width="18" height="14" x="3" y="5" rx="2"/></svg>
            <span className="mt-2">点击上传图片</span>
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </label>
    </div>
  );
}

// 用户评论内容（英文，头像随机，数量扩充到22条）
const userComments = [
  { quote: "AI made my home look like a magazine cover! The details are incredible.", author: "Sophia Lee", role: "Homeowner", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { quote: "I love how easy it is to try different styles. The AI suggestions are spot on!", author: "James Carter", role: "Interior Designer", avatar: "https://randomuser.me/api/portraits/men/34.jpg" },
  { quote: "The virtual staging feature helped me sell my property faster.", author: "Maria Gomez", role: "Realtor", avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
  { quote: "I was amazed by the color and furniture recommendations. Super professional!", author: "Liam Smith", role: "DIY Enthusiast", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
  { quote: "The AI-generated images are perfect for my client presentations.", author: "Olivia Chen", role: "Design Studio Owner", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { quote: "No design background needed. The interface is intuitive and fun!", author: "Ethan Brown", role: "New User", avatar: "https://randomuser.me/api/portraits/men/77.jpg" },
  { quote: "I can visualize changes before making real-life decisions. That's so valuable!", author: "Emma Wilson", role: "Home Buyer", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
  { quote: "Batch processing and team collaboration features are super useful for our agency.", author: "Lucas Martin", role: "Agency Manager", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
  { quote: "The AI's lighting suggestions made my living room so much cozier!", author: "Ava Davis", role: "Home Decor Lover", avatar: "https://randomuser.me/api/portraits/women/23.jpg" },
  { quote: "I can finally see my ideas come to life before any renovation starts.", author: "Noah Miller", role: "Homeowner", avatar: "https://randomuser.me/api/portraits/men/53.jpg" },
];

const Home: React.FC = () => {
  const [billingType, setBillingType] = React.useState('yearly');
  const [selectedPlan, setSelectedPlan] = React.useState<number | null>(null);
  const [showStepModal, setShowStepModal] = useState<null | number>(null);
  const [uploadedSketch, setUploadedSketch] = useState<string | null>(null);

  // VANTA.CLOUDS背景ref和初始化
  const vantaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let vantaEffect: any;
    let mounted = true;
    Promise.all([
      // @ts-expect-error: no types for three
      import('three'),
      // @ts-expect-error: no types for vanta.clouds.min
      import('vanta/dist/vanta.clouds.min')
    ]).then(([THREE, VANTA]) => {
      if (vantaRef.current && mounted) {
        vantaEffect = VANTA.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          backgroundColor: 0x0,
          skyColor: 0x0,
          sunGlareColor: 0x824d39
        });
      }
    });
    return () => {
      mounted = false;
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  function handleUploadSketch(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setUploadedSketch(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="text-white">
      {/* Hero Section with AnimatedImageBackground as background */}
      <section className="relative min-h-screen flex flex-col justify-center text-left overflow-hidden pt-20 md:pt-24 lg:pt-28">
        {/* <div className=\"absolute inset-0 w-full h-full z-0\"> // Removed this block
          <ScrollingImageGallery />
        </div> */}
        {/* <div className=\"absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10\"></div> */}
        
        <AnimatedImageBackground /> {/* Added the new background component here */}

        <div className="relative z-20 container mx-auto px-4 sm:px-6 md:pl-8 md:pr-6 lg:pl-12 lg:pr-8 xl:pl-16 xl:pr-12 w-full flex-grow flex items-center">
          <div className="flex flex-col md:flex-row items-center md:justify-between w-full md:space-x-10 lg:space-x-16 xl:space-x-20">
            
            <div className="md:w-7/12 lg:w-6/12 xl:w-7/12 text-left mb-10 md:mb-0 flex flex-col justify-center py-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-300 tracking-wide">{heroData.superTitle}</h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient-x overflow-visible pb-2">AI-powered Room Design, Try for Free!</h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-lg mx-auto md:mx-0">
                {heroData.subTitle}
              </p>
              {/* 新功能点卡片式分组 */}
              
            </div>

            <div className="md:w-5/12 lg:w-4/12 xl:w-4/12 flex items-center justify-center md:justify-end w-full px-2 sm:px-0 ml-auto">
              <div className="bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-purple-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-400/30">
                <div className="relative mb-6">
                  <input 
                    type="email" 
                    placeholder="Please enter your email..." 
                    className="w-full p-4 rounded-lg bg-gray-900/80 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-shadow shadow-md focus:shadow-blue-500/30 border border-blue-400/20"
                  />
                  <span className="absolute top-[-12px] right-3 bg-gradient-to-r from-blue-400 via-blue-300 to-purple-300 text-white text-xs font-semibold px-3 py-0.5 rounded-full shadow-md">
                    New & Improved
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-purple-500 hover:from-blue-300 hover:to-purple-300 font-bold py-3.5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mb-4 text-lg tracking-wide">
                  Start AI Interior Design Now →
                </button>
                <button className="w-full bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-pink-400 hover:from-blue-300 hover:to-purple-300 text-orange font-bold py-3.5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mb-2 flex items-center justify-center text-lg tracking-wide">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1l-9-9a1 1 0 0 0-1.41 0l-9 9a1 1 0 0 0 1.41 1.41l.29-.3V20a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.79l.29.3a1 1 0 0 0 1.41-1.41z"/></svg>
                  Use Google Account to Register
                </button>
                <p className="text-xs text-blue-400 w-full text-center pt-1">Already have an account? You'll be automatically logged in</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hero下方插入关键词云 */}
      {/* <div className="my-8 flex flex-wrap justify-center gap-2">
        {[
          "ai room design", "ai interior design", "room design ai", "interior design ai", "room ai", "ai room designer", "ai room planner", "ai interior design free", "room designer ai", "ai room design free", "interior design ai free", "ai for interior design", "interior ai", "room design", "ai room design generator", "ai room generator", "design room"
        ].map((kw, i) => (
          <span key={i} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:scale-105 transition-transform cursor-pointer">{kw}</span>
        ))}
      </div> */}

      {/* Hero下方插入三大功能区块 */}
      {/* 已按用户要求删除底部三大功能卡片区块 */}

        {/* Hero区块后插入社区统计区块 */}
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-black/90">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/90 via-black/60 to-transparent z-10 pointer-events-none" />
          <div className="container mx-auto px-6 text-center relative z-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">Join a thriving community</h2>
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-8">
              {[{num:360000,label:'registered users'},{num:3000000,label:'designs generated'},{num:150,label:'countries'}].map((item,i)=>(
                <CountCard key={i} num={item.num} label={item.label} index={i} />
              ))}
            </div>
          </div>
        </section>

      {/* Unparalleled Detail in Every AI Design - Masonry瀑布流全屏图片 */}
      <section className="relative w-full min-h-[1300px] bg-black overflow-x-hidden px-0 py-0">
        {/* Masonry图片作为背景，铺满全屏 */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 sm:gap-6 w-full max-w-none [column-fill:_balance] p-4">
            {Array.from({ length: 40 }).map((_, index) => (
              <div key={index} className="mb-4 break-inside-avoid rounded-lg shadow-xl hover:shadow-cyan-500/30 transition-shadow duration-300 overflow-hidden group cursor-pointer bg-gray-800">
                <img
                  src={`/images/${index + 1}.jpg`}
                  alt={`AI Detail ${index + 1}`}
                  className="w-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  style={{ height: `${120 + (index % 5) * 20}px`, minHeight: '100px', maxHeight: '200px' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* 顶部黑色渐变蒙版 */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/90 via-black/60 to-transparent z-10 pointer-events-none" />
        </div>
        {/* 三大功能卡片悬浮在顶部 */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-6 pt-10 md:pt-16 mb-20" style={{ minHeight: '200px' }}>
          {/* 卡片1 - 向右倾斜，hover平面 */}
          <div
            className="bg-[#232b3a]/95 rounded-2xl shadow-2xl px-8 py-6 min-w-[240px] max-w-xs flex flex-col items-center border border-blue-900/40 transition-transform duration-500 cursor-pointer group"
            style={{
              transform: 'perspective(800px) rotateY(18deg)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'perspective(800px) rotateY(18deg)'}
          >
            <div className="flex items-center mb-2 text-2xl font-bold text-white"><span className="mr-2">🎨</span>AI Room Designer</div>
            <div className="text-blue-200 text-base mb-4 text-center">Upload your room photo, AI auto Room Design</div>
            <a href="/design-room" className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-blue-500 hover:to-cyan-500 transition">Try Now</a>
          </div>
          {/* 卡片2 - 中间，hover时凸出 */}
          <div
            className="bg-[#232b3a]/95 rounded-2xl shadow-2xl px-8 py-6 min-w-[240px] max-w-xs flex flex-col items-center border border-blue-900/40 transition-all duration-500 cursor-pointer group"
            style={{
              transform: 'perspective(800px) rotateY(0deg)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) scale(1.08)'; e.currentTarget.style.boxShadow = '0 12px 48px 0 rgba(0,180,255,0.25), 0 2px 16px 0 rgba(0,0,0,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg)'; e.currentTarget.style.boxShadow = ''; }}
          >
            <div className="flex items-center mb-2 text-2xl font-bold text-white"><span className="mr-2">✏️</span>Room Design Generator</div>
            <div className="text-blue-200 text-base mb-4 text-center">Input your needs or style, AI generates personalized room design</div>
            <a href="/text-room" className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-blue-500 hover:to-cyan-500 transition">Text to Design</a>
          </div>
          {/* 卡片3 - 向左倾斜，hover平面 */}
          <div
            className="bg-[#232b3a]/95 rounded-2xl shadow-2xl px-8 py-6 min-w-[240px] max-w-xs flex flex-col items-center border border-blue-900/40 transition-transform duration-500 cursor-pointer group"
            style={{
              transform: 'perspective(800px) rotateY(-18deg)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'perspective(800px) rotateY(-18deg)'}
          >
            <div className="flex items-center mb-2 text-2xl font-bold text-white"><span className="mr-2">👁️‍🗨️</span>AI Interior Design Gallery</div>
            <div className="text-blue-200 text-base mb-4 text-center">More room pictures are waiting for you to discover</div>
            <a href="/gallery" className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-blue-500 hover:to-cyan-500 transition">View gallery</a>
          </div>
        </div>
      </section>

      {/* "Take a photo and redesign your interior in seconds using AI" Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">AI-Powered room & Curb Appeal Makeover</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            See the transformation before and after—drag the slider to compare! Instantly visualize how AI can enhance your garden, yard, or home exterior with lush landscaping, modern design, and stunning curb appeal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <BeforeAfterSlider before="/images/before.jpg" after="/images/after.jpg" alt="Outdoor 1" />
            <BeforeAfterSlider before="/images/before1.jpg" after="/images/after1.jpg" alt="Outdoor 2" />
            <BeforeAfterSlider before="/images/before2.jpg" after="/images/after2.jpg" alt="Outdoor 3" />
            <BeforeAfterSlider before="/images/before3.jpg" after="/images/after3.jpg" alt="Outdoor 4" />
          </div>
        </div>
      </section>


      {/* Transform sketches and SketchUp Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-100">AI Sketch-to-Render: Instantly Visualize Your Ideas</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl">
            {/* Step 1: Upload Sketch */}
            <div
              className="flex-1 bg-gradient-to-br from-[#232b3a] via-[#232b3a]/80 to-[#181c23] rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
              onClick={() => setShowStepModal(1)}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" fill="none" stroke="#2563eb" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 16v-8m0 0-3 3m3-3 3 3"/><rect width="18" height="14" x="3" y="5" rx="2"/></svg>
              </div>
              <div className="text-lg font-bold text-white mb-2">Upload Sketch</div>
              <div className="text-base text-blue-100 text-center">Start with a hand-drawn or digital sketch of your room or idea.</div>
            </div>
            {/* Step 2: AI Analysis */}
            <div
              className="flex-1 bg-gradient-to-br from-[#232b3a] via-[#232b3a]/80 to-[#181c23] rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
              onClick={() => setShowStepModal(2)}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-purple-100 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" fill="none" stroke="#a21caf" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8l-4 4 4 4"/></svg>
              </div>
              <div className="text-lg font-bold text-white mb-2">AI Analysis</div>
              <div className="text-base text-purple-100 text-center">AI understands your sketch, analyzes space, style, and layout.</div>
            </div>
            {/* Step 3: Render Result */}
            <div
              className="flex-1 bg-gradient-to-br from-[#232b3a] via-[#232b3a]/80 to-[#181c23] rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
              onClick={() => setShowStepModal(3)}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12h8"/></svg>
              </div>
              <div className="text-lg font-bold text-white mb-2">Render Result</div>
              <div className="text-base text-green-100 text-center">Get a photorealistic, fully-styled AI rendering in seconds.</div>
            </div>
          </div>
          {/* 步骤弹窗 */}
          {showStepModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowStepModal(null)}>
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
                <button className="absolute top-3 right-3 text-white text-2xl" onClick={() => setShowStepModal(null)}>&times;</button>
                {showStepModal === 1 && (
                  <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-4 text-white">Upload Sketch</h3>
                    <label className="mb-4 flex flex-col items-center cursor-pointer">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Choose File</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleUploadSketch} />
                      <span className="mt-2 text-blue-200 text-sm">{uploadedSketch ? "File selected" : "No file chosen"}</span>
                    </label>
                    {uploadedSketch && <img src={uploadedSketch} alt="Sketch Preview" className="rounded-xl shadow-lg w-64 h-48 object-contain" />}
                    {!uploadedSketch && <p className="text-blue-100 mt-4">Please upload a hand-drawn or digital sketch to begin your AI design journey.</p>}
                  </div>
                )}
                {showStepModal === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">AI Analysis</h3>
                    <p className="text-blue-100">Our AI will analyze your sketch for room structure, furniture placement, and style cues. This step ensures the generated design is tailored to your space and preferences. You can adjust detected features before rendering.</p>
                  </div>
                )}
                {showStepModal === 3 && (
                  <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-4 text-white">Render Result</h3>
                    <video src="/video/demo.mp4" controls className="rounded-xl shadow-lg w-80 h-56 bg-black" />
                    <p className="text-blue-100 mt-4">See how your sketch is transformed into a photorealistic AI rendering!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Virtual Staging AI Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">AI Virtual Staging: See the Possibilities</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Instantly stage any empty room with AI. From modern minimalism to cozy comfort, explore multiple design options for your property in seconds.
          </p>
          <VirtualStagingSlider />
        </div>
      </section>

      {/* Testimonials Section 跑马灯 */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">Real users give rave reviews</h2>
          <div className="space-y-8">
            <Marquee pauseOnHover repeat={2} className="[--duration:90s]">
              {userComments.map((c, i) => (
                <div key={i} className="flex items-center bg-gray-800 rounded-xl shadow-lg px-4 py-4 mx-2 min-w-[220px] max-w-xs">
                  <img src={c.avatar} alt={c.author} className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-pink-400" />
                  <div>
                    <p className="text-gray-200 text-sm mb-1 font-medium">"{c.quote}"</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="font-semibold text-white mr-1">{c.author}</span>·{c.role}
                    </div>
                    <div className="text-yellow-400 mt-1 text-xs">{'⭐️⭐️⭐️⭐️⭐️'}</div>
                  </div>
                </div>
              ))}
            </Marquee>
            <Marquee pauseOnHover reverse repeat={2} className="[--duration:100s]">
              {userComments.slice().reverse().map((c, i) => (
                <div key={i} className="flex items-center bg-gray-800 rounded-xl shadow-lg px-4 py-4 mx-2 min-w-[220px] max-w-xs">
                  <img src={c.avatar} alt={c.author} className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-purple-400" />
                  <div>
                    <p className="text-gray-200 text-sm mb-1 font-medium">"{c.quote}"</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="font-semibold text-white mr-1">{c.author}</span>·{c.role}
                    </div>
                    <div className="text-yellow-400 mt-1 text-xs">{'⭐️⭐️⭐️⭐️⭐️'}</div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-white">AI-Enhanced Details, Smarter Design</h2>
          <p className="text-lg md:text-xl text-center text-gray-300 max-w-3xl mx-auto mb-14">
            Experience next-level interior design with AI: every detail is intelligently optimized, from lighting and color harmony to furniture layout and style matching. Discover how AI brings your dream space to life—effortlessly, beautifully, and uniquely yours.
          </p>
          <div className="pb-4">
            <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-8 min-w-0 sm:min-w-[900px] ml-0 sm:ml-24">
              {/* Card 1 */}
              <div className="bg-gray-800 rounded-2xl shadow-xl w-64 sm:w-80 flex-shrink-0 flex flex-col items-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
                <img src="/images/mo.jpg" alt="Modern Living" className="rounded-xl mb-4 w-full h-44 object-cover" />
                <div className="text-blue-300 font-semibold mb-1">Modern Living</div>
                <div className="text-white text-lg font-bold mb-2">Intelligent Lighting</div>
                <div className="text-gray-300 text-sm text-center">AI automatically optimizes lighting and color temperature for a brighter, more comfortable space.</div>
              </div>
              {/* Card 2 */}
              <div className="bg-gray-800 rounded-2xl shadow-xl w-64 sm:w-80 flex-shrink-0 flex flex-col items-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
                <img src="/images/scan.jpg" alt="Scandinavian" className="rounded-xl mb-4 w-full h-44 object-cover" />
                <div className="text-pink-300 font-semibold mb-1">Scandinavian</div>
                <div className="text-white text-lg font-bold mb-2">Style Matching</div>
                <div className="text-gray-300 text-sm text-center">AI recommends the best design style based on your photo or description.</div>
              </div>
              {/* Card 3 */}
              <div className="bg-gray-800 rounded-2xl shadow-xl w-64 sm:w-80 flex-shrink-0 flex flex-col items-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
                <img src="/images/mini.jpg" alt="Minimalist" className="rounded-xl mb-4 w-full h-44 object-cover" />
                <div className="text-green-300 font-semibold mb-1">Minimalist</div>
                <div className="text-white text-lg font-bold mb-2">Space Optimization</div>
                <div className="text-gray-300 text-sm text-center">AI analyzes your room and generates the optimal furniture layout automatically.</div>
              </div>
              {/* Card 4 */}
              <div className="bg-gray-800 rounded-2xl shadow-xl w-64 sm:w-80 flex-shrink-0 flex flex-col items-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
                <img src="/images/rich.jpg" alt="Luxury" className="rounded-xl mb-4 w-full h-44 object-cover" />
                <div className="text-yellow-300 font-semibold mb-1">Luxury</div>
                <div className="text-white text-lg font-bold mb-2">Material & Color Harmony</div>
                <div className="text-gray-300 text-sm text-center">AI selects the best materials and color palettes for a beautiful, cohesive look.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated */}
      <section id="faq" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20 text-white">AI Interior Design Help Center</h2>
          <div className="flex flex-col md:flex-row md:space-x-10 lg:space-x-16 items-start">
            {/* Left: Smartphone Mockup Placeholder */}
            <div className="w-full md:w-1/3 lg:w-2/5 mb-12 md:mb-0 flex justify-center md:sticky md:top-28"> {/* Sticky on desktop */}
              <div className="relative mx-auto border-gray-700 bg-gray-800 border-[10px] rounded-[2.5rem] h-[550px] w-[280px] sm:h-[600px] sm:w-[300px] shadow-2xl">
                <div className="w-[120px] h-[18px] bg-gray-800 top-0 left-1/2 -translate-x-1/2 absolute rounded-b-[1rem] z-10"></div>
                <div className="h-[32px] w-[3px] bg-gray-700 absolute -left-[11px] top-[60px] rounded-l-lg"></div>
                <div className="h-[32px] w-[3px] bg-gray-700 absolute -left-[11px] top-[110px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-700 absolute -right-[11px] top-[100px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black flex items-center justify-center">
                  <video
                    src="/images/手机.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Accordion FAQs */}
            <div className="w-full md:w-2/3 lg:w-3/5">
              <div className="space-y-5">
                {faqData.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    question={faq.question} 
                    answer={faq.answer} 
                    isOpenInitially={faq.isOpenInitially}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-white">Explore a Universe of Interior Styles</h2>
          <p className="text-lg md:text-xl text-center text-gray-300 max-w-3xl mx-auto mb-12">
            Discover the perfect aesthetic for your space. Our AI masters dozens of styles, with new ones added regularly. Find your inspiration and let us bring it to life.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6" id="styles-grid">
            {
              INTERIOR_STYLES.map(style => (
                <div key={style.name} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src={style.imgSrc} alt={style.name} className="w-full h-32 object-cover" />
                  <div className="p-4 text-center">
                    <h4 className="font-semibold text-white">{style.name}</h4>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="text-center mt-12">
            <a href="#" className="text-pink-500 hover:text-pink-400 font-semibold text-lg">Browse All Styles →</a>
          </div>
        </div>
      </section>

      {/* Pricing Section - Added ID */}
      <section id="pricing-plans" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">Simple Plans for Every Design Need</h2>
          
          {/* 月/年切换按钮 */}
          <div className="flex justify-center mb-10 gap-4">
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 border-2 ${billingType === 'monthly' ? 'bg-blue-500 text-white border-blue-500 shadow-lg' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}`}
              onClick={() => setBillingType('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 border-2 ${billingType === 'yearly' ? 'bg-purple-500 text-white border-purple-500 shadow-lg' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}`}
              onClick={() => setBillingType('yearly')}
            >
              ✨Yearly Get 6+ Months Free with Yearly!
            </button>
          </div>
          
          {/* 价格栏 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter AI",
                priceMonthly: "$39",
                priceYearly: "$17",
                yearlyFull: "$288 billed yearly",
                features: [
                  "500 AI design generations/mo",
                  "Access to core styles",
                  "Standard image resolution",
                  "Personal use license",
                  "Community support"
                ],
              },
              {
                name: "Pro AI Designer",
                priceMonthly: "$99",
                priceYearly: "$42",
                yearlyFull: "$588 billed yearly",
                features: [
                  "2,000 AI design generations/mo",
                  "Access to all 50+ styles",
                  "High-resolution images",
                  "Sketch & 3D model uploads",
                  "Commercial use license",
                  "Priority support"
                ],
                popular: true
              },
              {
                name: "Studio AI Suite",
                priceMonthly: "$299",
                priceYearly: "$142",
                yearlyFull: "$1980 billed yearly",
                features: [
                  "10,000 AI design generations/mo",
                  "All Pro features, plus:",
                  "Batch image processing",
                  "Team collaboration tools (beta)",
                  "API access (coming soon)",
                  "Dedicated account manager"
                ]
              }
            ].map((plan, idx) => (
              <div
                key={plan.name}
                className={`bg-gray-800 p-8 rounded-lg shadow-xl border-2 flex flex-col transition-all duration-200 cursor-pointer ${plan.popular ? 'border-blue-500' : 'border-gray-700'} ${selectedPlan === idx ? 'ring-4 ring-blue-400 scale-105 z-10' : 'hover:ring-2 hover:ring-blue-300 hover:scale-105'}`}
                onMouseEnter={() => setSelectedPlan(idx)}
                onMouseLeave={() => setSelectedPlan(null)}
                onClick={() => setSelectedPlan(idx)}
              >
                {plan.popular && <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">Most Popular</span>}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-4xl font-extrabold text-white mb-1">
                  {billingType === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                  <span className="text-base font-normal text-gray-400">/mo</span>
                </p>
                {billingType === 'yearly' && (
                  <p className="text-sm text-gray-400 mb-6">{plan.yearlyFull}</p>
                )}
                <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#" className="w-full bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-purple-500 hover:from-blue-300 hover:to-purple-300 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-center">
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section - VANTA.CLOUDS背景+新内容 */}
      <section className="py-16 md:py-24 bg-black relative" id="vanta-clouds-bg">
        <div ref={vantaRef} className="absolute inset-0 w-full h-full z-0" />
        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">Ready to Revolutionize Your Space?</h2>
          <p className="text-lg md:text-2xl text-blue-100 mb-8 font-medium drop-shadow">Experience the future of interior design with AI. Instantly visualize, customize, and create your dream room with just a click. No design skills needed—just your imagination and our powerful AI engine!</p>
          <ul className="text-left mb-8 space-y-3 max-w-lg mx-auto text-blue-200 text-base md:text-lg">
            {["🚀 One-click AI room transformation","🎨 Explore endless styles & layouts","⚡ Lightning-fast, photorealistic results","🌍 Perfect for homes, offices, rentals & more","🔒 Secure, private, and always free to try"].map((feature, index) => (
               <li key={index} className="flex items-start">
                <span className="mr-2 text-2xl">{feature.substring(0, feature.indexOf(' '))}</span>
                <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
              </li>
            ))}
          </ul>
          <a
            href="/design-room"
            className="bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-white-400 font-bold px-8 py-4 rounded-full shadow-lg hover:from-blue-400 hover:via-blue-500 hover:to-green-300 hover:text-purple-500 transition-all duration-200 text-lg md:text-xl flex items-center gap-2 group"
          >
            Start Designing →
          </a>
        </div>
      </section>

      {/* 页脚增加相关搜索区 */}
      {/* <footer className="bg-black py-8 mt-12">
        <div className="container mx-auto text-center">
          <div className="mb-4 text-gray-400">相关搜索：</div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "ai room design", "ai interior design", "room design ai", "interior design ai", "room ai", "ai room designer", "ai room planner", "ai interior design free", "room designer ai", "ai room design free", "interior design ai free", "ai for interior design", "interior ai", "room design", "ai room design generator", "ai room generator", "design room"
            ].map((kw, i) => (
              <Link key={i} to={"/search?kw="+encodeURIComponent(kw)} className="text-xs text-blue-400 hover:underline mx-1">{kw}</Link>
            ))}
          </div>
        </div>
      </footer> */}

      {/* Standalone Footer - If you don't have a global one, add it here */}
      {/* If you have a global Footer component, you'd modify that instead */}
    </div>
  );
};

function CountCard({num,label,index}:{num:number,label:string,index:number}){
  const [count,setCount] = React.useState(0);
  // 判断是否移动端
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  let display: string;
  if(isMobile) {
    if(index===0) display = '36w+';
    else if(index===1) display = '300w+';
    else display = '150+';
  } else {
    display = count.toLocaleString()+"+";
  }
  React.useEffect(()=>{
    if(isMobile) return;
    let start=0;
    const end=num;
    if(start===end)return;
    let increment=Math.ceil(end/60);
    let timer=setInterval(()=>{
      start+=increment;
      if(start>=end){start=end;clearInterval(timer);}
      setCount(start);
    },16);
    return()=>clearInterval(timer);
  },[num,isMobile]);
  return (
    <div className="bg-gray-800/80 rounded-2xl shadow-xl px-4 py-6 flex-1 min-w-[90px] max-w-xs flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-blue-400/30 cursor-pointer
      sm:min-w-[220px] sm:px-10 sm:py-8
      text-base sm:text-2xl">
      <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-blue-200 mb-2">{display}</div>
      <div className="text-xs sm:text-base text-blue-100">{label}</div>
    </div>
  );
}

function VirtualStagingSlider(){
  const images=[
    {src:'/images/sketches.jpg',label:'Line Drawing'},
    {src:'/images/drawing1.jpg',label:'Sea ​​Breeze'},
    {src:'/images/drawing2.jpg',label:'Cozy Comfort'},
    {src:'/images/drawing.jpg',label:'Cyberpunk Style'}
  ];
  const [idx,setIdx]=React.useState(0);
  function prev(){setIdx(i=>(i-1+images.length)%images.length);}
  function next(){setIdx(i=>(i+1)%images.length);}
  return (
    <div className="flex flex-col items-center gap-6 mt-12 w-full">
      <div className="relative flex items-center justify-center w-full max-w-xl mx-auto">
        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-blue-500/80 text-white rounded-full p-3 shadow-lg z-10 transition-all duration-200"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg></button>
        <img src={images[idx].src} alt={images[idx].label} className="rounded-2xl shadow-2xl w-[340px] h-[240px] object-cover mx-auto transition-all duration-300" />
        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-blue-500/80 text-white rounded-full p-3 shadow-lg z-10 transition-all duration-200"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
      </div>
      <div className="flex gap-2 justify-center mt-2">
        {images.map((img,i)=>(
          <button key={i} onClick={()=>setIdx(i)} className={`w-3 h-3 rounded-full ${i===idx?'bg-blue-400':'bg-gray-600'} border-2 border-white transition-all`} aria-label={img.label}></button>
        ))}
      </div>
      <div className="text-blue-200 text-base mt-2">{images[idx].label}</div>
    </div>
  );
}

export default Home;