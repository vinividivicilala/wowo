"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

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
    if (!overlay || !label || !items) return;

    const itemEls = items.querySelectorAll(".menu-item");

    if (menuOpen) {
      // === OPEN MENU ===
      gsap.set(overlay, { display: "flex" });

      const tl = gsap.timeline();

      // Overlay biru muncul dari kanan (clip-path reveal) dengan easing smooth
      tl.fromTo(
        overlay,
        {
          clipPath: "circle(0% at 100% 0%)",
          opacity: 0,
        },
        {
          clipPath: "circle(150% at 100% 0%)",
          opacity: 1,
          duration: 1.1,
          ease: "power3.inOut",
        }
      )
        // Menu item muncul stagger dari kanan
        .fromTo(
          itemEls,
          { x: 120, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.4"
        )
        // Teks label tombol berubah jadi "Close" dengan fade+scale
        .fromTo(
          label,
          { opacity: 0, y: 20, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.5"
        );
    } else {
      // === CLOSE MENU ===
      const tl = gsap.timeline();

      tl.to(itemEls, {
        x: 120,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.06,
      })
        .to(
          overlay,
          {
            clipPath: "circle(0% at 100% 0%)",
            opacity: 0,
            duration: 0.9,
            ease: "power3.inOut",
            onComplete: () => {
              if (overlay) overlay.style.display = "none";
            },
          },
          "-=0.2"
        )
        // Label kembali ke "Menu"
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

      {/* ===== TOMBOL MENU / CLOSE DI SISI KANAN ===== */}
      <button
        ref={menuButtonRef}
        onClick={() => setMenuOpen((prev) => !prev)}
        style={{
          position: "fixed",
          top: "60px",
          right: "40px",
          zIndex: 100000,
          backgroundColor: "#0D3CFC",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "2px 24px 24px 2px",
          padding: "14px 28px",
          fontSize: "20px",
          fontWeight: 400,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: "-0.02em",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(13,60,252,0.35)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "140px",
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
          justifyContent: "center",
          padding: "0 80px",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          clipPath: "circle(0% at 100% 0%)",
        }}
      >
        <div
          ref={menuItemsRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          {[
            "Home",
            "Notes",
            "About",
            "Portfolio",
            "Contact",
            "Say Hey",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="menu-item"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
              }}
              style={{
                fontSize: "90px",
                fontWeight: 400,
                color: "#FFFFFF",
                textDecoration: "none",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                display: "inline-block",
                willChange: "transform, opacity",
              }}
            >
              {item}
            </a>
          ))}
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

            <span
              style={{
                backgroundColor: "#0D3CFC",
                padding: "8px 32px",
                borderRadius: "2px 28px 28px 2px",
                display: "inline-block",
                boxShadow: "0 6px 20px rgba(13,60,252,0.35)",
              }}
            >
              <span
                style={{
                  fontSize: "50px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: "1.1",
                  color: "#FFFFFF",
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
