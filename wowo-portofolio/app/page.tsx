"use client";

import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: "120px 40px 40px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        {/* Angka 01 di kiri */}
        <div
          style={{
            fontSize: "200px",
            fontWeight: 400,
            color: "#0D3CFC",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            paddingTop: "10px",
            flexShrink: 0,
            marginRight: "40px",
          }}
        >
          01
        </div>

        {/* Konten teks 2 baris */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            maxWidth: "1400px",
            flex: 1,
          }}
        >
          {/* Baris 1 — teks biasa */}
          <span
            style={{
              fontSize: "150px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              lineHeight: "1.1",
              color: "#0D3CFC",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              display: "block",
              wordBreak: "break-word",
            }}
          >
            Founder and Developer Brand
          </span>

          {/* Baris 2 — hanya "Menuru" yang di-card melengkung, sisanya teks biasa */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Menuru: bg biru + card melengkung + teks biru */}
            <span
              style={{
                backgroundColor: "#0D3CFC",
                padding: "8px 28px",
                borderRadius: "24px 4px 24px 24px",
                display: "inline-block",
                boxShadow: "0 6px 20px rgba(13,60,252,0.25)",
              }}
            >
              <span
                style={{
                  fontSize: "150px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1",
                  color: "#0D3CFC",
                  backgroundColor: "#FFFFFF",
                  padding: "0 16px",
                  borderRadius: "16px",
                  display: "inline-block",
                }}
              >
                Menuru
              </span>
            </span>

            {/* Sisa teks biasa */}
            <span
              style={{
                fontSize: "150px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: "1.1",
                color: "#0D3CFC",
                fontWeight: 400,
                letterSpacing: "-0.04em",
              }}
            >
              , Based IN INDONESIA.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
