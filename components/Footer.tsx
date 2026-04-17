export default function Footer() {
  const year = new Date().getFullYear();

  const cities = [
    { name: "Douala", detail: "Douala International Airport (DLA)" },
    { name: "Yaoundé", detail: "Yaoundé Nsimalen Airport (YAO)" },
  ];

  return (
    <footer id="footer" className="bg-obsidian-800 border-t border-gold-500/10">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <span
                className="text-gold-500 text-2xl font-light block leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Royal Drive
              </span>
              <span
                className="text-white/30 text-[9px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Cameroun
              </span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed font-body max-w-xs tracking-wide">
              The premier luxury chauffeur service in Cameroon. Precision,
              discretion, and elegance — on every journey.
            </p>
          </div>

          {/* Cities */}
          <div>
            <h4 className="section-label mb-5">Cities Served</h4>
            <ul className="space-y-4">
              {cities.map((city) => (
                <li key={city.name}>
                  <span
                    className="text-white/70 text-sm font-light block"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {city.name}
                  </span>
                  <span className="text-white/30 text-[10px] tracking-wide">
                    {city.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="section-label mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                "Airport Transfers",
                "Corporate Travel",
                "City to City",
                "VIP Escort",
                "Event Transport",
              ].map((service) => (
                <li key={service}>
                  <span className="text-white/40 text-xs hover:text-gold-500 transition-colors cursor-default tracking-wide font-body">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="section-label mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PhoneIcon />
                <div>
                  <span className="text-white/60 text-xs block font-body tracking-wide">
                    +237 6XX XXX XXX
                  </span>
                  <span className="text-white/25 text-[10px]">24/7 Available</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon />
                <div>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent("Hello, I would like to book a transfer.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-500 text-xs font-body tracking-wide hover:text-gold-400 transition-colors"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapIcon />
                <span className="text-white/40 text-xs font-body tracking-wide">
                  Douala & Yaoundé,
                  <br />
                  Cameroon
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/20 text-[10px] tracking-widest uppercase font-body">
          © {year} Royal Drive Cameroun. All rights reserved.
        </p>
        <p className="text-white/15 text-[10px] tracking-widest uppercase font-body">
          Luxury · Precision · Discretion
        </p>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4 text-gold-500/60 flex-shrink-0 mt-0.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-gold-500/60 fill-current flex-shrink-0 mt-0.5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4 text-gold-500/60 flex-shrink-0 mt-0.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  );
}
