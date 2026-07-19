import React from 'react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  Target, 
  Boxes, 
  Search,
  Layers,
  CircleDot
} from 'lucide-react';

export default function App() {
  return (
    <div className="bg-[#000000] text-white min-h-screen selection:bg-white selection:text-black font-sans relative overflow-x-hidden pb-32">
      
      {/* 1. TOP HEADER / BRAND NAVIGATION */}
      <div className="max-w-7xl mx-auto px-6 pt-10 flex justify-between items-start relative z-20">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span className="text-xs tracking-[0.3em] font-bold text-white uppercase">
            CG AGENCY
          </span>
        </div>
        
        {/* Top-Right Mini Average Revenue Badge */}
        <div className="border border-white p-5 max-w-[220px] text-right hidden md:block">
          <div className="flex items-baseline justify-end space-x-0.5 mb-1">
            <span className="text-3xl font-light tracking-tight">43k</span>
            <span className="text-sm font-light">$</span>
          </div>
          <div className="text-[9px] tracking-[0.2em] font-bold text-white uppercase mb-2">
            AVERAGE REVENUE
          </div>
          <p className="text-[10px] leading-relaxed text-white font-light">
            we begin to meet our clients' goals monthly
          </p>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <header className="max-w-7xl mx-auto px-6 pt-20 md:pt-32 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main heading */}
          <div className="lg:col-span-7">
            <h1 className="text-[60px] font-light tracking-tight text-white leading-[1.05]">
              We offer next level<br />
              <span className="italic font-light underline underline-offset-16 decoration-1 decoration-white block mt-2">
                solutions
              </span>
            </h1>
          </div>

          {/* Subtext description */}
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-base md:text-lg text-white leading-relaxed font-light">
              After working with us, your business will achieve the new heights. We will return to you with in-depth analysis, tailored strategies and business problems solved. We transform your problems. After working with us, your business will achieve the new heights.
            </p>
          </div>

        </div>
      </header>

      {/* 3. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Stat 1 */}
          <div className="group">
            <div className="h-[1px] bg-white w-full mb-6 group-hover:bg-white/80 transition-all duration-300" />
            <div className="flex items-baseline space-x-0.5 mb-2">
              <span className="text-5xl md:text-6xl font-light italic text-white">43k</span>
              <span className="text-xl font-light text-white">$</span>
            </div>
            <h3 className="text-xs tracking-[0.2em] font-bold text-white uppercase mb-3">
              AVERAGE REVENUE
            </h3>
            <p className="text-sm text-white font-light leading-relaxed">
              we begin to meet our clients' goals monthly by providing marketing services
            </p>
          </div>

          {/* Stat 2 */}
          <div className="group">
            <div className="h-[1px] bg-white w-full mb-6 group-hover:bg-white/80 transition-all duration-300" />
            <div className="flex items-baseline space-x-0.5 mb-2">
              <span className="text-5xl md:text-6xl font-light italic text-white">200</span>
              <span className="text-xl font-light text-white">+</span>
            </div>
            <h3 className="text-xs tracking-[0.2em] font-bold text-white uppercase mb-3">
              CAMPAIGNS
            </h3>
            <p className="text-sm text-white font-light leading-relaxed">
              were successfully launched within 5 years on the market
            </p>
          </div>

          {/* Stat 3 */}
          <div className="group">
            <div className="h-[1px] bg-white w-full mb-6 group-hover:bg-white/80 transition-all duration-300" />
            <div className="flex items-baseline space-x-0.5 mb-2">
              <span className="text-5xl md:text-6xl font-light italic text-white">380</span>
              <span className="text-xl font-light text-white">+</span>
            </div>
            <h3 className="text-xs tracking-[0.2em] font-bold text-white uppercase mb-3">
              SUCCESSFUL PROJECTS
            </h3>
            <p className="text-sm text-white font-light leading-relaxed">
              were completed within 5 years on the market
            </p>
          </div>

        </div>
      </section>

      {/* 4. TRANSITION SENTENCE */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center relative z-10">
        <p className="text-xs md:text-sm tracking-[0.25em] leading-relaxed text-white font-bold uppercase max-w-2xl mx-auto">
          AT CG AGENCY, HELPING BUSINESSES TO TACKLE CHALLENGES IS CRUCIAL. WORKING WITH US WILL PROVIDE YOU LONG-TERM GROWTH
        </p>
        <div className="w-16 h-[1px] bg-white mx-auto mt-6" />
      </section>

      {/* 5. EXPERIENTIAL GRID LAYOUT */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative min-h-[900px]">

        {/* Desktop Layout: Cards placed relative to the text overlay */}
        <div className="relative z-10 min-h-[850px] hidden xl:block">
          
          {/* Card 1: Left Top */}
          <div className="absolute top-[8%] left-[2%] w-[330px] border border-white/20 p-6 bg-transparent flex flex-col justify-between min-h-[240px] group cursor-pointer hover:border-white hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/60 group-hover:text-white w-5 h-5 transition-colors duration-300" />
                </div>
                <div className="w-6 h-6 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-3.5 h-3.5 transition-all duration-300" />
                </div>
              </div>
              <p className="text-xs font-light text-white/80 group-hover:text-white leading-relaxed transition-colors duration-300">
                “We have difficulties in attracting and converting potential customers.”
              </p>
            </div>
            <div className="mt-8 text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 group-hover:text-white/70 transition-colors duration-300">
              01 / Conversion
            </div>
          </div>

          {/* Card 2: Right Top */}
          <div className="absolute top-[5%] right-[5%] w-[340px] border border-white/20 p-6 bg-transparent flex flex-col justify-between min-h-[240px] group cursor-pointer hover:border-white hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <TrendingUp className="text-white/60 group-hover:text-white w-5 h-5 transition-colors duration-300" />
                </div>
                <div className="w-6 h-6 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-3.5 h-3.5 transition-all duration-300" />
                </div>
              </div>
              <p className="text-xs font-light text-white/80 group-hover:text-white leading-relaxed transition-colors duration-300">
                “Our sales and ROI could use a serious boost, and I need campaigns that actually deliver results.”
              </p>
            </div>
            <div className="mt-8 text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 group-hover:text-white/70 transition-colors duration-300">
              02 / Campaign Growth
            </div>
          </div>

          {/* Card 3: Left Bottom */}
          <div className="absolute bottom-[18%] left-[1%] w-[320px] border border-white/20 p-6 bg-transparent flex flex-col justify-between min-h-[240px] group cursor-pointer hover:border-white hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <Target className="text-white/60 group-hover:text-white w-5 h-5 transition-colors duration-300" />
                </div>
                <div className="w-6 h-6 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-3.5 h-3.5 transition-all duration-300" />
                </div>
              </div>
              <p className="text-xs font-light text-white/80 group-hover:text-white leading-relaxed transition-colors duration-300">
                “Our goal is to stand out among others — we need to regain influence on the market.”
              </p>
            </div>
            <div className="mt-8 text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 group-hover:text-white/70 transition-colors duration-300">
              03 / Positioning
            </div>
          </div>

          {/* Card 5: Right Bottom */}
          <div className="absolute bottom-[12%] right-[2%] w-[360px] border border-white/20 p-6 bg-transparent flex flex-col justify-between min-h-[250px] group cursor-pointer hover:border-white hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <Search className="text-white/60 group-hover:text-white w-5 h-5 transition-colors duration-300" />
                </div>
                <div className="w-6 h-6 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-3.5 h-3.5 transition-all duration-300" />
                </div>
              </div>
              <p className="text-xs font-medium text-white/80 group-hover:text-white leading-relaxed transition-colors duration-300">
                “We use the best SEO practices to get results. We provide tailored strategies, including keyword research, local SEO, and ongoing analytics, ensuring long-term visibility and business growth.”
              </p>
            </div>
            <div className="mt-8 text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 group-hover:text-white/70 transition-colors duration-300">
              05 / SEO & Search Authority
            </div>
          </div>

        </div>

        {/* Mobile/Tablet Responsive Layout */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6 z-10 relative">
          
          {/* Card 1 */}
          <div className="border border-white/20 p-6 bg-transparent flex flex-col justify-between min-h-[220px] group cursor-pointer hover:border-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/60 group-hover:text-white w-5 h-5 transition-colors duration-300" />
                </div>
                <div className="w-6 h-6 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-3.5 h-3.5 transition-all duration-300" />
                </div>
              </div>
              <p className="text-xs font-light text-white/80 group-hover:text-white leading-relaxed transition-colors duration-300">
                “We have difficulties in attracting and converting potential customers.”
              </p>
            </div>
            <div className="mt-6 text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 group-hover:text-white/70 transition-colors duration-300">
              01 / Conversion
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-white/20 p-6 bg-transparent flex flex-col justify-between min-h-[220px] group cursor-pointer hover:border-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <TrendingUp className="text-white/60 group-hover:text-white w-5 h-5 transition-colors duration-300" />
                </div>
                <div className="w-6 h-6 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-3.5 h-3.5 transition-all duration-300" />
                </div>
              </div>
              <p className="text-xs font-light text-white/80 group-hover:text-white leading-relaxed transition-colors duration-300">
                “Our sales and ROI could use a serious boost, and I need campaigns that actually deliver results.”
              </p>
            </div>
            <div className="mt-6 text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 group-hover:text-white/70 transition-colors duration-300">
              02 / Campaign Growth
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-white/20 p-6 bg-transparent flex flex-col justify-between min-h-[220px] group cursor-pointer hover:border-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <Target className="text-white/60 group-hover:text-white w-5 h-5 transition-colors duration-300" />
                </div>
                <div className="w-6 h-6 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-3.5 h-3.5 transition-all duration-300" />
                </div>
              </div>
              <p className="text-xs font-light text-white/80 group-hover:text-white leading-relaxed transition-colors duration-300">
                “Our goal is to stand out among others — we need to regain influence on the market.”
              </p>
            </div>
            <div className="mt-6 text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 group-hover:text-white/70 transition-colors duration-300">
              03 / Positioning
            </div>
          </div>

          {/* Card 5 */}
          <div className="border border-white/20 p-6 bg-transparent flex flex-col justify-between min-h-[220px] md:col-span-2 group cursor-pointer hover:border-white hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <Search className="text-white/60 group-hover:text-white w-5 h-5 transition-colors duration-300" />
                </div>
                <div className="w-6 h-6 border border-white/20 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                  <ArrowUpRight className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-3.5 h-3.5 transition-all duration-300" />
                </div>
              </div>
              <p className="text-xs font-medium text-white/80 group-hover:text-white leading-relaxed transition-colors duration-300">
                “We use the best SEO practices to get results. We provide tailored strategies, including keyword research, local SEO, and ongoing analytics, ensuring long-term visibility and business growth.”
              </p>
            </div>
            <div className="mt-6 text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 group-hover:text-white/70 transition-colors duration-300">
              05 / SEO & Search Authority
            </div>
          </div>

        </div>

      </section>

      {/* Footer copyright */}
      <footer className="border-t border-white/20 max-w-7xl mx-auto px-6 pt-12 mt-20 flex flex-col md:flex-row items-center justify-between text-[11px] tracking-[0.15em] font-light text-white">
        <div className="mb-4 md:mb-0 uppercase font-bold">
          © {new Date().getFullYear()} CG AGENCY. ALL RIGHTS RESERVED.
        </div>
        <div className="flex space-x-8 uppercase font-bold">
          <a href="#" className="hover:text-white/75 transition">Privacy Policy</a>
          <a href="#" className="hover:text-white/75 transition">Terms of Service</a>
          <a href="#" className="hover:text-white/75 transition">Contact</a>
        </div>
      </footer>
    </div>
  );
}
