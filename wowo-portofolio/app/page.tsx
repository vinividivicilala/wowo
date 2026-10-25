"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);

  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const bgPanelRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLSpanElement>(null);
  const bgPanelContentRef = useRef<HTMLDivElement>(null);

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

  // ===== EXPAND BG PANEL FULL SCREEN DARI TOMBOL =====
  useEffect(() => {
    if (typeof window === "undefined") return;
    const panel = bgPanelRef.current;
    const plusIcon = plusIconRef.current;
    const content = bgPanelContentRef.current;
    if (!panel) return;

    if (expandOpen) {
      // Panel menutupi seluruh viewport, animasi dari tombol (bawah)
      gsap.set(panel, { display: "block" });

      gsap.fromTo(
        panel,
        {
          clipPath: "inset(100% 0% 0% 0%)", // mulai dari bawah (tertutup)
          opacity: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)", // buka penuh ke atas
          opacity: 1,
          duration: 0.9,
          ease: "power3.inOut",
        }
      );

      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: "power2.out" }
        );
      }

      if (plusIcon) gsap.to(plusIcon, { rotation: 45, duration: 0.5, ease: "power3.out" });
    } else {
      if (content) {
        gsap.to(content, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
      }
      gsap.to(panel, {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          if (panel) panel.style.display = "none";
        },
      });
      if (plusIcon) gsap.to(plusIcon, { rotation: 0, duration: 0.4, ease: "power3.inOut" });
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
          zIndex: 99999,
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

      {/* ===== JUDUL WEB ===== */}
      {preloaderDone && (
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
      )}

      {/* ===== TEKS MENU / CLOSE ===== */}
      {preloaderDone && (
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

      {/* ===== PANEL BG FULL SCREEN (muncul dari tombol) ===== */}
      <div
        ref={bgPanelRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#0D3CFC",
          zIndex: 99999,
          display: "none",
          overflow: "hidden",
          boxSizing: "border-box",
          clipPath: "inset(100% 0% 0% 0%)",
        }}
      >
        <div
          ref={bgPanelContentRef}
          style={{
            width: "100%",
            height: "100%",
            padding: "120px 80px 60px 80px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "40px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "#FFFFFF",
            overflowY: "auto",
          }}
        >
          {/* Konten atas */}
          <div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 400,
                opacity: 0.8,
                marginBottom: "12px",
                letterSpacing: "-0.01em",
              }}
            >
              Menu Panel
            </div>
            <div
              style={{
                fontSize: "90px",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                marginBottom: "40px",
              }}
            >
              Selamat Datang,
              <br />
              Farid Ardiansyah
            </div>

            {/* Menu list di dalam panel */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {["Home", "Notes", "About", "Portfolio", "Contact", "Say Hey"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setExpandOpen(false);
                    }}
                    style={{
                      fontSize: "60px",
                      fontWeight: 400,
                      color: "#FFFFFF",
                      textDecoration: "none",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      textTransform: "capitalize",
                      display: "inline-block",
                    }}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Footer panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              opacity: 0.85,
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: 400,
                letterSpacing: "0.01em",
              }}
            >
              Menuru — Founder And Developer Brand
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 400,
                opacity: 0.7,
              }}
            >
              Based In Indonesia · 2024 - 2026 Menuru. All rights reserved.
            </div>
          </div>
        </div>

        {/* Tombol close panel di kanan atas */}
        <button
          onClick={() => setExpandOpen(false)}
          aria-label="Tutup panel"
          style={{
            position: "absolute",
            top: "60px",
            right: "40px",
            zIndex: 100002,
            backgroundColor: "transparent",
            border: "none",
            color: "#FFFFFF",
            fontSize: "70px",
            fontWeight: 400,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "-0.03em",
            cursor: "pointer",
            lineHeight: 1,
            textTransform: "capitalize",
            padding: 0,
          }}
        >
          Close
        </button>
      </div>

      {/* ===== KONTEN UTAMA ===== */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: "160px 40px 20px 40px",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Konten atas */}
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

        {/* ===== TOMBOL BG DI PALING BAWAH ===== */}
        <div
          style={{
            width: "100%",
            maxWidth: "520px",
            margin: "0 auto",
            marginTop: "auto",
            paddingTop: "160px",
            display: "flex",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          {/* TOMBOL UTAMA - DIAM */}
          <div
            style={{
              width: "100%",
              height: "64px",
              backgroundColor: "#0D3CFC",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(13,60,252,0.35)",
              border: "2px solid #0D3CFC",
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              position: "relative",
              zIndex: 2,
              boxSizing: "border-box",
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
      `}</style>
    </>
  );
}
