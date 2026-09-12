import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import {
  Linkedin,
  Github,
  Twitter,
  X as CloseIcon,
  MapPin,
  Globe,
  User,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Esquema ÚNICO de pestañas para el perfil de cualquier miembro del
 * equipo. Antes, cada perfil generaba su propio set de pestañas según
 * qué campos tuviera ("Proyectos/Experiencia/Educación/Enfoque" para
 * unos, "All/Blog/Changelog/Handbook/Personal" para otros), lo cual
 * rompía la consistencia de la UI. Ahora TODOS los perfiles muestran
 * exactamente estas 4 pestañas, y cada una decide internamente si
 * tiene datos para mostrar o si debe renderizar un empty state.
 */
const PROFILE_TABS = [{ id: "perfil", label: "Perfil" }] as const;

type ProfileTabId = (typeof PROFILE_TABS)[number]["id"];

// El directorio de equipo ("/equipo") muestra los perfiles como overlay
// en vez de una ruta separada, pero SE GUARDA en la URL con ?member=slug
// (no solo en useState). Así, al abrir un perfil se crea una entrada
// real en el historial del navegador (/equipo -> /equipo?member=slug),
// y el botón "Atrás" del navegador regresa a la grilla del equipo,
// nunca hasta Inicio.
const searchSchema = z.object({
  member: z.string().optional(),
});

export const Route = createFileRoute("/equipo")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Equipo — Nexo" },
      {
        name: "description",
        content:
          "Conoce al equipo detrás de Nexo. Creadores de software excelente en Barranquilla, Colombia.",
      },
    ],
  }),
  component: TeamPage,
});

/** Identificador seguro para URL a partir del nombre (usado en ?member=). */
function slugify(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const team: TeamMember[] = [
  {
    name: "Heider Gonzalez",
    firstName: "Heider Gonzales",
    initials: "HG",
    location: "Barranquilla, Colombia",
    role: "Ingeniero Informatico",
    funcion: "Desarrollador Full Stack",
    avatarUrl: "/Heider.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/heider-gonzalez/",
      x: "https://x.com/HeiderGonz50147",
      github: "https://github.com/heider-gonzalez",
    },
    badges: ["CEO & Founder"],
    perfilInfo: ` Perfil enfocado creación de aplicaciones escalables, Flujos de trabajo eficientes y gestión de infraestructura tecnológica.
      Habilidades:
      -Desarrollo full-stack y Apis
      -Soporte & Optimización IT
      -Automatización de procesos
      -IA
      -Sistemas operativo
      `,
  },
  {
    name: "Cristian Acuña",
    firstName: "Cristian Acuña",
    initials: "CA",
    location: "Barranquilla, Colombia",
    role: "Ingeniero Informatico",
    avatarUrl: "https://unavatar.io/linkedin/user:cristian-acu%C3%B1a3103",
    socials: {
      linkedin: "https://www.linkedin.com/in/heider-gonzalez/",
      github: "https://github.com/CriX03",
    },
    badges: ["CEO & Founder"],
    funcion: "Desarrollador de software, Automatizaciónes e IA",
    perfilInfo: ` Perfil enfocado en la gestión de proyectos y desarrollo de soluciones tecnológicas, automatización de procesos y análisis de datos.
      Habilidades:
      -Desarrollo full-stack
      -Análisis de datos
      -Automatización de procesos
      -IA
      -Gestión de proyectos IT
      -Integración de tecnologías modernas en proyectos reales
      `,
  },
  {
    name: "Sergio Perez",
    firstName: "Sergio Perez",
    initials: "SP",
    location: "Barranquilla, Colombia",
    role: "Ingeniero Informatico",
    avatarUrl: "https://unavatar.io/github/p1t3rparqer",
    socials: {
      linkedin: "https://www.linkedin.com/in/heider-gonzalez/",
      github: "https://github.com/p1t3rparqer",
    },
    badges: ["CEO & Founder"],
    funcion: "Desarrollador web",
    perfilInfo: ` Perfil enfocado en la gestión de proyectos y desarrollo de soluciones tecnológicas, automatización de procesos y análisis de datos.
      Habilidades:
      -Desarrollo full-stack
      -Análisis de datos
      -Automatización de procesos
      -IA
      -Gestión de proyectos IT
      -Integración de tecnologías modernas en proyectos reales
      `,
  },
  {
    name: "Sergio Alejandro Severiche Guerrero",
    firstName: "Sergio Severiche",
    initials: "SSG",
    location: "Barranquilla, Colombia",
    role: "Ingeniero de Sistemas",
    avatarUrl: "https://unavatar.io/github/SERGIIO0101",
    socials: {
      linkedin: "https://www.linkedin.com/in/heider-gonzalez/",
      github: "https://github.com/SERGIIO0101",
    },
    badges: ["CEO & Founder"],
    funcion: "Desarrollador y auditor de software",
    perfilInfo: ` Perfil enfocado en la gestión de proyectos y desarrollo de soluciones tecnológicas, automatización de procesos y análisis de datos.
      Habilidades:
      - Seguridad y cumplimiento
      - Ingeniería de datos
      - Despliegue y CI/CD
      - Desarrollo Fullstack
      - Optimización de sistemas
      - UX/UI & Responsive Design
      `,
  },
  {
    name: "Karol Esparza",
    firstName: "Karol Esparza",
    initials: "KE",
    location: "Barranquilla, Colombia",
    role: "Administradora de Negocios Internacionales",
    socials: {
      linkedin: "https://www.linkedin.com/in/heider-gonzalez/",
      x: "https://x.com/HeiderGonz50147",
    },
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80",
    badges: ["CEO & Founder"],
    funcion: "Especialidad en Marketing y Ventas",
    perfilInfo: `  Perfil enfocado en ventas, cierre de negociaciones, gestión comercial e impulso de estrategias de marketing. 
      Habilidades:
      -Cierre de negociaciones y seguimiento de oportunidades comerciales.
      -Impulso de ventas mediante estrategias y acciones de marketing.
      -Atención y asesoría a clientes.
      -Negociación, comunicación comercial y orientación a resultados.
      -Gestión y desarrollo de relaciones con clientes y prospectos.

      `,
  },
];

