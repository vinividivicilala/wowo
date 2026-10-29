"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ===== CONSTANTS =====
const FONT_FAMILY = "'Plus Jakarta Sans', sans-serif";
const BRUTAL_FONT =
  "'Bungee', 'Archivo Black', 'Anton', 'Impact', 'Arial Black', sans-serif";
const BLUE = "#0D3CFC";
const WHITE = "#FFFFFF";
const RED = "#DC2626";
const BLACK = "#000000";

const PRIVACY_POLICY_URL = "/privacy-policy";
const CONTACT_URL = "/contact";

// ===== VERIFIED BADGE (WHITE) =====
const VerifiedBadgeWhite = ({ size = 16 }: { size?: number }) => (
  <span
    style={{
      position: "relative",
      display: "inline-block",
      marginLeft: "4px",
      verticalAlign: "middle",
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        fill="#FFFFFF"
        d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
      />
    </svg>
  </span>
);

// ===== PESAN ICON — LEBIH DETAIL (chat bubble + ekor + 2 dot) =====
const PesanIcon = ({
  size = 28,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3.5C7.02944 3.5 3 7.02944 3 11.5C3 13.2207 3.58242 14.8102 4.55385 16.0937L3.5 20.5L7.90633 19.4462C9.18977 20.4176 10.7793 21 12.5 21C17.1944 21 21 17.1944 21 12.5C21 7.80558 17.1944 3.5 12 3.5Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="8.5" cy="12" r="1.2" fill={color} />
    <circle cx="12" cy="12" r="1.2" fill={color} />
    <circle cx="15.5" cy="12" r="1.2" fill={color} />
  </svg>
);

// ===== MICROSOFT STORE ICON =====
const MicrosoftStoreIcon = ({
  size = 32,
  color = "#ffffff",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "inline-block" }}
  >
    <path
      d="M3 7.5L10.5 5.5V11.5H3V7.5Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 5.5L21 3.5V11.5H12.5V5.5Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M3 12.5H10.5V19.5L3 17.5V12.5Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 12.5H21V20.5L12.5 18.5V12.5Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

// ===== WINDOWS ICON =====
const WindowsIcon = ({
  size = 20,
  color = "#ffffff",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="9" height="9" fill={color} />
    <rect x="13" y="2" width="9" height="9" fill={color} />
    <rect x="2" y="13" width="9" height="9" fill={color} />
    <rect x="13" y="13" width="9" height="9" fill={color} />
  </svg>
);

// ===== ICON INDEX =====
const IndexIcon = ({
  size = 18,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="4" cy="6" r="1.5" fill={color} />
    <line
      x1="9"
      y1="6"
      x2="21"
      y2="6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="4" cy="12" r="1.5" fill={color} />
    <line
      x1="9"
      y1="12"
      x2="21"
      y2="12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="4" cy="18" r="1.5" fill={color} />
    <line
      x1="9"
      y1="18"
      x2="21"
      y2="18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ===== ICON GRIDS =====
const GridsIcon = ({
  size = 18,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1.2"
      stroke={color}
      strokeWidth="1.8"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1.2"
      stroke={color}
      strokeWidth="1.8"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1.2"
      stroke={color}
      strokeWidth="1.8"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1.2"
      stroke={color}
      strokeWidth="1.8"
    />
  </svg>
);

// ===== PRODUCT DESIGN ICON =====
const ProductDesignIcon = ({
  size = 48,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      stroke={color}
      strokeWidth="1.8"
    />
    <path d="M3 9H21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 9V21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="6" cy="6" r="1" fill={color} />
    <circle cx="9" cy="6" r="1" fill={color} />
  </svg>
);

// ===== DESIGN SYSTEM ICON =====
const DesignSystemIcon = ({
  size = 48,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1.5"
      stroke={color}
      strokeWidth="1.8"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1.5"
      stroke={color}
      strokeWidth="1.8"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1.5"
      stroke={color}
      strokeWidth="1.8"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1.5"
      stroke={color}
      strokeWidth="1.8"
    />
  </svg>
);

// ===== RESEARCH ICON =====
const ResearchIcon = ({
  size = 48,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="1.8" />
    <path
      d="M15.5 15.5L21 21"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M8 10.5L10 12.5L13.5 8.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ===== ENCRYPTION ICON =====
const EncryptionIcon = ({
  size = 48,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="4"
      y="10"
      width="16"
      height="11"
      rx="2"
      stroke={color}
      strokeWidth="1.8"
    />
    <path
      d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="15" r="1.6" fill={color} />
    <path
      d="M12 16.5V18"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// ===== ANTI FRAUD ICON =====
const AntiFraudIcon = ({
  size = 48,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2.5L4.5 5.5V11.5C4.5 16 7.8 20.2 12 21.5C16.2 20.2 19.5 16 19.5 11.5V5.5L12 2.5Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M9 12L11 14L15.5 9.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ===== ANTI BOT ICON =====
const AntiBotIcon = ({
  size = 48,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="4"
      y="8"
      width="16"
      height="12"
      rx="3"
      stroke={color}
      strokeWidth="1.8"
    />
    <circle cx="9" cy="14" r="1.4" fill={color} />
    <circle cx="15" cy="14" r="1.4" fill={color} />
    <path
      d="M12 8V4.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="3" r="1.4" fill={color} />
    <path
      d="M2 13V15"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M22 13V15"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// ===== FOOTER SECTION =====
const FooterSection = ({ refreshKey }: { refreshKey?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!titleRef.current || !containerRef.current) return;
    const title = titleRef.current;
    const aEl = aRef.current;
    let split: any = null;
    let splitA: any = null;
    let ctx: any = null;

    const setup = () => {
      split = new SplitText(title, {
        type: "chars",
        charsClass: "footer-farid-char",
      });

      if (aEl) {
        splitA = new SplitText(aEl, {
          type: "chars",
          charsClass: "footer-a-char",
        });
      }

      ctx = gsap.context(() => {
        gsap.set(split.chars, {
          yPercent: 120,
          opacity: 0,
          rotationX: -90,
          transformOrigin: "50% 100%",
          force3D: true,
        });
        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            end: "top 45%",
            scrub: 1,
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        if (splitA && splitA.chars.length > 0) {
          gsap.set(splitA.chars, {
            yPercent: 100,
            opacity: 0,
            scale: 2.2,
            rotate: -12,
            transformOrigin: "50% 100%",
            force3D: true,
          });
          gsap.to(splitA.chars, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 95%",
              end: "top 45%",
              scrub: 1,
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          });
        }
      }, containerRef);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setTimeout(setup, 50));
    } else {
      setTimeout(setup, 200);
    }

    return () => {
      if (ctx) ctx.revert();
      if (split && split.revert) split.revert();
      if (splitA && splitA.revert) splitA.revert();
    };
  }, [refreshKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 600);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        margin: 0,
        backgroundColor: RED,
        borderRadius: "60px 60px 0 0",
        padding: "60px 40px 40px 40px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
          marginBottom: "40px",
        }}
      >
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            cursor: "pointer",
            padding: "14px 22px",
            backgroundColor: WHITE,
            borderRadius: "12px",
            boxShadow: "0 6px 24px rgba(255,255,255,0.25)",
            transition: "transform 0.2s ease, boxShadow 0.2s ease",
            pointerEvents: "auto",
          }}
        >
          <WindowsIcon size={24} color={RED} />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "18px",
              fontWeight: 700,
              color: RED,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            Download for Windows
          </span>
        </a>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingTop: "20px",
          borderTop: `1px solid ${WHITE}40`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: "14px",
            fontWeight: 400,
            color: WHITE,
            margin: 0,
            textAlign: "center",
            letterSpacing: "0.01em",
            opacity: 0.9,
          }}
        >
          Terms and conditions apply. By using this website, you agree to our
          Terms of Use and Privacy Policy.
        </p>
      </div>

      <div
        style={{
          marginTop: "40px",
          marginBottom: "24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            cursor: "pointer",
            padding: "14px 22px",
            backgroundColor: BLUE,
            borderRadius: "14px",
            boxShadow: "0 6px 24px rgba(13,60,252,0.35)",
            transition: "transform 0.2s ease, boxShadow 0.2s ease",
            pointerEvents: "auto",
          }}
        >
          <MicrosoftStoreIcon size={36} color={WHITE} />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "24px",
              fontWeight: 700,
              color: WHITE,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Unduh Menuru
          </span>
        </a>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "12px",
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <span
            ref={titleRef}
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "600px",
              fontWeight: 400,
              color: WHITE,
              letterSpacing: "-0.05em",
              lineHeight: "0.85",
              display: "block",
              textAlign: "left",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              willChange: "transform, opacity",
              whiteSpace: "nowrap",
              margin: 0,
              padding: 0,
              overflow: "visible",
              position: "relative",
              pointerEvents: "none",
            }}
          >
            Farid
          </span>

          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              lineHeight: "0.85",
            }}
          >
            <span
              ref={aRef}
              style={{
                fontFamily: BRUTAL_FONT,
                fontSize: "600px",
                fontWeight: 900,
                color: WHITE,
                lineHeight: "0.85",
                display: "inline-block",
                letterSpacing: "-0.06em",
                textTransform: "uppercase",
                willChange: "transform, opacity",
                pointerEvents: "none",
                marginLeft: "4px",
              }}
            >
              A
            </span>
          </span>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "10px",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "16px",
              fontWeight: 400,
              color: WHITE,
              letterSpacing: "0.01em",
              opacity: 0.9,
            }}
          >
            2024 - 2026 Menuru. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

// ===== COOKIES POPUP =====
const CookiesPopup = ({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 40px)",
        maxWidth: "720px",
        backgroundColor: WHITE,
        borderRadius: "20px",
        padding: "24px 28px",
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
        border: `1.5px solid ${BLUE}30`,
        zIndex: 100004,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        flexWrap: "wrap",
        boxSizing: "border-box",
        animation: "cookies-slide-up 0.4s ease-out",
      }}
    >
      <p
        style={{
          flex: "1 1 320px",
          margin: 0,
          fontSize: "15px",
          fontFamily: FONT_FAMILY,
          fontWeight: 400,
          color: BLACK,
          lineHeight: 1.6,
          letterSpacing: "-0.01em",
        }}
      >
        We use cookies to improve your experience on this site. By continuing,
        you agree to the use of cookies in accordance with our{" "}
        <a
          href={PRIVACY_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: BLUE,
            fontWeight: 700,
            textDecoration: "underline",
          }}
        >
          Privacy Policy
        </a>
        .
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onDecline}
          style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            color: BLUE,
            border: `1.5px solid ${BLUE}`,
            borderRadius: "10px",
            fontFamily: FONT_FAMILY,
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "-0.01em",
          }}
        >
          Decline
        </button>
        <button
          onClick={onAccept}
          style={{
            padding: "10px 20px",
            backgroundColor: BLUE,
            color: WHITE,
            border: `1.5px solid ${BLUE}`,
            borderRadius: "10px",
            fontFamily: FONT_FAMILY,
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "-0.01em",
            boxShadow: "0 4px 16px rgba(13,60,252,0.35)",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);

  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonBgRef = useRef<HTMLDivElement>(null);
  const panelBgRef = useRef<HTMLDivElement>(null);
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLSpanElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [expandOpen, setExpandOpen] = useState(false);

  const [activeView, setActiveView] = useState<"work" | "index">("work");

  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const hoverAreaRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const consent = localStorage.getItem("cookies-consent");
      if (!consent) {
        setTimeout(() => setShowCookies(true), 1500);
      }
    } catch {
      setShowCookies(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    try {
      localStorage.setItem("cookies-consent", "accepted");
    } catch {}
    setShowCookies(false);
  };

  const handleDeclineCookies = () => {
    try {
      localStorage.setItem("cookies-consent", "declined");
    } catch {}
    setShowCookies(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(t);
  }, [activeView]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const preloader = preloaderRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    if (!preloader || !leftText || !rightText) return;

    gsap.set(leftText, { xPercent: -180, opacity: 0 });
    gsap.set(rightText, { xPercent: 180, opacity: 0 });
    gsap.set(preloader, { opacity: 1, display: "flex" });

    const tl = gsap.timeline();

    tl.to(
      [leftText, rightText],
      { xPercent: 0, opacity: 1, duration: 2.2, ease: "power2.out", stagger: 0 },
      0
    )
      .to({}, { duration: 1 })
      .to(leftText, {
        xPercent: -220,
        opacity: 0,
        duration: 2.4,
        ease: "power2.inOut",
      })
      .to(
        rightText,
        {
          xPercent: 220,
          opacity: 0,
          duration: 2.4,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          if (preloader) preloader.style.display = "none";
          setPreloaderDone(true);
        },
      });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const overlay = overlayRef.current;
    const label = menuLabelRef.current;
    if (!overlay || !label) return;

    if (menuOpen) {
      gsap.set(overlay, { display: "flex" });
      const tl = gsap.timeline();

      tl.fromTo(
        overlay,
        { clipPath: `inset(0 0 100% 0)`, opacity: 0 },
        {
          clipPath: `inset(0 0 0% 0)`,
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
        }
      ).fromTo(
        label,
        { opacity: 0, y: 20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.5"
      );
    } else {
      const tl = gsap.timeline();

      tl.to(overlay, {
        clipPath: `inset(0 0 100% 0)`,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          if (overlay) overlay.style.display = "none";
        },
      }).fromTo(
        label,
        { opacity: 0, y: 20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const panelBg = panelBgRef.current;
    const panelInner = panelInnerRef.current;
    const buttonBg = buttonBgRef.current;
    const plusIcon = plusIconRef.current;
    if (!panelBg || !buttonBg) return;

    if (expandOpen) {
      const buttonRect = buttonBg.getBoundingClientRect();
      const BANNER_HEIGHT = 40;
      const BANNER_MARGIN = 12;

      const targetHeight = Math.max(
        buttonRect.top - BANNER_HEIGHT - BANNER_MARGIN,
        200
      );

      gsap.set(panelBg, { display: "block" });

      gsap.fromTo(
        panelBg,
        { height: 0, opacity: 0 },
        {
          height: `${targetHeight}px`,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );
      if (panelInner) {
        gsap.to(panelInner, {
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        });
      }
      if (plusIcon) {
        gsap.to(plusIcon, { rotation: 45, duration: 0.5, ease: "power3.out" });
      }
    } else {
      gsap.to(panelBg, {
        height: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          if (panelBg) panelBg.style.display = "none";
        },
      });
      if (panelInner) {
        gsap.to(panelInner, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
      if (plusIcon) {
        gsap.to(plusIcon, { rotation: 0, duration: 0.4, ease: "power3.inOut" });
      }
    }
  }, [expandOpen]);

  const navFontSize = "50px";

  return (
    <>
      <div
        ref={preloaderRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFFFF",
          zIndex: 999999,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <span
          ref={leftTextRef}
          style={{
            fontSize: "90px",
            fontWeight: 400,
            color: "#0D3CFC",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "inline-block",
            willChange: "transform, opacity",
            whiteSpace: "nowrap",
          }}
        >
          Farid
        </span>
        <span
          ref={rightTextRef}
          style={{
            fontSize: "90px",
            fontWeight: 400,
            color: "#0D3CFC",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "inline-block",
            willChange: "transform, opacity",
            whiteSpace: "nowrap",
          }}
        >
          By Founder And Developer Menuru
        </span>
      </div>

      {/* ===== BANNER ===== */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          backgroundColor: "#0000EE",
          color: "#FFFFFF",
          padding: "10px 20px",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: "0.02em",
          zIndex: 10000,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: BLACK,
              fontWeight: 400,
              fontSize: "14px",
              textTransform: "none",
              fontFamily: FONT_FAMILY,
            }}
          >
            Bersponsor
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            Kunjungi website{" "}
            <a
              href="https://menuru-studio.netlify.app/notes"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              Menuru
              <VerifiedBadgeWhite size={14} />
            </a>
          </span>
        </span>
      </div>

      {preloaderDone && (
        <>
          <div
            style={{
              position: "fixed",
              top: "60px",
              left: "40px",
              zIndex: 100001,
              display: "flex",
              alignItems: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              pointerEvents: "none",
              color: menuOpen ? "#FFFFFF" : "#0D3CFC",
              transition: "color 0.3s ease",
            }}
          >
            <span
              style={{
                fontSize: navFontSize,
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                textTransform: "capitalize",
              }}
            >
              Farid Ardiansyah
            </span>
          </div>

          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen((prev) => !prev)}
            style={{
              position: "fixed",
              top: "60px",
              right: "40px",
              zIndex: 100001,
              backgroundColor: "transparent",
              color: menuOpen ? "#FFFFFF" : "#0D3CFC",
              border: "none",
              padding: 0,
              fontSize: navFontSize,
              fontWeight: 400,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "-0.03em",
              cursor: "pointer",
              textTransform: "capitalize",
              lineHeight: 1,
              transition: "color 0.3s ease",
            }}
          >
            <span
              ref={menuLabelRef}
              style={{
                display: "inline-block",
                willChange: "transform, opacity",
              }}
            >
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </>
      )}

      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#0D3CFC",
          zIndex: 100000,
          display: "none",
          clipPath: "inset(0 0 100% 0)",
        }}
      />

      {preloaderDone && (
        <>
          <div
            style={{
              position: "fixed",
              top: "60px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              gap: "40px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              pointerEvents: "auto",
              color: menuOpen ? "#FFFFFF" : "#0D3CFC",
              transition: "color 0.3s ease",
            }}
          >
            {["Work", "About", "Contact", "Post"].map((txt) => (
              <a
                key={txt}
                href="#"
                style={{
                  fontSize: navFontSize,
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  textTransform: "capitalize",
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {txt}
              </a>
            ))}
          </div>

          <div
            style={{
              position: "fixed",
              top: "60px",
              right: "180px",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              gap: "40px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: menuOpen ? "#FFFFFF" : "#0D3CFC",
              transition: "color 0.3s ease",
            }}
          >
            <a
              href="#"
              style={{
                fontSize: navFontSize,
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                textTransform: "capitalize",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Messages
            </a>
          </div>
        </>
      )}

      <div
        style={{
          minHeight: "300vh",
          backgroundColor: "#FFFFFF",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: "200px 0 0 0",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "0 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            maxWidth: "1600px",
            margin: "0 auto",
            width: "100%",
            marginBottom: "200px",
          }}
        >
          {/* ===== Founder And Developer Brand + Menuru (bg biru) ===== */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "50px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: "1.1",
                color: "#0D3CFC",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
              }}
            >
              Founder And Developer Brand
            </span>
            <span
              style={{
                backgroundColor: BLUE,
                color: WHITE,
                padding: "10px 28px",
                borderRadius: "28px",
                display: "inline-flex",
                alignItems: "center",
                boxShadow: "0 8px 24px rgba(13,60,252,0.35)",
                fontSize: "50px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
                textTransform: "capitalize",
              }}
            >
              Menuru
            </span>
          </div>

          {/* ===== Based In Indonesia ===== */}
          <span
            style={{
              fontSize: "50px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              lineHeight: "1.1",
              color: "#0D3CFC",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              textTransform: "capitalize",
            }}
          >
            Based In Indonesia
          </span>

          {/* ===== KOTAK BORDER "Pesan" di bawah Menuru ===== */}
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              padding: "14px 28px",
              backgroundColor: "transparent",
              border: `2px solid ${BLUE}`,
              borderRadius: "14px",
              boxShadow: "0 4px 20px rgba(13,60,252,0.15)",
              textDecoration: "none",
              cursor: "pointer",
              marginTop: "8px",
              transition: "background-color 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <PesanIcon size={28} color={BLUE} />
            <span
              style={{
                fontSize: "28px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                color: BLUE,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Pesan
            </span>
          </a>

          {/* ===== JUDUL SECTION: Merancang Produk ===== */}
          <span
            style={{
              fontSize: "64px",
              fontFamily: FONT_FAMILY,
              fontWeight: 400,
              color: BLUE,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginTop: "100px",
            }}
          >
            Merancang Produk
          </span>

          {/* ===== SECTION 3 KOLOM ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "60px",
              flexWrap: "wrap",
              marginTop: "30px",
              width: "100%",
            }}
          >
            <div
              style={{
                flex: "1 1 300px",
                minWidth: "260px",
                maxWidth: "380px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <ProductDesignIcon size={56} color={BLUE} />
              <span
                style={{
                  fontSize: "32px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                Product Design
              </span>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLACK,
                  lineHeight: 1.6,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Designing intuitive, functional, and user-centered product
                experiences — from concept to final prototype.
              </p>
            </div>

            <div
              style={{
                flex: "1 1 300px",
                minWidth: "260px",
                maxWidth: "380px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <DesignSystemIcon size={56} color={BLUE} />
              <span
                style={{
                  fontSize: "32px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                Design System
              </span>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLACK,
                  lineHeight: 1.6,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Building a consistent, scalable, and easy-to-use design system
                for the entire product team.
              </p>
            </div>

            <div
              style={{
                flex: "1 1 300px",
                minWidth: "260px",
                maxWidth: "380px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <ResearchIcon size={56} color={BLUE} />
              <span
                style={{
                  fontSize: "32px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                Research that changes decisions
              </span>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLACK,
                  lineHeight: 1.6,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Conducting in-depth research that generates real insights to
                change product decisions for the better.
              </p>
            </div>
          </div>

          {/* ===== SECTION SECURITY ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              marginTop: "100px",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "64px",
                fontFamily: FONT_FAMILY,
                fontWeight: 400,
                color: BLUE,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Security
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "60px",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <div
                style={{
                  flex: "1 1 300px",
                  minWidth: "260px",
                  maxWidth: "380px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <EncryptionIcon size={56} color={BLUE} />
                <span
                  style={{
                    fontSize: "32px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  Encryption
                </span>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLACK,
                    lineHeight: 1.6,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  User data is protected with end-to-end encryption, so only
                  authorized users can access it.
                </p>
              </div>

              <div
                style={{
                  flex: "1 1 300px",
                  minWidth: "260px",
                  maxWidth: "380px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <AntiFraudIcon size={56} color={BLUE} />
                <span
                  style={{
                    fontSize: "32px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  Anti-Fraud System
                </span>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLACK,
                    lineHeight: 1.6,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Real-time detection of suspicious activity to prevent fraud
                  and protect every user transaction.
                </p>
              </div>

              <div
                style={{
                  flex: "1 1 300px",
                  minWidth: "260px",
                  maxWidth: "380px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <AntiBotIcon size={56} color={BLUE} />
                <span
                  style={{
                    fontSize: "32px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  Anti-Bot
                </span>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLACK,
                    lineHeight: 1.6,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  An automated protection system that blocks bots and fake
                  traffic to keep the platform safe and fair.
                </p>
              </div>
            </div>
          </div>

          {/* ===== SECTION SELECTED WORK ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "120px",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontSize: "80px",
                fontFamily: FONT_FAMILY,
                fontWeight: 400,
                color: BLUE,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Selected Work
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "80px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                2026
              </span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "4px",
                }}
              >
                <button
                  onClick={() => setActiveView("index")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "18px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    opacity: activeView === "index" ? 1 : 0.55,
                  }}
                >
                  <IndexIcon size={18} color={BLUE} />
                  Index
                </button>
                <button
                  onClick={() => setActiveView("work")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "18px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    opacity: activeView === "work" ? 1 : 0.55,
                  }}
                >
                  <GridsIcon size={18} color={BLUE} />
                  Grids
                </button>
              </div>
            </div>
          </div>

          {/* ===== KONDISI: WORK / INDEX ===== */}
          {activeView === "work" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                marginTop: "80px",
                gap: "24px",
              }}
            >
              <img
                src="/images/pjgff.JPG"
                alt="Menuru Productivity"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "24px",
                  objectFit: "cover",
                  boxShadow: "0 12px 48px rgba(13,60,252,0.15)",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "90px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                  }}
                >
                  Menuru
                </span>
                <span
                  style={{
                    fontSize: "90px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                  }}
                >
                  Productivity
                </span>
              </div>
            </div>
          ) : (
            <div
              ref={hoverAreaRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoverImage(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginTop: "0px",
                gap: "16px",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontSize: "60px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Index
              </span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  gap: "40px",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                }}
              >
                <span
                  onMouseEnter={() => setHoverImage("/images/pjgff.JPG")}
                  onMouseLeave={() => setHoverImage(null)}
                  style={{
                    fontSize: "90px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                >
                  01
                </span>

                <span
                  onMouseEnter={() => setHoverImage("/images/pjgff.JPG")}
                  onMouseLeave={() => setHoverImage(null)}
                  style={{
                    fontSize: "90px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                >
                  Menuru
                </span>

                <span
                  onMouseEnter={() => setHoverImage("/images/pjgff.JPG")}
                  onMouseLeave={() => setHoverImage(null)}
                  style={{
                    fontSize: "90px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                >
                  Productivity
                </span>

                <span
                  onMouseEnter={() => setHoverImage("/images/pjgff.JPG")}
                  onMouseLeave={() => setHoverImage(null)}
                  style={{
                    fontSize: "90px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 400,
                    color: BLUE,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    marginLeft: "auto",
                    flexShrink: 0,
                    textAlign: "right",
                    cursor: "pointer",
                  }}
                >
                  2024 - Present
                </span>
              </div>
            </div>
          )}
        </div>

        <FooterSection refreshKey={activeView} />
      </div>

      {hoverImage && (
        <img
          src={hoverImage}
          alt="Preview"
          style={{
            position: "fixed",
            left: `${mousePos.x + 24}px`,
            top: `${mousePos.y + 24}px`,
            width: "480px",
            height: "auto",
            borderRadius: "20px",
            objectFit: "cover",
            pointerEvents: "none",
            zIndex: 100003,
            boxShadow: "0 24px 64px rgba(13,60,252,0.4)",
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      {showCookies && (
        <CookiesPopup
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
        />
      )}

      {preloaderDone && !menuOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "520px",
            zIndex: 100002,
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          <div
            ref={wrapperRef}
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <div
              ref={panelBgRef}
              style={{
                position: "absolute",
                bottom: "100%",
                left: 0,
                right: 0,
                width: "100%",
                height: 0,
                display: "none",
                overflow: "hidden",
                backgroundColor: "#0D3CFC",
                borderRadius: "20px 20px 0 0",
                boxShadow: "0 -8px 32px rgba(13,60,252,0.35)",
                zIndex: 1,
                boxSizing: "border-box",
                margin: 0,
              }}
            >
              <div
                ref={panelInnerRef}
                style={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  opacity: 0,
                  boxSizing: "border-box",
                  height: "100%",
                  overflowY: "auto",
                }}
              />
            </div>

            <div
              ref={buttonBgRef}
              style={{
                width: "100%",
                height: "64px",
                backgroundColor: "#0D3CFC",
                borderRadius: expandOpen ? "0px 0px 20px 20px" : "20px",
                boxShadow: "0 8px 32px rgba(13,60,252,0.35)",
                border: "2px solid #0D3CFC",
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "0 20px",
                boxSizing: "border-box",
                transition: "border-radius 0.4s ease",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Farid Ardiansyah
              </span>
              <button
                onClick={() => setExpandOpen((prev) => !prev)}
                aria-label={expandOpen ? "Tutup panel" : "Buka panel"}
                style={{
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <span
                  ref={plusIconRef}
                  style={{
                    display: "inline-block",
                    fontSize: "36px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "#FFFFFF",
                    willChange: "transform",
                  }}
                >
                  +
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Archivo+Black&family=Anton&display=swap');

        @keyframes cookies-slide-up {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        html,
        body {
          overflow-x: hidden !important;
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .footer-farid-char {
          display: inline-block;
          will-change: transform, opacity;
          color: #ffffff !important;
          transform-origin: 50% 100%;
        }
        .footer-a-char {
          display: inline-block;
          will-change: transform, opacity;
          color: #ffffff !important;
          transform-origin: 50% 100%;
        }
      `}</style>
    </>
  );
}
