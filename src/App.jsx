import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  MapPin,
  Gift,
  Music2,
  Clock,
  Send,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SECTIONS = [
  { id: "story", label: "Nossa história" },
  { id: "schedule", label: "Cronograma" },
  { id: "location", label: "Local" },
  { id: "gifts", label: "Presentes" },
  { id: "rsvp", label: "Confirmação" },
];

// Paleta: creme + azul bebê
// Você pode trocar facilmente as cores abaixo depois, se quiser.
const COLORS = {
  creamBg: "#FFF7E6",
  creamCard: "#FFFBF2",
  blueSoft: "#BFDBFE",
  blueStrong: "#2563EB",
  textPrimary: "#1F2933",
  textMuted: "#6B7280",
};

// Dados básicos do casamento – personalize aqui
const weddingInfo = {
  coupleNames: "Sandra & Juliano",
  date: "10 de Dezembro de 2025",
  time: "16h30",
  locationName: "Rua Comerciante Ananias Nascimento",
  locationCity: "Aracaju – SE",
  locationMapsUrl: "https://www.google.com/maps/place/R.+Comerciante+Ananias+Nascimento+-+Aeroporto,+Aracaju+-+SE,+49037-696/@-10.9957672,-37.0753507,17z/data=!3m1!4b1!4m6!3m5!1s0x71ab0fcc8eff779:0xbddd23a5eae6d7d0!8m2!3d-10.9957672!4d-37.0727758!16s%2Fg%2F1ptwpjbd7?entry=ttu&g_ep=EgoyMDI1MTEzMC4wIKXMDSoASAFQAw%3D%3D", // coloque o link real aqui
  rsvpWhatsApp: "34664150974", // só números com DDI, ex: 55 + DDD + número
};

// Imagens do carrossel principal (substitua pelos links reais das fotos do casal)
const heroCarouselImages = [
  {
    id: 1,
    url: "https://i.pinimg.com/originals/29/1a/ec/291aec74c902e68755661a87b63a1c05.jpg",
    alt: "Casal sorrindo ao pôr do sol",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/originals/06/63/75/066375bff18f429c69cd07872a542797.jpg",
    alt: "Momento romântico em meio à natureza",
  },
  {
    id: 3,
    url: "https://cdn.alboompro.com/5e9f78bee716a10001d859c6_62047a31a8bc470001963d0d/original_size/pre-casamento-look.jpg?v=1",
    alt: "Casal caminhando de mãos dadas",
  },
];

