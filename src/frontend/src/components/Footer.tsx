import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Scissors } from "lucide-react";
import { SiInstagram, SiYoutube } from "react-icons/si";

const LOCATIONS = [
  {
    city: "Mumbai",
    address: "Andheri West, Mumbai, Maharashtra",
    phone: "+91-8828104056",
  },
  {
    city: "Bhilwara",
    address: "Bhilwara, Rajasthan",
    phone: "+91-8058564056",
  },
];

const QUICK_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "About Deepak", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Academy", href: "/#academy" },
  { label: "Book Appointment", href: "/booking" },
];

/* Inline style helpers for footer-specific CSS variables */
const footerTextPrimary: React.CSSProperties = {
  color: "oklch(var(--footer-foreground))",
};
const footerTextMuted: React.CSSProperties = {
  color: "oklch(var(--footer-muted))",
};
const footerBorder: React.CSSProperties = {
  borderColor: "oklch(var(--footer-border))",
};
const footerIconBg: React.CSSProperties = {
  backgroundColor: "oklch(var(--footer-border) / 0.6)",
  borderColor: "oklch(var(--footer-border))",
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="border-t"
      style={{
        backgroundColor: "oklch(var(--footer-background))",
        borderColor: "oklch(var(--footer-border))",
      }}
      data-ocid="footer"
    >
      {/* Gold accent top strip */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex flex-col mb-5 group">
              <span
                className="font-display font-black text-2xl leading-tight transition-smooth"
                style={footerTextPrimary}
              >
                <span className="tracking-[0.25em]">MASTER</span>{" "}
                <span className="text-gradient-gold tracking-[0.15em]">
                  DEEPAK
                </span>
              </span>
              <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-accent/70 leading-tight mt-0.5">
                Hair Expert
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-5 max-w-xs"
              style={footerTextMuted}
            >
              India's premier hair education brand. Cut, Color & Chemical —
              transforming hair artistry across India.
            </p>

            {/* Tagline badge */}
            <div className="badge-gold mb-6">
              <Scissors className="w-3 h-3" />
              Cut, Color & Chemical
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/masterdeepakhairexpert"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-ocid="footer-instagram"
                className="w-10 h-10 rounded-sm border flex items-center justify-center hover:text-accent hover:border-accent/50 transition-smooth"
                style={{ ...footerIconBg, color: "oklch(var(--footer-muted))" }}
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@masterdeepakhairexpert"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                data-ocid="footer-youtube"
                className="w-10 h-10 rounded-sm border flex items-center justify-center transition-smooth hover:text-destructive hover:border-destructive/50"
                style={{ ...footerIconBg, color: "oklch(var(--footer-muted))" }}
              >
                <SiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-5">
              Our Locations
            </h3>
            <div className="space-y-6">
              {LOCATIONS.map(({ city, address, phone }) => (
                <div key={city}>
                  <div
                    className="text-sm font-semibold mb-1.5"
                    style={footerTextPrimary}
                  >
                    {city}
                  </div>
                  <div className="flex items-start gap-2 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent/70 mt-0.5 flex-shrink-0" />
                    <address
                      className="not-italic text-xs leading-relaxed"
                      style={footerTextMuted}
                    >
                      {address}
                    </address>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-accent/70 flex-shrink-0" />
                    <a
                      href={`tel:${phone.replace(/-/g, "")}`}
                      className="text-xs hover:text-accent transition-smooth"
                      style={footerTextMuted}
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  {href.startsWith("/") && !href.startsWith("/#") ? (
                    <Link
                      to={href}
                      className="text-sm hover:text-accent transition-smooth"
                      style={footerTextMuted}
                    >
                      {label}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      className="text-sm hover:text-accent transition-smooth"
                      style={footerTextMuted}
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-5">
              Get Started
            </h3>
            <p className="text-sm mb-5 leading-relaxed" style={footerTextMuted}>
              Ready for a transformation? Book your appointment with Master
              Deepak today.
            </p>
            <Link to="/booking">
              <button
                type="button"
                className="btn-cta w-full justify-center mb-3"
                data-ocid="footer-book-cta"
              >
                Book Appointment
              </button>
            </Link>
            <a
              href="https://www.youtube.com/@masterdeepakhairexpert"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer-youtube-cta"
              className="inline-flex items-center justify-center gap-2 w-full px-7 py-3 rounded-sm font-semibold tracking-wide text-sm uppercase border transition-smooth hover:border-accent/60 hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              style={{
                color: "oklch(var(--footer-foreground))",
                borderColor: "oklch(var(--footer-border))",
              }}
            >
              <SiYoutube className="w-3.5 h-3.5 text-destructive" />
              Watch on YouTube
            </a>

            {/* Academy note */}
            <div
              className="mt-5 pt-5 border-t"
              style={{ borderColor: "oklch(var(--footer-border) / 0.6)" }}
            >
              <p className="text-xs leading-relaxed" style={footerTextMuted}>
                <span className="text-accent font-medium">
                  Master Scissor Academy
                </span>{" "}
                — Professional hair training programs with franchise
                opportunities across India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={footerBorder}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={footerTextMuted}>
            © {year} Master Deepak Hair Expert. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs" style={footerTextMuted}>
              Cut, Color &amp; Chemical · Mumbai &amp; Bhilwara
            </p>
            <a
              href="/admin"
              data-ocid="footer-admin-link"
              className="text-[10px] opacity-30 hover:opacity-60 transition-smooth"
              style={footerTextMuted}
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
