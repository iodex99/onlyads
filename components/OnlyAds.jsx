"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Eye, 
  Share2, 
  Activity,
  Globe,
  Cpu,
  X,
  Wifi,
  Smartphone,
  Clock,
  Maximize,
  Languages,
  Download,
  LayoutGrid,
  Info,
  Quote,
  RefreshCcw,
  CheckCircle2,
  Coffee,
  ArrowUp,
  Database,
  Scan,
  Cookie as CookieIcon,
  FileText,
  ShieldAlert,
  Zap,
  IndianRupee,
  Copy,
  Check,
  Coins,
  Pen,
  Square,
  Scale,
  Mail
} from 'lucide-react';

// ==========================================
// 🚨 CRITICAL: UPDATE THESE CONFIGURATIONS
// ==========================================
const GOOGLE_AD_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";  // 1. Your AdSense Publisher ID
const GOOGLE_AD_SLOT = "1234567890";                 // 2. Your Ad Unit Slot ID

// 💰 PAYMENT CONFIGURATION
const UPI_ID = "onlyads@pthdfc";       
const PAYPAL_USER = "dwahnil";         

const CAPTIONS = [
  "My attention is expensive.",
  "The algorithm knows me better than I do.",
  "Digital footprint: CHAOTIC.",
  "I am merely data.",
  "Targeted. Tracked. Verified.",
  "Consuming content, generating logs.",
  "Do not perceive me.",
  "Broadcasting live to advertisers.",
  "I click, therefore I am.",
  "Monetize my existence.",
  "Cookies: Accepted. Soul: Pending.",
  "Optimized for consumption.",
  "Retargeting in 3... 2... 1...",
  "My data is beautiful.",
  "Zero privacy, maximum aesthetic.",
  "Your ad here (maybe).",
  "Profiling complete.",
  "System status: COMPROMISED.",
  "Awaiting input.",
  "Scanning retina...",
  "Data harvest complete.",
  "Injecting dopamine.",
  "Buy. Consume. Repeat.",
  "Your secrets are safe (lol).",
  "Ad block detected? Cute.",
  "Loading personality...",
  "Pixel tracking active.",
  "Thank you for your data.",
  "Resistance is futile.",
  "Welcome to the machine."
];

// --- INTERNAL COMPONENT: INDIAN FLAG SVG ---
const IndiaFlag = ({ className }) => (
  <svg viewBox="0 0 30 20" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="20" fill="#138808"/>
    <rect width="30" height="13.33" fill="#ffffff" y="0"/>
    <rect width="30" height="6.66" fill="#FF9933" y="0"/>
    <circle cx="15" cy="10" r="2.5" fill="#000080"/>
  </svg>
);

// --- INTERNAL COMPONENT: AD UNIT ---
const AdUnit = ({ id, format }) => {
  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {}
  }, []);

  return (
    <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
        {/* Placeholder for AdSense (In production this renders the ad) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-20">
            <div className="text-center">
                <span className="text-[10px] font-mono text-neutral-600 block">AD_SLOT_{id}</span>
                <span className="text-[8px] font-mono text-neutral-700 uppercase">{format}</span>
            </div>
        </div>
        
        {/* Actual Ad Tag */}
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%', height: '100%' }}
             data-ad-client={GOOGLE_AD_CLIENT}
             data-ad-slot={GOOGLE_AD_SLOT}
             data-ad-format="auto" 
             data-full-width-responsive="true"
        ></ins>
    </div>
  );
};

