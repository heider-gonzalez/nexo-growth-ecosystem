import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Linkedin, Github, Twitter, ArrowLeft, ArrowRight, Search, X as CloseIcon, MapPin, Globe } from "lucide-react";
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
const PROFILE_TABS = [
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "educacion", label: "Educación" },
  { id: "enfoque", label: "Enfoque" },
] as const;

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
        content: "Conoce al equipo detrás de Nexo. Creadores de software excelente en Barranquilla, Colombia.",
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
    firstName: "Heider",
    initials: "HG",
    location: "Barranquilla, Colombia",
    role: "Software Developer Full Stack",
    avatarUrl: "/Heider.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/heider-gonzalez/",
      x: "https://x.com/HeiderGonz50147",
      github: "https://github.com/heider-gonzalez",
      website: "https://github.com/heider-gonzalez"
    },
    badges: ["Engineering", "Full Stack"],
    projects: [
      {
        title: "hsocial",
        description: "Red social universitaria para generar ideas y equipos de trabajo",
        category: "Social",
        image: "/Red social h social.png"
      },
      {
        title: "Nexo",
        description: "Co-founder de Nexo",
        category: "Startup",
        image: "/nexo.png"
      },
      {
        title: "BiblioUR",
        description: "Sistema de Biblioteca (Microservicios)",
        category: "Infrastructure",
        image: "/biblioUR.png"
      },
      {
        title: "h chat",
        description: "App de mensajería para universidad",
        category: "Communication",
        image: "/h chat.png"
      }
    ],
    experience: [
      {
        role: "Desarrollo de software y automatizaciones independientes",
        period: "2026 - Presente",
        description: "Desarrollo de aplicaciones web Full Stack (Next.js, Supabase, PostgreSQL) y automatización de flujos de trabajo con n8n e integración de Meta WhatsApp Business API."
      },
      {
        role: "Soporte técnico, mantenimiento y gestión de base de datos",
        period: "2024 - 2026",
        description: "Mantenimiento preventivo y correctivo de hardware, configuración de sistemas operativos, optimización de redes y administración de bases de datos para clientes y empresas localmente."
      }
    ],
    education: [
      {
        title: "Ingeniería Informática",
        institution: "Corporación Universitaria Reformada",
        level: "Título Profesional"
      },
      {
        title: "Tecnología en Informática",
        institution: "Corporación Universitaria Reformada",
        level: "Título Tecnológico"
      },
      {
        title: "Técnico Auxiliar de Sistemas Informáticos",
        institution: "ITSA",
        level: "Título Técnico",
        year: "2016"
      },
      {
        title: "Programa B2 de Inglés",
        institution: "Instituto de Idiomas - Corporación Universitaria Reformada",
        level: "Acreditación B2 según normativa institucional",
        year: "2026"
      }
    ],
    focus: [
      "Desarrollo Web & APIs: Creación de aplicaciones escalables con Next.js, Supabase, PostgreSQL y APIs REST.",
      "Automatización de Procesos: Flujos de trabajo eficientes con n8n, CRM personalizados y mensajería automatizada.",
      "Soporte & Optimización IT: Diagnóstico de hardware, sistemas operativos y gestión de infraestructura tecnológica."
    ],
    recognition: "1.ᵉʳ Lugar en la sede C.U. Reformada – Categoría Impacto Social (Rally Latinoamericano de Innovación 2023)",
    languages: "Inglés B2 (Instituto de Idiomas Unireformada)"
  },
  { name: "Cristian Acuña", firstName: "Cristian", initials: "CA", location: "Barranquilla, Colombia", role: "Lead Developer", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80", badges: ["Engineering"] },
  { name: "Sergio Perez", firstName: "Sergio", initials: "SP", location: "Barranquilla, Colombia", role: "Backend Engineer", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80", badges: ["Engineering"] },
  {
    name: "Sergio Alejandro Severiche Guerrero",
    firstName: "Sergio",
    initials: "SSG",
    location: "Barranquilla, Colombia",
    role: "Ingeniero de Sistemas",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    badges: ["Engineering", "Full Stack", "AI"],
    age: 25,
    technical: ["Full stack & IA Generativa", "Integración de IA en aplicaciones", "Ingeniería de software & Back-end (Deep Dive)"],
    experience: [
      {
        role: "Desarrollo y Consultoría de software independiente",
        period: "2021-Presente"
      },
      {
        role: "Soporte técnico y operaciones de sistemas",
        company: "Prosegur Procesos S.A.S",
        period: "Enero 2026 - Junio 2026"
      },
      {
        role: "Analista de datos e investigador de campo",
        company: "Universidad de Cartagena & Alcaldía",
        period: "Marzo 2025 - Enero 2026"
      }
    ],
    focus: [
      "Seguridad y cumplimiento",
      "Ingeniería de datos",
      "Despliegue y CI/CD",
      "Desarrollo Fullstack",
      "Optimización de sistemas",
      "UX/UI & Responsive Design"
    ],
    education: [
      "Universidad de Cartagena (UdeC)",
      "Centro Colombo Americano"
    ],
    languages: "Inglés B1/B2 - Capacidad para lectura de documentación técnica compleja"
  },
  { name: "Karol Esparza", firstName: "Karol", initials: "KE", location: "Barranquilla, Colombia", role: "UI/UX Designer", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80", badges: ["Design"] },
];

interface TeamMember {
  name: string;
  firstName: string;
  initials: string;
  location: string;
  role: string;
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

/** Estado vacío amigable y centrado para pestañas sin datos. No rompe el layout: ocupa el espacio disponible en vez de dejarlo en blanco. */
function EmptyTabState({ message }: { message: string }) {
  return (
    <div className="flex flex-1 min-h-[240px] items-center justify-center text-center px-6">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function TeamPage() {
  const { member: memberSlug } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ProfileTabId>("proyectos");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

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
    // Todos los perfiles abren siempre en la misma pestaña por defecto,
    // sin importar qué datos tenga el miembro (ver PROFILE_TABS arriba).
    setActiveTab("proyectos");
    navigate({ search: { member: slugify(member.name) } });
  };

  // Botón "Atrás" explícito dentro del modal: limpia el search param y
  // vuelve a la grilla de /equipo, igual que ahora hace el botón Atrás
  // del navegador, pero accesible con un clic.
  const closeMember = () => {
    navigate({ search: {} });
  };

  const filteredTeam = team.filter((member: TeamMember) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImgError = (memberName: string) => {
    setImgErrors(prev => ({ ...prev, [memberName]: true }));
  };

  const getLocalTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <Layout hideFooter={!!selectedMember}>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-background">
        <div className="relative mx-auto max-w-6xl px-6 w-full z-10">
          <ScrollAnimation direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-foreground">
                Los humanos detrás de <span className="text-[#00c2ff]">Nexo</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                Somos un equipo de creadores que creemos en la construcción de software excelente que inspire a otros.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Interaction Bar */}
      <section className="relative bg-background py-8 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:nexosolutions5@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 hover:bg-muted transition-colors text-sm font-medium text-foreground"
            >
              Añádete a la lista
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <div className="relative flex-1 max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00c2ff]/20 focus:border-[#00c2ff]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                Ctrl K
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="relative bg-background py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-y-16 gap-x-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
            {filteredTeam.map((member: TeamMember, index) => (
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
                  <h3 className="text-base font-semibold text-foreground">
                    {member.firstName}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {member.location}
                  </p>
                </button>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Member Modal — controlado por el search param ?member= (ver
          openMember / closeMember arriba), así el botón Atrás del
          navegador vuelve correctamente a la grilla de /equipo en vez
          de a Inicio. */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-background overflow-hidden"
          onClick={closeMember}
        >
          <div
            className="relative w-full h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón explícito "volver al equipo", además del botón
                Atrás del navegador y de la X de cerrar. */}
            <Link
              to="/equipo"
              onClick={closeMember}
              className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors bg-muted/50 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al equipo
            </Link>

            <button
              onClick={closeMember}
              className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors bg-muted/50 rounded-full"
              aria-label="Cerrar perfil"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            
            <div className="flex h-full">
              {/* Left Panel */}
              <div className="w-1/3 border-r border-border p-8 pt-20 flex flex-col">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full bg-muted/80 border border-border/50 flex items-center justify-center overflow-hidden shrink-0 mb-6">
                    {!imgErrors[selectedMember.name] && selectedMember.avatarUrl ? (
                      <img
                        src={selectedMember.avatarUrl}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover filter grayscale"
                        onError={() => handleImgError(selectedMember.name)}
                      />
                    ) : (
                      <span className="text-3xl font-bold text-muted-foreground">
                        {selectedMember.initials}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedMember.name}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    {selectedMember.role}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedMember.location}</span>
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    {getLocalTime()} (local time)
                  </div>

                  {selectedMember.age && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {selectedMember.age} años
                    </div>
                  )}

                  {selectedMember.badges && (
                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                      {selectedMember.badges.map((badge) => (
                        <span key={badge} className="px-3 py-1 rounded-full bg-muted text-xs text-foreground">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {selectedMember.socials && (
                    <div className="mt-8 flex flex-col gap-3 w-full">
                      {selectedMember.socials.website && (
                        <a
                          href={selectedMember.socials.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
                        >
                          <Globe className="h-4 w-4" />
                          <span className="text-sm">Website</span>
                        </a>
                      )}
                      {selectedMember.socials.linkedin && (
                        <a
                          href={selectedMember.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
                        >
                          <Linkedin className="h-4 w-4" />
                          <span className="text-sm">LinkedIn</span>
                        </a>
                      )}
                      {selectedMember.socials.x && (
                        <a
                          href={selectedMember.socials.x}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
                        >
                          <Twitter className="h-4 w-4" />
                          <span className="text-sm">X / Twitter</span>
                        </a>
                      )}
                      {selectedMember.socials.github && (
                        <a
                          href={selectedMember.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
                        >
                          <Github className="h-4 w-4" />
                          <span className="text-sm">GitHub</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Panel */}
              <div className="w-2/3 p-8 pt-20 flex flex-col">
                {/* Tabs — esquema único (PROFILE_TABS) para todos los perfiles */}
                <div className="flex gap-2 mb-6 border-b border-border pb-4">
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

                {/* Content — cada pestaña es siempre visible en el header
                    (PROFILE_TABS), pero renderiza sus datos solo si
                    existen; si no, muestra un empty state amigable en
                    vez de dejar espacio en blanco o romper el layout. */}
                <div className="flex-1 overflow-y-auto flex flex-col">
                  {activeTab === "proyectos" && (
                    selectedMember.projects && selectedMember.projects.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {selectedMember.projects.map((project, index) => (
                          <div key={index} className="border border-border rounded-lg overflow-hidden">
                            <div className="h-32 bg-muted overflow-hidden">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="text-sm font-semibold text-foreground mb-2">
                                {project.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {project.description}
                              </p>
                              <span className="mt-2 inline-block px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                                {project.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyTabState message="No hay proyectos registrados para este miembro." />
                    )
                  )}

                  {activeTab === "experiencia" && (
                    selectedMember.experience && selectedMember.experience.length > 0 ? (
                      <div className="space-y-4">
                        {selectedMember.experience.map((exp, index) => (
                          <div key={index} className="bg-muted/50 rounded-lg p-6">
                            <h4 className="text-base font-semibold text-foreground mb-2">{exp.role}</h4>
                            {exp.company && (
                              <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                            )}
                            {exp.description && (
                              <p className="text-sm text-muted-foreground mb-2">{exp.description}</p>
                            )}
                            <p className="text-xs text-[#00c2ff] font-medium">{exp.period}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyTabState message="No hay experiencia registrada para este miembro." />
                    )
                  )}

                  {activeTab === "educacion" && (
                    (selectedMember.education && selectedMember.education.length > 0) || selectedMember.languages ? (
                      <div className="space-y-4">
                        {selectedMember.education && selectedMember.education.length > 0 && (
                          <div className="bg-muted/50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-foreground mb-4">Educación</h4>
                            <div className="space-y-4">
                              {selectedMember.education.map((edu, index) => (
                                <div key={index} className="border-l-2 border-[#00c2ff] pl-4">
                                  {typeof edu === "string" ? (
                                    <h5 className="text-sm font-semibold text-foreground">{edu}</h5>
                                  ) : (
                                    <>
                                      <h5 className="text-sm font-semibold text-foreground">{edu.title}</h5>
                                      <p className="text-xs text-muted-foreground">{edu.institution}</p>
                                      <p className="text-xs text-muted-foreground">{edu.level}</p>
                                      {edu.year && <p className="text-xs text-[#00c2ff]">{edu.year}</p>}
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedMember.languages && (
                          <div className="bg-muted/50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-foreground mb-4">Idiomas</h4>
                            <p className="text-sm text-muted-foreground">{selectedMember.languages}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <EmptyTabState message="No hay información de educación registrada para este miembro." />
                    )
                  )}

                  {activeTab === "enfoque" && (
                    (selectedMember.focus && selectedMember.focus.length > 0) || selectedMember.technical || selectedMember.recognition ? (
                      <div className="space-y-4">
                        {selectedMember.technical && selectedMember.technical.length > 0 && (
                          <div className="bg-muted/50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-foreground mb-4">Habilidades Técnicas</h4>
                            <ul className="space-y-2">
                              {selectedMember.technical.map((tech, index) => (
                                <li key={index} className="text-sm text-foreground">• {tech}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {selectedMember.focus && selectedMember.focus.length > 0 && (
                          <div className="bg-muted/50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-foreground mb-4">Áreas de Enfoque</h4>
                            <ul className="space-y-2">
                              {selectedMember.focus.map((focusItem, index) => (
                                <li key={index} className="text-sm text-foreground">• {focusItem}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {selectedMember.recognition && (
                          <div className="bg-muted/50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-foreground mb-4">Reconocimientos</h4>
                            <p className="text-sm text-muted-foreground">{selectedMember.recognition}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <EmptyTabState message="No hay áreas de enfoque registradas para este miembro." />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
