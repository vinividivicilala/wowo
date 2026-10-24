"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const preloader = preloaderRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    if (!preloader || !leftText || !rightText) return;

    // Posisi awal: teks kiri di luar kiri layar, teks kanan di luar kanan layar
    gsap.set(leftText, { xPercent: -150, opacity: 0 });
    gsap.set(rightText, { xPercent: 150, opacity: 0 });
    gsap.set(preloader, { opacity: 1, display: "flex" });

    const tl = gsap.timeline();

    // 1. Teks kiri & kanan masuk ke tengah bersamaan
    tl.to(leftText, {
      xPercent: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }).to(
      rightText,
      {
        xPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      },
      "<"
    )
      // 2. Tahan sebentar
      .to({}, { duration: 0.8 })
      // 3. Teks kiri keluar ke kiri & kanan keluar ke kanan bersamaan
      .to(leftText, {
        xPercent: -150,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
      })
      .to(
        rightText,
        {
          xPercent: 150,
          opacity: 0,
          duration: 1,
          ease: "power3.in",
        },
        "<"
      )
      // 4. Preloader hilang
      .to(preloader, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          if (preloader) preloader.style.display = "none";
        },
      });

    return () => {
      tl.kill();
    };
  }, []);

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

      {/* ===== BANNER #0000EE DI ATAS NAVBAR ===== */}
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
          {/* Baris 1 — Founder and Developer Brand + Menuru card biru melengkung tajam */}
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

            {/* Menuru: card biru melengkung tajam depan-belakang */}
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

          {/* Baris 2 — Based In Indonesia */}
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
