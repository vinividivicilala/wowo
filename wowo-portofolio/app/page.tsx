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
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "16px",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        {/* Baris 1 — Founder and Developer Brand + Menuru card biru */}
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

          {/* Menuru: card biru melengkung, teks putih */}
          <span
            style={{
              backgroundColor: "#0D3CFC",
              padding: "8px 32px",
              borderRadius: "999px",
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
  );
}
