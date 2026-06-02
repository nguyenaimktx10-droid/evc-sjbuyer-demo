import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldAlert, CheckCircle2, ChevronDown, Lock, Building2, Eye, Award, HelpCircle, User, ArrowRight, X } from 'lucide-react';
import VslPlayer from './components/VslPlayer';
import ApplicationForm from './components/ApplicationForm';
import { LeadSubmission } from './types';

export default function App() {
  const [submittedLeadName, setSubmittedLeadName] = useState<string | null>(null);
  const [isNotReadyOpen, setIsNotReadyOpen] = useState(false);

  // Reference for smooth scrolling
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLeadSuccess = (newLead: LeadSubmission) => {
    setSubmittedLeadName(newLead.fullName);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Header Bar: Centered Brand Logo */}
      <header className="w-full flex justify-center items-center py-4 bg-slate-900/50 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
        <div className="flex flex-col items-center justify-center">
          <img 
            src="https://cdn.prod.website-files.com/6842719f3b19ae087e4cf3b0/6853ad74a935ea9269d9e165_logo-reb.svg" 
            alt="Evan Estate & Beyond"
            className="h-10 md:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* 2. Headline & Dramatic Hook */}
      <main className="flex-1 flex flex-col items-center max-w-7xl mx-auto w-full px-4 md:px-8 pt-10 pb-20 space-y-16">
        
        {/* Section 1: Hero Dramatic Hook */}
        <div className="text-center space-y-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-center shadow-[0_0_15px_rgba(245,158,11,0.05)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> CHƯƠNG TRÌNH GIỚI HẠN CHỈ 3 SUẤT/THÁNG
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black leading-tight tracking-tight text-white max-w-4xl mx-auto"
          >
            BIẾN ƯỚC MƠ TỪ <span className="text-amber-500">CÓ NHÀ</span> THÀNH <span className="text-amber-500">DI SẢN</span> TRUYỀN ĐỜI
          </motion.h1>
        </div>

        {/* Section 2: The Filtering Application Form Section */}
        <section className="w-full max-w-4xl py-6 border-b border-t border-slate-900/60" ref={formRef} id="application-form-section">
          <div className="text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-mono font-bold uppercase tracking-widest text-center">
              Khảo Sát Sàng Lọc Lộ Trình 2 Phút
            </div>
            <h2 className="text-base md:text-xl font-display font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed">
              &ldquo;<span className="text-white font-extrabold text-lg md:text-2xl font-sans text-amber-500">Evan và team chỉ ưu tiên đồng hành trực tiếp với tối đa 3 buyers hoặc investors thật sự nghiêm túc trong tháng này</span> — những người muốn dùng BĐS làm bệ phóng thay đổi tài chính của gia đình qua nhiều thế hệ&rdquo;
            </h2>
          </div>

          <ApplicationForm onSuccess={handleLeadSuccess} />
        </section>

        {/* Section 3: Interactive VSL Player Stage */}
        <section className="w-full max-w-5xl flex flex-col items-center space-y-8" id="vsl-stage">
          <div className="text-center space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-mono font-bold uppercase tracking-widest text-center rounded-full">
              Recorded Strategy Presentations
            </div>
            <h2 className="text-xl md:text-3xl font-display font-black text-white tracking-tight">
              Tại Sao Buyers Tại San Jose Chọn Evan?
            </h2>
            
            {/* Focal slide highlight badge component */}
            <div className="bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-slate-300 max-w-md mx-auto flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              <span className="leading-tight text-slate-300">
                Lưu ý tập trung theo dõi: <strong>3 Lý Do Chiến Lược & Case Study</strong> thực tế tại San Jose.
              </span>
            </div>
          </div>

          <div className="w-full max-w-5xl glow-gold rounded-2xl overflow-hidden border border-slate-800">
            <VslPlayer onCtaClick={scrollToForm} />
          </div>

          {/* Under Video Heavy Duty Controls & Calls to Action */}
          <div className="text-center space-y-5 pt-4 w-full max-w-2xl mx-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToForm}
              className="group relative w-full overflow-hidden bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-5 px-8 rounded-2xl text-base md:text-lg uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(245,158,11,0.25)] duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                TÔI SẴN SÀNG - APPLY NGAY!
                <ArrowRight className="w-5 h-5 text-slate-950 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <div>
              <button
                onClick={() => setIsNotReadyOpen(true)}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 font-bold hover:underline bg-slate-900 border border-slate-800/80 hover:border-slate-700 px-4 py-3 rounded-xl shadow-lg"
              >
                💬 CHƯA SẴN SÀNG - THAM GIA GROUP SĂN NHÀ GOOD DEAL CÙNG EVAN (FREE)
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 7. Footer: Minimal, clean, regulatory disclosures */}
      <footer id="footer-section" className="w-full bg-slate-950 border-t border-slate-900/85 py-16 px-6 md:px-12 text-slate-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-28 items-start text-left">
          
          {/* CỘT TRÁI: Logo và mác tập đoàn/ủy quyền pháp lý */}
          <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Main Brand Header */}
            <div className="space-y-3 pb-2">
              <img 
                src="https://cdn.prod.website-files.com/6842719f3b19ae087e4cf3b0/6853ad74a935ea9269d9e165_logo-reb.svg" 
                alt="Evan Estate & Beyond"
                className="h-20 md:h-24 w-auto object-contain text-[#00F5D4]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Pill Plate Logos */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {/* Card 1: Loan Factory */}
              <div className="bg-white rounded-xl py-2.5 px-3 shadow-md flex flex-col items-center justify-center border border-slate-100">
                <div className="flex items-center gap-0.5">
                  <span className="text-slate-900 font-extrabold text-sm tracking-tight">L</span>
                  <span className="relative flex items-center justify-center w-3 h-3 bg-amber-500 rounded-full">
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                  </span>
                  <span className="text-slate-900 font-extrabold text-[12px] tracking-tight">AN FACTORY®</span>
                </div>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">NMLS #320841</span>
              </div>

              {/* Card 2: BRG Realty */}
              <div className="bg-white rounded-xl py-2.5 px-3 shadow-md flex flex-col items-center justify-center border border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="relative flex items-center justify-center w-3.5 h-3.5 bg-red-600 rounded-full">
                    <span className="w-2 h-2 border border-white rotate-45 border-b-0 border-r-0 -mb-0.5"></span>
                  </span>
                  <span className="text-slate-900 font-extrabold text-xs tracking-wider">BRG</span>
                </div>
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider text-center mt-0.5">REALTY CORPORATION</span>
              </div>
            </div>

            {/* License Codes */}
            <div className="text-slate-400 text-sm font-semibold space-y-1 pt-1">
              <div>Loan: NMLS 2687209</div>
              <div>Real Estate: DRE 02256262</div>
            </div>
          </div>

          {/* CỘT PHẢI: Thông tin liên hệ */}
          <div className="space-y-6 md:pl-6 lg:pl-10 max-w-xl">
            <h3 className="text-lg font-bold font-sans text-white border-b border-slate-900 pb-2">
              THÔNG TIN LIÊN HỆ
            </h3>
            
            <div className="space-y-4 text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold mt-0.5">✉</span>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email</div>
                  <a href="mailto:evan@brgrealtycorp.com" className="text-amber-500 hover:underline hover:text-amber-400 transition-colors font-medium">
                    evan@brgrealtycorp.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold mt-0.5">📞</span>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Hotline Tư Vấn</div>
                  <div className="space-y-1 font-semibold">
                    <div>
                      <a href="tel:4086898840" className="hover:text-white transition-colors">
                        (408) 689-8840
                      </a>
                      <span className="text-xs text-slate-500 font-medium ml-2">(English)</span>
                    </div>
                    <div>
                      <a href="tel:4086896282" className="hover:text-white transition-colors">
                        (408) 689-6282
                      </a>
                      <span className="text-xs text-slate-500 font-medium ml-2">(Tiếng Việt)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold mt-0.5">📍</span>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Địa Chỉ Văn Phòng</div>
                  <p className="font-semibold text-slate-200">
                    1900 Camden Ave, San Jose<br />
                    CA 95124, United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright line */}
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-slate-900 text-center">
          <p className="text-xs text-slate-600 font-sans">
            © {new Date().getFullYear()} San Jose Wealth Partners LLC. Toàn bộ quyền được bảo lưu.
          </p>
        </div>
      </footer>

      {/* Popup modal for 'Chưa sẵn sàng...' */}
      <AnimatePresence>
        {isNotReadyOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop bg */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotReadyOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl z-10 text-center space-y-6 overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsNotReadyOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto text-3xl">
                👋
              </div>

              <div className="space-y-4 text-center">
                {/* Headline */}
                <h3 className="text-lg md:text-xl font-black font-display text-white tracking-tight leading-snug">
                  ĐỢI ĐÃ! BẠN CHƯA SẴN SÀNG ĐỂ TƯ VẤN 1-1?
                </h3>
                {/* Sub-headline */}
                <p className="text-xs md:text-sm text-slate-300 font-semibold leading-relaxed">
                  Tôi hiểu bạn cần thêm thời gian để tìm hiểu thị trường địa ốc và các chiến lược thuế tại Mỹ. Đừng rời đi tay trắng.
                </p>
              </div>

              {/* Offer */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-left">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hãy tham gia nhóm cộng đồng <strong className="text-white font-bold">Good Deals độc quyền của Evan</strong>. Nơi tôi cập nhật các cơ hội đầu tư ngầm, phân tích thị trường Bay Area và chia sẻ tips tối ưu thuế hoàn toàn <strong className="text-amber-500 font-bold">MIỄN PHÍ</strong> mỗi tuần.
                </p>
              </div>

              {/* CTA button inside Modal */}
              <div className="pt-2">
                <a
                  href="https://www.messenger.com/channel/evancoaching.net/AbZb666UKXL8ZH5R/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black py-3.5 px-6 rounded-xl text-[11px] md:text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(245,158,11,0.15)]"
                >
                  THAM GIA GROUP GOOD DEALS MIỄN PHÍ QUA FACEBOOK
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
