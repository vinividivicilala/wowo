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
const BLUE = "#0D3CFC";
const WHITE = "#FFFFFF";
const RED = "#DC2626";

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

// ===== MICROSOFT STORE ICON — MINIMALIST SVG =====
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

// ===== FOOTER SECTION =====
const FooterSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!titleRef.current || !containerRef.current) return;
    const title = titleRef.current;
    let split: any = null;
    let ctx: any = null;

    const setup = () => {
      split = new SplitText(title, {
        type: "chars",
        charsClass: "footer-farid-char",
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
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        // Animasi untuk huruf "A" graffiti
        if (aRef.current) {
          gsap.set(aRef.current, {
            scale: 0.2,
            opacity: 0,
            rotation: -45,
            transformOrigin: "50% 50%",
          });
          gsap.to(aRef.current, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "top 40%",
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
    };
  }, []);

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
      {/* Tombol Download for Windows */}
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

      {/* Terms */}
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

      {/* Tombol Unduh Menuru — biru, icon minimalist */}
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

      {/* Teks besar Farid + A graffiti */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "20px",
            flexWrap: "wrap",
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

          {/* A graffiti bubble tebal minimalist */}
          <span
            ref={aRef}
            style={{
              fontFamily:
                "'Arial Black', 'Helvetica Black', Impact, sans-serif",
              fontSize: "600px",
              fontWeight: 900,
              color: WHITE,
              lineHeight: "0.85",
              display: "inline-block",
              letterSpacing: "-0.08em",
              WebkitTextStroke: `12px ${WHITE}`,
              WebkitTextFillColor: RED,
              paintOrder: "stroke fill",
              textShadow: `
                8px 8px 0 ${WHITE},
                -8px -8px 0 ${WHITE},
                8px -8px 0 ${WHITE},
                -8px 8px 0 ${WHITE},
                0 16px 32px rgba(0,0,0,0.25)
              `,
              willChange: "transform, opacity",
              pointerEvents: "none",
              transform: "rotate(-8deg)",
              marginLeft: "20px",
            }}
          >
            A
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

  // ===== PRELOADER =====
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

  // ===== MENU OPEN / CLOSE =====
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

  // ===== EXPAND PANEL =====
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

  // ===== NAVBAR FONT SIZE =====
  const navFontSize = "50px";

  return (
    <>
      {/* ===== PRELOADER ===== */}
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
      </div>

      {/* ===== NAVBAR (selalu di atas overlay) ===== */}
      {preloaderDone && (
        <>
          {/* Judul kiri */}
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

          {/* Teks tengah: Work, About, Contact, Post */}
          <div
            style={{
              position: "fixed",
              top: "60px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100001,
              display: "flex",
              alignItems: "center",
              gap: "40px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              pointerEvents: "auto",
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
              Work
            </a>
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
              About
            </a>
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
              Contact
            </a>
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
              Post
            </a>
          </div>

          {/* Kanan: Messages + Menu */}
          <div
            style={{
              position: "fixed",
              top: "60px",
              right: "40px",
              zIndex: 100001,
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
            <button
              ref={menuButtonRef}
              onClick={() => setMenuOpen((prev) => !prev)}
              style={{
                backgroundColor: "transparent",
                color: "inherit",
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
          </div>
        </>
      )}

      {/* ===== OVERLAY MENU BIRU (di bawah navbar & tombol BG) ===== */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#0D3CFC",
          zIndex: 99990,
          display: "none",
          clipPath: "inset(0 0 100% 0)",
        }}
      />

      {/* ===== KONTEN UTAMA ===== */}
      <div
        style={{
          minHeight: "200vh",
          backgroundColor: "#FFFFFF",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: "200px 0 0 0",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        {/* Konten atas */}
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
          }}
        >
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
                backgroundColor: "#0D3CFC",
                padding: "10px 28px",
                borderRadius: "6px 28px 28px 28px",
                display: "inline-block",
                boxShadow: "0 8px 24px rgba(13,60,252,0.35)",
                border: "2px solid #0D3CFC",
              }}
            >
              <span
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "6px 22px",
                  borderRadius: "24px 4px 24px 24px",
                  display: "inline-block",
                  fontSize: "50px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: "1.1",
                  color: "#0D3CFC",
                  textTransform: "capitalize",
                }}
              >
                Menuru
              </span>
            </span>
          </div>
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
        </div>

        {/* ===== FOOTER CARD — MENTOK PALING BAWAH ===== */}
        <FooterSection />
      </div>

      {/* ===== TOMBOL BG FIXED (di atas overlay, di luar menu) ===== */}
      {preloaderDone && (
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
            {/* PANEL BG — kosong, hanya transparan */}
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
                backgroundColor: "transparent",
                borderRadius: "20px 20px 0 0",
                zIndex: 1,
                boxSizing: "border-box",
                margin: 0,
              }}
            >
              <div
                ref={panelInnerRef}
                style={{
                  padding: "24px 24px 20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  color: "#FFFFFF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  opacity: 0,
                  boxSizing: "border-box",
                  height: "100%",
                  overflowY: "auto",
                }}
              />
            </div>

            {/* TOMBOL BG UTAMA */}
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

      {/* ===== HAPUS SCROLLBAR ===== */}
      <style jsx global>{`
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
      `}</style>
    </>
  );
}
