import { Layout } from "@/components/Layout";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ChevronRight,
  Flame,
  Instagram,
  MapPin,
  Play,
  Scissors,
  Star,
  Youtube,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Constants ────────────────────────────────────────────────────────────────

const YOUTUBE_URL = "https://www.youtube.com/@masterdeepakhairexpert";
const INSTAGRAM_URL = "https://www.instagram.com/masterdeepakhairexpert";

const SERVICES = [
  {
    id: 1,
    name: "Butterfly Haircut",
    slug: "butterfly-haircut",
    icon: "🦋",
    description:
      "Signature featherlight layers that frame the face with dramatic flair. Deepak's most iconic cut.",
  },
  {
    id: 2,
    name: "Signature Haircut",
    slug: "signature-haircut",
    icon: "✂️",
    description:
      "Precision scissor work crafted for your bone structure — a cut that speaks confidence.",
  },
  {
    id: 3,
    name: "Wolf Haircut",
    slug: "wolf-haircut",
    icon: "🐺",
    description:
      "Edgy textured layers with lived-in movement. For those who own every room they walk into.",
  },
  {
    id: 4,
    name: "Round Layers",
    slug: "round-layers",
    icon: "💫",
    description:
      "Soft, bouncy layers that add body and movement. Timeless elegance meets modern technique.",
  },
  {
    id: 5,
    name: "Rhombus Cut",
    slug: "rhombus-cut",
    icon: "💎",
    description:
      "Geometric precision and artistic shaping — the signature innovation from Master Scissor Academy.",
  },
  {
    id: 6,
    name: "Hair Color",
    slug: "hair-color",
    icon: "🎨",
    description:
      "Balayage, highlights, ombre, and vivid color transformations. Results that stop traffic.",
  },
  {
    id: 7,
    name: "Chemical Treatments",
    slug: "chemical-treatments",
    icon: "⚗️",
    description:
      "Keratin smoothing, rebonding, and protein treatments for salon-glossy hair that lasts months.",
  },
];

const GALLERY_IMAGES = [
  {
    id: 1,
    url: "/assets/images/gallery-1.jpg",
    alt: "Master Deepak - Hair Styling",
    label: "Hair Styling",
  },
  {
    id: 2,
    url: "/assets/images/gallery-2.jpg",
    alt: "Master Deepak - Hair Transformation",
    label: "Hair Transformation",
  },
  {
    id: 3,
    url: "/assets/images/gallery-3.jpg",
    alt: "Master Deepak applying spray to silver-grey wavy hair",
    label: "Silver Transformation",
  },
  {
    id: 4,
    url: "/assets/images/gallery-4.jpg",
    alt: "Master Deepak with woman sporting bold pink and blonde edgy haircut",
    label: "Bold Transformation",
  },
  {
    id: 5,
    url: "/assets/images/gallery-5.jpg",
    alt: "Master Deepak with client with warm brown caramel ombre wavy hair",
    label: "Ombre Transformation",
  },
  {
    id: 6,
    url: "/assets/images/gallery-6.jpg",
    alt: "Master Deepak with silver-grey curly bob",
    label: "Silver Grey Curly Bob",
  },
  {
    id: 7,
    url: "/assets/images/gallery-7.jpg",
    alt: "Master Deepak with a woman with voluminous natural brown curly hair with caramel highlights",
    label: "Natural Curls & Caramel Highlights",
  },
  {
    id: 8,
    url: "/assets/images/gallery-8.jpg",
    alt: "Master Deepak — silver-grey and blonde balayage back view",
    label: "Silver-Grey Balayage",
  },
];

const STATS = [
  { value: "219K+", label: "YouTube Subscribers" },
  { value: "498+", label: "Tutorial Videos" },
  { value: "15+", label: "Years Experience" },
  { value: "Pan India", label: "Academy Presence" },
];

const LOCATIONS = [
  {
    city: "Mumbai",
    address: "A-60 MIG Col. Veera Desai Road, Azad Nagar, Andheri (West)",
    phone: "+91-8828104056",
  },
  {
    city: "Bhilwara, Rajasthan",
    address: "Master Scissor The Family Salon, Bhilwara",
    phone: "+91-8058564056",
  },
];

