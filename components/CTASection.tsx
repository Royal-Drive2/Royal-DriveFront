import Image from "next/image";

export default function CTASection() {
  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to book a premium transfer with Royal Drive Cameroun."
  );

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Luxury car interior"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian-900/85" />
        {/* Gold tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-gold-500/5" />
      </div>

      {/* Border accents */}
      <div className="absolute inset-8 sm:inset-12 border border-gold-500/15 pointer-events-none z-10" />
      <div className="absolute inset-10 sm:inset-14 border border-gold-500/5 pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 section-padding text-center">
        <div className="max-w-3xl mx-auto">
          <span className="section-label block mb-6">Ready to Travel</span>

          <h2 className="section-title text-white mb-4 text-shadow-gold">
            Book Your{" "}
            <em className="text-gold-500 not-italic">Premium</em>
            <br />
            Ride Now
          </h2>

          <div className="gold-divider-wide mx-auto my-6" />

          <p className="text-white/50 text-sm leading-relaxed font-body mb-10 max-w-lg mx-auto tracking-wide">
            From Douala International to Yaoundé Nsimalen — and everywhere in
            between. One message is all it takes to travel in true luxury.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/237683180957?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 text-xs flex items-center justify-center gap-3"
            >
              <WhatsAppIconSmall />
              Book via WhatsApp
            </a>
            <a
              href="tel:+237683180957"
              className="btn-outline-gold px-10 py-4 text-xs flex items-center justify-center gap-3"
            >
              <PhoneIcon />
              Call Us Directly
            </a>
          </div>

          {/* Trust badge */}
          <p className="text-white/25 text-[10px] tracking-widest uppercase mt-10">
            Available in Douala & Yaoundé · 24 hours a day · 7 days a week
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIconSmall() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
