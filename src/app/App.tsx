import { useEffect, useRef, useState, useCallback } from "react";

// Inject Google Fonts into document head at runtime
if (typeof document !== "undefined" && !document.getElementById("dm-sans-font")) {
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "anonymous";
  document.head.appendChild(preconnect2);

  const link = document.createElement("link");
  link.id = "dm-sans-font";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap";
  document.head.appendChild(link);
}
import logomark from "@/imports/Logomark___Lavender_1.png";
import faviconUrl from "@/imports/favicon.png";

if (typeof document !== "undefined") {
  const existing = document.querySelector("link[rel='icon']");
  if (existing) existing.remove();
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/png";
  favicon.href = faviconUrl;
  document.head.appendChild(favicon);
}
import phoneRotatorVideo from "@/imports/phone-rotator.mp4";
import vinylRecordVideo from "@/imports/Vinyl_Record_Loop.mp4";
import glitchVideo from "@/imports/Glitch-video_Survellience.mp4";
import svgPaths from "@/imports/Container/svg-tyjgly3q7u";
import { Toaster, toast } from "sonner";
import CaseStudiesImport from "@/imports/CaseStudies/index";

type Page = "home" | "prompt-library" | "about" | "case-studies";

/* ─── Typewriter hook ─── */
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(delay);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ─── Asterisk / spark SVGs (replace font dingbats to avoid Helvetica fallback) ─── */
function AsteriskIcon({ size = 30, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon({ size = 16, color = "#a855f7" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
    </svg>
  );
}

function BulletIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="4" height="4" viewBox="0 0 4 4" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" fill={color} />
    </svg>
  );
}

/* ─── Copy icon SVG ─── */
function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="0.5" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <rect x="0.5" y="3.5" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
    </svg>
  );
}

