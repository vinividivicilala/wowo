"use client";

import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: "100px 40px 40px 40px",
        boxSizing: "border-box",
      }}
    >
      {/* Posisi di bawah navbar, di sisi kiri */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "20px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Card melengkung putih berisi teks */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "3px solid #0D3CFC",
            borderRadius: "32px 8px 32px 32px",
            padding: "40px 50px",
            boxShadow: "0 12px 40px rgba(13, 60, 252, 0.18)",
            display: "inline-block",
            maxWidth: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "150px",
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              margin: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#0D3CFC",
            }}
          >
            {/* Baris 1 */}
            <span
              style={{
                display: "block",
                color: "#0D3CFC",
              }}
            >
              Founder and Developer Brand
            </span>

            {/* Baris 2 — Menuru dengan bg biru */}
            <span
              style={{
                display: "block",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#0D3CFC",
                  color: "#FFFFFF",
                  padding: "0 20px",
                  borderRadius: "16px",
                  display: "inline-block",
                }}
              >
                Menuru
              </span>
              <span style={{ color: "#0D3CFC" }}> , Based IN INDONESIA.</span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
