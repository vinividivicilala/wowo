"use client";

import { useEffect, useState, useRef, useMemo } from "react";
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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ===== FIREBASE =====
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
const ADMIN_NAME = "Farid Ardiansyah";
const PRIVACY_POLICY_URL = "/privacy-policy";

// ===== VERIFIED =====
const VerifiedBadge = ({
  size = 16,
  color = "#0D3CFC",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path
      fill={color}
      d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
    />
  </svg>
);

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
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
      stroke={color}
      strokeWidth="1.8"
    />
    <motion.path
      d={open ? "M2 5L12 2L22 5" : "M2 7L12 13L22 7"}
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={{ d: open ? "M2 5L12 2L22 5" : "M2 7L12 13L22 7" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    />
  </svg>
);

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

// ===== REAL-TIME TICKER BANNER BARU =====
const RealtimeMessageTicker = ({ messages }: { messages: any[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <span style={{ fontSize: "13px", opacity: 0.9 }}>
        Belum ada pesan terbaru
      </span>
    );
  }

  const currentMsg = messages[index];
  const senderName = currentMsg?.name || "Anonymous";
  const userMessage = currentMsg?.message || "";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        overflow: "hidden",
        height: "22px",
        verticalAlign: "middle",
      }}
    >
      <EmailIcon size={16} color="#FFFFFF" open={true} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMsg.id || index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          <span style={{ fontWeight: 700, color: "#FFFFFF" }}>
            {ADMIN_NAME}
          </span>
          <span style={{ opacity: 0.8 }}>💬 {userMessage}</span>
          <span style={{ opacity: 0.6, fontSize: "12px" }}>
            ➔ dikirimkan ke
          </span>
          <span style={{ fontWeight: 700, color: "#FFD700" }}>
            {senderName}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

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

// ===== FORMAT JAM =====
function formatJam(ts: any): string {
  if (!ts) return "";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

// ===== FOOTER =====
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
      if (aEl)
        splitA = new SplitText(aEl, {
          type: "chars",
          charsClass: "footer-a-char",
        });

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
        backgroundColor: RED,
        borderRadius: "60px 60px 0 0",
        padding: "60px 40px 40px",
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
          flexWrap: "wrap",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
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
              <span style={{ fontSize: "50px", color: WHITE, fontWeight: 400 }}>
                {col.title}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "50px",
                    color: WHITE,
                    textDecoration: "none",
                    opacity: 0.9,
                    lineHeight: 1.15,
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
            padding: "14px 22px",
            backgroundColor: WHITE,
            borderRadius: "12px",
            textDecoration: "none",
            boxShadow: "0 6px 24px rgba(255,255,255,0.25)",
          }}
        >
          <WindowsIcon size={24} color={RED} />
          <span style={{ fontSize: "18px", fontWeight: 700, color: RED }}>
            Download for Windows
          </span>
        </a>
      </div>

      <div style={{ marginTop: "40px", marginBottom: "24px" }}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 22px",
            backgroundColor: BLUE,
            borderRadius: "14px",
            textDecoration: "none",
          }}
        >
          <MicrosoftStoreIcon size={36} color={WHITE} />
          <span style={{ fontSize: "24px", fontWeight: 700, color: WHITE }}>
            Unduh Menuru
          </span>
        </a>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
          <span
            ref={titleRef}
            style={{
              fontSize: "600px",
              color: WHITE,
              letterSpacing: "-0.05em",
              lineHeight: "0.85",
              display: "block",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            Farid
          </span>
          <span style={{ display: "inline-block", lineHeight: "0.85" }}>
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
                marginLeft: "4px",
                pointerEvents: "none",
              }}
            >
              A
            </span>
          </span>
        </div>
        <span
          style={{
            fontSize: "16px",
            color: WHITE,
            opacity: 0.9,
            marginTop: "10px",
            display: "block",
          }}
        >
          2024 - 2026 Menuru. All rights reserved.
        </span>
      </div>
    </div>
  );
};

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
    <div style={{ display: "flex", gap: "12px" }}>
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
        }}
      >
        Accept
      </button>
    </div>
  </div>
);

