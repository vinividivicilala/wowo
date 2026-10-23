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

        {/* Container bg biru card note */}
        <div
          style={{
            backgroundColor: "#0D3CFC",
            borderRadius: "28px",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            boxShadow: "0 8px 32px rgba(13,60,252,0.25)",
            maxWidth: "1400px",
            flex: 1,
          }}
        >
          {/* Card putih isi teks 2 baris */}
          <div
            style={{
              padding: "18px 24px",
              backgroundColor: "#FFFFFF",
              border: "2px solid #FFFFFF",
              borderRadius: "6px 28px 28px 28px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
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
            <span
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  padding: "8px 28px",
                  backgroundColor: "#0D3CFC",
                  color: "#FFFFFF",
                  borderRadius: "24px 4px 24px 24px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "150px",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1",
                  display: "inline-block",
                }}
              >
                Menuru
              </span>
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
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
