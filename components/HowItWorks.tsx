const steps = [
  {
    number: "01",
    title: "Choose Your Route",
    description:
      "Select your pickup and drop-off location — airport, hotel, or city centre across Douala and Yaoundé.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <circle cx="12" cy="11" r="3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Select Your Car",
    description:
      "Choose between our Confort fleet (SUVs, Lexus) or Confort Plus range (Mercedes, ultra-premium vehicles).",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Confirm Booking",
    description:
      "Send us a WhatsApp message or call directly. We confirm within minutes and handle every last detail.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section-padding bg-obsidian-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="section-label block mb-4">The Process</span>
          <h2 className="section-title text-white mb-4">
            How It{" "}
            <span className="text-gold-500 italic">Works</span>
          </h2>
          <div className="gold-divider-wide mx-auto mt-6" />
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-12 left-[16.666%] right-[16.666%] h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center lg:px-10"
              >
                {/* Circle with number */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full border border-gold-500/30 flex items-center justify-center bg-obsidian-800 relative z-10">
                    <div className="w-16 h-16 rounded-full border border-gold-500/20 flex items-center justify-center">
                      <span
                        className="text-gold-500 text-2xl font-light"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full bg-gold-500/5 blur-xl" />
                </div>

                {/* Icon */}
                <div className="text-gold-500/70 mb-4">{step.icon}</div>

                {/* Title */}
                <h3
                  className="text-white text-xl font-light mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>

                {/* Divider */}
                <div className="gold-divider mx-auto mb-4" />

                {/* Description */}
                <p className="text-white/45 text-xs leading-relaxed font-body max-w-xs tracking-wide">
                  {step.description}
                </p>

                {/* Mobile connector arrow */}
                {i < steps.length - 1 && (
                  <div className="sm:hidden mt-6 text-gold-500/30 text-2xl">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