// ===== LIVE CHAT =====
const LiveChatSection = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeMode, setComposeMode] = useState<"reply" | "broadcast" | "announcement">("reply");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  
  const [selectedUserToReply, setSelectedUserToReply] = useState<string>("");

  const [authMode, setAuthMode] = useState<"login" | "register" | "google">("google");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !db) return;

    const isAdmin = user?.email === ADMIN_EMAIL;
    let q;

    if (isAdmin) {
      q = query(
        collection(db, "contactMessages"),
        orderBy("createdAt", "desc")
      );
    } else if (user) {
      q = query(
        collection(db, "contactMessages"),
        where("userId", "in", [user.uid, "all"]),
        orderBy("createdAt", "desc")
      );
    } else {
      setMessages([]);
      setSelectedId(null);
      return;
    }

    const unsub = onSnapshot(q, (snap: any) => {
      const list: any[] = [];
      snap.forEach((d: any) => list.push({ id: d.id, ...d.data() }));
      setMessages(list);
      setSelectedId((prev) => {
        if (prev && list.some((m) => m.id === prev)) return prev;
        return list.length > 0 ? list[0].id : null;
      });
    });
    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (!db || !selectedId || !user) return;
    const isAdmin = user?.email === ADMIN_EMAIL;
    if (isAdmin) {
      const msgRef = doc(db, "contactMessages", selectedId);
      updateDoc(msgRef, { status: "read" }).catch(() => {});
    }
  }, [selectedId, user]);

  useEffect(() => {
    if (!detailRef.current || !selectedId) return;
    gsap.fromTo(
      detailRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
    );
  }, [selectedId]);

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setAuthError("");
    } catch (e: any) {
      setAuthError(e.message);
    }
  };

  const handleManualAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !authEmail.trim() || !authPassword.trim()) {
      setAuthError("Email dan password wajib diisi.");
      return;
    }
    if (authMode === "register" && !authName.trim()) {
      setAuthError("Nama wajib diisi untuk mendaftar.");
      return;
    }

    try {
      setAuthError("");
      if (authMode === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
        await updateProfile(userCredential.user, { displayName: authName });
      } else {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
      }
    } catch (err: any) {
      setAuthError(err.message || "Gagal melakukan autentikasi.");
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

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
      const isAdmin = user?.email === ADMIN_EMAIL;
      
      if (isAdmin && composeMode === "reply") {
        const targetUser = messages.find(m => m.userId === selectedUserToReply || m.email === selectedUserToReply);
        
        await addDoc(collection(db, "contactMessages"), {
          userId: targetUser ? targetUser.userId : selectedUserToReply,
          name: ADMIN_NAME,
          email: ADMIN_EMAIL,
          photoURL: "",
          subject: formSubject.trim(),
          message: formMessage.trim(),
          to: targetUser ? targetUser.email : "",
          from: ADMIN_EMAIL,
          status: "sent",
          isAdminReply: true,
          createdAt: serverTimestamp(),
        });
      } 
      else if (isAdmin && composeMode === "broadcast") {
        await addDoc(collection(db, "contactMessages"), {
          userId: "all",
          name: ADMIN_NAME,
          email: ADMIN_EMAIL,
          photoURL: "",
          subject: `[BROADCAST] ${formSubject.trim()}`,
          message: formMessage.trim(),
          to: "all",
          from: ADMIN_EMAIL,
          status: "sent",
          isBroadcast: true,
          createdAt: serverTimestamp(),
        });
      }
      else if (isAdmin && composeMode === "announcement") {
        await addDoc(collection(db, "contactMessages"), {
          userId: "all",
          name: ADMIN_NAME,
          email: ADMIN_EMAIL,
          photoURL: "",
          subject: `[PENGUMUMAN] ${formSubject.trim()}`,
          message: formMessage.trim(),
          to: "all",
          from: ADMIN_EMAIL,
          status: "sent",
          isAnnouncement: true,
          createdAt: serverTimestamp(),
        });
      }
      else {
        await addDoc(collection(db, "contactMessages"), {
          userId: user.uid,
          name: user.displayName || user.email?.split("@")[0] || "Anonymous",
          email: user.email || "",
          photoURL: user.photoURL || "",
          subject: formSubject.trim(),
          message: formMessage.trim(),
          to: ADMIN_EMAIL,
          from: user.email || "",
          status: "sent",
          createdAt: serverTimestamp(),
        });
      }

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

  const openCompose = (mode: "reply" | "broadcast" | "announcement") => {
    if (!user) {
      setAuthMode("google");
      setAuthError("");
      return;
    }
    setComposeMode(mode);
    setFormSubject("");
    setFormMessage("");
    if (mode === "reply" && !isAdmin && selected) {
      setSelectedUserToReply(selected.userId);
    }
    setShowCompose(true);
  };

  const selected = messages.find((m) => m.id === selectedId) || null;
  const isAdmin = user?.email === ADMIN_EMAIL;

  const uniqueUsers = useMemo(() => {
    const map = new Map();
    messages.forEach(m => {
      if (m.userId && m.userId !== "all" && !m.isAdminReply && !m.isBroadcast && !m.isAnnouncement) {
        map.set(m.userId, { id: m.userId, name: m.name, email: m.email });
      }
    });
    return Array.from(map.values());
  }, [messages]);

  let headerTitle = "";
  if (selected?.isBroadcast) headerTitle = "Broadcast";
  else if (selected?.isAnnouncement) headerTitle = "Pengumuman";
  else if (isAdmin) {
    headerTitle = selected?.isAdminReply ? "Pesan Kirim" : "Pesan Masuk";
  } else {
    headerTitle = selected?.isAdminReply ? "Pesan Masuk" : "Pesan Kirim";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "1500px",
        marginTop: "60px",
        gap: "20px",
      }}
    >
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
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => openCompose("reply")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 28px",
              backgroundColor: WHITE,
              color: BLUE,
              border: "none",
              borderRadius: "20px",
              fontSize: "18px",
              fontWeight: 700,
              fontFamily: FONT_FAMILY,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(13,60,252,0.35)",
            }}
          >
            <SendIcon size={20} color={BLUE} />
            {!user ? "Sign in to Send" : isAdmin ? "Balas User" : "Kirim Pesan"}
          </button>

          {isAdmin && (
            <>
              <button
                onClick={() => openCompose("broadcast")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 28px",
                  backgroundColor: "#F59E0B",
                  color: WHITE,
                  border: "none",
                  borderRadius: "20px",
                  fontSize: "18px",
                  fontWeight: 700,
                  fontFamily: FONT_FAMILY,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(245,158,11,0.35)",
                }}
              >
                Broadcast
              </button>
              <button
                onClick={() => openCompose("announcement")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 28px",
                  backgroundColor: "#10B981",
                  color: WHITE,
                  border: "none",
                  borderRadius: "20px",
                  fontSize: "18px",
                  fontWeight: 700,
                  fontFamily: FONT_FAMILY,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(16,185,129,0.35)",
                }}
              >
                Pengumuman
              </button>
            </>
          )}
        </div>

        {!user ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleGoogleSignIn}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 24px",
                backgroundColor: WHITE,
                color: BLUE,
                border: `2px solid ${WHITE}`,
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: 700,
                fontFamily: FONT_FAMILY,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              <GoogleLogo size={22} />
              Google
            </button>
            <button
              onClick={() => setAuthMode("login")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 24px",
                backgroundColor: "transparent",
                color: WHITE,
                border: `2px solid ${WHITE}`,
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: 700,
                fontFamily: FONT_FAMILY,
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 16px 8px 8px",
              backgroundColor: WHITE,
              borderRadius: "999px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: BLUE,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ color: WHITE, fontSize: "16px", fontWeight: 800 }}>
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: BLUE,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {user.displayName || user.email?.split("@")[0]}
                <VerifiedBadge size={14} color={BLUE} />
              </span>
              <span style={{ fontSize: "12px", color: BLUE, opacity: 0.7 }}>
                {user.email}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                marginLeft: "8px",
                padding: "8px 14px",
                backgroundColor: "transparent",
                color: BLUE,
                border: `1.5px solid ${BLUE}`,
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showCompose && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              overflow: "hidden",
              borderRadius: "32px",
              backgroundColor: WHITE,
              boxShadow: "0 16px 48px rgba(13,60,252,0.25)",
            }}
          >
            <div
              style={{
                backgroundColor: 
                  composeMode === "broadcast" ? "#F59E0B" : 
                  composeMode === "announcement" ? "#10B981" : BLUE,
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderTopLeftRadius: "32px",
                borderTopRightRadius: "32px",
              }}
            >
              <SendIcon size={22} color={WHITE} />
              <span style={{ fontSize: "20px", fontWeight: 700, color: WHITE }}>
                {composeMode === "broadcast" ? "Kirim Broadcast ke Semua" :
                 composeMode === "announcement" ? "Kirim Pengumuman ke Semua" :
                 isAdmin ? `Balas Pesan` : "Kirim Pesan ke Admin"}
              </span>
            </div>
            <form
              onSubmit={handleSend}
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {isAdmin && composeMode === "reply" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 700, color: BLUE }}>Pilih User Tujuan:</label>
                  <select
                    value={selectedUserToReply}
                    onChange={(e) => setSelectedUserToReply(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      fontSize: "16px",
                      color: BLUE,
                      backgroundColor: `${BLUE}05`,
                      border: `1.5px solid ${BLUE}20`,
                      borderRadius: "14px",
                      outline: "none",
                      fontFamily: FONT_FAMILY,
                    }}
                  >
                    <option value="">-- Pilih User --</option>
                    {uniqueUsers.map((u: any) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 18px",
                    backgroundColor: `${BLUE}08`,
                    border: `1.5px solid ${BLUE}15`,
                    borderRadius: "14px",
                    fontSize: "15px",
                    color: BLUE,
                    fontWeight: 600,
                  }}
                >
                  <span>To:</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {composeMode === "broadcast" || composeMode === "announcement" 
                      ? "Semua User" 
                      : isAdmin ? selected?.email || "User" : ADMIN_EMAIL}
                    <VerifiedBadge size={16} color={BLUE} />
                  </span>
                </div>
              )}

              <input
                type="text"
                placeholder="Subject"
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  fontSize: "16px",
                  color: BLUE,
                  backgroundColor: `${BLUE}05`,
                  border: `1.5px solid ${BLUE}20`,
                  borderRadius: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: FONT_FAMILY,
                }}
              />

              <textarea
                placeholder="Write your message..."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                rows={6}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  fontSize: "16px",
                  color: BLUE,
                  backgroundColor: `${BLUE}05`,
                  border: `1.5px solid ${BLUE}20`,
                  borderRadius: "14px",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  fontFamily: FONT_FAMILY,
                }}
              />

              {submitStatus === "success" && (
                <div
                  style={{
                    padding: "14px 20px",
                    backgroundColor: "#DCFCE7",
                    color: "#065F46",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  Pesan berhasil dikirim.
                </div>
              )}
              {submitStatus === "error" && (
                <div
                  style={{
                    padding: "14px 20px",
                    backgroundColor: "#FEE2E2",
                    color: "#991B1B",
                    borderRadius: "10px",
                    fontSize: "15px",
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
                    padding: "14px 26px",
                    backgroundColor: "transparent",
                    color: BLUE,
                    border: `1.5px solid ${BLUE}`,
                    borderRadius: "14px",
                    fontSize: "15px",
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
                    padding: "14px 28px",
                    backgroundColor: isSubmitting ? "#94A3B8" : BLUE,
                    color: WHITE,
                    border: "none",
                    borderRadius: "14px",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  <SendIcon size={18} color={WHITE} />
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!user ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 20px",
            backgroundColor: BLUE,
            borderRadius: "60px",
            color: WHITE,
            textAlign: "center",
            gap: "20px",
            marginTop: "20px",
            minHeight: "400px",
          }}
        >
          <EmailIcon size={60} color={WHITE} open={false} />
          <h2 style={{ fontSize: "50px", fontWeight: 700, margin: 0 }}>
            Pesan Terkunci
          </h2>
          <p
            style={{
              fontSize: "20px",
              opacity: 0.9,
              maxWidth: "600px",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Silakan login menggunakan akun Google atau Email Anda terlebih
            dahulu untuk melihat pesan dan mengirim pesan ke Farid Ardiansyah.
          </p>

          <div
            style={{
              backgroundColor: WHITE,
              padding: "30px",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "400px",
              textAlign: "left",
              marginTop: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                onClick={() => { setAuthMode("login"); setAuthError(""); }}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: authMode === "login" ? BLUE : "transparent",
                  color: authMode === "login" ? WHITE : BLUE,
                  border: `1.5px solid ${BLUE}`,
                  borderRadius: "10px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: FONT_FAMILY,
                }}
              >
                Masuk
              </button>
              <button
                onClick={() => { setAuthMode("register"); setAuthError(""); }}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: authMode === "register" ? BLUE : "transparent",
                  color: authMode === "register" ? WHITE : BLUE,
                  border: `1.5px solid ${BLUE}`,
                  borderRadius: "10px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: FONT_FAMILY,
                }}
              >
                Daftar
              </button>
            </div>

            <form onSubmit={handleManualAuth} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {authMode === "register" && (
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  style={{ width: "100%", padding: "14px", border: `1.5px solid ${BLUE}30`, borderRadius: "10px", outline: "none", fontSize: "15px", color: BLUE, fontFamily: FONT_FAMILY }}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                style={{ width: "100%", padding: "14px", border: `1.5px solid ${BLUE}30`, borderRadius: "10px", outline: "none", fontSize: "15px", color: BLUE, fontFamily: FONT_FAMILY }}
              />
              <input
                type="password"
                placeholder="Password (min. 6 karakter)"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                style={{ width: "100%", padding: "14px", border: `1.5px solid ${BLUE}30`, borderRadius: "10px", outline: "none", fontSize: "15px", color: BLUE, fontFamily: FONT_FAMILY }}
              />
              {authError && <div style={{ color: RED, fontSize: "13px", fontWeight: 600 }}>{authError}</div>}
              <button type="submit" style={{ padding: "14px", backgroundColor: BLUE, color: WHITE, border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: 700, cursor: "pointer", fontFamily: FONT_FAMILY }}>
                {authMode === "login" ? "Masuk" : "Daftar"}
              </button>
            </form>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "20px 0" }}>
              <div style={{ flex: 1, height: "1px", backgroundColor: `${BLUE}20` }} />
              <span style={{ fontSize: "12px", color: BLUE, opacity: 0.6, fontWeight: 600 }}>ATAU</span>
              <div style={{ flex: 1, height: "1px", backgroundColor: `${BLUE}20` }} />
            </div>

            <button
              onClick={handleGoogleSignIn}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "14px",
                backgroundColor: "transparent",
                color: BLUE,
                border: `1.5px solid ${BLUE}`,
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: FONT_FAMILY,
              }}
            >
              <GoogleLogo size={22} />
              Google
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            borderRadius: "60px",
            backgroundColor: BLUE,
            padding: "24px",
            gap: "20px",
            boxShadow: "0 24px 64px rgba(13,60,252,0.35)",
            flexWrap: "wrap",
            boxSizing: "border-box",
            minHeight: "900px",
          }}
        >
          <div
            style={{
              flex: "0 0 440px",
              minWidth: "320px",
              maxWidth: "100%",
              backgroundColor: WHITE,
              borderRadius: "50px 50px 50px 20px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                padding: "28px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1.5px solid ${BLUE}15`,
                backgroundColor: WHITE,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <EmailIcon size={28} color={BLUE} open={false} />
                <span
                  style={{
                    fontSize: "50px",
                    fontWeight: 700,
                    color: BLUE,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {isAdmin ? "Inbox" : "Pesan"}
                </span>
              </div>
              <span
                style={{
                  padding: "6px 16px",
                  backgroundColor: BLUE,
                  color: WHITE,
                  borderRadius: "999px",
                  fontSize: "20px",
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
                padding: "24px 32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                backgroundColor: WHITE,
              }}
            >
              {messages.length === 0 ? (
                <div
                  style={{
                    padding: "48px 20px",
                    textAlign: "center",
                    fontSize: "20px",
                    color: BLUE,
                    opacity: 0.65,
                    fontStyle: "italic",
                  }}
                >
                  Belum ada pesan.
                </div>
              ) : (
                messages.map((m) => {
                  const isActive = m.id === selectedId;
                  const isBroadcast = m.isBroadcast;
                  const isAnnouncement = m.isAnnouncement;
                  
                  let bgColor = isActive ? BLUE : `${BLUE}08`;
                  let textColor = isActive ? WHITE : BLUE;
                  
                  if (isBroadcast && !isActive) {
                    bgColor = "#FEF3C7";
                    textColor = "#92400E";
                  }
                  if (isAnnouncement && !isActive) {
                    bgColor = "#D1FAE5";
                    textColor = "#065F46";
                  }

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
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "24px",
                        backgroundColor: bgColor,
                        color: textColor,
                        border: isActive
                          ? `2px solid ${BLUE}`
                          : `1.5px solid ${BLUE}15`,
                        borderRadius: "30px 30px 30px 10px",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition:
                          "background-color 0.25s ease, color 0.25s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", width: "100%" }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "16px",
                            backgroundColor: isActive ? WHITE : BLUE,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <EmailIcon
                            size={24}
                            color={isActive ? BLUE : WHITE}
                            open={isActive}
                          />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: "20px",
                              fontWeight: 700,
                              color: isActive ? WHITE : textColor,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {m.name || "Anonymous"}
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 400,
                              opacity: 0.85,
                              marginTop: "4px",
                            }}
                          >
                            {timeAgo(m.createdAt)}
                          </div>
                        </div>
                      </div>
                      
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: 700,
                          color: isActive ? WHITE : textColor,
                          marginTop: "8px",
                          wordBreak: "break-word",
                          lineHeight: 1.3,
                        }}
                      >
                        {m.subject || "(no subject)"}
                      </div>

                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: isActive ? WHITE : textColor,
                          opacity: 0.9,
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginTop: "4px",
                        }}
                      >
                        {m.message}
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>
          </div>

          <div
            ref={detailRef}
            style={{
              flex: 1,
              minWidth: "340px",
              backgroundColor: BLUE,
              borderRadius: "50px 20px 50px 50px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              padding: "20px",
              gap: "20px",
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
                  gap: "24px",
                  padding: "80px 20px",
                  textAlign: "center",
                  backgroundColor: WHITE,
                  borderRadius: "40px",
                }}
              >
                <EmailIcon size={100} color={`${BLUE}30`} open={false} />
                <span
                  style={{
                    fontSize: "30px",
                    color: BLUE,
                    fontWeight: 400,
                    opacity: 0.55,
                  }}
                >
                  Pilih pesan di sisi kiri untuk melihat detail
                </span>
              </div>
            ) : (
              <>
                <div
                  style={{
                    backgroundColor: WHITE,
                    borderRadius: "40px 40px 40px 15px",
                    padding: "20px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "12px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    border: `1.5px solid ${BLUE}15`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "50px",
                      fontWeight: 400,
                      color: BLUE,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {headerTitle}
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 400,
                      color: BLUE,
                      opacity: 0.85,
                    }}
                  >
                    {timeAgo(selected.createdAt)}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: WHITE,
                    borderRadius: "40px 15px 40px 40px",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    border: `1.5px solid ${BLUE}15`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      fontWeight: 400,
                      color: BLUE,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      wordBreak: "break-word",
                    }}
                  >
                    {selected.subject || "(no subject)"}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: BLUE,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: `2px solid ${BLUE}20`,
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
                        <span
                          style={{
                            color: WHITE,
                            fontSize: "24px",
                            fontWeight: 400,
                          }}
                        >
                          {(selected.name || "U").charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        minWidth: 0,
                        flex: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: 400,
                          color: BLUE,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {selected.name || "Anonymous"}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: BLUE,
                          opacity: 0.75,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {selected.email || selected.name}
                        <VerifiedBadge size={16} color={BLUE} />
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      paddingTop: "12px",
                      borderTop: `1.5px solid ${BLUE}15`,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: BLUE,
                        opacity: 0.7,
                      }}
                    >
                      To:
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: 400,
                          color: BLUE,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {selected.isBroadcast || selected.isAnnouncement ? "Semua User" : (isAdmin ? selected.name : ADMIN_NAME)}
                        <VerifiedBadge size={16} color={BLUE} />
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: BLUE,
                          opacity: 0.7,
                        }}
                      >
                        {selected.isBroadcast || selected.isAnnouncement ? "Global" : (isAdmin ? selected.email : ADMIN_EMAIL)}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: BLUE,
                    borderRadius: "30px 30px 30px 10px",
                    padding: "6px",
                    border: `1.5px solid ${BLUE}`,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: WHITE,
                      borderRadius: "24px",
                      padding: "20px 28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: 400,
                        color: BLUE,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Message
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 400,
                        color: BLUE,
                        opacity: 0.85,
                      }}
                    >
                      Dikirim {timeAgo(selected.createdAt)}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: BLUE,
                    borderRadius: "30px 10px 30px 30px",
                    padding: "6px",
                    border: `1.5px solid ${BLUE}`,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: WHITE,
                      borderRadius: "24px",
                      padding: "32px",
                      fontSize: "24px",
                      fontWeight: 400,
                      color: BLUE,
                      lineHeight: 1.75,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      width: "100%",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{selected.message || "(empty message)"}</div>
                    
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "8px",
                        marginTop: "24px",
                        paddingTop: "16px",
                        paddingRight: "8px",
                        borderTop: `1.5px solid ${BLUE}15`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "16px",
                          color: BLUE,
                          opacity: 0.75,
                          fontWeight: 400,
                        }}
                      >
                        {selected.status === "read"
                          ? "Dibaca"
                          : selected.status === "delivered"
                          ? "Terkirim"
                          : selected.status === "failed"
                          ? "Gagal Terkirim"
                          : "Terkirim"}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: BLUE,
                          opacity: 0.75,
                        }}
                      >
                        {formatJam(selected.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
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
  const [tickerMessages, setTickerMessages] = useState<any[]>([]);

  // Realtime Messages untuk Ticker Banner Atas
  useEffect(() => {
    if (typeof window === "undefined" || !db) return;
    const q = query(
      collection(db, "contactMessages"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const list: any[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setTickerMessages(list);
    });
    return () => unsub();
  }, []);

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
        { xPercent: 220, opacity: 0, duration: 2.4, ease: "power2.inOut" },
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
      if (panelInner)
        gsap.to(panelInner, {
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        });
      if (plusIcon)
        gsap.to(plusIcon, { rotation: 45, duration: 0.5, ease: "power3.out" });
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
      if (panelInner)
        gsap.to(panelInner, { opacity: 0, duration: 0.3, ease: "power2.in" });
      if (plusIcon)
        gsap.to(plusIcon, { rotation: 0, duration: 0.4, ease: "power3.inOut" });
    }
  }, [expandOpen]);

  const navFontSize = "50px";

  return (
    <>
      <div
        ref={preloaderRef}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: WHITE,
          zIndex: 999999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          overflow: "hidden",
          fontFamily: FONT_FAMILY,
          padding: "20px",
        }}
      >
        <span
          ref={leftTextRef}
          style={{
            fontSize: "90px",
            color: BLUE,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          Farid
        </span>
        <span
          ref={rightTextRef}
          style={{
            fontSize: "90px",
            color: BLUE,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          By Founder And Developer Menuru
        </span>
      </div>

      {/* Top Banner Biru Navbar dengan Ticker Realtime di Kiri */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#0000EE",
          color: WHITE,
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "14px",
          fontFamily: FONT_FAMILY,
          zIndex: 10000,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflow: "hidden",
            maxWidth: "60%",
          }}
        >
          <RealtimeMessageTicker messages={tickerMessages} />
        </div>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "nowrap",
            justifyContent: "flex-end",
            fontSize: "13px",
          }}
        >
          <span style={{ color: BLACK, fontWeight: 600 }}>Bersponsor</span>
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
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
              <VerifiedBadge size={14} color={WHITE} />
            </a>
          </span>
        </span>
      </div>

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
              style={{ fontSize: navFontSize, fontWeight: 400, lineHeight: 1 }}
            >
              Farid Ardiansyah
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen((v) => !v)}
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
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            <span ref={menuLabelRef} style={{ display: "inline-block" }}>
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </>
      )}

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
                  textTransform: "capitalize",
                  color: "inherit",
                  textDecoration: "none",
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
            }}
          >
            <Link
              href="/messages"
              style={{
                fontSize: navFontSize,
                fontWeight: 400,
                textTransform: "capitalize",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Messages
            </Link>
          </div>
        </>
      )}

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: WHITE,
          fontFamily: FONT_FAMILY,
          padding: "200px 0 0",
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

      {showCookies && (
        <CookiesPopup
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
        />
      )}

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
          <div ref={wrapperRef} style={{ width: "100%", position: "relative" }}>
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
                onClick={() => setExpandOpen((v) => !v)}
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
        .footer-farid-char,
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
