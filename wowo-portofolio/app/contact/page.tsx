"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { motion, AnimatePresence } from "framer-motion";
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
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

// ===== VERIFIED BADGE WHITE =====
const VerifiedBadgeWhite = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path
      fill="#FFFFFF"
      d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
    />
  </svg>
);

// ===== VERIFIED BADGE BLUE =====
const VerifiedBadgeBlue = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
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
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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

// ===== EMAIL ICON (closed & opened) — untuk animasi Framer Motion =====
const EmailIcon = ({
  size = 22,
  color = "#0D3CFC",
  open = false,
}: {
  size?: number;
  color?: string;
  open?: boolean;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Body amplop */}
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
      stroke={color}
      strokeWidth="1.8"
    />
    {/* Flap — animasi buka/tutup */}
    <motion.path
      d={open ? "M2 5L12 2L22 5" : "M2 7L12 13L22 7"}
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={{ d: open ? "M2 5L12 2L22 5" : "M2 7L12 13L22 7" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
    {open && (
      <motion.path
        d="M2 5L12 10L22 5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      />
    )}
  </svg>
);

// ===== GOOGLE LOGO =====
const GoogleLogo = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

// ===== SEND ICON =====
const SendIcon = ({
  size = 18,
  color = "#ffffff",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M22 2L11 13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ===== TIME AGO =====
function timeAgo(ts: any): string {
  if (!ts) return "0 detik lalu";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diffMs = Date.now() - date.getTime();
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
  return `${Math.floor(month / 12)} tahun lalu`;
}

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
}) => (
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
    }}
  >
    <p
      style={{
        flex: "1 1 320px",
        margin: 0,
        fontSize: "15px",
        color: BLACK,
        lineHeight: 1.6,
      }}
    >
      We use cookies to improve your experience on this website. By continuing,
      you agree to the use of cookies in accordance with our{" "}
      <a
        href={PRIVACY_POLICY_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: BLUE, fontWeight: 700, textDecoration: "underline" }}
      >
        Privacy Policy
      </a>
      .
    </p>
    <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
      <button
        onClick={onDecline}
        style={{
          padding: "10px 20px",
          backgroundColor: "transparent",
          color: BLUE,
          border: `1.5px solid ${BLUE}`,
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: FONT_FAMILY,
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
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: FONT_FAMILY,
          boxShadow: "0 4px 16px rgba(13,60,252,0.35)",
        }}
      >
        Accept
      </button>
    </div>
  </div>
);

