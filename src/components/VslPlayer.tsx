import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Eye, Sparkles, MapPin, CheckCircle2, ChevronRight, TrendingUp, Users, Award, FileText } from 'lucide-react';
import { VSL_CHAPTERS, VSL_SLIDES } from '../data';
import { VslSlide, VslChapter } from '../types';

interface VslPlayerProps {
  onCtaClick: () => void;
}

export default function VslPlayer({ onCtaClick }: VslPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'slides'>('video');
  const [selectedRegion, setSelectedRegion] = useState<string>('Berryessa');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const maxDuration = 270; // 4.5 minutes in seconds

  // Handle playing state
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= maxDuration) {
            setIsPlaying(false);
            return maxDuration;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Find active slide based on current time
  const currentSlideIndex = VSL_SLIDES.findIndex((slide, index) => {
    const nextSlide = VSL_SLIDES[index + 1];
    return currentTime >= slide.timeStart && (!nextSlide || currentTime < nextSlide.timeStart);
  });
  
  const currentSlide: VslSlide = currentSlideIndex !== -1 ? VSL_SLIDES[currentSlideIndex] : VSL_SLIDES[0];

  // Helper to format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayToggle = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (seconds: number) => {
    if (!hasStarted) setHasStarted(true);
    setCurrentTime(seconds);
  };

  const handleChapterSelect = (chapter: VslChapter) => {
    handleSeek(chapter.timeStart);
    setIsPlaying(true);
  };

  // Skip forward or backward
  const handleSkip = (amount: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(maxDuration, prev + amount)));
  };

  return (
    <div className="w-full bg-slate-950 rounded-2xl border border-slate-850 shadow-2xl overflow-hidden focus:outline-none" id="vsl-interactive-player">
      {/* Header Bar of the Player */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {isPlaying ? 'HỘI THẢO ĐANG THUYẾT TRÌNH (MÔ PHỎNG)' : 'RECORDED STRATEGY KEYNOTE'}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${
              activeTab === 'video'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Video Báo Cáo
          </button>
          <button
            onClick={() => setActiveTab('slides')}
            className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${
              activeTab === 'slides'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mục Lục Slides ({VSL_SLIDES.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[460px] bg-slate-950">
        
        {/* Main Stage (3 Columns) */}
        <div className="lg:col-span-3 flex flex-col justify-between border-r border-slate-900 relative min-h-[380px]">
          
          <AnimatePresence mode="wait">
            {!hasStarted ? (
              /* Overlay before playing */
              <motion.div
                key="start-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-slate-950/95 flex flex-col items-center justify-center text-center p-6 cursor-pointer"
                onClick={handlePlayToggle}
              >
                {/* Background high-end imagery placeholder */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-500 mb-6 mx-auto hover:bg-amber-500/20"
                  >
                    <Play className="w-10 h-10 fill-current ml-1" />
                  </motion.div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white max-w-lg leading-snug mb-3">
                  Click để xem Video Chiến Lược của Evan (4.5 Phút)
                </h3>
                <p className="text-sm text-slate-400 max-w-md mb-6">
                  Tìm hiểu 3 lý do chiến lược nên hợp tác cùng Evan sở hữu bất động sản tiềm năng tăng trưởng vượt trội tại San Jose.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-300 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> Tăng trưởng +9.2%/năm
                  </span>
                  <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-300 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" /> Hỗ trợ Độc Bản
                  </span>
                </div>
                
                <span className="absolute bottom-6 text-xs text-slate-500 uppercase tracking-widest animate-pulse">
                  🔊 Hãy bật âm thanh thiết bị của anh/chị
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Render Slide / Visual Graphics */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative bg-slate-950">
            
            {/* Top badge showcasing slide topic */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-wider text-amber-500 font-mono uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                Chuyên ngành San Jose Real Estate
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Slide {currentSlideIndex + 1}/{VSL_SLIDES.length}
              </span>
            </div>

            {/* Content Display Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto min-h-[220px]">
              
              {/* Bullet points (Left half of active slide) */}
              <div className="md:col-span-7 space-y-4">
                <motion.h4
                  key={`title-${currentSlide.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg md:text-xl font-bold text-white leading-snug"
                >
                  {currentSlide.title}
                </motion.h4>
                <ul className="space-y-2.5">
                  {currentSlide.contentLines.map((line, idx) => (
                    <motion.li
                      key={`line-${currentSlide.id}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-xs md:text-sm text-slate-300 flex items-start gap-2.5"
                    >
                      <span className="text-amber-500 shrink-0 mt-1">✦</span>
                      <span>{line}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Dynamic visual graphic (Right half of active slide) */}
              <div className="md:col-span-5 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 min-h-[180px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`graphic-${currentSlide.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full text-xs font-sans text-slate-200"
                  >
                    {/* Render GRAPHIC TYPE: STATS */}
                    {currentSlide.graphicType === 'stats' && (
                      <div className="space-y-3.5">
                        <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Hiệu năng Phễu Lọc Mới</div>
                        {currentSlide.graphicData.metrics.map((m: any, i: number) => (
                          <div key={i} className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-slate-400 font-medium">{m.label}</span>
                            <span className={`font-mono font-bold text-sm ${m.status === 'down' ? 'text-emerald-400' : 'text-amber-500'}`}>
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Render GRAPHIC TYPE: CHART */}
                    {currentSlide.graphicType === 'chart' && (
                      <div className="space-y-3">
                        <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-1">{currentSlide.graphicData.title}</div>
                        <div className="h-28 flex items-end justify-between gap-1.5 px-2 bg-slate-950 p-3 rounded-lg border border-slate-850">
                          {currentSlide.graphicData.values.map((v: number, i: number) => {
                            const maxVal = Math.max(...currentSlide.graphicData.values);
                            const heightPercent = (v / maxVal) * 100;
                            return (
                              <div key={i} className="flex flex-col items-center flex-1 group">
                                <div className="text-[9px] text-amber-500 font-mono mb-1 scale-90 opacity-80">${v}M</div>
                                <div 
                                  className="w-full bg-amber-500 rounded-t-sm group-hover:bg-amber-400 transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]" 
                                  style={{ height: `${Math.max(15, heightPercent * 0.7)}px` }}
                                ></div>
                                <div className="text-[9px] text-slate-500 font-mono mt-1 pt-0.5 border-t border-slate-800 w-full text-center">
                                  {currentSlide.graphicData.labels[i]}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Render GRAPHIC TYPE: CHECKLIST */}
                    {currentSlide.graphicType === 'checklist' && (
                      <div className="space-y-2.5">
                        <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-1">Mục Lọc Tiêu Chí Quét</div>
                        {currentSlide.graphicData.items.map((item: any, i: number) => (
                          <div key={i} className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-850">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-slate-300 font-medium text-[11px] leading-tight">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Render GRAPHIC TYPE: QUOTE */}
                    {currentSlide.graphicType === 'quote' && (
                      <div className="space-y-2 py-1">
                        <span className="text-3xl text-amber-500 font-serif leading-none block">“</span>
                        <p className="text-[11px] italic text-slate-300 leading-relaxed font-sans px-1">
                          {currentSlide.graphicData.text}
                        </p>
                        <div className="text-right text-[10px] font-mono text-slate-400 font-semibold mt-2">
                          — {currentSlide.graphicData.author}
                        </div>
                      </div>
                    )}

                    {/* Render GRAPHIC TYPE: AVATAR */}
                    {currentSlide.graphicType === 'avatar' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold text-base shadow-lg">
                            EN
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{currentSlide.graphicData.name}</div>
                            <div className="text-[10px] text-amber-500 font-medium leading-normal">{currentSlide.graphicData.role}</div>
                          </div>
                        </div>
                        <div className="text-[10px] bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-slate-300 space-y-1">
                          <p><strong>Thực lực:</strong> {currentSlide.graphicData.stats}</p>
                          <p className="italic text-slate-400 mt-1">"{currentSlide.graphicData.quote}"</p>
                        </div>
                      </div>
                    )}

                    {/* Render GRAPHIC TYPE: MAP */}
                    {currentSlide.graphicType === 'map' && (
                      <div className="space-y-3">
                        <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Chọn Khu Vực San Jose</div>
                        {/* Mock Map Layout */}
                        <div className="grid grid-cols-2 gap-1.5 mb-2">
                          {currentSlide.graphicData.regions.map((reg: any, i: number) => (
                            <button
                              key={i}
                              onClick={() => setSelectedRegion(reg.name)}
                              className={`p-2 rounded-lg text-left cursor-pointer transition-all border ${
                                selectedRegion === reg.name
                                  ? 'bg-amber-500/10 border-amber-500 text-white'
                                  : 'bg-slate-950 border-slate-850 hover:border-slate-700 text-slate-400'
                              }`}
                            >
                              <div className="font-semibold text-[10px] flex items-center gap-1">
                                <MapPin className={`w-3 h-3 ${selectedRegion === reg.name ? 'text-amber-500' : 'text-slate-500'}`} />
                                {reg.name}
                              </div>
                              <div className="text-[9px] font-mono mt-0.5 text-slate-400">{reg.median}</div>
                            </button>
                          ))}
                        </div>
                        {/* Region details */}
                        <AnimatePresence mode="wait">
                          {(() => {
                            const activeReg = currentSlide.graphicData.regions.find((r: any) => r.name === selectedRegion) || currentSlide.graphicData.regions[0];
                            return (
                              <motion.div
                                key={selectedRegion}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-950 p-2 rounded-lg border border-slate-850 text-[10px]"
                              >
                                <div className="text-slate-300 font-medium">✨ {activeReg.type}</div>
                                <div className="text-[9px] text-emerald-400 font-mono mt-0.5">Tăng trưởng: {activeReg.growth}</div>
                              </motion.div>
                            );
                          })()}
                        </AnimatePresence>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Subtitles Overlay Bar spoken by Evan */}
            {currentSlide.subtitleVietnamese ? (
              <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4.5">
                <div className="w-10 h-10 rounded-full bg-slate-950 border-2 border-amber-500 overflow-hidden flex items-center justify-center shrink-0">
                  <span className="text-amber-500 font-bold text-xs">EVAN</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 font-mono">Chuyên gia Evan</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-sm font-mono">AUDIO LIVE</span>
                  </div>
                  <div className="text-[11px] md:text-xs text-slate-300 leading-relaxed italic line-clamp-2">
                    "{currentSlide.subtitleVietnamese}"
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-4 rounded-xl bg-slate-900/30 border border-slate-800/40 text-center text-xs text-slate-500 italic">
                Thời lượng phần này tập trung phân tích minh họa trực quan trên bảng đồ & slide số liệu.
              </div>
            )}

          </div>

          {/* Simulated Player Controls Bar */}
          <div className="bg-slate-900 px-4 py-3 border-t border-slate-800 flex flex-col md:flex-row items-center gap-4">
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-between">
              {/* Play / Pause button */}
              <button
                onClick={handlePlayToggle}
                className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center cursor-pointer transition-transform scale-95 hover:scale-100 active:scale-90"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <div className="flex items-center gap-2">
                {/* Skip back */}
                <button
                  onClick={() => handleSkip(-30)}
                  className="font-mono text-[10px] px-2 py-1 border border-slate-800 hover:border-slate-700 rounded text-slate-400 hover:text-white cursor-pointer"
                  title="Lùi 30 giây"
                >
                  -30s
                </button>
                {/* Skip forward */}
                <button
                  onClick={() => handleSkip(30)}
                  className="font-mono text-[10px] px-2 py-1 border border-slate-800 hover:border-slate-700 rounded text-slate-400 hover:text-white cursor-pointer"
                  title="Tiến 30 giây"
                >
                  +30s
                </button>
              </div>

              {/* Time display */}
              <div className="text-[11px] font-mono text-slate-400">
                <span className="text-slate-200">{formatTime(currentTime)}</span>
                <span className="text-slate-600"> / </span>
                <span>{formatTime(maxDuration)}</span>
              </div>
            </div>

            {/* Custom scrubbing timeline scroll */}
            <div className="flex-1 w-full flex items-center gap-2.5">
              <span className="text-[9px] font-mono text-slate-400 uppercase hidden sm:block">Timeline</span>
              <div className="relative flex-1 group py-2">
                <input
                  type="range"
                  min="0"
                  max={maxDuration}
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-950 accent-amber-500 focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(currentTime / maxDuration) * 100}%, #1e293b ${(currentTime / maxDuration) * 100}%, #1e293b 100%)`
                  }}
                />
              </div>
            </div>

            {/* Speeed & Mute configuration */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              {/* Speed select */}
              <div className="flex items-center bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">
                <span className="text-[9px] text-slate-500 uppercase mr-1.5 font-mono">Tốc độ:</span>
                {[1, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded transition-colors ${
                      playbackSpeed === speed
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Volume simulation toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 rounded-lg border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>

          </div>

        </div>

        {/* Chapters list on the right hand side (1 Column) */}
        <div className="p-4 bg-slate-950/40 flex flex-col justify-between">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 font-bold mb-4 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-500" /> Tiến Trình Chiến Lược
            </h4>
            
            <div className="space-y-2">
              {VSL_CHAPTERS.map((chap) => {
                const isChapterActive = currentTime >= chap.timeStart && currentTime < chap.timeStart + chap.duration;
                const isCompleted = currentTime >= chap.timeStart + chap.duration;

                return (
                  <button
                    key={chap.id}
                    onClick={() => handleChapterSelect(chap)}
                    className={`w-full text-left p-2.5 rounded-lg border cursor-pointer transition-all flex flex-col gap-1 ${
                      isChapterActive
                        ? 'bg-amber-500/10 border-amber-500/80 shadow-[0_0_12px_rgba(245,158,11,0.06)]'
                        : 'bg-slate-900/40 border-slate-900 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono leading-none ${
                        isChapterActive ? 'text-amber-500 font-bold' : isCompleted ? 'text-slate-500LineThrough text-emerald-400' : 'text-slate-500'
                      }`}>
                        {formatTime(chap.timeStart)}
                      </span>
                      {isCompleted && <span className="text-[9px] uppercase font-mono text-emerald-500">Đã xem</span>}
                      {isChapterActive && <span className="text-[9px] uppercase font-mono bg-amber-500 text-slate-950 px-1 py-0.2 rounded font-bold animate-pulse">Running</span>}
                    </div>
                    <span className={`text-xs leading-snug font-bold ${
                      isChapterActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {chap.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats Panel inside Chapters section */}
          <div className="pt-4 mt-4 border-t border-slate-900 bg-slate-900/20 p-3 rounded-lg">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
              <span>Đang kết nối</span>
              <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 184 Nhà đầu tư
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[82%] rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
            </div>
            <p className="text-[9px] text-slate-500 mt-2 text-center">
              Khóa sàng lọc tự động kích hoạt
            </p>
          </div>

        </div>

      </div>

      {/* Conditional bottom CTA button within same card */}
      {activeTab === 'slides' && (
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <p className="text-xs text-slate-400 mb-2">Thao tác trực tiếp:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VSL_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => handleSeek(slide.timeStart)}
                className={`py-1.5 px-2.5 rounded text-[10px] cursor-pointer text-left font-mono truncate transition-colors ${
                  currentSlideIndex === idx
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                S{idx+1}: {slide.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
