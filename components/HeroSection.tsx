import Image from "next/image";

export default function HeroSection() {
  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to book a transfer with Royal Drive Cameroun."
  );
  const whatsappUrl = `https://wa.me/237683180957?text=${whatsappMessage}`;

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* <Image
          src="https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1920&q=85"
          alt="Luxury chauffeur car on Cameroon road"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        /> */}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 overlay-dark" />
        {/* Extra bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-obsidian-900 to-transparent" />
      </div>

      {/* Gold corner accent — top right */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold-500/60 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-gold-500/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 pb-24 md:pb-32 pt-32 w-full">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <div className="gold-divider" />
          <span className="section-label">Premium Chauffeur Service</span>
          <div className="gold-divider" />
        </div>

        {/* Main Title */}
        <h1
          className="section-title text-white text-shadow-gold mb-6 max-w-3xl animate-float-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          Luxury Airport{" "}
          <em className="text-gold-500 not-italic">Transfers</em>
          <br />
          in Cameroon
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-white/55 text-sm sm:text-base max-w-lg leading-relaxed mb-10 tracking-wide animate-float-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          Experience seamless, discreet travel between Douala &amp; Yaoundé.
          Our professional chauffeurs ensure every journey reflects the standard
          you deserve.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-float-up"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <a href="#services" className="btn-gold px-8 py-4 text-xs text-center">
            Book Now
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-8 py-4 text-xs text-center flex items-center justify-center gap-3"
          >
            <WhatsAppIcon />
            Contact via WhatsApp
          </a>
        </div>

        {/* Stats row */}
        <div
          className="flex gap-8 sm:gap-12 mt-16 pt-8 border-t border-white/10 animate-fade-in"
          style={{ animationDelay: "1.1s", opacity: 0 }}
        >
          {[
            { value: "24/7", label: "Availability" },
            { value: "2", label: "Major Cities" },
            { value: "100%", label: "Premium Fleet" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="text-gold-500 text-xl sm:text-2xl font-light"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div className="text-white/40 text-[10px] tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-white/30 text-[9px] tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gold-500/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
