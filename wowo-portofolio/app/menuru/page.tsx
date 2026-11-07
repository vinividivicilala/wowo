"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ===== CONSTANTS =====
const FONT_FAMILY = "'Plus Jakarta Sans', sans-serif";
const BRUTAL_FONT =
  "'Bungee', 'Archivo Black', 'Anton', 'Impact', 'Arial Black', sans-serif";
const BLUE = "#0D3CFC";
const WHITE = "#FFFFFF";
const RED = "#DC2626";
const BLACK = "#000000";

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
                <a
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
                </a>
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
            transition: "transform 0.2s ease, boxShadow 0.2s ease",
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
            transition: "transform 0.2s ease, boxShadow 0.2s ease",
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
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Unduh Menuru
            <VerifiedBadgeWhite size={20} />
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

export default function MenuruPage() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);

  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonBgRef = useRef<HTMLDivElement>(null);
  const panelBgRef = useRef<HTMLDivElement>(null);
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLSpanElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [expandOpen, setExpandOpen] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  // Forum Diskusi State
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("Farid Ardiansyah");
  // Menggunakan foto profil asli (real user avatar dari gravatar/placeholder otentik)
  const [userAvatar, setUserAvatar] = useState("https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y");
  const [forumTitle, setForumTitle] = useState("");
  const [forumDesc, setForumDesc] = useState("");
  const [discussions, setDiscussions] = useState<
    Array<{ id: number; title: string; desc: string; author: string; avatar: string; date: string }>
  >([
    {
      id: 1,
      title: "How to maximize productivity using Menuru Notes?",
      desc: "Sharing tips on organizing daily tasks and real-time syncing features efficiently.",
      author: "Farid Ardiansyah",
      avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
      date: "November 7, 2026",
    },
  ]);

  const handleSignInEmail = () => {
    setIsSignedIn(true);
  };

  const handleSignInGmail = () => {
    setIsSignedIn(true);
  };

  const handleForumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forumTitle.trim() || !forumDesc.trim()) return;

    const newDiscussion = {
      id: Date.now(),
      title: forumTitle,
      desc: forumDesc,
      author: userName,
      avatar: userAvatar,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    setDiscussions([newDiscussion, ...discussions]);
    setForumTitle("");
    setForumDesc("");
  };

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

      {/* ===== BANNER ===== */}
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
                color: "#FFFFFF",
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

      {/* ===== NAVBAR BRAND & MENU BUTTON ===== */}
      {preloaderDone && (
        <>
          <div
            style={{
              position: "fixed",
              top: "60px",
              left: "40px",
              zIndex: 100001,
              display: "flex",
              alignItems: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              pointerEvents: "none",
              color: menuOpen ? "#FFFFFF" : "#0D3CFC",
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
          </div>

          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen((prev) => !prev)}
            style={{
              position: "fixed",
              top: "60px",
              right: "40px",
              zIndex: 100001,
              backgroundColor: "transparent",
              color: menuOpen ? "#FFFFFF" : "#0D3CFC",
              border: "none",
              padding: 0,
              fontSize: navFontSize,
              fontWeight: 400,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
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

      {/* ===== MENU OVERLAY ===== */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#0D3CFC",
          zIndex: 100000,
          display: "none",
          clipPath: "inset(0 0 100% 0)",
        }}
      />

      {/* ===== NAVBAR LINKS ===== */}
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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              pointerEvents: "auto",
              color: menuOpen ? "#FFFFFF" : "#0D3CFC",
              transition: "color 0.3s ease",
            }}
          >
            {["Work", "About", "Contact", "Post"].map((txt) => (
              <a
                key={txt}
                href={txt === "Work" ? "/work" : "#"}
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
                {txt}
              </a>
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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: menuOpen ? "#FFFFFF" : "#0D3CFC",
              transition: "color 0.3s ease",
            }}
          >
            <a
              href="#"
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
            </a>
          </div>
        </>
      )}

      {/* ===== MAIN CONTENT AREA ===== */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
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
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
            maxWidth: "100%",
            margin: "0 auto",
            width: "100%",
            marginBottom: "200px",
            boxSizing: "border-box",
          }}
        >
          {/* ===== TEKS "Menuru" 90px DI SISI KIRI ATAS DI BAWAH JUDUL WEB ===== */}
          <span
            style={{
              fontSize: "90px",
              fontFamily: FONT_FAMILY,
              fontWeight: 400,
              color: BLUE,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              padding: 0,
              display: "block",
              textAlign: "left",
              textTransform: "capitalize",
            }}
          >
            Menuru
          </span>

          {/* ===== DESKRIPSI 1 PARAGRAF ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxWidth: "800px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontFamily: FONT_FAMILY,
                fontWeight: 400,
                color: BLACK,
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                margin: 0,
                textAlign: "left",
              }}
            >
              Menuru Studio is a non-profit brand born from the founder&apos;s vision to assist the public at no cost.
            </p>
          </div>

          {/* ===== GARIS BAWAH WARNA BIRU PUDAH (#0D3CFC35) ===== */}
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor: "#0D3CFC35",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />

          {/* ===== BARIS "Type" & "Maintenance" ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Type
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Maintenance
              </span>
            </div>
          </div>

          {/* ===== BARIS "Productivity" & "Real Time" (RATA KIRI) ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Productivity
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Real Time
              </span>
            </div>
          </div>

          {/* ===== GAMBAR "images/jhhg.JPG" (DIPERBESAR KE KANAN & TANPA BORDER BIRU) ===== */}
          <div
            style={{
              width: "100vw",
              marginLeft: "calc(-50vw + 50%)",
              marginRight: "calc(-50vw + 50%)",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <img
              src="images/jhhg.JPG"
              alt="Menuru Studio Gallery"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "850px",
                objectFit: "cover",
                display: "block",
                border: "none",
                boxShadow: "none",
              }}
            />
          </div>

          {/* ===== BARIS "Role", "Team", & "My Contribution" SEBARIS ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Role
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Team
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                My Contribution
              </span>
            </div>
          </div>

          {/* ===== BARIS 1: "Founder", "Developer [me]", & "User Research" (RATA KIRI) ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Founder
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Developer [me]
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                User Research
              </span>
            </div>
          </div>

          {/* ===== BARIS 2: "Developer", [kosong], & "Design System" (RATA KIRI) ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Developer
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  visibility: "hidden",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Developer [me]
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Design System
              </span>
            </div>
          </div>

          {/* ===== BARIS 3: [kosong], [kosong], & "System Security" (RATA KIRI) ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  visibility: "hidden",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Developer
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  visibility: "hidden",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Developer [me]
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                System Security
              </span>
            </div>
          </div>

          {/* ===== BARIS 4: [kosong], [kosong], & "Interaction Design" (RATA KIRI) ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  visibility: "hidden",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Developer
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  visibility: "hidden",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Developer [me]
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, textAlign: "left" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Interaction Design
              </span>
            </div>
          </div>

          {/* ===== DESKRIPSI DI SISI KIRI DI BAWAH ISI ROLE ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "40px",
              maxWidth: "600px",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontSize: "22px",
                fontFamily: FONT_FAMILY,
                fontWeight: 400,
                color: BLUE,
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
                margin: 0,
                textAlign: "left",
              }}
            >
              Solving note-taking and productivity challenges while helping the public completely free of charge since 2024.
            </p>
          </div>

          {/* ===== BAGIAN GOAL & MY ROLE SEJAJAR DI BAWAH DESKRIPSI ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "40px",
              marginTop: "60px",
            }}
          >
            {/* Kolom Kiri: Goal & Deskripsinya */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flex: 1,
                minWidth: "280px",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Goal
              </span>
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                To provide accessible, free, and secure digital productivity tools for everyone without subscription barriers.
              </p>
            </div>

            {/* Kolom Kanan: My Role & Deskripsinya */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flex: 1,
                minWidth: "280px",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                My Role
              </span>
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                Architecting the entire digital ecosystem, handling full-stack development, and implementing robust security frameworks.
              </p>
            </div>
          </div>

          {/* ===== BAGIAN TAMBAHAN: AUDIENCE, BRAND VOICE, FEEDBACK, FINAL DESIGN ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "60px",
              marginTop: "60px",
            }}
          >
            {/* Audience */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                maxWidth: "800px",
              }}
            >
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Audience
              </span>
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                Students, professionals, and everyday public users seeking fast, reliable, and distraction-free digital utilities.
              </p>
            </div>

            {/* Brand voice */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                maxWidth: "800px",
              }}
            >
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Brand voice
              </span>
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                Friendly, transparent, community-driven, empowering, and uncompromisingly dedicated to public utility.
              </p>
            </div>

            {/* Feedback */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                maxWidth: "800px",
              }}
            >
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Feedback
              </span>
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                Continuous community insights and direct user suggestions shape rapid feature iterations and interface improvements.
              </p>
            </div>

            {/* Final design */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                maxWidth: "800px",
              }}
            >
              <span
                style={{
                  fontSize: "90px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                Final design
              </span>
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: FONT_FAMILY,
                  fontWeight: 400,
                  color: BLUE,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                A clean, modern, high-contrast brutalist aesthetic optimized for performance, seamless cross-device compatibility, and accessibility.
              </p>
            </div>
          </div>

          {/* ===== FORUM DISKUSI SECTION (Menyatu tanpa background tambahan) ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginTop: "80px",
              alignItems: "flex-start",
              gap: "24px",
            }}
          >
            <span
              style={{
                fontSize: "90px",
                fontFamily: FONT_FAMILY,
                fontWeight: 400,
                color: BLUE,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                textAlign: "left",
                textTransform: "capitalize",
              }}
            >
              Forum diskusi
            </span>

            {/* Sign in buttons (Sign email & Gmail) */}
            {!isSignedIn ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={handleSignInEmail}
                  style={{
                    padding: "14px 28px",
                    backgroundColor: BLUE,
                    color: WHITE,
                    border: `2px solid ${BLUE}`,
                    borderRadius: "12px",
                    fontFamily: FONT_FAMILY,
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "-0.01em",
                    boxShadow: "0 4px 16px rgba(13,60,252,0.3)",
                  }}
                >
                  Sign in Email
                </button>
                <button
                  onClick={handleSignInGmail}
                  style={{
                    padding: "14px 28px",
                    backgroundColor: WHITE,
                    color: BLUE,
                    border: `2px solid ${BLUE}`,
                    borderRadius: "12px",
                    fontFamily: FONT_FAMILY,
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Sign in Gmail
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src={userAvatar}
                  alt={userName}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${BLUE}`,
                  }}
                />
                <span
                  style={{
                    fontSize: "18px",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 700,
                    color: BLUE,
                  }}
                >
                  Signed in as {userName}
                </span>
              </div>
            )}

            {/* Input Form Diskusi (Tanpa box background kaku, menyatu langsung dengan halaman) */}
            {isSignedIn && (
              <form
                onSubmit={handleForumSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "800px",
                  gap: "16px",
                  marginTop: "10px",
                  background: "transparent",
                  padding: 0,
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start", width: "100%" }}>
                  <label
                    style={{
                      fontSize: "18px",
                      fontFamily: FONT_FAMILY,
                      fontWeight: 700,
                      color: BLUE,
                    }}
                  >
                    Discussion Title
                  </label>
                  <input
                    type="text"
                    value={forumTitle}
                    onChange={(e) => setForumTitle(e.target.value)}
                    placeholder="Enter discussion title..."
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: "18px",
                      fontFamily: FONT_FAMILY,
                      color: BLACK,
                      backgroundColor: WHITE,
                      border: `1.5px solid ${BLUE}`,
                      borderRadius: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start", width: "100%" }}>
                  <label
                    style={{
                      fontSize: "18px",
                      fontFamily: FONT_FAMILY,
                      fontWeight: 700,
                      color: BLUE,
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    value={forumDesc}
                    onChange={(e) => setForumDesc(e.target.value)}
                    placeholder="Write your discussion description here..."
                    required
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: "18px",
                      fontFamily: FONT_FAMILY,
                      color: BLACK,
                      backgroundColor: WHITE,
                      border: `1.5px solid ${BLUE}`,
                      borderRadius: "12px",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "14px 28px",
                    backgroundColor: BLUE,
                    color: WHITE,
                    border: `2px solid ${BLUE}`,
                    borderRadius: "12px",
                    fontFamily: FONT_FAMILY,
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    alignSelf: "flex-start",
                    boxShadow: "0 4px 16px rgba(13,60,252,0.3)",
                  }}
                >
                  Submit Discussion
                </button>
              </form>
            )}

            {/* Design Hasil Submit Diskusi (Menyatu clean langsung di halaman) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "800px",
                gap: "32px",
                marginTop: "20px",
              }}
            >
              {discussions.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    background: "transparent",
                    padding: 0,
                    gap: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {/* User info row (FP user asli & nama user) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img
                        src={item.avatar}
                        alt={item.author}
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: `2px solid ${BLUE}`,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          fontFamily: FONT_FAMILY,
                          fontWeight: 700,
                          color: BLUE,
                        }}
                      >
                        {item.author}
                      </span>
                    </div>
                    {/* Tanggal Submit */}
                    <span
                      style={{
                        fontSize: "16px",
                        fontFamily: FONT_FAMILY,
                        fontWeight: 400,
                        color: BLUE,
                        opacity: 0.8,
                      }}
                    >
                      {item.date}
                    </span>
                  </div>

                  {/* Judul Diskusi */}
                  <h3
                    style={{
                      fontSize: "26px",
                      fontFamily: FONT_FAMILY,
                      fontWeight: 700,
                      color: BLUE,
                      margin: "4px 0 0 0",
                      textAlign: "left",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Deskripsi Diskusi */}
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: FONT_FAMILY,
                      fontWeight: 400,
                      color: BLACK,
                      margin: 0,
                      textAlign: "left",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== CARD FOOTER ===== */}
        <FooterSection refreshKey="menuru-page" />
      </div>

      {/* ===== COOKIES POPUP ===== */}
      {showCookies && (
        <CookiesPopup
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
        />
      )}

      {/* ===== BOTTOM PANEL BG BUTTON ===== */}
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
            style={{
              width: "100%",
              position: "relative",
            }}
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
                backgroundColor: "#0D3CFC",
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
                backgroundColor: "#0D3CFC",
                borderRadius: expandOpen ? "0px 0px 20px 20px" : "20px",
                boxShadow: "0 8px 32px rgba(13,60,252,0.35)",
                border: "2px solid #0D3CFC",
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
                  color: "#FFFFFF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  textAlign: "left",
                }}
              >
                Farid Ardiansyah
                <VerifiedBadgeWhite size={16} />
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
                    color: "#FFFFFF",
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

      {/* ===== GLOBAL STYLES ===== */}
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
