import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiYoutube } from "react-icons/si";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Academy", href: "/#academy" },
  { label: "Contact", href: "/#contact" },
];

// Keep CSS variable in sync with actual header height
function useHeaderHeight(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const h = ref.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--header-height", `${h}px`);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const headerRef = useRef<HTMLElement>(null);

  useHeaderHeight(headerRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section for highlight
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("/#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.35, rootMargin: "-60px 0px -40% 0px" },
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  if (prevPath.current !== location.pathname) {
    prevPath.current = location.pathname;
  }

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      ref={headerRef}
      data-ocid="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled
          ? "bg-card/97 backdrop-blur-lg shadow-elevated"
          : "bg-card/95 backdrop-blur-md"
      }`}
    >
      {/* ── Thin gold brand stripe at very top ── */}
      <div
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.65 0.15 68) 30%, oklch(0.72 0.14 75) 50%, oklch(0.65 0.15 68) 70%, transparent 100%)",
        }}
      />

      {/* ── Top row: Logo + CTAs ── */}
      <div className="border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo / Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group"
              data-ocid="header-logo"
            >
              <img
                src="/assets/images/logo.png"
                alt="Master Deepak Logo"
                className="h-10 sm:h-12 w-auto object-contain flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display font-black text-base sm:text-lg leading-tight text-foreground group-hover:text-accent transition-smooth">
                  <span className="tracking-[0.25em]">MASTER</span>{" "}
                  <span className="text-gradient-gold tracking-[0.15em]">
                    DEEPAK
                  </span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-accent/70 leading-tight">
                  Hair Expert
                </span>
              </div>
            </Link>

            {/* CTAs */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://www.youtube.com/@masterdeepakhairexpert"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="header-youtube-cta"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm border border-border text-muted-foreground hover:text-accent hover:border-accent/40 transition-smooth text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em]"
              >
                <SiYoutube className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-destructive" />
                <span className="hidden xs:inline">YouTube</span>
              </a>
              <Link to="/booking" data-ocid="header-book-cta">
                <button
                  type="button"
                  className="btn-cta !px-4 sm:!px-6 !py-1.5 sm:!py-2 !text-[10px] sm:!text-xs"
                >
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Horizontal Nav Bar ── always visible, bordered ── */}
      <nav
        aria-label="Site navigation"
        data-ocid="header-nav-bar"
        className="border-b-2 border-accent/50 bg-card/98"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center flex-wrap gap-x-1 sm:gap-x-0">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnchorClick(link.href);
                    }}
                    data-ocid={`nav-link-${sectionId}`}
                    className={`relative inline-flex items-center px-3 sm:px-5 lg:px-7 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.08em] uppercase transition-smooth
                      ${
                        isActive
                          ? "text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      }
                      group`}
                  >
                    {link.label}
                    {/* Active / hover underline indicator */}
                    <span
                      className={`absolute bottom-0 left-3 sm:left-5 lg:left-7 right-3 sm:right-5 lg:right-7 h-[2px] rounded-full transition-smooth
                        ${isActive ? "bg-accent opacity-100" : "bg-accent opacity-0 group-hover:opacity-50"}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
