"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);

  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

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

  // ===== MENU OPEN / CLOSE ANIMATION =====
  useEffect(() => {
    if (typeof window === "undefined") return;
    const overlay = overlayRef.current;
    const label = menuLabelRef.current;
    const items = menuItemsRef.current;
    const button = menuButtonRef.current;
    if (!overlay || !label || !items || !button) return;

    const itemEls = items.querySelectorAll(".menu-item");

    if (menuOpen) {
      gsap.set(overlay, { display: "flex" });
      const btnRect = button.getBoundingClientRect();
      const startX = btnRect.left + btnRect.width / 2;
      const startY = btnRect.top + btnRect.height / 2;

      const tl = gsap.timeline();

      // Animasi awal dari ATAS ke BAWAH
      tl.fromTo(
        overlay,
        { clipPath: `inset(0 0 100% 0)`, opacity: 0 },
        {
          clipPath: `inset(0 0 0% 0)`,
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
        }
      )
        .fromTo(
          itemEls,
          { y: -40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.4"
        )
        .fromTo(
          label,
          { opacity: 0, y: 20, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.5"
        );
    } else {
      const tl = gsap.timeline();

      // Animasi close dari BAWAH ke ATAS
      tl.to(itemEls, {
        y: -40,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.06,
      })
        .to(
          overlay,
          {
            clipPath: `inset(0 0 100% 0)`,
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              if (overlay) overlay.style.display = "none";
            },
          },
          "-=0.2"
        )
        .fromTo(
          label,
          { opacity: 0, y: 20, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.4"
        );
    }
  }, [menuOpen]);

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

      {/* ===== BANNER #0000EE ===== */}
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

      {/* ===== JUDUL WEB "Farid Ardiansyah" DI KIRI NAVBAR ATAS ===== */}
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

      {/* ===== TEKS MENU / CLOSE - hanya muncul setelah preloader selesai ===== */}
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

      {/* ===== OVERLAY MENU BIRU FULL SCREEN ===== */}
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
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "160px 80px 40px 80px",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          clipPath: "inset(0 0 100% 0)",
        }}
      >
        <div
          ref={menuItemsRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            width: "100%",
          }}
        >
          {["Home", "Notes", "About", "Portfolio", "Contact", "Say Hey"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                }}
                style={{
                  fontSize: "70px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  display: "inline-block",
                  willChange: "transform, opacity",
                  textTransform: "capitalize",
                }}
              >
                {item}
              </a>
            )
          )}
        </div>
      </div>

      {/* ===== KONTEN UTAMA ===== */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: "160px 40px 40px 40px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "16px",
            maxWidth: "1600px",
            margin: "0 auto",
          }}
        >
          {/* Baris 1 */}
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

            {/* Card Menuru - design seperti hasil submit note */}
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

          {/* Baris 2 */}
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
