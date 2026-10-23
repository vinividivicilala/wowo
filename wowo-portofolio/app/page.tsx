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
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "12px",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        {/* Baris teks 1 */}
        <span
          style={{
            fontSize: "150px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: "1.1",
            color: "#0D3CFC",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
          }}
        >
          Founder and Developer Brand
        </span>

        {/* Menuru: card melengkung hitam */}
        <span
          style={{
            backgroundColor: "#000000",
            padding: "8px 28px",
            borderRadius: "24px 4px 24px 24px",
            display: "inline-block",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
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
            whiteSpace: "nowrap",
          }}
        >
          , Based IN INDONESIA.
        </span>
      </div>
    </div>
  );
}
