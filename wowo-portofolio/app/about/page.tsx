"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyD_htQZ1TClnXKZGRJ4izbMQ02y6V3aNAQ",
  authDomain: "wawa44-58d1e.firebaseapp.com",
  databaseURL:
    "https://wawa44-58d1e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wawa44-58d1e",
  storageBucket: "wawa44-58d1e.firebasestorage.app",
  messagingSenderId: "836899520599",
  appId: "1:836899520599:web:b346e4370ecfa9bb89e312",
  measurementId: "G-8LMP7F4BE9",
};

let app: any = null;
let auth: any = null;
let db: any = null;

if (typeof window !== "undefined") {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
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

// WARNA STABILO (HIGHLIGHT)
const HIGHLIGHT_YELLOW = "#CCFF00"; 
const HIGHLIGHT_GREEN = "#00FF66";  
const HIGHLIGHT_CYAN = "#00E5FF";   
const HIGHLIGHT_PINK = "#FF007F";   

// ===== ICONS =====
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

const InstagramVerifiedBadge = ({
  size = 16,
  color = "#0095F6",
  isOnBlueBackground = false,
}: {
  size?: number;
  color?: string;
  isOnBlueBackground?: boolean;
}) => {
  if (isOnBlueBackground) {
    return <VerifiedBadgeWhite size={size} />;
  }
  return (
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
          fill={color}
          d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
        />
      </svg>
    </span>
  );
};

const MicrosoftStoreIcon = ({
  size = 32,
  color = "#ffffff",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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

// ===== FOOTER SECTION =====
const footerColumns = [
  {
    title: "Attention",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-services" },
      { label: "Cookies Policy", href: "/cookies-policy" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Work", href: "/work" },
      { label: "Messages", href: "/messages" },
      { label: "Post", href: "/post" },
    ],
  },
  {
    title: "Get in Touch",
    links: [{ label: "Contact", href: "/contact" }],
  },
];

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
      if (aEl)
        splitA = new SplitText(aEl, {
          type: "chars",
          charsClass: "footer-a-char",
        });

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

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        backgroundColor: RED,
        borderRadius: "60px 60px 0 0",
        padding: "60px 40px 40px",
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
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
          {footerColumns.map((col) => (
            <div
              key={col.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                minWidth: "180px",
              }}
            >
              <span style={{ fontSize: "50px", color: WHITE, fontWeight: 400 }}>
                {col.title}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "50px",
                    color: WHITE,
                    textDecoration: "none",
                    opacity: 0.9,
                    lineHeight: 1.15,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 22px",
            backgroundColor: WHITE,
            borderRadius: "12px",
            textDecoration: "none",
            boxShadow: "0 6px 24px rgba(255,255,255,0.25)",
          }}
        >
          <WindowsIcon size={24} color={RED} />
          <span style={{ fontSize: "18px", fontWeight: 700, color: RED }}>
            Download for Windows
          </span>
        </a>
      </div>
      <div style={{ marginTop: "40px", marginBottom: "24px" }}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 22px",
            backgroundColor: BLUE,
            borderRadius: "14px",
            textDecoration: "none",
          }}
        >
          <MicrosoftStoreIcon size={36} color={WHITE} />
          <span style={{ fontSize: "24px", fontWeight: 700, color: WHITE }}>
            Unduh Menuru
          </span>
        </a>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
          <span
            ref={titleRef}
            style={{
              fontSize: "600px",
              color: WHITE,
              letterSpacing: "-0.05em",
              lineHeight: "0.85",
              display: "block",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            Farid
          </span>
          <span style={{ display: "inline-block", lineHeight: "0.85" }}>
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
                marginLeft: "4px",
                pointerEvents: "none",
              }}
            >
              A
            </span>
          </span>
        </div>
        <span
          style={{
            fontSize: "16px",
            color: WHITE,
            opacity: 0.9,
            marginTop: "10px",
            display: "block",
          }}
        >
          2024 - 2026 Menuru. All rights reserved.
        </span>
      </div>
    </div>
  );
};