// ─── Section Heading ──────────────────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 lg:mb-20 ${isCenter ? "text-center" : ""}`}
    >
      <p className={`section-label text-accent mb-3 ${isCenter ? "" : ""}`}>
        {eyebrow}
      </p>
      <span className={`gold-rule${isCenter ? "" : "-left"} mb-4`} />
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-[-0.02em] leading-tight mt-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed tracking-[0.01em] ${isCenter ? "max-w-xl mx-auto" : "max-w-xl"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-card border border-border border-l-2 border-l-accent/40 rounded-sm p-8 flex flex-col gap-4 hover:border-l-accent hover:border-accent/50 hover:shadow-gold-sm transition-smooth cursor-default"
      data-ocid={`service-card-${service.id}`}
    >
      {/* Gold accent bar top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

      <div className="text-3xl">{service.icon}</div>
      <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-[-0.01em] leading-tight">
        {service.name}
      </h3>
      <p className="text-base text-muted-foreground leading-relaxed tracking-[0.01em] flex-1">
        {service.description}
      </p>
      <Link
        to="/booking"
        search={{ service: service.slug }}
        data-ocid={`service-book-${service.id}`}
      >
        <button
          type="button"
          className="btn-cta text-xs px-5 py-2 w-full justify-center"
        >
          Book Now
        </button>
      </Link>
    </motion.div>
  );
}

// ─── Gallery Image ────────────────────────────────────────────────────────────

function GalleryImage({
  image,
  index,
}: {
  image: (typeof GALLERY_IMAGES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group relative overflow-hidden rounded-sm aspect-square bg-card border border-border hover:border-accent/40 transition-smooth"
      data-ocid={`gallery-img-${image.id}`}
    >
      <img
        src={image.url}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      {/* Golden overlay on hover */}
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-smooth" />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-smooth">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
          {image.label}
        </span>
      </div>
      {/* Gold corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent/70 opacity-0 group-hover:opacity-100 transition-smooth" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent/70 opacity-0 group-hover:opacity-100 transition-smooth" />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Home() {
  return (
    <Layout>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=90')",
          }}
        />
        {/* Light overlays for premium feel on light theme */}
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background/95" />
        {/* Decorative gold shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 lg:pt-24">
          {/* Brand label */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-accent/60" />
            <span className="badge-gold">Master Scissor The Family Salon</span>
            <div className="h-px w-12 bg-accent/60" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-display font-bold text-foreground leading-[0.88] tracking-tight mb-6 text-balance"
            style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
          >
            <span className="text-gradient-gold">Cut, Color</span>
            <br />
            <span className="text-foreground">&amp; Chemical</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed tracking-[0.01em]"
          >
            India's premier hair education brand led by{" "}
            <span className="text-accent font-semibold">Deepak Sen</span> —
            celebrity hair expert, educator, and founder of Master Scissor
            Academy. Mumbai · Bhilwara · Pan India.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/booking" data-ocid="hero-book-cta">
              <button
                type="button"
                className="btn-cta text-sm px-12 py-4 shadow-red"
              >
                Book Appointment
              </button>
            </Link>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero-youtube-cta"
            >
              <button
                type="button"
                className="btn-secondary text-sm px-10 py-4 flex items-center gap-2"
              >
                <Youtube className="w-5 h-5 text-destructive" />
                Watch on YouTube
              </button>
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 pt-8 border-t border-border/40"
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold">
                  {value}
                </div>
                <div className="section-label text-muted-foreground mt-1">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 lg:py-32 bg-card border-y border-border scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image — premium framed portrait */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div
                className="relative overflow-hidden aspect-[4/5] bg-muted ring-2 ring-accent/40 ring-offset-4 ring-offset-card"
                style={{ borderRadius: 0 }}
              >
                <img
                  src="/assets/images/hero-new.jpg"
                  alt="Master Deepak — Hair Expert"
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
              </div>
              {/* Gold corner frame */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-accent/70" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-accent/70" />
              {/* Badge */}
              <div className="absolute bottom-8 left-8 badge-gold flex items-center gap-2">
                <Star className="w-3 h-3 fill-accent" />
                India's Top Hair Educator
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <div>
                <p className="section-label text-accent mb-3">
                  About the Expert
                </p>
                <span className="gold-rule-left mb-4" />
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-[-0.02em] leading-tight mt-4">
                  Master
                  <br />
                  <span className="text-gradient-gold">Deepak Sen</span>
                </h2>
              </div>

              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed tracking-[0.01em]">
                With over 15 years of mastery in hair artistry, Deepak Sen has
                trained thousands of professionals across India through his
                acclaimed{" "}
                <span className="text-accent font-semibold">
                  Master Scissor Academy
                </span>
                . Known for pioneering the Butterfly Cut, Rhombus Cut, and Wolf
                Cut techniques that have taken Instagram by storm.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed tracking-[0.01em]">
                Featured in seminars pan-India, his YouTube channel boasts 219K+
                subscribers and nearly 500 tutorial videos — making world-class
                hair education accessible to every stylist.
              </p>

              {/* Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {[
                  { icon: Award, text: "Master Scissor Academy Founder" },
                  { icon: BookOpen, text: "498+ Tutorial Videos" },
                  { icon: Flame, text: "Signature Cut Techniques" },
                  { icon: Zap, text: "Pan-India Seminar Speaker" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <div className="w-8 h-8 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="tracking-[0.01em]">{text}</span>
                  </div>
                ))}
              </div>

              {/* Locations */}
              <div className="border-t border-border pt-5 flex flex-col gap-3">
                {LOCATIONS.map((loc) => (
                  <div key={loc.city} className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-foreground tracking-[0.01em]">
                        {loc.city}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {loc.address}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="py-24 lg:py-32 bg-background scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Expertise & Craft"
            title={<>Our Services</>}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SERVICES.slice(0, 4).map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8 max-w-4xl mx-auto">
            {SERVICES.slice(4).map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i + 4} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link to="/booking" data-ocid="services-book-cta">
              <button
                type="button"
                className="btn-cta text-sm px-14 py-4 shadow-red"
              >
                Book Your Service
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY / INSTAGRAM ───────────────────────────────────────────── */}
      <section
        id="gallery"
        className="py-24 lg:py-32 bg-muted/20 border-y border-border scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Hair Transformations"
            title={<>The Gallery</>}
            subtitle="Real transformations, real results. Every cut tells a story."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {GALLERY_IMAGES.map((image, i) => (
              <GalleryImage key={image.id} image={image} index={i} />
            ))}
          </div>

          {/* Instagram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="instagram-follow-cta"
            >
              <button
                type="button"
                className="btn-primary text-sm px-10 py-3.5 flex items-center gap-2 mx-auto"
              >
                <Instagram className="w-4 h-4" />
                Follow @masterdeepakhairexpert on Instagram
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── YOUTUBE ───────────────────────────────────────────────────────── */}
      <section id="youtube" className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="219K+ Subscribers"
            title={<>YouTube Channel</>}
            subtitle="498+ tutorials covering haircuts, coloring, chemical treatments, and business education for professional stylists."
          />

          {/* Featured video — channel card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-4xl mx-auto"
          >
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="youtube-channel-card"
              className="group block rounded-sm overflow-hidden border border-border shadow-elevated hover:border-accent/50 transition-smooth"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent z-10" />
              {/* Channel preview banner */}
              <div className="relative aspect-video bg-card flex flex-col items-center justify-center gap-6 px-8">
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-card to-background/80" />
                <div className="relative z-10 flex flex-col items-center gap-5">
                  {/* Play button */}
                  <div className="w-20 h-20 rounded-full bg-destructive/90 border-2 border-destructive flex items-center justify-center shadow-red group-hover:scale-110 transition-smooth">
                    <Play className="w-8 h-8 text-destructive-foreground fill-destructive-foreground ml-1" />
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em]">
                      @masterdeepakhairexpert
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 tracking-[0.01em]">
                      219K+ Subscribers · 498+ Videos · Watch on YouTube
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-2 rounded-sm bg-destructive/90 border border-destructive text-destructive-foreground text-sm font-bold uppercase tracking-[0.12em]">
                    <Youtube className="w-4 h-4" />
                    Open Channel
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Video feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {[
              {
                title: "Haircut Tutorials",
                desc: "Step-by-step butterfly, wolf, and signature cuts for professionals.",
                icon: Scissors,
              },
              {
                title: "Color Masterclass",
                desc: "Advanced balayage, highlights, and vivid color techniques.",
                icon: Flame,
              },
              {
                title: "Academy Training",
                desc: "Business and technical training for aspiring hair educators.",
                icon: BookOpen,
              },
            ].map(({ title, desc, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-premium flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground uppercase tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed tracking-[0.01em]">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="youtube-channel-cta"
            >
              <button
                type="button"
                className="btn-secondary text-sm px-10 py-3.5 flex items-center gap-2 mx-auto hover:border-destructive/60 hover:text-destructive"
              >
                <Youtube className="w-4 h-4 text-destructive" />
                Visit Channel · @masterdeepakhairexpert
                <ChevronRight className="w-4 h-4" />
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── ACADEMY ───────────────────────────────────────────────────────── */}
      <section
        id="academy"
        className="py-24 lg:py-32 bg-card border-y border-border scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Education & Training"
            title={
              <>
                Master Scissor
                <br />
                <span className="text-gradient-gold">Academy</span>
              </>
            }
            subtitle="India's most comprehensive hair education program — conducted at our flagship salons in Mumbai and Bhilwara, with workshop tours spanning the entire country."
          />

          {/* Course cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Course 1 */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-background border border-border border-l-2 border-l-accent/40 rounded-sm p-8 flex flex-col gap-5 hover:border-l-accent hover:border-accent/50 hover:shadow-gold-sm transition-smooth"
              data-ocid="academy-course-female"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💇‍♀️</span>
                </div>
                <span className="badge-gold text-[10px]">1 Month · Online</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground tracking-[-0.02em] mb-2 leading-snug">
                  1-Month Online Advance
                  <br />
                  Hair Course (Females)
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed tracking-[0.01em]">
                  A comprehensive online program designed for women aspiring to
                  master advanced haircut, color, and chemical techniques. Learn
                  butterfly cuts, balayage, keratin treatments, and professional
                  styling from Master Deepak — at your own pace, anywhere in
                  India.
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {[
                  "Advanced cutting techniques (butterfly, layers, wolf)",
                  "Hair color — balayage, highlights, vivid",
                  "Chemical treatments & keratin",
                  "Live Q&A sessions with Master Deepak",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-foreground tracking-[0.01em]"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/918058564056?text=I'm interested in the 1-Month Online Advance Hair Course (Females)"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="academy-enroll-female"
                className="mt-auto"
              >
                <button
                  type="button"
                  className="btn-cta w-full justify-center shadow-red"
                >
                  Enroll via WhatsApp
                </button>
              </a>
            </motion.div>

            {/* Course 2 */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="group relative bg-background border border-border border-l-2 border-l-accent/40 rounded-sm p-8 flex flex-col gap-5 hover:border-l-accent hover:border-accent/50 hover:shadow-gold-sm transition-smooth"
              data-ocid="academy-course-male"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💇‍♂️</span>
                </div>
                <span className="badge-gold text-[10px]">
                  45 Days · In-Person
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground tracking-[-0.02em] mb-2 leading-snug">
                  45-Day Male
                  <br />
                  Hairdressing Course
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed tracking-[0.01em]">
                  An intensive in-person course built for aspiring male stylists
                  and barbers. Master scissor work, fades, beard grooming, and
                  signature men's haircut techniques under direct mentorship at
                  our Mumbai or Bhilwara academy.
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {[
                  "Scissor mastery & precision fades",
                  "Beard grooming & shaping",
                  "Signature men's cuts (rhombus, wolf)",
                  "Salon setup & business fundamentals",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-foreground tracking-[0.01em]"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/918058564056?text=I'm interested in the 45-Day Male Hairdressing Course"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="academy-enroll-male"
                className="mt-auto"
              >
                <button
                  type="button"
                  className="btn-cta w-full justify-center shadow-red"
                >
                  Enroll via WhatsApp
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
