"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Types
type TransferType = "airport_to_dest" | "dest_to_airport" | "";
type CityType     = "Douala" | "Yaoundé" | "";
type PackType     = "comfort" | "comfort_plus" | "";

interface BookingData {
  transferType:   TransferType;
  city:           CityType;
  date:           string;
  time:           string;
  passengers:     number;
  luggage:        number;
  pack:           PackType;
  firstName:      string;
  lastName:       string;
  email:          string;
  phone:          string;
  pickupAddress:  string;
  dropoffAddress: string;
}

const INITIAL: BookingData = {
  transferType: "", city: "", date: "", time: "",
  passengers: 1, luggage: 1, pack: "",
  firstName: "", lastName: "", email: "", phone: "",
  pickupAddress: "", dropoffAddress: "",
};

const inputCls = "w-full bg-obsidian-600 border border-obsidian-600 rounded-md px-4 py-3 text-white font-body text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none placeholder:text-white/30";
const selectCls = "w-full bg-obsidian-800 border border-obsidian-600 rounded-md px-4 py-3 text-white font-body text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none";

function PlaneIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function PinIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12 overflow-x-auto pb-2">
      {Array.from({ length: total }).map((_, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={n} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              active || done ? "bg-gradient-to-br from-gold-400 to-gold-600 text-obsidian-700" : "bg-obsidian-700 text-white"
            }`}>
              {n}
            </div>
            {n < total && (
              <div className={`w-12 sm:w-16 h-0.5 transition-colors duration-500 ${
                done ? "bg-gradient-to-r from-gold-400 to-gold-600" : "bg-obsidian-700"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Step 1
function Step1({ data, setData, onNext }: { data: BookingData; setData: (p: Partial<BookingData>) => void; onNext: () => void }) {
  const t = useTranslations("booking.step1");
  const options: { key: TransferType; label: string }[] = [
    { key: "airport_to_dest", label: t("airportToDest") },
    { key: "dest_to_airport", label: t("destToAirport") },
  ];
  return (
    <div className="space-y-4">
      <h3 className="font-display text-2xl font-bold text-gold-500">{t("title")}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map(({ key, label }) => (
          <button key={key}
            onClick={() => { setData({ transferType: key }); onNext(); }}
            className={`p-6 rounded-lg border text-left transition-all ${
              data.transferType === key ? "border-gold-500/60 bg-gold-500/10" : "border-obsidian-600 bg-obsidian-800 hover:border-gold-500/40"
            }`}>
            <PlaneIcon className="w-6 h-6 text-gold-500 mb-2" />
            <p className="font-body font-semibold text-white">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 2
function Step2({ data, setData, onNext }: { data: BookingData; setData: (p: Partial<BookingData>) => void; onNext: () => void }) {
  const t = useTranslations("booking.step2");
  const cities: CityType[] = ["Douala", "Yaoundé"];
  return (
    <div className="space-y-4">
      <h3 className="font-display text-2xl font-bold text-gold-500">{t("title")}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {cities.map((city) => (
          <button key={city}
            onClick={() => { setData({ city }); onNext(); }}
            className={`p-6 rounded-lg border text-left transition-all ${
              data.city === city ? "border-gold-500/60 bg-gold-500/10" : "border-obsidian-600 bg-obsidian-800 hover:border-gold-500/40"
            }`}>
            <PinIcon className="w-6 h-6 text-gold-500 mb-2" />
            <p className="font-body font-semibold text-white">{city}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 3
function Step3({ data, setData }: { data: BookingData; setData: (p: Partial<BookingData>) => void }) {
  const t = useTranslations("booking.step3");
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="space-y-6">
      <h3 className="font-display text-2xl font-bold text-gold-500">{t("title")}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-sm text-white/50 block mb-2">{t("date")}</label>
          <input type="date" min={today} value={data.date}
            onChange={(e) => setData({ date: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="font-body text-sm text-white/50 block mb-2">{t("time")}</label>
          <input type="time" value={data.time}
            onChange={(e) => setData({ time: e.target.value })} className={inputCls} />
        </div>
      </div>
    </div>
  );
}

// Step 4
function Step4({ data, setData }: { data: BookingData; setData: (p: Partial<BookingData>) => void }) {
  const t = useTranslations("booking.step4");
  return (
    <div className="space-y-6">
      <h3 className="font-display text-2xl font-bold text-gold-500">{t("title")}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-sm text-white/50 block mb-2">{t("passengers")}</label>
          <select value={data.passengers}
            onChange={(e) => setData({ passengers: Number(e.target.value) })}
            className={selectCls}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n} className="bg-obsidian-900">
                {n > 1 ? t("passengers_plural", { n }) : t("passenger", { n })}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-body text-sm text-white/50 block mb-2">{t("luggage")}</label>
          <select value={data.luggage}
            onChange={(e) => setData({ luggage: Number(e.target.value) })}
            className={selectCls}>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n} className="bg-obsidian-900">
                {n > 1 ? t("baggage_plural", { n }) : t("baggage", { n })}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// Step 5
function Step5({ data, setData }: { data: BookingData; setData: (p: Partial<BookingData>) => void }) {
  const t = useTranslations("booking.step5");
  const tServices = useTranslations("services");

  const packs = [
    {
      key: "comfort" as PackType,
      name: tServices("comfort.tier"),
      image: "/images/packs/comfort-plus.jpg",
      desc: "Toyota Yaris & similaires",
      price: tServices("comfort.price"),
    },
    {
      key: "comfort_plus" as PackType,
      name: tServices("comfortPlus.tier"),
      image: "/images/packs/comfort.jpg",
      desc: "Mercedes, Lexus, Fortuner",
      price: tServices("comfortPlus.price"),
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-display text-2xl font-bold text-gold-500">{t("title")}</h3>
      <div className="grid sm:grid-cols-2 gap-6">
        {packs.map(({ key, name, image, desc, price }) => (
          <button key={key} onClick={() => setData({ pack: key })}
            className={`rounded-lg border overflow-hidden text-left transition-all ${
              data.pack === key ? "border-gold-500/60" : "border-obsidian-600 hover:border-gold-500/40"
            }`}>
            <div className="relative w-full aspect-video">
              <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              {data.pack === key && <div className="absolute inset-0 bg-gold-500/10" />}
            </div>
            <div className="p-5 bg-obsidian-800">
              <p className="font-display text-xl font-bold text-white">{name}</p>
              <p className="text-white/50 font-body text-sm mt-1">{desc}</p>
              <p className="text-gold-500 font-display font-semibold mt-2">{price}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 6
function Step6({ data, setData }: { data: BookingData; setData: (p: Partial<BookingData>) => void }) {
  const t = useTranslations("booking.step6");
  return (
    <div className="space-y-6">
      <h3 className="font-display text-2xl font-bold text-gold-500">{t("title")}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-sm text-white/50 block mb-2">{t("firstName")}</label>
          <input type="text" value={data.firstName} required
            onChange={(e) => setData({ firstName: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="font-body text-sm text-white/50 block mb-2">{t("lastName")}</label>
          <input type="text" value={data.lastName} required
            onChange={(e) => setData({ lastName: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="font-body text-sm text-white/50 block mb-2">{t("email")}</label>
          <input type="email" value={data.email} required
            onChange={(e) => setData({ email: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="font-body text-sm text-white/50 block mb-2">{t("phone")}</label>
          <input type="tel" value={data.phone} required
            onChange={(e) => setData({ phone: e.target.value })} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="font-body text-sm text-white/50 block mb-2">{t("pickup")}</label>
        <input type="text" value={data.pickupAddress} required
          onChange={(e) => setData({ pickupAddress: e.target.value })} className={inputCls} />
      </div>
      <div>
        <label className="font-body text-sm text-white/50 block mb-2">{t("dropoff")}</label>
        <input type="text" value={data.dropoffAddress} required
          onChange={(e) => setData({ dropoffAddress: e.target.value })} className={inputCls} />
      </div>
    </div>
  );
}

// Step 7
function Step7({ data }: { data: BookingData }) {
  const t  = useTranslations("booking.step7");
  const tWa = useTranslations("booking.whatsapp");

  const transferLabel: Record<string, string> = {
    airport_to_dest: useTranslations("booking.step1")("airportToDest"),
    dest_to_airport: useTranslations("booking.step1")("destToAirport"),
  };

  const packLabel: Record<string, string> = {
    comfort:      t("packComfort"),
    comfort_plus: t("packComfortPlus"),
  };

  const rows = [
    { label: t("transfer"),   value: transferLabel[data.transferType] ?? "—" },
    { label: t("city"),       value: data.city || "—" },
    { label: t("date"),       value: data.date || "—" },
    { label: t("time"),       value: data.time || "—" },
    { label: t("passengers"), value: String(data.passengers) },
    { label: t("pack"),       value: packLabel[data.pack] ?? "—" },
    { label: t("name"),       value: `${data.firstName} ${data.lastName}`.trim() || "—" },
    { label: t("email"),      value: data.email || "—" },
    { label: t("phone"),      value: data.phone || "—" },
  ];

  const waMsg = encodeURIComponent(
    [
      tWa("header"),
      `${tWa("transfer")} : ${transferLabel[data.transferType] ?? "—"}`,
      `${tWa("city")} : ${data.city}`,
      `${tWa("datetime")} : ${data.date} à ${data.time}`,
      `${tWa("passengersLuggage")} : ${data.passengers} | ${data.luggage}`,
      `${tWa("pack")} : ${packLabel[data.pack] ?? "—"}`,
      `${tWa("name")} : ${data.firstName} ${data.lastName}`,
      `${tWa("email")} : ${data.email}`,
      `${tWa("phone")} : ${data.phone}`,
      data.pickupAddress  ? `${tWa("pickup")} : ${data.pickupAddress}`  : "",
      data.dropoffAddress ? `${tWa("dropoff")} : ${data.dropoffAddress}` : "",
    ].filter(Boolean).join("\n")
  );

  return (
    <div className="space-y-6">
      <h3 className="font-display text-2xl font-bold text-gold-500">{t("title")}</h3>

      <div className="bg-obsidian-800 border border-obsidian-600 rounded-lg p-6 space-y-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between font-body text-sm">
            <span className="text-white/50">{label}</span>
            <span className="text-white font-medium">{value}</span>
          </div>
        ))}
      </div>

      <div className="bg-obsidian-700 border border-obsidian-600 rounded-lg p-5">
        <p className="font-body text-sm text-white/60">
          💳 <strong className="text-white">{t("payment")}</strong>
          {" "}— {t("paymentOptions")}
        </p>
        <p className="font-body text-xs text-white/40 mt-3 leading-relaxed">
          {t("paymentNote")}
        </p>
      </div>

      <a href={`https://wa.me/237683180957?text=${waMsg}`}
        target="_blank" rel="noopener noreferrer"
        className="block w-full bg-gradient-to-br from-gold-400 to-gold-600 text-obsidian-900 font-body font-bold text-lg py-4 rounded-md text-center hover:opacity-90 transition-opacity">
        {useTranslations("booking")("confirm")}
      </a>
    </div>
  );
}

// Main
export default function BookingSection() {
  const t = useTranslations("booking");
  const [step, setStep]    = useState(1);
  const [data, setDataRaw] = useState<BookingData>(INITIAL);

  const setData = (partial: Partial<BookingData>) =>
    setDataRaw((prev) => ({ ...prev, ...partial }));

  const canNext = (): boolean => {
    if (step === 1) return data.transferType !== "";
    if (step === 2) return data.city !== "";
    if (step === 3) return data.date !== "" && data.time !== "";
    if (step === 4) return true;
    if (step === 5) return data.pack !== "";
    if (step === 6) return data.firstName !== "" && data.phone !== "";
    return true;
  };

  const goNext = () => setStep((s) => s + 1);

  const stepContent: Record<number, React.ReactNode> = {
    1: <Step1 data={data} setData={setData} onNext={goNext} />,
    2: <Step2 data={data} setData={setData} onNext={goNext} />,
    3: <Step3 data={data} setData={setData} />,
    4: <Step4 data={data} setData={setData} />,
    5: <Step5 data={data} setData={setData} />,
    6: <Step6 data={data} setData={setData} />,
    7: <Step7 data={data} />,
  };

  return (
    <section id="book" className="py-24 md:py-32 bg-obsidian-600">
      <div className="container mx-auto px-4 max-w-3xl">

        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gold-500">
            {t("title")}
          </h2>
          <p className="font-body text-white/50 mt-4">{t("subtitle")}</p>
        </div>

        <StepIndicator current={step} total={7} />

        <div className="bg-obsidian-900 border border-obsidian-600 rounded-xl p-6 md:p-10">
          <div key={step}>{stepContent[step]}</div>

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button onClick={() => setStep((s) => s - 1)}
                className="font-body text-white/50 hover:text-white transition-colors">
                {t("back")}
              </button>
            ) : <div />}

            {step < 7 && step > 2 && (
              <button
                onClick={() => canNext() && setStep((s) => s + 1)}
                disabled={!canNext()}
                className={`bg-gradient-to-br from-gold-400 to-gold-600 text-obsidian-900 font-body font-semibold px-8 py-2.5 rounded-md transition-opacity ${
                  !canNext() ? "opacity-30 cursor-not-allowed" : "hover:opacity-90"
                }`}>
                {t("next")}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}