export default function OnlyAds() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false); 
  const [showSupportModal, setShowSupportModal] = useState(false); 
  const [showPrivacyModal, setShowPrivacyModal] = useState(false); // Used for fallback if file doesn't load
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(null); 

  const [showCaption, setShowCaption] = useState(true);
  const [currentCaption, setCurrentCaption] = useState(CAPTIONS[0]);
  const [isSharing, setIsSharing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const cardRef = useRef(null);
  
  const captionInputRef = useRef(null);

  const [shareViewMode, setShareViewMode] = useState('grid');
  const [activeSlot, setActiveSlot] = useState(null);
  
  const [systemInfo, setSystemInfo] = useState({
    userAgent: 'Scanning...',
    screenRes: 'Calculating...',
    viewport: 'Calculating...',
    connection: 'Unknown',
    language: 'Unknown',
    timezone: 'Unknown',
    latency: 0,
    sessionHash: '...',
    dataValue: '...',
    dataUsed: '0 KB'
  });

  const adSlots = useMemo(() => {
    const layouts = ['portrait', 'portrait', 'square', 'landscape', 'portrait'];
    return Array.from({ length: 12 }, (_, i) => {
        const layoutType = layouts[Math.floor(Math.random() * layouts.length)];
        return {
            id: i + 1,
            type: layoutType
        };
    });
  }, []);

  const getSlotDimensions = (type) => {
      switch (type) {
          case 'landscape': return 'md:col-span-2 aspect-[16/9]'; 
          case 'square': return 'col-span-1 aspect-square';    
          case 'portrait': default: return 'col-span-1 aspect-[4/5]';     
      }
  };

  useEffect(() => {
    const start = performance.now();
    const nav = window.navigator;
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    
    const calculateDataUsed = () => {
        if (window.performance && window.performance.getEntriesByType) {
            const resources = window.performance.getEntriesByType("resource");
            const navEntry = window.performance.getEntriesByType("navigation")[0];
            let totalBytes = 0;
            if (navEntry) totalBytes += (navEntry.transferSize || 0);
            resources.forEach(entry => {
                totalBytes += (entry.transferSize || 0);
            });
            if (totalBytes > 1024 * 1024) {
                return `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;
            } else {
                return `${(totalBytes / 1024).toFixed(0)} KB`;
            }
        }
        return 'Unknown';
    };

    const updateMetrics = () => {
        setSystemInfo(prev => ({
            ...prev,
            screenRes: window.screen ? `${window.screen.width}x${window.screen.height}` : 'Unknown',
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            connection: conn ? `${conn.effectiveType?.toUpperCase() || 'UNKNOWN'} (${conn.downlink || '?'} Mbps)` : 'Unknown',
            dataUsed: calculateDataUsed()
        }));
    };

    setTimeout(() => {
      const end = performance.now();
      
      const grades = [
        "PRIME TARGET", "LOW YIELD", "DATA WHALE", "STANDARD UNIT", 
        "HIGH PRIORITY", "GHOST", "PATTERN ANOMALY", "PREMIUM INVENTORY", 
        "UNCATEGORIZED", "CONSUMER ELITE", "SHADOW PROFILE", "ZERO CLICK",
        "SERVER BURDEN", "VIP TRACKING", "GLITCH DETECTED"
      ];
      const isLegendary = Math.random() < 0.01;
      const randomGrade = isLegendary ? "LEGENDARY" : grades[Math.floor(Math.random() * grades.length)];

      setSystemInfo({
        userAgent: nav.userAgent,
        screenRes: window.screen ? `${window.screen.width}x${window.screen.height}` : 'Unknown',
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        connection: conn ? `${conn.effectiveType?.toUpperCase() || 'UNKNOWN'} (${conn.downlink || '?'} Mbps)` : 'Unknown',
        language: (nav.language || 'UNKNOWN').toUpperCase(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        latency: Math.round(end - start),
        sessionHash: `ID-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        dataValue: randomGrade,
        dataUsed: calculateDataUsed()
      });
      setLoading(false);
      
      if (cookieConsent === null) {
        setShowCookieModal(true);
      }
    }, 5000);

    window.addEventListener('resize', updateMetrics);
    if (conn) {
        conn.addEventListener('change', updateMetrics);
    }
    const interval = setInterval(updateMetrics, 2000);

    return () => {
        window.removeEventListener('resize', updateMetrics);
        if (conn) {
            conn.removeEventListener('change', updateMetrics);
        }
        clearInterval(interval);
    };
  }, [cookieConsent]);

  useEffect(() => {
    if (captionInputRef.current) {
        captionInputRef.current.style.height = 'auto';
        captionInputRef.current.style.height = captionInputRef.current.scrollHeight + 'px';
    }
  }, [currentCaption, showCaption]);

  const handleCookieResponse = (response) => {
    setCookieConsent(response);
    setShowCookieModal(false);
  };

  const refreshCaption = () => {
    const nextIndex = (CAPTIONS.indexOf(currentCaption) + 1) % CAPTIONS.length;
    setCurrentCaption(CAPTIONS[nextIndex]);
  };

  const handleEditCaption = () => {
      setShowCaption(true);
      setTimeout(() => {
          if (captionInputRef.current) {
              captionInputRef.current.focus();
              const val = captionInputRef.current.value;
              captionInputRef.current.value = '';
              captionInputRef.current.value = val;
          }
      }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyUPI = () => {
      const textArea = document.createElement("textarea");
      textArea.value = UPI_ID;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } else {
             alert(`Could not auto-copy. UPI ID: ${UPI_ID}`);
        }
      } catch (err) {
        console.error("Copy failed", err);
        alert(`Could not auto-copy. UPI ID: ${UPI_ID}`);
      }
      document.body.removeChild(textArea);
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsSharing(true);

    try {
        if (!window.html2canvas) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script.onload = () => captureAndShare();
            document.body.appendChild(script);
        } else {
            captureAndShare();
        }

        function captureAndShare() {
            window.html2canvas(cardRef.current, {
                backgroundColor: '#0a0a0a',
                scale: 3, 
                useCORS: true,
                logging: false,
                scrollY: -window.scrollY, 
                scrollX: 0,
                onclone: (clonedDoc) => {
                    const clonedCard = clonedDoc.querySelector('[data-card-root]');
                    if (clonedCard) {
                        clonedCard.style.width = '400px'; 
                        clonedCard.style.minWidth = '400px'; 
                        clonedCard.style.maxWidth = '400px';
                        clonedCard.style.margin = '0 auto';
                        clonedCard.style.borderRadius = '0';
                    }

                    const allText = clonedCard.querySelectorAll('span, p, h1, h2, h3, h4, h5, h6');
                    allText.forEach(el => {
                        if (el.tagName.toLowerCase() !== 'textarea' && el.children.length === 0 && el.innerText.trim().length > 0) {
                            el.style.position = 'relative';
                            el.style.top = '-10px';
                        }
                    });

                    const clonedTextarea = clonedCard.querySelector('textarea');
                    if (clonedTextarea) {
                        const div = clonedDoc.createElement('div');
                        div.innerText = currentCaption; 
                        
                        // SMALLER FONT SIZE as requested (text-xl instead of 4xl)
                        div.className = "w-full bg-transparent border-none text-center text-xl sm:text-2xl font-black uppercase text-white leading-tight tracking-tighter drop-shadow-xl";
                        
                        div.style.whiteSpace = 'pre-wrap'; 
                        div.style.wordWrap = 'break-word'; 
                        div.style.overflow = 'visible';
                        div.style.display = 'block';
                        div.style.height = 'auto'; 
                        div.style.position = 'relative';
                        div.style.top = '-10px'; 
                        clonedTextarea.parentNode.replaceChild(div, clonedTextarea);
                    }
                }
            }).then(canvas => {
                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        setIsSharing(false);
                        return;
                    }
                    const file = new File([blob], "OnlyAds-Profile.png", { type: "image/png" });
                    
                    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                        try {
                            await navigator.share({
                                files: [file]
                            });
                        } catch (error) {
                            if (error.name !== 'AbortError') {
                                downloadImage(canvas);
                            }
                        }
                    } else {
                        downloadImage(canvas);
                    }
                    setIsSharing(false);
                }, 'image/png');
            }).catch(err => {
                console.error(err);
                setIsSharing(false);
                alert("Failed to generate share image.");
            });
        }

        function downloadImage(canvas) {
            const link = document.createElement('a');
            link.download = `OnlyAds-Profile-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    } catch (err) {
        console.error("Process failed", err);
        setIsSharing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 animate-pulse">OnlyAds Protocol</h1>
          <div className="space-y-2 text-sm opacity-80">
            <p>{'>'} Analyzing local viewport...</p>
            <p>{'>'} Reading navigator UserAgent...</p>
            <p>{'>'} Measuring network downlink...</p>
            <p className="text-green-500">{'>'} DATA STREAM ACTIVE.</p>
          </div>
          <div className="mt-8 w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-[width_2s_ease-in-out_forwards]" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-mono bg-black text-white selection:bg-green-500 selection:text-black">
      
      {/* --- NAVBAR --- */}
      <nav className="border-b border-neutral-800 p-4 sticky top-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-3">
                <span className="text-3xl font-black tracking-tighter text-white">OnlyAds</span>
                <span className="text-xs sm:text-sm font-bold font-mono text-green-500/70 uppercase tracking-widest animate-pulse">
                    YOU ARE MERELY DATA
                </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                  Live Data
                </span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 pb-20">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-neutral-800 pb-6 hidden">
            {/* Hidden top header as requested */}
        </div>

        {/* --- DYNAMIC AD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-flow-row-dense">
          {adSlots.map((slot) => (
            <div 
              key={slot.id} 
              className={`group relative bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-green-500/50 transition-colors ${getSlotDimensions(slot.type)}`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center bg-black relative">
                 
                 {/* Replaced placeholder text with actual Ad Unit component */}
                 <AdUnit id={slot.id} format={slot.type} />

                 {/* REAL DATA OVERLAY */}
                 <div className={`
                    absolute inset-0 p-6 flex flex-col justify-end transition-opacity duration-300 bg-gradient-to-t from-green-900/40 to-black/20 pointer-events-none z-10
                    ${activeSlot === slot.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                 `}>
                    <div className="space-y-3 font-mono text-[10px]">
                      <div className="bg-black/90 backdrop-blur p-2 border border-green-900/50 rounded shadow-lg">
                        <div className="flex items-center gap-2 text-green-500 mb-1">
                          <Database size="12" />
                          <span className="uppercase tracking-wider font-bold">Data Transfer</span>
                        </div>
                        <p className="text-neutral-300">{systemInfo.dataUsed}</p>
                      </div>
                      <div className="bg-black/90 backdrop-blur p-2 border border-green-900/50 rounded shadow-lg">
                        <div className="flex items-center gap-2 text-green-500 mb-1">
                          <Maximize size="12" />
                          <span className="uppercase tracking-wider font-bold">Viewport Target</span>
                        </div>
                        <p className="text-neutral-300">{systemInfo.viewport}</p>
                      </div>
                      <div className="bg-black/90 backdrop-blur p-2 border border-green-900/50 rounded flex justify-between items-center shadow-lg">
                         <span className="text-green-500 uppercase tracking-wider font-bold flex items-center gap-2">
                           <Clock size="12" /> Client Latency
                         </span>
                         <span className="font-bold text-white">{systemInfo.latency}ms</span>
                      </div>
                    </div>
                 </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  setActiveSlot(activeSlot === slot.id ? null : slot.id);
                }}
                className={`
                  absolute top-2 right-2 z-20 p-2 rounded-full border transition-all duration-200 backdrop-blur-sm
                  ${activeSlot === slot.id 
                    ? 'bg-green-500 text-black border-green-400' 
                    : 'bg-black/50 text-neutral-400 border-neutral-700 hover:bg-black hover:text-white'}
                `}
                aria-label="Toggle Data Overlay"
              >
                <Info size="14" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500/0 group-hover:bg-green-500 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* --- FOOTER CONTENT WITH LEGAL LINKS --- */}
        <div className="mt-16 border-t border-neutral-900 pt-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">
                   Browsing is broadcasting
                </h1>
                <p className="text-neutral-500 text-[10px] font-mono max-w-lg leading-relaxed">
                  Interact with live ad slots to reveal the real-time browser fingerprinting data advertisers use to target you. 
                  Your digital silhouette is being auctioned in milliseconds based on your device, location, and behavior. 
                  We just make the invisible visible.
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-2 text-xs font-mono text-neutral-500">
                 {/* Replaced Modal with Actual Link */}
                 <a href="/privacy.html" className="hover:text-green-500 transition-colors uppercase tracking-widest text-left md:text-right">Privacy Protocols</a>
                 
                 <button onClick={() => setShowTermsModal(true)} className="hover:text-green-500 transition-colors uppercase tracking-widest text-left md:text-right">Terms of Engagement</button>
                 {/* UPDATED: Contact email */}
                 <a href="mailto:onlyads.me@rediffmail.com" className="hover:text-green-500 transition-colors uppercase tracking-widest text-left md:text-right">Contact</a>
              </div>
            </div>
        </div>
      </main>

      {/* --- FLOATING COMMAND HUB --- */}
      <div className="fixed bottom-6 right-6 z-[110] flex flex-col gap-3">
          
          {/* About Button */}
          <button 
            onClick={() => setShowAboutModal(true)}
            className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-white shadow-xl hover:border-purple-500 hover:bg-black transition-all group"
            title="Manifesto"
          >
            <FileText size="20" className="group-hover:text-purple-500 transition-colors" />
          </button>

          {/* Share Button */}
          <button 
            onClick={() => setShowShareModal(!showShareModal)}
            className={`p-3 rounded-full bg-neutral-900 border border-neutral-800 text-white shadow-xl hover:border-green-500 hover:bg-black transition-all group ${showShareModal ? 'border-green-500 text-green-500' : ''}`}
            title={showShareModal ? "Close" : "Generate Share Card"}
          >
            {showShareModal ? (
                <X size="20" className="group-hover:text-green-500 transition-colors" />
            ) : (
                <Share2 size="20" className="group-hover:text-green-500 transition-colors" />
            )}
          </button>

          {/* Cookie Button */}
          <button
            onClick={() => setShowCookieModal(true)}
            className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-white shadow-xl hover:border-blue-500 hover:bg-black transition-all group"
            title="Cookie Preferences"
          >
            <CookieIcon size="20" className="group-hover:text-blue-500 transition-colors" />
          </button>

          {/* FUND PROTOCOL BUTTON */}
          <button 
            onClick={() => setShowSupportModal(true)}
            className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-white shadow-xl hover:border-yellow-600 hover:bg-black transition-all group"
            title="Fund Protocol"
          >
            <Coins size="20" className="text-yellow-600 group-hover:text-yellow-500 transition-colors" />
          </button>

          {/* Go To Top */}
          <button 
            onClick={scrollToTop}
            className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-white shadow-xl hover:border-white hover:bg-black transition-all group"
            title="Scroll to Top"
          >
            <ArrowUp size="20" className="text-neutral-400 group-hover:text-white transition-colors" />
          </button>
      </div>

      {/* --- ABOUT / MANIFESTO MODAL --- */}
      {showAboutModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 p-0 rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
             <div className="p-4 border-b border-neutral-800 bg-black flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <FileText size="18" className="text-purple-500" />
                   <h2 className="text-sm font-bold text-white uppercase tracking-widest">System Manifesto</h2>
                </div>
                <button 
                  onClick={() => setShowAboutModal(false)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <X size="20" />
                </button>
             </div>

             <div className="p-6 overflow-y-auto space-y-8 text-sm text-neutral-300 font-mono leading-relaxed">
                {/* Intro */}
                <section>
                   <h3 className="text-white font-bold uppercase mb-3 text-base">The Algorithmic Mirror</h3>
                   <p className="mb-3">
                     OnlyAds is not a standard website. It is a live, satirical exploration of the modern <strong>surveillance economy</strong>. 
                     In the current internet ecosystem, you are not the user; you are the product. 
                     Every click, hover, and scroll is measured, auctioned, and sold in milliseconds.
                   </p>
                   <p>
                     This project exists to strip away the "content" and reveal the raw machinery of <strong>AdTech</strong>. We show you the ads, the tracking pixels, 
                     and the algorithmic assumptions made about your identity based on your <strong>digital footprint</strong>.
                   </p>
                </section>

                {/* Technical SEO Section */}
                <section>
                   <h3 className="text-white font-bold uppercase mb-3 text-base">How The Machine Works</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="bg-black/40 p-3 rounded border border-neutral-800">
                          <strong className="text-green-500 block mb-1">Real-Time Bidding (RTB)</strong>
                          <span className="text-xs text-neutral-400">When you load this page, your browser sends a "bid request" to Ad Exchanges (like Google AdSense). Thousands of advertisers bid on your attention instantly.</span>
                       </div>
                       <div className="bg-black/40 p-3 rounded border border-neutral-800">
                          <strong className="text-green-500 block mb-1">Browser Fingerprinting</strong>
                          <span className="text-xs text-neutral-400">Advertisers analyze your User Agent, screen resolution, battery level, and installed fonts to create a unique ID for you, even without cookies.</span>
                       </div>
                       <div className="bg-black/40 p-3 rounded border border-neutral-800">
                          <strong className="text-green-500 block mb-1">Behavioral Surplus</strong>
                          <span className="text-xs text-neutral-400">Your past actions—searches, clicks, dwell time—are aggregated to predict your future purchases. This prediction data is the core product of the modern web.</span>
                       </div>
                       <div className="bg-black/40 p-3 rounded border border-neutral-800">
                          <strong className="text-green-500 block mb-1">The Auction</strong>
                          <span className="text-xs text-neutral-400">In less than 200ms, the highest bidder wins the right to display their image in the slots you see here. It is a hyper-speed capitalistic contest.</span>
                       </div>
                   </div>
                </section>

                {/* Mission */}
                <section>
                   <h3 className="text-white font-bold uppercase mb-3 text-base">Our Mission</h3>
                   <p>
                     To visualize the invisible. By actively engaging with this feed, you are participating in a live performance of the <strong>attention economy</strong>.
                     Most websites hide their tracking mechanisms behind flashy UI and "free" content. We do the opposite. We present the advertising infrastructure as the art itself.
                   </p>
                </section>

                {/* Privacy Block */}
                <section className="bg-black/50 p-4 rounded border border-neutral-800">
                   <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert size="14" className="text-green-500" />
                      <h3 className="text-xs text-neutral-500 font-bold uppercase">Privacy & Data Use</h3>
                   </div>
                   <p className="text-xs text-neutral-500">
                     This site uses standard <strong>Google AdSense</strong> protocols. We do not store your personal data on our own servers. 
                     All targeting is handled by external ad networks based on your existing digital footprint. 
                     By using this site, you acknowledge you are part of the open web's data exchange.
                   </p>
                </section>
             </div>
          </div>
        </div>
      )}

      {/* 2. PRIVACY POLICY */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 p-0 rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
             <div className="p-4 border-b border-neutral-800 bg-black flex justify-between items-center">
                <div className="flex items-center gap-2"><ShieldAlert size="18" className="text-blue-500" /><h2 className="text-sm font-bold text-white uppercase tracking-widest">Privacy Protocols</h2></div>
                <button onClick={() => setShowPrivacyModal(false)} className="text-neutral-500 hover:text-white transition-colors"><X size="20" /></button>
             </div>
             <div className="p-6 overflow-y-auto text-xs text-neutral-400 font-mono leading-relaxed space-y-4">
                <p><strong>1. DATA COLLECTION:</strong> We use Google AdSense to serve ads. Google may use cookies to personalize ads based on your prior visits to this website or other websites.</p>
                <p><strong>2. COOKIES:</strong> By accessing OnlyAds, you agree to use cookies in agreement with the OnlyAds's Privacy Policy.</p>
                <p><strong>3. THIRD PARTY VENDORS:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</p>
                <p><strong>4. OPT OUT:</strong> Users may opt out of personalized advertising by visiting Ads Settings.</p>
             </div>
          </div>
        </div>
      )}

      {/* 3. TERMS OF SERVICE */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 p-0 rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
             <div className="p-4 border-b border-neutral-800 bg-black flex justify-between items-center">
                <div className="flex items-center gap-2"><Scale size="18" className="text-red-500" /><h2 className="text-sm font-bold text-white uppercase tracking-widest">Terms of Engagement</h2></div>
                <button onClick={() => setShowTermsModal(false)} className="text-neutral-500 hover:text-white transition-colors"><X size="20" /></button>
             </div>
             <div className="p-6 overflow-y-auto text-xs text-neutral-400 font-mono leading-relaxed space-y-4">
                <p><strong>1. ACCEPTANCE:</strong> By accessing this website we assume you accept these terms and conditions.</p>
                <p><strong>2. LICENSE:</strong> Unless otherwise stated, OnlyAds and/or its licensors own the intellectual property rights for all material on OnlyAds.</p>
                <p><strong>3. USER DATA:</strong> This site is a satirical art project visualizing public data broadcasting. We do not store personal data.</p>
             </div>
          </div>
        </div>
      )}

      {/* 4. SUPPORT / FUND PROTOCOL MODAL */}
      {showSupportModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 p-0 rounded-xl shadow-2xl relative overflow-hidden">
             {/* Header */}
             <div className="p-4 border-b border-neutral-800 bg-black flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <Coins size="18" className="text-yellow-500" />
                   <h2 className="text-sm font-bold text-white uppercase tracking-widest">Fund Protocol</h2>
                </div>
                <button 
                  onClick={() => setShowSupportModal(false)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <X size="20" />
                </button>
             </div>

             <div className="p-6 flex flex-col items-center gap-6">
                <p className="text-xs text-neutral-400 text-center font-mono leading-relaxed">
                   Your contribution keeps the digital mirror live.
                </p>

                {/* UPI QR CODE WITH OVERLAID FLAG */}
                <div className="bg-white p-2 rounded-lg shadow-lg relative flex items-center justify-center">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${UPI_ID}&pn=OnlyAds&cu=INR&bgcolor=ffffff`}
                        alt="UPI Payment QR" 
                        className="w-48 h-48 block"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white p-1 rounded shadow-sm">
                           <IndiaFlag className="w-8 h-auto" />
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="w-full flex flex-col gap-2">
                    <button 
                        onClick={handleCopyUPI}
                        className={`w-full flex items-center justify-center gap-2 py-3 bg-neutral-800 border border-neutral-700 rounded text-xs font-bold uppercase tracking-widest hover:bg-neutral-700 transition-colors ${isCopied ? 'bg-green-900/30 border-green-500/50 text-green-500' : ''}`}
                    >
                        {isCopied ? <Check size="14" /> : <Copy size="14" />}
                        <span>{isCopied ? "COPIED!" : "Copy UPI ID"}</span>
                        <IndiaFlag className="w-4 h-auto ml-1" />
                    </button>

                    {/* Optional PayPal Link if needed for Global */}
                    <a 
                        href={`https://paypal.me/${PAYPAL_USER}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors"
                    >
                        <Globe size="14" />
                        <span>Global (PayPal)</span>
                    </a>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* --- COOKIE BANNER (BOTTOM FIXED) --- */}
      {showCookieModal && (
        <div className="fixed bottom-0 left-0 right-0 z-[120] bg-neutral-900 border-t border-neutral-800 p-4 sm:p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
             <div className="flex items-start gap-4">
               <div className="p-2 bg-neutral-800 rounded-lg hidden sm:block">
                 <CookieIcon size="24" className="text-green-500" />
               </div>
               <div>
                 <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                   <CookieIcon size="16" className="text-green-500 sm:hidden" />
                   Initialize Protocols?
                 </h2>
                 <p className="text-[10px] sm:text-xs text-neutral-400 mt-1 leading-relaxed max-w-2xl">
                   We use cookies to track your digital footprint and serve the highly targeted ads this entire website is purely designed to display. It's literally the point.
                 </p>
               </div>
             </div>
             
             <div className="flex gap-3 w-full sm:w-auto shrink-0">
               <button 
                 onClick={() => handleCookieResponse('rejected')}
                 className="flex-1 sm:flex-none px-4 py-2 bg-transparent border border-neutral-700 text-neutral-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded hover:border-neutral-500 hover:text-white transition-colors whitespace-nowrap"
               >
                 Decline
               </button>
               <button 
                 onClick={() => handleCookieResponse('accepted')}
                 className="flex-1 sm:flex-none px-6 py-2 bg-green-500 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded hover:bg-green-400 transition-colors whitespace-nowrap"
               >
                 Accept Cookies
               </button>
             </div>
          </div>
        </div>
      )}

      {/* --- SHARE MODAL (SOCIAL CARD) --- */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md flex flex-col gap-4 relative">
            
            {/* THE CARD ITSELF (Strict Layout for Capture) */}
            <div ref={cardRef} data-card-root className="bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl relative text-left">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex justify-center items-center text-black w-full">
                  <span className="font-black tracking-tighter uppercase text-xl leading-none whitespace-nowrap">Check out my OnlyAds</span>
              </div>

              <div className="p-5 relative w-full">
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" 
                       style={{ backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                  </div>

                  {/* Top Stats - USING FLEX INSTEAD OF GRID TO PREVENT GAP ISSUES */}
                  <div className="flex justify-between items-end mb-6 relative z-10 border-b border-neutral-800 pb-4 w-full">
                    <div className="flex flex-col w-1/2">
                        <p className="text-[10px] text-neutral-500 font-mono uppercase leading-none mb-1">Digital Signature</p>
                        <p className="text-lg font-mono text-white tracking-widest leading-none">{systemInfo.sessionHash}</p>
                    </div>
                    <div className="flex flex-col w-1/2 text-right">
                        <p className="text-[10px] text-neutral-500 font-mono uppercase leading-none mb-1">Asset Grade</p>
                        <p className={`text-lg font-mono font-bold leading-none ${systemInfo.dataValue === 'LEGENDARY' ? 'text-yellow-500 animate-pulse' : 'text-green-500'}`}>
                          {systemInfo.dataValue}
                        </p>
                    </div>
                  </div>

                  {/* Visual Ad Grid */}
                  {shareViewMode === 'grid' ? (
                    <div className="flex flex-wrap relative z-10 -mx-1">
                        {adSlots.slice(0, 4).map(slot => (
                            <div key={slot.id} className="w-1/2 px-1 mb-2">
                              <div className="aspect-[16/9] bg-neutral-900 rounded border border-neutral-800 flex flex-col items-center justify-center relative overflow-hidden group w-full">
                                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-500" />
                                  <span className="text-[9px] text-neutral-600 font-mono uppercase mb-1 tracking-widest leading-none">Target Slot {slot.id}</span>
                                  <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-neutral-500">
                                      <Maximize size="10" />
                                  </div>
                                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500/20" />
                              </div>
                            </div>
                        ))}
                    </div>
                  ) : (
                    <div className="relative z-10 mb-2">
                         <div className="aspect-[16/9] bg-neutral-900 rounded border border-neutral-800 flex flex-col items-center justify-center relative overflow-hidden group w-full">
                             <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-500" />
                             <span className="text-[9px] text-neutral-600 font-mono uppercase mb-1 tracking-widest leading-none">Primary Target Slot</span>
                             <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center text-neutral-500">
                                 <Maximize size="14" />
                             </div>
                             <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500/20" />
                         </div>
                    </div>
                  )}

                  {/* Caption (Editable) */}
                  {showCaption && (
                    <div className="text-center relative z-10 py-4 w-full px-2">
                        <textarea
                            ref={captionInputRef}
                            value={currentCaption}
                            onChange={(e) => setCurrentCaption(e.target.value)}
                            // SMALLER FONT SIZE (text-xl/2xl)
                            className="w-full bg-transparent border-none focus:ring-0 text-center text-xl sm:text-2xl font-black uppercase text-white leading-tight tracking-tighter drop-shadow-xl resize-none overflow-hidden placeholder-white/30"
                            rows={1}
                            placeholder="WRITE YOUR OWN..."
                            spellCheck="false"
                            style={{ height: 'auto', minHeight: '1.5em' }}
                        />
                    </div>
                  )}

                  {/* Brand Footer with QR */}
                  <div className="mt-2 flex justify-between items-end relative z-10 pt-4 border-t border-neutral-800 w-full">
                      <div className="flex flex-col gap-1">
                          <div className="flex items-center">
                             <span className="text-xs font-bold text-neutral-300 tracking-widest uppercase leading-none block pt-0.5">OnlyAds.me</span>
                          </div>
                          <p className="text-[8px] text-neutral-500 font-mono">Scan to decrypt</p>
                      </div>
                      
                      <div className="bg-white p-1 rounded-sm">
                          <img 
                              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://onlyads.me&bgcolor=ffffff&color=000000&margin=0" 
                              alt="QR" 
                              className="w-10 h-10 block"
                              crossOrigin="anonymous"
                          />
                      </div>
                  </div>
              </div>
            </div>

            {/* MODAL CONTROLS */}
            <div className="flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setShowCaption(!showCaption)}
                        className={`p-2 rounded-full border transition-colors ${showCaption ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}
                        title="Toggle Caption"
                    >
                        <Quote size="16" />
                    </button>
                    {showCaption && (
                        <>
                            <button 
                                onClick={handleEditCaption}
                                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                                title="Edit Caption"
                            >
                                <Pen size="16" />
                            </button>
                            <button 
                                onClick={refreshCaption}
                                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                                title="New Caption"
                            >
                                <RefreshCcw size="16" />
                            </button>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {/* View Switcher Button */}
                    <button 
                        onClick={() => setShareViewMode(shareViewMode === 'grid' ? 'single' : 'grid')}
                        className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                        title={shareViewMode === 'grid' ? "Switch to Single View" : "Switch to Grid View"}
                    >
                        {shareViewMode === 'grid' ? <Square size="16" /> : <LayoutGrid size="16" />}
                    </button>

                    <button 
                        className={`flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-neutral-200 transition-colors ${isSharing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleShare}
                        disabled={isSharing}
                    >
                        <Share2 size="14" />
                        <span>{isSharing ? 'Sharing...' : 'Share Card'}</span>
                    </button>
                </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
