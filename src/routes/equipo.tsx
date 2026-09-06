import { createFileRoute } from "@tanstack/react-router";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { Linkedin, Github, Twitter, Instagram, ChevronDown, ArrowRight, Search, X as CloseIcon, MapPin, Globe } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/equipo")({
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

const nav = [
  { label: "Servicios", href: "/#servicios", caret: true },
  { label: "Equipo", href: "/equipo", caret: false },
  { label: "Contacto", href: "/#contacto", caret: false },
];

const IG = "https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr";

const team = [
  {
    name: "Heider Gonzalez",
    firstName: "Heider",
    initials: "HG",
    location: "Barranquilla, Colombia",
    role: "Founder & CEO",
    avatarUrl: "/Heider.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/heider-gonzalez/",
      x: "https://x.com/HeiderGonz50147",
      github: "https://github.com/heider-gonzalez",
      website: "https://github.com/heider-gonzalez"
    },
    badges: ["Founder", "Engineering"],
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
    ]
  },
  { name: "Cristian Acuña", firstName: "Cristian", initials: "CA", location: "Barranquilla, Colombia", role: "Lead Developer", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80", badges: ["Engineering"] },
  { name: "Sergio Perez", firstName: "Sergio", initials: "SP", location: "Barranquilla, Colombia", role: "Backend Engineer", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80", badges: ["Engineering"] },
  { name: "Sergio Guerrero", firstName: "Sergio", initials: "SG", location: "Barranquilla, Colombia", role: "Software Developer", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80", badges: ["Engineering"] },
  { name: "Karol Esparza", firstName: "Karol", initials: "KE", location: "Barranquilla, Colombia", role: "UI/UX Designer", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80", badges: ["Design"] },
];

function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredTeam = team.filter(member =>
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
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-[#00c2ff]/30 selection:text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="/"
            className="flex items-center"
          >
            <img
              src="/Logo_ Paleta claro.png"
              alt="NEXO Logo"
              className="block dark:hidden h-20 w-auto object-contain"
            />
            <img
              src="/Logo_ Paleta oscura.png"
              alt="NEXO Logo"
              className="hidden dark:block h-20 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
                {n.caret && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="flex p-2 text-muted-foreground transition-colors hover:text-foreground items-center justify-center rounded-full hover:bg-accent/50"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="btn-cyan hidden md:inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold"
            >
              Comience
            </a>
            <MobileMenu nav={nav} />
          </div>
        </div>
      </header>

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
            {filteredTeam.map((member, index) => (
              <ScrollAnimation key={member.name} direction="up" delay={index * 0.05}>
                <button
                  onClick={() => setSelectedMember(member)}
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

      {/* Member Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-background overflow-hidden"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors bg-muted/50 rounded-full"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            
            <div className="flex h-full">
              {/* Left Panel */}
              <div className="w-1/3 border-r border-border p-8 flex flex-col">
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
              <div className="w-2/3 p-8 flex flex-col">
                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-border pb-4">
                  {["All", "Blog", "Changelog", "Handbook", "Personal"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.toLowerCase()
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
                {/* Content Grid */}
                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedMember.projects ? (
                      selectedMember.projects.map((project, index) => (
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
                      ))
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
