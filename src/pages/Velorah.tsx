import { useEffect } from "react";

export default function Velorah() {
  useEffect(() => {
    // Add font imports
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="velorah-theme min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col font-body">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="text-3xl tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Velorah<sup className="text-xs">®</sup>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#" className="text-sm text-foreground transition-colors">Home</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Studio</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Journal</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reach Us</a>
        </div>
        <button className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300">
          Begin Journey
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 flex-1">
        <h1 className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Where <em className="not-italic text-muted-foreground">dreams</em> rise <em className="not-italic text-muted-foreground">through the silence.</em>
        </h1>
        
        <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body">
          We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>
        
        <button className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-transform duration-300 cursor-pointer">
          Begin Journey
        </button>
      </main>
    </div>
  );
}