const CookiesPopup = ({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) => (
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
    }}
  >
    <p
      style={{
        flex: "1 1 320px",
        margin: 0,
        fontSize: "15px",
        color: BLACK,
        lineHeight: 1.6,
      }}
    >
      We use cookies to improve your experience on this website. By continuing,
      you agree to the use of cookies in accordance with our{" "}
      <a
        href={PRIVACY_POLICY_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: BLUE, fontWeight: 700, textDecoration: "underline" }}
      >
        Privacy Policy
      </a>
      .
    </p>
    <div style={{ display: "flex", gap: "12px" }}>
      <button
        onClick={onDecline}
        style={{
          padding: "10px 20px",
          backgroundColor: "transparent",
          color: BLUE,
          border: `1.5px solid ${BLUE}`,
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
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
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Accept
      </button>
    </div>
  </div>
);

export default function AboutPage() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonBgRef = useRef<HTMLDivElement>(null);
  const panelBgRef = useRef<HTMLDivElement>(null);
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLSpanElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [expandOpen, setExpandOpen] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const consent = localStorage.getItem("cookies-consent");
      if (!consent) setTimeout(() => setShowCookies(true), 1500);
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

  // Preloader animation
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
      {
        xPercent: 0,
        opacity: 1,
        duration: 2.2,
        ease: "power2.out",
        stagger: 0,
      },
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

  // Menu overlay animation
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
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
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
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );
    }
  }, [menuOpen]);

  // Bottom Expand Panel animation
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
      if (panelInner)
        gsap.to(panelInner, {
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        });
      if (plusIcon)
        gsap.to(plusIcon, {
          rotation: 45,
          duration: 0.5,
          ease: "power3.out",
        });
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
      if (panelInner)
        gsap.to(panelInner, { opacity: 0, duration: 0.3, ease: "power2.in" });
      if (plusIcon)
        gsap.to(plusIcon, {
          rotation: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
    }
  }, [expandOpen]);

  const navFontSize = "50px";

  return (
    <>
      {/* PRELOADER */}
      <div
        ref={preloaderRef}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: WHITE,
          zIndex: 999999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          overflow: "hidden",
          fontFamily: FONT_FAMILY,
          padding: "20px",
        }}
      >
        <span
          ref={leftTextRef}
          style={{
            fontSize: "90px",
            color: BLUE,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          Farid
        </span>
        <span
          ref={rightTextRef}
          style={{
            fontSize: "90px",
            color: BLUE,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          By Founder And Developer Menuru
        </span>
      </div>

      {/* TOP BANNER (Tanpa teks pesan, latar belakang biru penuh) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: BLUE,
          color: WHITE,
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "14px",
          fontFamily: FONT_FAMILY,
          zIndex: 10000,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflow: "hidden",
            maxWidth: "60%",
          }}
        >
          {/* Teks pesan dihapus */}
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "nowrap",
            justifyContent: "flex-end",
            fontSize: "13px",
          }}
        >
          <span style={{ color: WHITE, fontWeight: 600, opacity: 0.8 }}>Bersponsor</span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Kunjungi website{" "}
            <a
              href="https://menuru-studio.netlify.app/notes"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: WHITE,
                textDecoration: "none",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              Menuru
              <InstagramVerifiedBadge size={14} isOnBlueBackground={true} />
            </a>
          </span>
        </span>
      </div>

      {/* HEADER NAV LINK / BRAND */}
      {preloaderDone && (
        <>
          <Link
            href="/"
            style={{
              position: "fixed",
              top: "60px",
              left: "40px",
              zIndex: 100001,
              fontFamily: FONT_FAMILY,
              textDecoration: "none",
              color: menuOpen ? WHITE : BLUE,
              transition: "color 0.3s ease",
            }}
          >
            <span
              style={{ fontSize: navFontSize, fontWeight: 400, lineHeight: 1 }}
            >
              Farid Ardiansyah
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              position: "fixed",
              top: "60px",
              right: "40px",
              zIndex: 100001,
              backgroundColor: "transparent",
              color: menuOpen ? WHITE : BLUE,
              border: "none",
              padding: 0,
              fontSize: navFontSize,
              fontWeight: 400,
              fontFamily: FONT_FAMILY,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            <span ref={menuLabelRef} style={{ display: "inline-block" }}>
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </>
      )}

      {/* OVERLAY MENU */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: BLUE,
          zIndex: 100000,
          display: "none",
          clipPath: "inset(0 0 100% 0)",
        }}
      />

      {/* DESKTOP NAV LINKS */}
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
              fontFamily: FONT_FAMILY,
              color: menuOpen ? WHITE : BLUE,
            }}
          >
            {[
              { label: "Work", href: "/work" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Post", href: "/post" },
            ].map((txt) => (
              <Link
                key={txt.label}
                href={txt.href}
                style={{
                  fontSize: navFontSize,
                  fontWeight: 400,
                  textTransform: "capitalize",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {txt.label}
              </Link>
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
              fontFamily: FONT_FAMILY,
              color: menuOpen ? WHITE : BLUE,
            }}
          >
            <Link
              href="/messages"
              style={{
                fontSize: navFontSize,
                fontWeight: 400,
                textTransform: "capitalize",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Messages
            </Link>
          </div>
        </>
      )}

      {/* MAIN CONTENT ABOUT */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: WHITE,
          fontFamily: FONT_FAMILY,
          padding: "200px 0 0",
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
            maxWidth: "1600px",
            margin: 0,
            width: "100%",
            marginBottom: "200px",
          }}
        >
          {/* TEKS ABOUT 450PX NORMAL (TANPA TEBAL) */}
          <span
            style={{
              fontSize: "450px",
              fontWeight: 400,
              color: BLUE,
              letterSpacing: "-0.05em",
              lineHeight: "0.85",
              display: "block",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            About
          </span>

          {/* BAGIAN INTRO & EXPERIENCE */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              marginTop: "24px",
              gap: "40px",
              flexWrap: "wrap",
            }}
          >
            {/* SISI KIRI: (Introduction) & Nickname */}
            <div style={{ flex: "1 1 500px", maxWidth: "700px" }}>
              <span
                style={{
                  fontSize: "50px",
                  fontWeight: 400,
                  color: BLUE,
                  lineHeight: 1.1,
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                (Introduction)
              </span>
              <p
                style={{
                  fontSize: "36px",
                  fontWeight: 400,
                  color: BLUE,
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                nickname{" "}
                <mark
                  style={{
                    backgroundColor: HIGHLIGHT_YELLOW,
                    color: BLUE,
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  Farid
                </mark>{" "}
                -{" "}
                <mark
                  style={{
                    backgroundColor: HIGHLIGHT_GREEN,
                    color: BLUE,
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  Developer
                </mark>{" "}
                and{" "}
                <mark
                  style={{
                    backgroundColor: HIGHLIGHT_CYAN,
                    color: BLUE,
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  Founder The Menuru Studio
                </mark>
                .
              </p>
            </div>

            {/* SISI KANAN: (Experience), 2024 - Now & Menuru Studio dengan Timeline Garis Patah-patah & Titik */}
            <div style={{ flex: "1 1 500px", maxWidth: "700px", position: "relative" }}>
              <span
                style={{
                  fontSize: "50px",
                  fontWeight: 400,
                  color: BLUE,
                  lineHeight: 1.1,
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                (Experience)
              </span>
              
              <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", position: "relative" }}>
                {/* Garis Patah-patah Lurus ke Bawah & Titik Bulat */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "8px" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: BLUE,
                      zIndex: 2,
                    }}
                  />
                  <div
                    style={{
                      width: "2px",
                      height: "80px",
                      borderLeft: `3px dashed ${BLUE}`,
                      marginTop: "4px",
                    }}
                  />
                </div>

                {/* Konten Experience */}
                <div>
                  <div
                    style={{
                      fontSize: "30px",
                      fontWeight: 700,
                      color: BLUE,
                      marginBottom: "6px",
                    }}
                  >
                    <mark
                      style={{
                        backgroundColor: HIGHLIGHT_PINK,
                        color: BLUE,
                        padding: "2px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      2024 - Now
                    </mark>
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: 400,
                      color: BLUE,
                    }}
                  >
                    Menuru Studio
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER SECTION SAMA SEPERTI CONTACT */}
        <FooterSection refreshKey="about" />
      </div>

      {/* COOKIES POPUP */}
      {showCookies && (
        <CookiesPopup
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
        />
      )}

      {/* FLOATING EXPANDABLE BUTTON DI BAGIAN BAWAH */}
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
          <div ref={wrapperRef} style={{ width: "100%", position: "relative" }}>
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
                backgroundColor: BLUE,
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
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  opacity: 0,
                  boxSizing: "border-box",
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: WHITE,
                      fontFamily: FONT_FAMILY,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Farid Ardiansyah
                    <InstagramVerifiedBadge size={16} isOnBlueBackground={true} />
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: WHITE,
                      fontFamily: FONT_FAMILY,
                    }}
                  >
                    Menuru
                  </span>
                </div>
              </div>
            </div>
            <div
              ref={buttonBgRef}
              style={{
                width: "100%",
                height: "64px",
                backgroundColor: BLUE,
                borderRadius: expandOpen ? "0px 0px 20px 20px" : "20px",
                boxShadow: "0 8px 32px rgba(13,60,252,0.35)",
                border: `2px solid ${BLUE}`,
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
                  color: WHITE,
                  fontFamily: FONT_FAMILY,
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  flex: 1,
                }}
              >
                Farid Ardiansyah
                <InstagramVerifiedBadge size={16} isOnBlueBackground={true} />
              </span>
              
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: WHITE,
                  fontFamily: FONT_FAMILY,
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                  marginRight: "12px",
                }}
              >
                Menuru
              </span>

              <button
                onClick={() => setExpandOpen((v) => !v)}
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
                    color: WHITE,
                  }}
                >
                  +
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Archivo+Black&family=Anton&display=swap');
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
        .footer-farid-char,
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
