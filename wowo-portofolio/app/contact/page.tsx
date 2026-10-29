"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyD_htQZ1TClnXKZGRJ4izbMQ02y6V3aNAQ",
  authDomain: "wawa44-58d1e.firebaseapp.com",
  databaseURL:
    "https://wawa44-58d1e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wawa44-58d1e",
  storageBucket: "wawa44-58d1e.firebasestorage.app",
  messagingSenderId: "836899520599",
  appId: "1:836899520599:web:b346e4370ecfa9bb89e312",
  measurementId: "G-8LMP7F4BE9",
};

let app: any = null;
let auth: any = null;
let db: any = null;

if (typeof window !== "undefined") {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
}

// ===== CONSTANTS =====
const FONT_FAMILY = "'Plus Jakarta Sans', sans-serif";
const BRUTAL_FONT =
  "'Bungee', 'Archivo Black', 'Anton', 'Impact', 'Arial Black', sans-serif";
const BLUE = "#0D3CFC";
const WHITE = "#FFFFFF";
const RED = "#DC2626";
const BLACK = "#000000";
const ADMIN_EMAIL = "faridardiansyah061@gmail.com";

const PRIVACY_POLICY_URL = "/privacy-policy";

// ===== VERIFIED BADGE (WHITE) =====
const VerifiedBadgeWhite = ({ size = 16 }: { size?: number }) => (
  <span
    style={{
      position: "relative",
      display: "inline-block",
      marginLeft: "4px",
      verticalAlign: "middle",
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        fill="#FFFFFF"
        d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
      />
    </svg>
  </span>
);

// ===== VERIFIED BADGE (BLUE) =====
const VerifiedBadgeBlue = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path
      fill="#0D3CFC"
      d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
    />
  </svg>
);

// ===== MICROSOFT STORE ICON =====
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

// ===== EMAIL INBOX ICON =====
const EmailInboxIcon = ({
  size = 20,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="1.8" />
    <path d="M2 7L12 13L22 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ===== FOOTER LINK DATA =====
const footerColumns = [
  {
    title: "Attention",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-services" },
      { label: "Cookies Policy", href: "/cookies-policy" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Work", href: "/work" },
      { label: "Messages", href: "/messages" },
      { label: "Post", href: "/post" },
    ],
  },
  {
    title: "Get in Touch",
    links: [{ label: "Contact", href: "/contact" }],
  },
];

// ===== FOOTER SECTION =====
const FooterSection = ({ refreshKey }: { refreshKey?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!titleRef.current || !containerRef.current) return;
    const title = titleRef.current;
    const aEl = aRef.current;
    let split: any = null;
    let splitA: any = null;
    let ctx: any = null;

    const setup = () => {
      split = new SplitText(title, {
        type: "chars",
        charsClass: "footer-farid-char",
      });

      if (aEl) {
        splitA = new SplitText(aEl, {
          type: "chars",
          charsClass: "footer-a-char",
        });
      }

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
            start: "top 95%",
            end: "top 45%",
            scrub: 1,
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        if (splitA && splitA.chars.length > 0) {
          gsap.set(splitA.chars, {
            yPercent: 100,
            opacity: 0,
            scale: 2.2,
            rotate: -12,
            transformOrigin: "50% 100%",
            force3D: true,
          });
          gsap.to(splitA.chars, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 95%",
              end: "top 45%",
              scrub: 1,
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          });
        }
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
      if (splitA && splitA.revert) splitA.revert();
    };
  }, [refreshKey]);

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
        width: "100%",
        margin: 0,
        backgroundColor: RED,
        borderRadius: "60px 60px 0 0",
        padding: "60px 40px 40px 40px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          {footerColumns.map((col) => (
            <div
              key={col.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                minWidth: "180px",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: "50px",
                  fontWeight: 400,
                  color: WHITE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {col.title}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: "50px",
                    fontWeight: 400,
                    color: WHITE,
                    textDecoration: "none",
                    opacity: 0.9,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

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
            padding: "14px 22px",
            backgroundColor: WHITE,
            borderRadius: "12px",
            boxShadow: "0 6px 24px rgba(255,255,255,0.25)",
            pointerEvents: "auto",
            flexShrink: 0,
          }}
        >
          <WindowsIcon size={24} color={RED} />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "18px",
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

      <div
        style={{
          marginTop: "40px",
          marginBottom: "24px",
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
            padding: "14px 22px",
            backgroundColor: BLUE,
            borderRadius: "14px",
            boxShadow: "0 6px 24px rgba(13,60,252,0.35)",
            pointerEvents: "auto",
          }}
        >
          <MicrosoftStoreIcon size={36} color={WHITE} />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "24px",
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

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "12px",
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <span
            ref={titleRef}
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "600px",
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
              overflow: "visible",
              position: "relative",
              pointerEvents: "none",
            }}
          >
            Farid
          </span>

          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              lineHeight: "0.85",
            }}
          >
            <span
              ref={aRef}
              style={{
                fontFamily: BRUTAL_FONT,
                fontSize: "600px",
                fontWeight: 900,
                color: WHITE,
                lineHeight: "0.85",
                display: "inline-block",
                letterSpacing: "-0.06em",
                textTransform: "uppercase",
                willChange: "transform, opacity",
                pointerEvents: "none",
                marginLeft: "4px",
              }}
            >
              A
            </span>
          </span>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "10px",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "16px",
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