interface TeamMember {
  name: string;
  firstName: string;
  initials: string;
  location: string;
  role: string;
  funcion?: string;
  perfilInfo?: string;
  avatarUrl: string;
  badges?: string[];
  socials?: {
    linkedin?: string;
    x?: string;
    github?: string;
    website?: string;
  };
  projects?: Array<{
    title: string;
    description: string;
    category: string;
    image: string;
    link?: string;
    isPrivate?: boolean;
  }>;
  personal?: {
    education: string;
    focus: string;
    languages: string;
    technical: string;
    description: string;
  };
  age?: number;
  technical?: string[];
  experience?: Array<{
    role: string;
    company?: string;
    period: string;
    description?: string;
  }>;
  focus?: string[];
  // Algunos miembros solo registran el nombre de la institución (string),
  // otros el detalle completo (título/institución/nivel/año).
  education?: Array<
    | string
    | {
        title: string;
        institution: string;
        level: string;
        year?: string;
      }
  >;
  languages?: string;
  recognition?: string;
}

/** Formatea el campo perfilInfo procesando el título 'Habilidades' y sus sub-elementos con checks. */
function FormattedPerfilInfo({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const mainTextLines: string[] = [];
  let skillsTitle: string | null = null;
  const skillsList: string[] = [];

  let inSkills = false;

  for (const line of lines) {
    if (line.toLowerCase().startsWith("habilidades")) {
      skillsTitle = line;
      inSkills = true;
    } else if (inSkills) {
      if (line.startsWith("-") || line.startsWith("•") || line.startsWith("*")) {
        skillsList.push(line.replace(/^[-•*]\s*/, ""));
      } else {
        skillsList.push(line);
      }
    } else {
      mainTextLines.push(line);
    }
  }

  return (
    <div className="space-y-6">
      {mainTextLines.length > 0 && (
        <p className="text-base leading-relaxed text-foreground/90 font-medium">
          {mainTextLines.join(" ")}
        </p>
      )}

      {(skillsTitle || skillsList.length > 0) && (
        <div className="pt-2">
          {skillsTitle && (
            <h5 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00c2ff]" />
              {skillsTitle.replace(":", "")}
            </h5>
          )}
          <ul className="grid gap-3 sm:grid-cols-2">
            {skillsList.map((skill, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50 text-sm font-medium text-foreground hover:border-[#00c2ff]/40 hover:bg-muted/70 transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-[#00c2ff]/15 text-[#00c2ff] flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function TeamPage() {
  const { member: memberSlug } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [activeTab, setActiveTab] = useState<ProfileTabId>("perfil");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [isClosing, setIsClosing] = useState(false);

  // El perfil abierto se calcula a partir de la URL, no de estado local
  // — esto es lo que corrige el bug de "Atrás va a Inicio" (ver nota arriba).
  const selectedMember = memberSlug
    ? (team.find((m) => slugify(m.name) === memberSlug) ?? null)
    : null;

  // Layout aislado tipo pantalla completa: mientras el perfil está
  // abierto, se bloquea el scroll del <body>. Así el modal (fixed
  // inset-0) se comporta como una pantalla contenida y nunca deja
  // "asomar" el <Footer/> global por debajo, sin importar qué tan
  // vacío esté el perfil.
  useEffect(() => {
    if (!selectedMember) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedMember]);

  const openMember = (member: TeamMember) => {
    setIsClosing(false);
    setActiveTab("perfil");
    navigate({ search: { member: slugify(member.name) } });
  };

  // Botón "Atrás" explícito dentro del modal: limpia el search param y
  // vuelve a la grilla de /equipo, igual que ahora hace el botón Atrás
  // del navegador, pero accesible con un clic.
  const closeMember = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      navigate({ search: {} });
      setIsClosing(false);
    }, 200);
  };

  const handleImgError = (memberName: string) => {
    setImgErrors((prev) => ({ ...prev, [memberName]: true }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-background">
        <div className="relative mx-auto max-w-6xl px-6 w-full z-10">
          <ScrollAnimation direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-foreground">
                Los humanos detrás de <span className="text-[#00c2ff]">Nexo</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                Somos un equipo de creadores que creemos en la construcción de software excelente
                que inspire a otros.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="relative bg-background py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-y-16 gap-x-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
            {team.map((member: TeamMember, index) => (
              <ScrollAnimation key={member.name} direction="up" delay={index * 0.05}>
                <button
                  onClick={() => openMember(member)}
                  className="group flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="w-28 h-28 rounded-full bg-muted/80 border border-border/50 flex items-center justify-center overflow-hidden shrink-0 mb-4">
                    {!imgErrors[member.name] && member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                        onError={() => handleImgError(member.name)}
                      />
                    ) : (
                      <span className="text-xl font-semibold text-muted-foreground">
                        {member.initials}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{member.firstName}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                </button>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Member Modal Dialog con backdrop blur y animación suave de apertura/cierre */}
      {selectedMember && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md transition-all duration-200 ease-out ${
            isClosing
              ? "opacity-0 backdrop-blur-none"
              : "opacity-100 animate-in fade-in duration-200"
          }`}
          onClick={closeMember}
        >
          <div
            className={`relative w-full max-w-4xl max-h-[85vh] bg-background border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-200 ease-out ${
              isClosing
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100 animate-in zoom-in-95 duration-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={closeMember}
              className="absolute top-4 right-4 z-20 p-2 text-muted-foreground hover:text-foreground transition-colors bg-muted/60 hover:bg-muted rounded-full"
              aria-label="Cerrar perfil"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            {/* Left Panel */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-border p-4 pt-10 md:p-6 md:pt-14 flex flex-col items-center text-center overflow-y-auto bg-muted/20 shrink-0">
              <div className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-muted/80 border border-border/50 flex items-center justify-center overflow-hidden shrink-0 mb-2 md:mb-4 shadow-sm">
                {!imgErrors[selectedMember.name] && selectedMember.avatarUrl ? (
                  <img
                    src={selectedMember.avatarUrl}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                    onError={() => handleImgError(selectedMember.name)}
                  />
                ) : (
                  <span className="text-lg md:text-2xl font-bold text-muted-foreground">
                    {selectedMember.initials}
                  </span>
                )}
              </div>

              <h3 className="text-lg md:text-xl font-bold text-foreground">
                {selectedMember.name}
              </h3>
              {selectedMember.funcion && (
                <p className="mt-0.5 md:mt-1.5 text-xs md:text-sm text-muted-foreground">
                  {selectedMember.funcion}
                </p>
              )}

              <div className="mt-2 md:mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{selectedMember.location}</span>
              </div>

              {selectedMember.badges && (
                <div className="mt-2.5 md:mt-4 flex flex-wrap gap-1.5 justify-center">
                  {selectedMember.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-0.5 rounded-full bg-muted text-[11px] font-medium text-foreground"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {selectedMember.socials && (
                <div className="mt-3 md:mt-6 flex flex-row flex-wrap items-center justify-center gap-2">
                  {selectedMember.socials.website && (
                    <a
                      href={selectedMember.socials.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Website"
                      title="Website"
                      className="p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                  {selectedMember.socials.linkedin && (
                    <a
                      href={selectedMember.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                      className="p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {selectedMember.socials.x && (
                    <a
                      href={selectedMember.socials.x}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="X / Twitter"
                      title="X / Twitter"
                      className="p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {selectedMember.socials.github && (
                    <a
                      href={selectedMember.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      title="GitHub"
                      className="p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-2/3 p-4 md:p-6 md:pt-14 flex flex-col overflow-y-auto">
              {/* Tabs — pestaña única (Perfil) */}
              <div className="flex gap-2 mb-6 border-b border-border pb-3">
                {PROFILE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content — Perfil */}
              <div className="flex-1 flex flex-col">
                {activeTab === "perfil" && (
                  <div className="flex-1">
                    {!selectedMember.perfilInfo ||
                    selectedMember.perfilInfo.trim() === "insertar informacion" ? (
                      <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-border/60 rounded-xl bg-muted/20">
                        <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mb-3 text-muted-foreground/80">
                          <User className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Información de perfil pendiente
                        </p>
                        <span className="mt-1 text-xs text-muted-foreground/60 italic">
                          insertar información
                        </span>
                      </div>
                    ) : (
                      <FormattedPerfilInfo text={selectedMember.perfilInfo} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
