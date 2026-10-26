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
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: RED,
        // 4 sisi melengkung — atas lebih besar (seperti bentuk teks Menuru)
        borderRadius: "60px 60px 32px 32px",
        padding: "40px 40px 40px 40px",
        boxSizing: "border-box",
        fontFamily: FONT_FAMILY,
        zIndex: 100000,
        overflow: "hidden",
        maxHeight: "60vh",
        overflowY: "auto",
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
          marginBottom: "20px",
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
            padding: "12px 20px",
            backgroundColor: WHITE,
            borderRadius: "12px",
            boxShadow: "0 6px 24px rgba(255,255,255,0.25)",
            transition: "transform 0.2s ease, boxShadow 0.2s ease",
            pointerEvents: "auto",
          }}
        >
          <WindowsIcon size={22} color={RED} />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "16px",
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

      {/* Tombol Unduh Menuru — biru, icon minimalist */}
      <div
        style={{
          marginTop: "16px",
          marginBottom: "16px",
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
            padding: "12px 20px",
            backgroundColor: BLUE,
            borderRadius: "14px",
            boxShadow: "0 6px 24px rgba(13,60,252,0.35)",
            transition: "transform 0.2s ease, boxShadow 0.2s ease",
            pointerEvents: "auto",
          }}
        >
          <MicrosoftStoreIcon size={30} color={WHITE} />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "20px",
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

      {/* Teks besar Farid */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <span
          ref={titleRef}
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: "320px",
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
            overflow: "hidden",
            position: "relative",
            pointerEvents: "none",
          }}
        >
          Farid
        </span>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "6px",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "14px",
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
        Website Ini Sedang Di Kembangkan
      </div>

      {/* ===== NAVBAR ===== */}
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
                fontSize: "70px",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                textTransform: "capitalize",
              }}
            >
              Farid Ardiansyah
            </span>
          </div>

          {/* Teks tengah: Work & About */}
          <div
            style={{
              position: "fixed",
              top: "60px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100001,
              display: "flex",
              alignItems: "center",
              gap: "48px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              pointerEvents: "auto",
              color: menuOpen ? "#FFFFFF" : "#0D3CFC",
              transition: "color 0.3s ease",
            }}
          >
            <a
              href="#"
              style={{
                fontSize: "70px",
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
                fontSize: "70px",
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
          </div>

          {/* Menu kanan */}
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
              fontSize: "70px",
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
              style={{ display: "inline-block", willChange: "transform, opacity" }}
            >
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </>
      )}

      {/* ===== OVERLAY MENU BIRU ===== */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#0D3CFC",
          zIndex: 99998,
          display: "none",
          clipPath: "inset(0 0 100% 0)",
        }}
      />

      {/* ===== KONTEN UTAMA ===== */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: "200px 40px 0 40px",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <div
          style={{
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

        {/* Spacer untuk memberi ruang footer fixed & tombol fixed */}
        <div style={{ height: "500px" }} />
      </div>

      {/* ===== FOOTER FIXED ===== */}
      {preloaderDone && <FooterSection />}

      {/* ===== TOMBOL BG FIXED — MUNCUL SETELAH PRELOADER ===== */}
      {preloaderDone && (
        <div
          style={{
            position: "fixed",
            bottom: "calc(100% - 80vh + 24px)", // di atas footer fixed
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
            {/* PANEL BG — muncul di atas tombol */}
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
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Panel Baru
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.6,
                    opacity: 0.9,
                    margin: 0,
                  }}
                >
                  Panel ini menyatu sempurna dengan tombol BG di bawahnya.
                  Tidak ada jarak, tidak terpisah.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginTop: "6px",
                  }}
                >
                  {["Home", "Notes", "About", "Portfolio"].map((it) => (
                    <span
                      key={it}
                      style={{
                        padding: "5px 12px",
                        backgroundColor: "#FFFFFF",
                        color: "#0D3CFC",
                        borderRadius: "14px",
                        fontSize: "11px",
                        fontWeight: 700,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
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