// ===== LIVE CHAT SECTION =====
const LiveChatSection = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nowTick, setNowTick] = useState(0);

  const [user, setUser] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false);

  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const detailRef = useRef<HTMLDivElement>(null);

  // ==== AUTH LISTENER ====
  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // ==== FIRESTORE LISTENER (REAL-TIME) ====
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
        snap.forEach((d: any) => list.push({ id: d.id, ...d.data() }));
        setMessages(list);
        setSelectedId((prev) => {
          if (prev && list.some((m) => m.id === prev)) return prev;
          return list.length > 0 ? list[0].id : null;
        });
      },
      (err: any) => console.error("Snapshot:", err)
    );
    return () => unsub();
  }, []);

  // ==== TIME AGO TICK ====
  useEffect(() => {
    const int = setInterval(() => setNowTick((t) => t + 1), 30000);
    return () => clearInterval(int);
  }, []);

  // ==== GSAP: ANIMASI DETAIL PANEL SAAT PESAN DIPILIH ====
  useEffect(() => {
    if (!detailRef.current || !selectedId) return;
    gsap.fromTo(
      detailRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
    );
  }, [selectedId]);

  // ==== GSAP: ANIMASI COMPOSE PANEL ====
  const composeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!composeRef.current) return;
    if (showCompose) {
      gsap.fromTo(
        composeRef.current,
        { opacity: 0, height: 0 },
        { opacity: 1, height: "auto", duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(composeRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [showCompose]);

  // ==== LOGIN GOOGLE ====
  const handleGoogleSignIn = async () => {
    if (!auth) return;
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Google sign-in error:", e);
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Sign out error:", e);
    }
  };

  // ==== KIRIM PESAN ====
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !user) return;
    if (!formSubject.trim() || !formMessage.trim()) {
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      await addDoc(collection(db, "contactMessages"), {
        name: user.displayName || user.email?.split("@")[0] || "User",
        email: user.email || "",
        photoURL: user.photoURL || "",
        subject: formSubject.trim(),
        message: formMessage.trim(),
        to: ADMIN_EMAIL,
        from: user.email || "",
        status: "sent",
        createdAt: serverTimestamp(),
      });
      setFormSubject("");
      setFormMessage("");
      setSubmitStatus("success");
      setShowCompose(false);
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selected = messages.find((m) => m.id === selectedId) || null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "1400px",
        marginTop: "60px",
        gap: "20px",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* ===== TOP BAR: Kirim Pesan + Login ===== */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setShowCompose((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 24px",
            backgroundColor: BLUE,
            color: WHITE,
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: FONT_FAMILY,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(13,60,252,0.35)",
          }}
        >
          <SendIcon size={18} color={WHITE} />
          Kirim Pesan
        </button>

        {/* Login status */}
        {!user ? (
          <button
            onClick={handleGoogleSignIn}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 22px",
              backgroundColor: WHITE,
              color: BLACK,
              border: `1.5px solid ${BLUE}30`,
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: FONT_FAMILY,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <GoogleLogo size={20} />
            Sign in with Google
          </button>
        ) : (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 16px 8px 8px",
              backgroundColor: WHITE,
              border: `1.5px solid ${BLUE}30`,
              borderRadius: "999px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: BLUE,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span
                  style={{
                    color: WHITE,
                    fontSize: "14px",
                    fontWeight: 800,
                  }}
                >
                  {(user.displayName || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: BLUE,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "160px",
                }}
              >
                {user.displayName || user.email?.split("@")[0]}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: BLUE,
                  opacity: 0.7,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "160px",
                }}
              >
                {user.email}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                marginLeft: "8px",
                padding: "6px 12px",
                backgroundColor: "transparent",
                color: BLUE,
                border: `1.5px solid ${BLUE}`,
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: FONT_FAMILY,
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* ===== COMPOSE PANEL (klik "Kirim Pesan") ===== */}
      <AnimatePresence>
        {showCompose && (
          <motion.div
            ref={composeRef as any}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              borderRadius: "20px",
              backgroundColor: WHITE,
              border: `1.5px solid ${BLUE}25`,
              boxShadow: "0 16px 48px rgba(13,60,252,0.15)",
            }}
          >
            <div
              style={{
                backgroundColor: BLUE,
                padding: "18px 28px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <SendIcon size={20} color={WHITE} />
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: WHITE,
                }}
              >
                New Message
              </span>
            </div>

            {!user ? (
              <div
                style={{
                  padding: "40px 28px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    color: BLUE,
                    fontWeight: 600,
                  }}
                >
                  Sign in with Google first to send a message.
                </span>
                <button
                  onClick={handleGoogleSignIn}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 22px",
                    backgroundColor: BLUE,
                    color: WHITE,
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <GoogleLogo size={20} />
                  Sign in with Google
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSend}
                style={{
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 16px",
                    backgroundColor: `${BLUE}08`,
                    border: `1.5px solid ${BLUE}15`,
                    borderRadius: "12px",
                    fontSize: "13px",
                    color: BLUE,
                    fontWeight: 600,
                  }}
                >
                  <span>To:</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {ADMIN_EMAIL}
                    <VerifiedBadgeBlue size={14} />
                  </span>
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    fontSize: "15px",
                    fontFamily: FONT_FAMILY,
                    color: BLUE,
                    backgroundColor: `${BLUE}05`,
                    border: `1.5px solid ${BLUE}20`,
                    borderRadius: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />

                <textarea
                  placeholder="Write your message..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    fontSize: "15px",
                    fontFamily: FONT_FAMILY,
                    color: BLUE,
                    backgroundColor: `${BLUE}05`,
                    border: `1.5px solid ${BLUE}20`,
                    borderRadius: "12px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />

                {submitStatus === "success" && (
                  <div
                    style={{
                      padding: "12px 18px",
                      backgroundColor: "#DCFCE7",
                      color: "#065F46",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Pesan berhasil dikirim.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div
                    style={{
                      padding: "12px 18px",
                      backgroundColor: "#FEE2E2",
                      color: "#991B1B",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Gagal. Pastikan semua field terisi.
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setShowCompose(false)}
                    style={{
                      padding: "12px 22px",
                      backgroundColor: "transparent",
                      color: BLUE,
                      border: `1.5px solid ${BLUE}`,
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      backgroundColor: isSubmitting ? "#94A3B8" : BLUE,
                      color: WHITE,
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    <SendIcon size={16} color={WHITE} />
                    {isSubmitting ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN: KIRI (list) + KANAN (detail) ===== */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(13,60,252,0.22)",
          border: `1.5px solid ${BLUE}20`,
          minHeight: "720px",
          flexWrap: "wrap",
        }}
      >
        {/* ===== LEFT PANEL: LIST ===== */}
        <div
          style={{
            flex: "0 0 420px",
            minWidth: "300px",
            maxWidth: "100%",
            backgroundColor: BLUE,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid rgba(255,255,255,0.18)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <EmailIcon size={24} color={WHITE} open={false} />
              <span
                style={{
                  fontSize: "18px",
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

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  padding: "48px 20px",
                  textAlign: "center",
                  fontSize: "14px",
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
                  <motion.button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "14px",
                      padding: "16px 18px",
                      backgroundColor: isActive
                        ? WHITE
                        : "rgba(255,255,255,0.08)",
                      border: isActive
                        ? `1.5px solid ${BLUE}30`
                        : "1.5px solid transparent",
                      borderRadius: "14px",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {/* ICON EMAIL — animasi buka/tutup via Framer Motion */}
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        backgroundColor: isActive
                          ? `${BLUE}15`
                          : "rgba(255,255,255,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <EmailIcon size={22} color={BLUE} open={isActive} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "15px",
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
                          fontSize: "13px",
                          color: isActive ? BLUE : WHITE,
                          opacity: isActive ? 0.75 : 0.8,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          marginTop: "2px",
                        }}
                      >
                        {m.subject || m.email || "(no subject)"}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: "11px",
                        color: isActive ? BLUE : WHITE,
                        opacity: isActive ? 0.65 : 0.75,
                        fontWeight: 600,
                        flexShrink: 0,
                        textAlign: "right",
                      }}
                    >
                      {timeAgo(m.createdAt)}
                    </span>
                  </motion.button>
                );
              })
            )}
          </div>
        </div>

        {/* ===== RIGHT PANEL: DETAIL ===== */}
        <div
          ref={detailRef}
          style={{
            flex: 1,
            minWidth: "320px",
            backgroundColor: WHITE,
            display: "flex",
            flexDirection: "column",
            borderLeft: `1.5px solid ${BLUE}15`,
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
                gap: "20px",
                padding: "60px 20px",
                textAlign: "center",
              }}
            >
              <EmailIcon size={80} color={`${BLUE}30`} open={false} />
              <span
                style={{
                  fontSize: "16px",
                  color: BLUE,
                  fontWeight: 600,
                  opacity: 0.55,
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
                gap: "24px",
                padding: "36px",
                overflowY: "auto",
                flex: 1,
              }}
            >
              {/* Subject */}
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
                    fontSize: "32px",
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

              {/* Pengirim */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "18px 22px",
                  backgroundColor: `${BLUE}08`,
                  border: `1.5px solid ${BLUE}15`,
                  borderRadius: "14px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: BLUE,
                    color: WHITE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: 800,
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  {selected.photoURL ? (
                    <img
                      src={selected.photoURL}
                      alt={selected.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    (selected.name || "U").charAt(0).toUpperCase()
                  )}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: BLUE,
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

              {/* Tanggal */}
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

              {/* Message */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  paddingTop: "16px",
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
                    lineHeight: 1.75,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    padding: "22px 24px",
                    backgroundColor: `${BLUE}05`,
                    border: `1.5px solid ${BLUE}15`,
                    borderRadius: "14px",
                    minHeight: "140px",
                  }}
                >
                  {selected.message || "(empty message)"}
                </div>
              </div>
            </div>
          )}
        </div>
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
      if (!consent) setTimeout(() => setShowCookies(true), 1500);
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

    return () => tl.kill();
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
      {/* PRELOADER */}
      <div
        ref={preloaderRef}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: WHITE,
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

      {/* BANNER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#0000EE",
          color: WHITE,
          padding: "10px 20px",
          textAlign: "center",
          fontSize: "14px",
          fontFamily: FONT_FAMILY,
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
          <span style={{ color: BLACK }}>Bersponsor</span>
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

      {/* NAVBAR */}
      {preloaderDone && (
        <>
          <Link
            href="/"
            style={{
              position: "fixed",
              top: "60px",
              left: "40px",
              zIndex: 100001,
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
        </>
      )}

      {/* OVERLAY MENU */}
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

      {/* NAVBAR CENTER & RIGHT */}
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

      {/* KONTEN */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: WHITE,
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
            maxWidth: "1600px",
            margin: 0,
            width: "100%",
            marginBottom: "200px",
          }}
        >
          <span
            style={{
              fontSize: "450px",
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

          <span
            style={{
              fontSize: "90px",
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

          <LiveChatSection />
        </div>

        <FooterSection refreshKey="contact" />
      </div>

      {/* COOKIES */}
      {showCookies && (
        <CookiesPopup
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
        />
      )}

      {/* TOMBOL BG FIXED */}
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