function copyToClipboard(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

const GLITCHED_PROMPT = `Animate this attached image with a glitch-heavy, surveillance/tech aesthetic. Keep the face and background largely static as the base layer, then layer in the following effects:

Facial recognition scan: the thin white tracking lines and node points connecting to the face should pulse and re-trace periodically, as if actively scanning — nodes flicker on/off, connecting lines redraw at intervals
Data readouts: the small text/number strings (bottom left, near jawline) should cycle rapidly through changing digits, like live data updating
Glitch artifacts: intermittent RGB channel-split (chromatic aberration) flickers across the face and text, brief horizontal scan-line jitter/displacement, and short digital "tear" glitches (1–3 frames) at irregular intervals — not constant, so it reads as a glitch rather than static noise
Text: "SURVEILLANCE" should have a subtle flicker/strobe on the glitch beats, occasionally breaking apart into RGB-split duplicates for a single frame before snapping back
Scan lines: faint horizontal scan-line texture across the whole frame, slowly scrolling downward continuously
Background grid/waveform elements: subtle continuous motion (slow drift or pulse) to keep the frame feeling alive between glitch hits
Color: keep the desaturated, high-contrast dark palette with white/cyan accent lines — no new colors introduced
Timing: glitch hits should feel irregular/unpredictable (not on a steady beat), roughly every 1–2 seconds, to feel unsettling and "surveillance state" in tone
Loop: should loop seamlessly for use as a background or intro clip`;

const VINYL_RECORD_PROMPT = `Create an illustrated animation, looping, of a vinyl record transitioning from a centered close-up into a record player scene.
Sequence:

Opening (0–1.5s): illustrated vinyl record centered on screen, shown face-on, spinning continuously (steady rotation, no easing — constant angular speed)
Transition (1.5–2.5s): record tilts/scales down from face-on to a flat perspective, settling onto a turntable (record player) positioned lower or off-center in frame; record keeps spinning throughout the transition, no visible pause in rotation
Resting state (2.5s onward): record sits flat on the record player, spinning steadily, tonearm visible resting on the record (optional but adds realism)
Music symbols (starting ~2.5s, continuous): illustrated music notes (eighth notes, quarter notes, or similar) periodically emerge from near the record/tonearm area, drift upward with slight side-to-side sway, fading out as they float past the top edge of the frame
Style: flat illustrated/vector style (not photorealistic), consistent line weight and color palette throughout
Loop: music-note emission should loop seamlessly (staggered timing so notes continuously appear without a visible reset)
Background: [specify — transparent, solid color, or illustrated scene]`;

const MOBILE_ROTATOR_PROMPT = `Create a looped micro-animation (transparent background) of a mobile phone outline rotating between portrait and landscape orientation.
Specs:

Phone: simple rounded-rectangle outline (stroke only, no fill), consistent corner radius
State 1 (0–2s): phone vertical (portrait), label "9:16" centered inside
Transition (2–2.5s): phone rotates 90° to horizontal (landscape); label crossfades from "9:16" to "16:9" during the rotation midpoint
State 2 (2.5–4s): phone horizontal (landscape), label "16:9" centered inside
Reverse transition (4–4.5s) back to portrait with "9:16", then hold and loop seamlessly
Easing: ease-in-out on the rotation for a natural mechanical feel
Background: fully transparent (no fill, no card, no shadow layer)
Output as a seamless loop (no jump-cut at the reset point)`;

/* ─── Cursor SVG ─── */
function CursorIcon() {
  return (
    <div style={{ position: "absolute", left: "121.5px", top: "235px", width: "24px", height: "24px", zIndex: 10 }}>
      <div style={{ position: "absolute", inset: "-29.19% -39.1% -58.84% -36.53%" }}>
        <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 42.1504 45.1262">
          <g filter="url(#cursor-shadow)">
            <path d={svgPaths.p3bc70100} fill="#0F172A" stroke="white" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="cursor-shadow" width="48" x="-3.23339" y="-0.995108">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="6" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/* ─── Copy Prompt pill ─── */
function CopyPromptPill({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "210px",
        left: "40px",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0px 4px 7.5px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 15px",
        cursor: "pointer",
        border: "1px solid black",
        zIndex: 5,
      }}
    >
      <SparkIcon size={14} color="#a855f7" />
      <span style={{ fontSize: "12px", color: "#1e293b", whiteSpace: "nowrap" }}>Copy Prompt</span>
    </div>
  );
}

/* ─── Prompt card heading ─── */
function CardHeading({ title }: { title: string }) {
  return (
    <div style={{ height: "50px", flexShrink: 0, width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "16px 24px" }}>
        <p style={{ fontSize: "16.8px", fontWeight: 500, color: "#1e293b", lineHeight: "25.2px" }}>
          {title}
        </p>
      </div>
    </div>
  );
}

/* ─── Prompt Library page ─── */
function PromptLibraryPage({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 80px",
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .c1-title { font-size: 2.25rem !important; }
        }
        @media (max-width: 600px) {
          .c1-title { font-size: 2.25rem !important; }
        }
      `}</style>

      <h1
        className="c1-title"
        style={{
          fontSize: "2.75rem",
          fontWeight: 500,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          marginBottom: "12px",
          textAlign: "center",
          fontFamily: "var(--font-heading)",
        }}
      >
        My Prompt Library
      </h1>

      <p
        className="c1-subtitle"
        style={{
          fontSize: "1.125rem",
          color: "#ffffff",
          lineHeight: 1.5,
          marginBottom: "50px",
          textAlign: "center",
          maxWidth: "520px",
        }}
      >
        I&apos;m building a library of micro-animation and design-related prompts to share with the community. Check back often as I will continue to update.
      </p>

      <div style={{ width: "100%", maxWidth: "960px", overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "304px 304px 304px", gap: "24px" }}>

          {/* Card 1 — Mobile phone rotator (video bg + functional copy) */}
          <div style={{
            background: "#8d8d8b",
            height: "340px",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0px 10px 30px -10px rgba(0,0,0,0.1)",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}>
            <div style={{ flex: "1 0 0", minHeight: "1px", width: "100%", position: "relative", background: "#000" }}>
              <video
                src={phoneRotatorVideo}
                autoPlay
                loop
                muted
                playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <CopyPromptPill onClick={() => {
              copyToClipboard(MOBILE_ROTATOR_PROMPT);
              toast("Prompt copied to clipboard", { duration: 3000 });
            }} />
            <CursorIcon />
            <CardHeading title="Mobile phone rotator" />
          </div>

          {/* Card 2 — Vinyl record player */}
          <div style={{
            background: "#8d8d8b",
            height: "340px",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0px 10px 30px -10px rgba(0,0,0,0.1)",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}>
            <div style={{ flex: "1 0 0", minHeight: "1px", width: "100%", position: "relative", background: "#000" }}>
              <video
                src={vinylRecordVideo}
                autoPlay
                loop
                muted
                playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <CopyPromptPill onClick={() => {
              copyToClipboard(VINYL_RECORD_PROMPT);
              toast("Prompt copied to clipboard", { duration: 3000 });
            }} />
            <CursorIcon />
            <CardHeading title="Vinyl record player" />
          </div>

          {/* Card 3 — Glitched */}
          <div style={{
            background: "#8d8d8b",
            height: "340px",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0px 10px 30px -10px rgba(0,0,0,0.1)",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}>
            <div style={{ flex: "1 0 0", minHeight: "1px", width: "100%", position: "relative", background: "#000" }}>
              <video
                src={glitchVideo}
                autoPlay
                loop
                muted
                playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <CopyPromptPill onClick={() => {
              copyToClipboard(GLITCHED_PROMPT);
              toast("Prompt copied to clipboard. Use own image.", { duration: 3000 });
            }} />
            <CursorIcon />
            <CardHeading title="Glitched" />
          </div>

        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "32px",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "24px",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
          cursor: "pointer",
          opacity: 0.8,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        close
      </button>
    </div>
  );
}

/* ─── Main component ─── */
export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState<Page>("home");
  const [pageVisible, setPageVisible] = useState(true);

  const SENSITIVITY = 0.8;

  const navigateTo = (target: Page) => {
    setPageVisible(false);
    setTimeout(() => {
      setPage(target);
      setPageVisible(true);
      setMenuOpen(false);
    }, 280);
  };

  const queueSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
      video.currentTime = targetTimeRef.current;
    } else {
      seekingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      const prev = prevXRef.current ?? e.clientX;
      const delta = e.clientX - prev;
      prevXRef.current = e.clientX;
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(
        video.duration,
        Math.max(0, targetTimeRef.current + offset)
      );
      if (!seekingRef.current) {
        seekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onSeeked = () => queueSeek();
    video.addEventListener("seeked", onSeeked);
    return () => video.removeEventListener("seeked", onSeeked);
  }, [queueSeek]);

  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const typewriterText =
    "I'm an interdisciplinary design leader who builds products and experiences people love. 15 years of design experince, the last few with AI in the mix. (Cause why not?)";
  const { displayed, done } = useTypewriter(typewriterText);

  const handleCopy = () => {
    copyToClipboard("rico@ricolavender.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pillButtons = [
    { label: "UX Case Studies", action: () => navigateTo("case-studies") },
    { label: "My Design Book", href: "https://design.ricolavender.com" },
    { label: "My Prompt Library", action: () => navigateTo("prompt-library") },
    { label: "Get To Know Me", action: () => navigateTo("about") },
  ];

  return (
    <div style={{ backgroundColor: "#A9A7A8" }}>
      <Toaster position="bottom-center" />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>

      {/* Background video — blurred on prompt-library page */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "70% center",
          filter: (page === "prompt-library" || page === "about") ? "blur(24px) brightness(0.65)" : "none",
          opacity: page === "case-studies" ? 0 : 1,
          transform: "scale(1.07)",
          transition: "filter 0.5s ease",
        }}
      />

      {/* Mobile overlay */}
      <div
        style={{ zIndex: 9 }}
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm flex flex-col justify-center px-8 gap-8 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <a
          href="https://ai.ricolavender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[28px] font-medium text-black hover:opacity-60 transition-opacity"
          onClick={() => setMenuOpen(false)}
        >
          RicoGPT
        </a>
        <a
          href="https://rlmercantile.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[28px] font-medium text-black hover:opacity-60 transition-opacity"
          onClick={() => setMenuOpen(false)}
        >
          Shop
        </a>
        <span className="text-[28px] font-medium text-black opacity-40">Labs</span>
        <a
          href="mailto:rico@ricolavender.com"
          className="text-[28px] font-medium text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          onClick={() => setMenuOpen(false)}
        >
          Get in touch
        </a>
      </div>

      {/* Navbar */}
      <nav
        style={{ zIndex: 10, backgroundColor: scrolled ? "rgba(255,255,255,0.75)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "background-color 0.3s ease, backdrop-filter 0.3s ease" }}
        className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-5 sm:px-8 py-4 sm:py-5"
      >
        <div
          className="flex flex-row items-center gap-3 cursor-pointer"
          onClick={() => page !== "home" && navigateTo("home")}
        >
          <img src={logomark} alt="RL logomark" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
          <span
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
            className="text-black tracking-tight text-base sm:text-lg"
          >
            Rico (S) Lavender
          </span>
          <span className="text-black select-none flex items-center">
            <AsteriskIcon size={26} color="#000" />
          </span>
        </div>

        <div className="hidden md:flex flex-row items-center gap-3 text-[17px] text-black">
          <a href="https://ai.ricolavender.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">RicoGPT</a>
          <span className="opacity-40 select-none flex items-center"><BulletIcon color="#000" /></span>
          <a href="https://rlmercantile.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Shop</a>
          <span className="opacity-40 select-none flex items-center"><BulletIcon color="#000" /></span>
          <span>Labs</span>
        </div>

        <a
          href="mailto:rico@ricolavender.com"
          className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer bg-transparent border-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 bg-black transition-all duration-300 origin-center"
            style={{ height: "2px", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}
          />
          <span
            className="block w-6 bg-black transition-all duration-300"
            style={{ height: "2px", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 bg-black transition-all duration-300 origin-center"
            style={{ height: "2px", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}
          />
        </button>
      </nav>

      {/* Footer */}
      <footer
        style={{ zIndex: 1, fontSize: "12px" }}
        className="fixed bottom-6 left-0 right-0 px-5 sm:px-8 md:px-10 flex items-center justify-between"
      >
        <span className="text-black pointer-events-none select-none">©Rico Lavender 2026. All Rights Reserved.</span>
        <div className="flex items-center gap-3 pointer-events-auto">
          <a href="https://www.linkedin.com/in/ricol/" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-60 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://dribbble.com/ricolavender" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-60 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073a44.002 44.002 0 0 0-.767-1.68c2.31-1 4.165-2.358 5.548-4.082a9.867 9.867 0 0 1 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68a46.287 46.287 0 0 0-3.483-5.642 9.925 9.925 0 0 1 8.469 1.962zm-10.516-.993a44.129 44.129 0 0 1 3.53 5.603c-2.43.823-5.357 1.277-8.765 1.277a9.928 9.928 0 0 1 5.235-6.88zm-5.23 8.188c3.693 0 6.775-.498 9.343-1.388.2.44.398.892.583 1.352-3.116 1.015-5.46 3.107-7.027 5.976A9.898 9.898 0 0 1 2.297 11.354zm3.956 8.55c1.367-2.583 3.45-4.48 6.279-5.454a40.86 40.86 0 0 1 1.763 6.254 9.95 9.95 0 0 1-8.042-.8zm10.114.403a42.239 42.239 0 0 0-1.637-5.95c1.928-.306 4.06-.274 6.395.12a9.916 9.916 0 0 1-4.758 5.83z"/>
            </svg>
          </a>
        </div>
      </footer>

      {/* Page content */}
      <div
        style={{
          opacity: pageVisible ? 1 : 0,
          transition: "opacity 0.28s ease",
        }}
      >
        {page === "home" && (
          <section
            style={{ zIndex: 1 }}
            className="relative h-screen flex flex-col justify-end md:justify-center pb-12 md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
          >
            <div className="max-w-xl relative z-10">
              <p
                className="mb-5 sm:mb-6 pointer-events-none select-none"
                style={{
                  fontSize: "clamp(18px, 4vw, 26px)",
                  lineHeight: 1.3,
                  fontWeight: 400,
                  color: "#000",
                  filter: "blur(2px)",
                }}
              >
                Hey there, I&apos;m Rico Lavender,
                <br />
                Nice To Meet You
              </p>

              <p
                className="text-black mb-5 sm:mb-6"
                style={{
                  fontSize: "clamp(18px, 4vw, 26px)",
                  lineHeight: 1.35,
                  fontWeight: 400,
                  minHeight: "54px",
                }}
              >
                {displayed}
                {!done && (
                  <span
                    className="cursor-blink inline-block bg-black align-middle ml-[2px]"
                    style={{ width: "2px", height: "1.1em" }}
                  />
                )}
              </p>

              <div
                className="flex flex-wrap gap-y-1"
                style={{
                  opacity: pillsVisible ? 1 : 0,
                  transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                {pillButtons.map((btn) =>
                  "action" in btn ? (
                    <button
                      key={btn.label}
                      onClick={btn.action}
                      className="inline-flex items-center justify-center font-normal bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
                      style={{ paddingTop: "0.3em", paddingBottom: "0.3em" }}
                    >
                      {btn.label}
                    </button>
                  ) : (
                    <a
                      key={btn.label}
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center font-normal bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors duration-200 whitespace-nowrap"
                      style={{ paddingTop: "0.3em", paddingBottom: "0.3em" }}
                    >
                      {btn.label}
                    </a>
                  )
                )}

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center font-normal gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 mx-[0.2em] mb-[0.4em] hover:bg-white hover:text-black transition-colors duration-200 whitespace-nowrap cursor-pointer"
                  style={{ paddingTop: "0.3em", paddingBottom: "0.3em" }}
                >
                  <span>
                    Contact me:{" "}
                    <span className="underline underline-offset-1">
                      {copied ? "Copied!" : "rico@ricolavender.com"}
                    </span>
                  </span>
                  <CopyIcon />
                </button>
              </div>
            </div>
          </section>
        )}

        {page === "prompt-library" && <PromptLibraryPage onClose={() => navigateTo("home")} />}

        {page === "case-studies" && (
          <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", background: "#f4f3f1", paddingTop: "72px" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", overflowX: "clip" }}>
              <CaseStudiesImport />
            </div>
            <div style={{ padding: "24px 40px 40px" }}>
              <button
                onClick={() => navigateTo("home")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#111",
                  fontSize: "16px",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: 0.6,
                  padding: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Back to home
              </button>
            </div>
          </div>
        )}

        {page === "about" && (
          <div
            style={{
              position: "relative",
              zIndex: 1,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "100px 40px 80px",
              maxWidth: "680px",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 500,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                marginBottom: "24px",
                lineHeight: 1.15,
              }}
            >
              Here&apos;s a little about me
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 2vw, 19px)",
                color: "#ffffff",
                lineHeight: 1.7,
                fontWeight: 400,
                marginBottom: "40px",
              }}
            >
              I&apos;ve always been someone who likes figuring things out, which is probably why product design has been such a good fit for me over the last 15 years. I enjoy taking messy ideas, asking a lot of questions, and turning them into products that feel simple and intuitive to use. I&apos;ve been fortunate enough to work with companies like Meta, American Express, and startups of all sizes, but I&apos;ve learned that great products come from great teams. I&apos;m easygoing, genuinely curious, and I try to leave my ego at the door. I enjoy collaborating, challenging ideas, and helping the people around me do their best work. At the end of the day, I want to build products people enjoy using and be the kind of teammate people enjoy working with.
            </p>

            <button
              onClick={() => navigateTo("home")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "18px",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: 0.8,
                padding: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