// Imagens da seção "Nossa história"
const storyImages = [
  {
    id: 1,
    url: "https://cdn.alboompro.com/5e9f78bee716a10001d859c6_62047a31a8bc470001963d0d/original_size/pre-casamento-look.jpg?v=1",
    alt: "Primeiros encontros",
    title: "Primeiros encontros",
    description:
      "Tudo começou com encontros simples, conversas longas e aquela sensação boa de que algo especial estava nascendo.",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/originals/06/63/75/066375bff18f429c69cd07872a542797.jpg",
    alt: "Crescendo juntos",
    title: "Crescendo juntos",
    description:
      "Entre sonhos, desafios e conquistas, fomos aprendendo um com o outro e construindo uma história cheia de parceria e leveza.",
  },
  {
    id: 3,
    url: "https://i.pinimg.com/originals/29/1a/ec/291aec74c902e68755661a87b63a1c05.jpg",
    alt: "O grande passo",
    title: "O grande passo",
    description:
      "Agora, queremos compartilhar esse momento com quem fez parte dessa caminhada: você. Obrigado por estar aqui com a gente.",
  },
];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const App = () => {
  const [activeSection, setActiveSection] = useState("top");

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const guests = formData.get("guests")?.toString() || "1";
    const message = formData.get("message")?.toString() || "";

    const text = `Olá, somos convidados para o casamento!\n\nNome: ${name}\nNúmero de pessoas: ${guests}\nMensagem: ${message}`;
    const encoded = encodeURIComponent(text);
    window.open(
      `https://wa.me/${weddingInfo.rsvpWhatsApp}?text=${encoded}`,
      "_blank"
    );
  };

  useEffect(() => {
    const sectionIds = ["story", "schedule", "location", "gifts", "rsvp"];
    const handler = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(handler, {
      root: null,
      threshold: 0.3,
    });
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen text-slate-900"
      style={{
        background: `linear-gradient(180deg, ${COLORS.creamBg} 0%, #E0F2FF 100%)`,
      }}
    >
      {/* Fundo com shapes suaves em azul bebê */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-72 w-72 rounded-full bg-[#E0F2FF] opacity-70 blur-3xl" />
        <div className="absolute top-20 right-[-5rem] h-80 w-80 rounded-full bg-[#BFDBFE] opacity-70 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-[999px] bg-[#FDE68A] opacity-70 blur-3xl" />
      </div>

      {/* Layout principal */}
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <Header activeSection={activeSection} />

        <main className="mt-6 flex-1 space-y-24 pb-16">
          <Hero />
          <Story />
          <Schedule />
          <Location />
          <Gifts />
          <RSVPSection onSubmit={handleRSVPSubmit} />
        </main>

        <Footer />
        <FloatingMusicButton />
      </div>
    </div>
  );
};

const Header = ({ activeSection }) => {
  return (
    <header className="sticky top-4 z-20 mb-6 rounded-full bg-white/80 px-4 py-3 shadow-md shadow-slate-200/70 backdrop-blur-xl">
      <nav className="flex items-center justify-between gap-4">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BFDBFE] shadow-sm shadow-[#93C5FD]">
            <Heart className="h-5 w-5 text-[#1D4ED8]" />
          </div>
          <div className="leading-tight">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">
              Convite de casamento
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {weddingInfo.coupleNames}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="hidden items-center gap-1 text-xs sm:flex rounded-full bg-white/70 px-1.5 py-1.5 shadow-lg shadow-slate-200/80 border border-white/70"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                whileHover={{ scale: 1.06, y: -1 }}
                whileTap={{ scale: 0.96 }}
                animate={
                  isActive
                    ? {
                        backgroundColor: "#2563EB",
                        color: "#FFFFFF",
                        boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
                      }
                    : {
                        backgroundColor: "rgba(255, 255, 255, 0)",
                        color: "#374151",
                        boxShadow: "0 0 0 rgba(0,0,0,0)",
                      }
                }
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="relative rounded-full px-3.5 py-1.5 font-medium whitespace-nowrap"
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-glow"
                    className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section
      className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center"
      id="top"
    >
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B7280]">
          Convite virtual • Save the date
        </p>

        <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {weddingInfo.coupleNames}
        </h1>

        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#2563EB]" />
            <span>{weddingInfo.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#F59E0B]" />
            <span>{weddingInfo.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#2563EB]" />
            <span>
              {weddingInfo.locationName} • {weddingInfo.locationCity}
            </span>
          </div>
        </div>

        <p className="max-w-xl text-sm text-slate-700 sm:text-base">
          Com muita alegria, convidamos você para celebrar conosco o início
          deste novo capítulo. Sua presença é o nosso melhor presente.
        </p>

        <div className="flex flex-wrap gap-3">
          <motion.button
            onClick={() => scrollToId("rsvp")}
            whileHover={{ y: -2, boxShadow: "0 14px 30px rgba(37, 99, 235, 0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#93C5FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
          >
            Confirmar presença
            <Send className="ml-2 h-4 w-4" />
          </motion.button>

          <motion.button
            onClick={() => scrollToId("location")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center rounded-full border border-[#BFDBFE] bg-white/60 px-5 py-3 text-sm font-medium text-slate-800 shadow-sm shadow-slate-200 hover:bg-[#EFF6FF]"
          >
            Ver local
            <MapPin className="ml-2 h-4 w-4 text-[#2563EB]" />
          </motion.button>
        </div>

        <p className="text-xs text-[#6B7280]">
          *Por favor, confirme sua presença até 07/12/2025.
        </p>
      </motion.div>

      {/* Carrossel de imagens do casal */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white/80 p-4 shadow-xl shadow-slate-200/80 backdrop-blur-xl">
          <HeroCarousel />

          <div className="mt-4 flex items-center justify-between text-[11px] text-[#6B7280]">
            <p>
              Momentos especiais que contam um pouco da nossa história antes do
              “sim”.
            </p>
            <span className="rounded-full bg-[#DBEAFE] px-3 py-1 font-medium text-[#1D4ED8]">
              Álbum do casal
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % heroCarouselImages.length);
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? heroCarouselImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = heroCarouselImages[activeIndex];

  return (
    <div className="relative">
      <div className="relative h-56 overflow-hidden rounded-2xl bg-[#E5E7EB] sm:h-64">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.id}
            src={current.url}
            alt={current.alt}
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm shadow-slate-300 transition hover:bg-white"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm shadow-slate-300 transition hover:bg-white"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {heroCarouselImages.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition ${
              index === activeIndex
                ? "w-5 bg-[#2563EB]"
                : "w-2 bg-[#DBEAFE]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Story = () => {
  return (
    <motion.section
      id="story"
      className="rounded-3xl border border-[#E5E7EB] bg-white/80 p-6 shadow-md shadow-slate-200/70 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Nossa história
          </h2>
          <p className="text-xs text-[#6B7280] sm:text-sm">
            Um álbum de momentos especiais até o “sim”.
          </p>
        </div>
        <span className="rounded-full bg-[#FFFBF2] px-3 py-1 text-[11px] font-medium text-[#92400E]">
          Passe as fotos para ver mais
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-stretch">
        <StoryCarousel />

        <div className="space-y-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-[#FFFBF2] p-3 text-xs text-[#6B7280]">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
              Álbum da nossa história
            </p>
            <p>
              Cada foto guarda um pedacinho da nossa jornada: dos primeiros encontros
              tímidos até o pedido de casamento cheio de emoção.
            </p>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

const StoryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % storyImages.length);
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? storyImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = storyImages[activeIndex];

  return (
    <div className="relative flex flex-col">
      <div className="relative h-64 overflow-hidden rounded-2xl bg-[#E5E7EB] sm:h-72">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.id}
            src={current.url}
            alt={current.alt}
            className="h-full w-full object-cover"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
        <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-black/40 px-4 py-3 text-xs text-white shadow-md shadow-black/40">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#BFDBFE]">
            {activeIndex + 1} / {storyImages.length}
          </p>
          <p className="mt-1 text-sm font-semibold">{current.title}</p>
          <p className="mt-1 text-[11px] text-[#E5E7EB]">
            {current.description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm shadow-slate-300 transition hover:bg-white"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm shadow-slate-300 transition hover:bg-white"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {storyImages.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition ${
              index === activeIndex
                ? "w-5 bg-[#2563EB]"
                : "w-2 bg-[#DBEAFE]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Schedule = () => {
  return (
    <motion.section
      id="schedule"
      className="rounded-3xl border border-[#E5E7EB] bg-white/80 p-6 shadow-md shadow-slate-200/70 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Cronograma do dia
          </h2>
          <p className="text-xs text-[#6B7280] sm:text-sm">
            Para você aproveitar cada momento com calma.
          </p>
        </div>
        <div className="hidden rounded-full bg-[#EFF6FF] px-3 py-1 text-xs text-[#1D4ED8] sm:inline-flex">
          <Calendar className="mr-2 h-3 w-3" />
          {weddingInfo.date}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            time: "15h30",
            title: "Recepção dos convidados",
            desc: "Chegada, boas-vindas e um tempinho para fotos.",
          },
          {
            time: weddingInfo.time,
            title: "Cerimônia",
            desc: "O momento do sim, com muita emoção e amor.",
          },
          {
            time: "17h30",
            title: "Festa & jantar",
            desc: "Comemoração, música, comida boa e muita alegria.",
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -4, boxShadow: "0 14px 30px rgba(148, 163, 184, 0.35)" }}
            className="rounded-2xl bg-[#FFFBF2] p-4 text-sm text-slate-900"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-[#6B7280]">
              <Clock className="h-3 w-3 text-[#F59E0B]" />
              {item.time}
            </div>
            <p className="font-semibold">{item.title}</p>
            <p className="mt-1 text-xs text-[#6B7280]">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const Location = () => {
  return (
    <motion.section
      id="location"
      className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-3xl border border-[#E5E7EB] bg-white/80 p-6 shadow-md shadow-slate-200/70 backdrop-blur-xl sm:p-8">
        <h2 className="mb-2 text-lg font-semibold text-slate-900 sm:text-xl">
          Local da cerimônia & recepção
        </h2>
        <p className="text-xs text-[#6B7280] sm:text-sm">
          Um lugar especial para viver esse momento único.
        </p>

        <div className="mt-5 space-y-3 text-sm text-slate-900">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#2563EB]" />
            <div>
              <p className="font-medium">{weddingInfo.locationName}</p>
              <p className="text-xs text-[#6B7280]">
                {weddingInfo.locationCity}
              </p>
            </div>
          </div>
          <button
            onClick={() => window.open(weddingInfo.locationMapsUrl, "_blank")}
            className="inline-flex items-center rounded-full bg-[#2563EB] px-4 py-2 text-xs font-medium text-white shadow-sm shadow-[#93C5FD] transition hover:bg-[#1D4ED8]"
          >
            Abrir no Google Maps
            <MapPin className="ml-2 h-3 w-3" />
          </button>
          <p className="pt-2 text-xs text-[#6B7280]">
            Dica: chegue com antecedência para estacionar e se acomodar com
            calma.
          </p>
        </div>
      </div>

      {/* Mapa “fake” – pode ser substituído por um iframe do Google Maps */}
      <div className="rounded-3xl border border-[#E5E7EB] bg-white/80 p-4 text-xs text-[#6B7280] shadow-md shadow-slate-200/70 backdrop-blur-xl sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium text-slate-900">Visualização do mapa</p>
          <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs text-[#1D4ED8]">
            Preview
          </span>
        </div>
        <div className="relative h-52 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#EFF6FF]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25),_transparent)]" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP0zy4lui5A2vyVdzPkqnGqhlV5a8EyiCVFw&s" alt="" />
        </div>
      </div>
    </motion.section>
  );
};

const Gifts = () => {
  return (
    <motion.section
      id="gifts"
      className="rounded-3xl border border-[#E5E7EB] bg-white/80 p-6 shadow-md shadow-slate-200/70 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Lista de presentes
          </h2>
          <p className="text-xs text-[#6B7280] sm:text-sm">
            Sua presença é o que mais importa, mas se quiser nos presentear:
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[#EFF6FF] px-4 py-2 text-xs text-[#1D4ED8]">
          <Gift className="h-3 w-3" />
          <span>Pix + lista online</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 14px 30px rgba(148, 163, 184, 0.35)" }}
          className="rounded-2xl bg-[#FFFBF2] p-4 text-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
            Pix
          </p>
          <p className="mt-2 text-slate-900">
            Chave: <span className="font-semibold">892.802.025-53</span>
          </p>
          <p className="mt-1 text-xs text-[#6B7280]">
            Fique à vontade para contribuir com qualquer valor.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 14px 30px rgba(148, 163, 184, 0.35)" }}
          className="rounded-2xl bg-[#FFFBF2] p-4 text-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
            Lista em loja
          </p>
          <p className="mt-2 text-slate-900">
            Loja Exemplo • C&A / Magalu / etc.
          </p>
          <p className="mt-1 text-xs text-[#6B7280]">
            Link da lista:{" "}
            <span className="underline underline-offset-2 text-[#2563EB]">
              loja.com/lista-sandra-juliano
            </span>
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 14px 30px rgba(148, 163, 184, 0.35)" }}
          className="rounded-2xl bg-[#FFFBF2] p-4 text-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
            Presente em experiência
          </p>
          <p className="mt-2 text-slate-900">
            Você também pode nos presentear com uma viagem, jantar ou
            experiência inesquecível.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

const RSVPSection = ({ onSubmit }) => {
  return (
    <motion.section
      id="rsvp"
      className="rounded-3xl border border-[#E5E7EB] bg-white/80 p-6 shadow-md shadow-slate-200/70 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Confirmação de presença
          </h2>
          <p className="text-xs text-[#6B7280] sm:text-sm">
            Preencha rapidinho para nos ajudar na organização 💌
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[#FDE68A]/40 px-4 py-2 text-xs text-[#B45309]">
          <MessageCircle className="h-3 w-3" />
          <span>Envio direto via WhatsApp</span>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-6 grid gap-4 sm:grid-cols-[1.5fr_1fr]"
      >
        <div className="space-y-4">
          <div className="space-y-1 text-sm">
            <label className="text-xs font-medium text-slate-800">
              Nome completo
            </label>
            <input
              required
              name="name"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FFFBF2] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label className="text-xs font-medium text-slate-800">
              Quantidade de pessoas
            </label>
            <select
              name="guests"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FFFBF2] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              defaultValue="1"
            >
              <option value="1">Apenas eu</option>
              <option value="2">Eu + 1 acompanhante</option>
              <option value="3">Eu + 2 acompanhantes</option>
              <option value="4">Eu + família</option>
            </select>
          </div>
          <div className="space-y-1 text-sm">
            <label className="text-xs font-medium text-slate-800">
              Mensagem (opcional)
            </label>
            <textarea
              name="message"
              rows={3}
              className="w-full resize-none rounded-2xl border border-[#E5E7EB] bg-[#FFFBF2] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              placeholder="Deixe um recadinho fofo para a gente 💕"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div className="rounded-2xl bg-[#EFF6FF] p-4 text-xs text-[#4B5563]">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
              Detalhes rápidos
            </p>
            <p>{weddingInfo.date}</p>
            <p>{weddingInfo.time}</p>
            <p>{weddingInfo.locationName}</p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#93C5FD] transition hover:translate-y-[1px] hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
          >
            Enviar confirmação via WhatsApp
            <Send className="ml-2 h-4 w-4" />
          </button>
        </div>
      </form>
    </motion.section>
  );
};

const Footer = () => {
  return (
    <footer className="mt-10 flex flex-col items-center gap-2 text-center text-[11px] text-[#6B7280]">
      <p>
        Com carinho,{" "}
        <span className="font-semibold text-slate-900">
          {weddingInfo.coupleNames}
        </span>
      </p>
      <p>Obrigada por fazer parte desse momento.</p>
      <p className="mt-2 text-[10px] text-[#9CA3AF]">
        Convite digital feito com React, animações e muito amor.
      </p>
    </footer>
  );
};

const FloatingMusicButton = () => {
  // Aqui você pode integrar com um player de verdade
  const handleClick = () => {
    alert("Aqui você pode tocar a música tema do casal 🎵");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg shadow-[#93C5FD] backdrop-blur-xl transition hover:scale-105 hover:bg-[#1D4ED8]"
    >
      <Music2 className="h-5 w-5" />
    </button>
  );
};

export default App;