// ===== COOKIES POPUP =====
const CookiesPopup = ({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 40px)",
        maxWidth: "720px",
        backgroundColor: WHITE,
        borderRadius: "20px",
        padding: "24px 28px",
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
        border: `1.5px solid ${BLUE}30`,
        zIndex: 100004,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        flexWrap: "wrap",
        boxSizing: "border-box",
        animation: "cookies-slide-up 0.4s ease-out",
      }}
    >
      <p
        style={{
          flex: "1 1 320px",
          margin: 0,
          fontSize: "15px",
          fontFamily: FONT_FAMILY,
          fontWeight: 400,
          color: BLACK,
          lineHeight: 1.6,
          letterSpacing: "-0.01em",
        }}
      >
        We use cookies to improve your experience on this website. By
        continuing, you agree to the use of cookies in accordance with our{" "}
        <a
          href={PRIVACY_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: BLUE,
            fontWeight: 700,
            textDecoration: "underline",
          }}
        >
          Privacy Policy
        </a>
        .
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onDecline}
          style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            color: BLUE,
            border: `1.5px solid ${BLUE}`,
            borderRadius: "10px",
            fontFamily: FONT_FAMILY,
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "-0.01em",
          }}
        >
          Decline
        </button>
        <button
          onClick={onAccept}
          style={{
            padding: "10px 20px",
            backgroundColor: BLUE,
            color: WHITE,
            border: `1.5px solid ${BLUE}`,
            borderRadius: "10px",
            fontFamily: FONT_FAMILY,
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "-0.01em",
            boxShadow: "0 4px 16px rgba(13,60,252,0.35)",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

// ===== FORMAT TIME AGO =====
function timeAgo(ts: any): string {
  if (!ts) return "0 detik lalu";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) return "baru saja";
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `${sec} detik lalu`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} menit lalu`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} jam lalu`;
  const day = Math.floor(hour / 24);
  if (day < 30) return `${day} hari lalu`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month} bulan lalu`;
  const year = Math.floor(month / 12);
  return `${year} tahun lalu`;
}

// ===== LIVE CHAT SECTION =====
const LiveChatSection = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  // Real-time listener dari Firestore
  useEffect(() => {
    if (typeof window === "undefined" || !db) return;
    const q = query(
      collection(db, "contactMessages"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snap: any) => {
        const list: any[] = [];
        snap.forEach((docSnap: any) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        setMessages(list);
        // Auto-select pesan terbaru jika belum ada
        setSelectedId((prev) => {
          if (prev && list.some((m) => m.id === prev)) return prev;
          return list.length > 0 ? list[0].id : null;
        });
      },
      (err: any) => console.error("Snapshot error:", err)
    );
    return () => unsub();
  }, []);

  // Update "time ago" tiap 30 detik
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  const selected = messages.find((m) => m.id === selectedId) || null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        maxWidth: "1400px",
        marginTop: "60px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 24px 64px rgba(13,60,252,0.2)",
        fontFamily: FONT_FAMILY,
        border: `1.5px solid ${BLUE}20`,
        minHeight: "600px",
        flexWrap: "wrap",
      }}
    >
      {/* ===== LEFT PANEL: LIST PESAN MASUK ===== */}
      <div
        style={{
          flex: "0 0 360px",
          minWidth: "280px",
          maxWidth: "100%",
          backgroundColor: BLUE,
          display: "flex",
          flexDirection: "column",
          borderRight: `1.5px solid ${BLUE}`,
        }}
      >
        {/* Header list */}
        <div
          style={{
            padding: "20px 24px",
            backgroundColor: BLUE,
            borderBottom: `1px solid rgba(255,255,255,0.18)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <EmailInboxIcon size={22} color={WHITE} />
            <span
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: WHITE,
                letterSpacing: "-0.01em",
              }}
            >
              Inbox
            </span>
          </div>
          <span
            style={{
              padding: "4px 12px",
              backgroundColor: WHITE,
              color: BLUE,
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {messages.length}
          </span>
        </div>

        {/* List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {messages.length === 0 ? (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                fontSize: "13px",
                color: WHITE,
                opacity: 0.65,
                fontStyle: "italic",
              }}
            >
              Belum ada pesan masuk.
            </div>
          ) : (
            messages.map((m) => {
              const isActive = m.id === selectedId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 14px",
                    backgroundColor: isActive
                      ? WHITE
                      : "rgba(255,255,255,0.08)",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  {/* Icon email masuk */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      backgroundColor: isActive ? `${BLUE}15` : WHITE,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <EmailInboxIcon size={18} color={BLUE} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: isActive ? BLUE : WHITE,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {m.name || "Unknown"}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: isActive ? BLUE : WHITE,
                        opacity: isActive ? 0.7 : 0.75,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginTop: "2px",
                      }}
                    >
                      {m.subject || m.email || "(no subject)"}
                    </div>
                  </div>

                  {/* Time */}
                  <span
                    style={{
                      fontSize: "10px",
                      color: isActive ? BLUE : WHITE,
                      opacity: isActive ? 0.6 : 0.7,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {timeAgo(m.createdAt)}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ===== RIGHT PANEL: DETAIL PESAN ===== */}
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          backgroundColor: WHITE,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!selected ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <EmailInboxIcon size={64} color={`${BLUE}40`} />
            <span
              style={{
                fontSize: "16px",
                color: BLUE,
                fontWeight: 600,
                opacity: 0.6,
              }}
            >
              Pilih pesan di sisi kiri untuk melihat detail
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "32px",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {/* Judul / Subject */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: BLUE,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  opacity: 0.7,
                }}
              >
                Subject
              </span>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                {selected.subject || "(no subject)"}
              </span>
            </div>

            {/* Nama pengirim + email */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                backgroundColor: `${BLUE}08`,
                border: `1.5px solid ${BLUE}15`,
                borderRadius: "14px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: BLUE,
                  color: WHITE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {(selected.name || "U").charAt(0).toUpperCase()}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: BLUE,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {selected.name || "Unknown"}
                  <VerifiedBadgeBlue size={16} />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: BLUE,
                    opacity: 0.75,
                    marginTop: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {selected.email || "no-email@example.com"}
                </div>
              </div>
            </div>

            {/* Tanggal (time ago) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: BLUE,
                opacity: 0.75,
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: BLUE,
                }}
              />
              Dikirim {timeAgo(selected.createdAt)}
            </div>

            {/* Deskripsi */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                paddingTop: "12px",
                borderTop: `1.5px solid ${BLUE}15`,
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: BLUE,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  opacity: 0.7,
                }}
              >
                Message
              </span>
              <div
                style={{
                  fontSize: "16px",
                  color: BLUE,
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  padding: "20px 22px",
                  backgroundColor: `${BLUE}05`,
                  border: `1.5px solid ${BLUE}15`,
                  borderRadius: "14px",
                  minHeight: "120px",
                }}
              >
                {selected.message || "(empty message)"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== CONTACT PAGE =====
export default function ContactPage() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);

  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonBgRef = useRef<HTMLDivElement>(null);
  const panelBgRef = useRef<HTMLDivElement>(null);
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLSpanElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [expandOpen, setExpandOpen] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const consent = localStorage.getItem("cookies-consent");
      if (!consent) {
        setTimeout(() => setShowCookies(true), 1500);
      }
    } catch {
      setShowCookies(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    try {
      localStorage.setItem("cookies-consent", "accepted");
    } catch {}
    setShowCookies(false);
  };

  const handleDeclineCookies = () => {
    try {
      localStorage.setItem("cookies-consent", "declined");
    } catch {}
    setShowCookies(false);
  };

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

  const navFontSize = "50px";

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
          fontFamily: FONT_FAMILY,
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <span
          ref={leftTextRef}
          style={{
            fontSize: "90px",
            fontWeight: 400,
            color: BLUE,
            fontFamily: FONT_FAMILY,
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
            color: BLUE,
            fontFamily: FONT_FAMILY,
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
          color: WHITE,
          padding: "10px 20px",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: FONT_FAMILY,
          letterSpacing: "0.02em",
          zIndex: 10000,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: BLACK,
              fontWeight: 400,
              fontSize: "14px",
              textTransform: "none",
              fontFamily: FONT_FAMILY,
            }}
          >
            Bersponsor
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            Kunjungi website{" "}
            <a
              href="https://menuru-studio.netlify.app/notes"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: WHITE,
                textDecoration: "none",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              Menuru
              <VerifiedBadgeWhite size={14} />
            </a>
          </span>
        </span>
      </div>

      {/* ===== NAVBAR ===== */}
      {preloaderDone && (
        <>
          <Link
            href="/"
            style={{
              position: "fixed",
              top: "60px",
              left: "40px",
              zIndex: 100001,
              display: "flex",
              alignItems: "center",
              fontFamily: FONT_FAMILY,
              textDecoration: "none",
              color: menuOpen ? WHITE : BLUE,
              transition: "color 0.3s ease",
            }}
          >
            <span
              style={{
                fontSize: navFontSize,
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                textTransform: "capitalize",
              }}
            >
              Farid Ardiansyah
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            style={{
              position: "fixed",
              top: "60px",
              right: "40px",
              zIndex: 100001,
              backgroundColor: "transparent",
              color: menuOpen ? WHITE : BLUE,
              border: "none",
              padding: 0,
              fontSize: navFontSize,
              fontWeight: 400,
              fontFamily: FONT_FAMILY,
              letterSpacing: "-0.03em",
              cursor: "pointer",
              textTransform: "capitalize",
              lineHeight: 1,
              transition: "color 0.3s ease",
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
        </>
      )}

      {/* ===== OVERLAY MENU ===== */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: BLUE,
          zIndex: 100000,
          display: "none",
          clipPath: "inset(0 0 100% 0)",
        }}
      />

      {/* ===== NAVBAR TENGAH & KANAN ===== */}
      {preloaderDone && (
        <>
          <div
            style={{
              position: "fixed",
              top: "60px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              gap: "40px",
              fontFamily: FONT_FAMILY,
              pointerEvents: "auto",
              color: menuOpen ? WHITE : BLUE,
              transition: "color 0.3s ease",
            }}
          >
            {[
              { label: "Work", href: "/work" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Post", href: "/post" },
            ].map((txt) => (
              <Link
                key={txt.label}
                href={txt.href}
                style={{
                  fontSize: navFontSize,
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  textTransform: "capitalize",
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {txt.label}
              </Link>
            ))}
          </div>

          <div
            style={{
              position: "fixed",
              top: "60px",
              right: "180px",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              gap: "40px",
              fontFamily: FONT_FAMILY,
              color: menuOpen ? WHITE : BLUE,
              transition: "color 0.3s ease",
            }}
          >
            <Link
              href="/messages"
              style={{
                fontSize: navFontSize,
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                textTransform: "capitalize",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Messages
            </Link>
          </div>
        </>
      )}

      {/* ===== KONTEN UTAMA CONTACT ===== */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          fontFamily: FONT_FAMILY,
          padding: "200px 0 0 0",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "0 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0px",
            maxWidth: "1600px",
            margin: "0",
            width: "100%",
            marginBottom: "200px",
          }}
        >
          {/* TEKS "Contact" 450px — tidak tebal */}
          <span
            style={{
              fontSize: "450px",
              fontFamily: FONT_FAMILY,
              fontWeight: 400,
              color: BLUE,
              letterSpacing: "-0.05em",
              lineHeight: "0.85",
              display: "block",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            Contact
          </span>

          {/* TEKS "Messages" 90px — di bawah Contact */}
          <span
            style={{
              fontSize: "90px",
              fontFamily: FONT_FAMILY,
              fontWeight: 400,
              color: BLUE,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              display: "block",
              marginTop: "16px",
            }}
          >
            Messages
          </span>

          {/* ===== LIVE CHAT (di bawah Messages) ===== */}
          <LiveChatSection />
        </div>

        {/* ===== FOOTER ===== */}
        <FooterSection refreshKey="contact" />
      </div>

      {/* ===== COOKIES POPUP ===== */}
      {showCookies && (
        <CookiesPopup
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
        />
      )}

      {/* ===== TOMBOL BG FIXED ===== */}
      {preloaderDone && !menuOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
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
            style={{ width: "100%", position: "relative" }}
          >
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
                backgroundColor: BLUE,
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
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  opacity: 0,
                  boxSizing: "border-box",
                  height: "100%",
                  overflowY: "auto",
                }}
              />
            </div>

            <div
              ref={buttonBgRef}
              style={{
                width: "100%",
                height: "64px",
                backgroundColor: BLUE,
                borderRadius: expandOpen ? "0px 0px 20px 20px" : "20px",
                boxShadow: "0 8px 32px rgba(13,60,252,0.35)",
                border: `2px solid ${BLUE}`,
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
                  color: WHITE,
                  fontFamily: FONT_FAMILY,
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
                    color: WHITE,
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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Archivo+Black&family=Anton&display=swap');

        @keyframes cookies-slide-up {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

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
        .footer-a-char {
          display: inline-block;
          will-change: transform, opacity;
          color: #ffffff !important;
          transform-origin: 50% 100%;
        }
      `}</style>
    </>
  );
}
