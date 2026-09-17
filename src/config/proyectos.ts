/**
 * ─────────────────────────────────────────────────────────────────────
 * PROYECTOS — trabajo entregado
 * ─────────────────────────────────────────────────────────────────────
 *
 * Esta lista es la prueba de lo que promete el resto del sitio, así que
 * sólo entra trabajo real y publicado, con permiso del cliente para
 * nombrarlo. Si un cliente no autoriza aparecer, se describe sin nombre
 * ni enlace ("fabricante de X, catálogo de N referencias") en lugar de
 * omitirlo o de inventar uno.
 *
 * Si el arreglo queda vacío, la sección no se renderiza: mejor no tener
 * portafolio que tener una grilla vacía en la portada.
 *
 * `metricas` es opcional a propósito. Va sólo cuando el número está
 * medido y el cliente acepta publicarlo (tiempo ahorrado, conversión,
 * pedidos procesados). Un resultado inventado invalida los reales.
 *
 * `imagen` apunta a una captura propia en /public (por ejemplo
 * "/proyectos/fresh.jpg", 1200x750 aprox.). Mientras no exista, la
 * tarjeta muestra un marco de ventana con el dominio o el nombre de la
 * aplicación, que es información verdadera y no una foto de archivo
 * ajena al proyecto.
 *
 * No todo proyecto es un sitio público: un software interno no tiene
 * enlace que mostrar. En ese caso se deja `url` y `dominio` sin llenar,
 * se describe dónde corre en `entorno` y se explica en `notaAcceso` por
 * qué no hay enlace, en vez de dejar un vacío que parezca un olvido.
 */

export interface ProyectoMetrica {
  valor: string;
  etiqueta: string;
}

export interface Proyecto {
  key: string;
  cliente: string;
  sector: string;
  resumen: string;
  entregables: string[];
  stack: string[];
  /** Sólo proyectos con sitio público. */
  url?: string;
  /** El dominio como se muestra en la tarjeta, sin protocolo. */
  dominio?: string;
  /** Para proyectos sin URL pública: nombre y plataforma donde corre. */
  entorno?: string;
  /** Por qué no hay enlace. Ocupa el lugar del "Ver dominio". */
  notaAcceso?: string;
  anio?: string;
  imagen?: string;
  imagenAlt?: string;
  metricas?: ProyectoMetrica[];
}

export const PROYECTOS: Proyecto[] = [
  {
    key: "fresh-jacuzzis",
    cliente: "FRESH — Sistemas Hidrodinámicos",
    sector: "Manufactura · Fibra de vidrio",
    resumen:
      "Sitio de catálogo para un fabricante directo de jacuzzis, bañeras y piezas en fibra de vidrio con 25 años de trayectoria. Organizamos toda la línea de producto en categorías navegables y conectamos cada llamado a la acción con el canal de ventas de la fábrica.",
    entregables: [
      "Catálogo por categorías de producto",
      "Casos de instalación con testimonios",
      "Rutas de cotización y asesoría técnica",
      "Analítica de comportamiento con Clarity",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Microsoft Clarity"],
    url: "https://freshjacuzzis.com.co",
    dominio: "freshjacuzzis.com.co",
    imagen: "/proyectos/fresh.jpg",
    imagenAlt: "Portada del sitio de FRESH con el catálogo de hidromasajes",
  },
  {
    key: "jenny-montoya",
    cliente: "Jenny Montoya",
    sector: "Marca personal · Psicología",
    resumen:
      "Sitio de marca personal para una psicóloga clínica, perito grafóloga y autora. Ordenamos trayectoria, enfoques de acompañamiento y obra publicada en un recorrido único, con la agenda de eventos como puerta de entrada y contacto directo por WhatsApp.",
    entregables: [
      "Agenda de próximos encuentros",
      "Secciones de trayectoria y metodología",
      "Presentación de la obra publicada",
      "Contacto directo por WhatsApp",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Netlify"],
    url: "https://jenny-montoya.netlify.app",
    dominio: "jenny-montoya.netlify.app",
    imagen: "/proyectos/jenny-montoya.jpg",
    imagenAlt: "Portada del sitio de Jenny Montoya, psicóloga y autora",
  },
  {
    key: "migestorlocal-denty-shalom",
    cliente: "Denty Shalom — Laboratorio Dental",
    sector: "Software de gestión · Salud dental",
    resumen:
      "MiGestorLocal, la aplicación de escritorio que lleva la operación completa del laboratorio: órdenes de trabajo, directorio de clínicas, catálogo de precios, insumos, nómina de técnicos y facturación. Corre sobre la base de datos del propio equipo, sin depender de una conexión a internet.",
    entregables: [
      "Órdenes de trabajo y control de pendientes",
      "Nómina de técnicos y catálogo de precios",
      "Facturación y reportes financieros en PDF",
      "Instalador para Windows y manual de usuario",
    ],
    stack: ["Electron", "React", "SQLite", "Tailwind CSS", "jsPDF"],
    entorno: "MiGestorLocal 2.0 · Windows",
    notaAcceso: "Instalado en el laboratorio del cliente. Pídenos una demo y te lo mostramos.",
  },
  {
    key: "crm-whatsapp",
    cliente: "CRM para WhatsApp",
    sector: "CRM · Ventas y mensajería",
    resumen:
      "Nuestro CRM para equipos que venden por WhatsApp: bandeja de entrada, contactos, embudos de negocios, difusiones y automatizaciones, con un panel que mide conversión y tiempo de primera respuesta. Es la base que implementamos y adaptamos a la operación de cada cliente.",
    entregables: [
      "Bandeja de entrada y gestión de contactos",
      "Embudos de negocios con valor por etapa",
      "Difusiones, automatizaciones y flujos",
      "Panel de conversión y tiempo de respuesta",
    ],
    stack: ["Next.js", "React", "Vercel"],
    entorno: "Panel del CRM",
    notaAcceso:
      "Se implementa y configura por cuenta. Pídenos una demo y te lo mostramos funcionando.",
  },
];
