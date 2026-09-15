// Guiones de los 3 videos promocionales simulados que rota el carrusel del
// showcase de producto (ver ProductVideo / ProductVideoCarousel). El texto
// del panel de ProductShowcase es fijo a propósito: solo el video cambia al
// deslizar, para que el layout de la sección no salte de tamaño.

export type ProductVideoIconName =
  "code" | "database" | "bolt" | "bell" | "grid" | "cloud" | "doc" | "check" | "up";

export type ProductVideoTone = "info" | "success" | "warning";

interface SceneRow {
  icon: ProductVideoIconName;
  title: string;
  sub: string;
  value: string;
}

interface SceneNotif {
  icon: ProductVideoIconName;
  tone: ProductVideoTone;
  title: string;
  sub: string;
}

export interface ProductVideoData {
  key: string;
  icon: ProductVideoIconName;
  dotLabel: string;
  captionLabel: string;
  ariaLabel: string;
  scenes: {
    scene0: { eyebrow: string; title: string; subtitle: string };
    scene1: {
      greetLabel: string;
      greetSub: string;
      metricLabel: string;
      metricValue: string;
      badge: string;
    };
    scene2: {
      eyebrow: string;
      legend1: string;
      legend2: string;
      row1: SceneRow;
      row2: SceneRow;
    };
    scene3: {
      eyebrow: string;
      notif1: SceneNotif;
      notif2: SceneNotif;
      notif3: SceneNotif;
    };
    scene4: {
      eyebrow: string;
      rows: [string, string, string, boolean][];
      stamp: string;
    };
    scene5: {
      eyebrow: string;
      icon: ProductVideoIconName;
      deployTitle: string;
      deployUrl: string;
      successTitle: string;
      successSub: string;
      docTitle: string;
      docSub: string;
    };
    scene6: { tagline: string };
  };
}

export const PRODUCT_VIDEOS: ProductVideoData[] = [
  {
    key: "plataformas",
    icon: "code",
    dotLabel: "Plataformas web",
    captionLabel: "Plataformas y sistemas",
    ariaLabel:
      "Video promocional vertical de 35 segundos sobre desarrollo de plataformas web de alto rendimiento de Nexo: arquitectura, monitoreo, panel de control y despliegues continuos a producción.",
    scenes: {
      scene0: {
        eyebrow: "Software a medida",
        title: "Nexo",
        subtitle: "Plataformas, automatización y sistemas corporativos que escalan con tu negocio.",
      },
      scene1: {
        greetLabel: "Sistema en línea",
        greetSub: "Panel de arquitectura",
        metricLabel: "Tiempo de respuesta promedio",
        metricValue: "128 ms",
        badge: "+42% más rápido esta semana",
      },
      scene2: {
        eyebrow: "Automatización en tiempo real",
        legend1: "Pico de automatización",
        legend2: "Resto de la semana",
        row1: {
          icon: "bolt",
          title: "Procesos automatizados hoy",
          sub: "34 tareas ejecutadas",
          value: "+128 h ahorradas",
        },
        row2: {
          icon: "database",
          title: "Sincronización de datos",
          sub: "Bases de datos y APIs",
          value: "100% en línea",
        },
      },
      scene3: {
        eyebrow: "Monitoreo 24/7",
        notif1: {
          icon: "cloud",
          tone: "info",
          title: "Despliegue completado en producción",
          sub: "Automatizado vía CI/CD",
        },
        notif2: {
          icon: "database",
          tone: "success",
          title: "Backup completado · Base de datos",
          sub: "Sin errores",
        },
        notif3: {
          icon: "bell",
          tone: "warning",
          title: "Certificado SSL renueva en 3 días",
          sub: "Renovación automática programada",
        },
      },
      scene4: {
        eyebrow: "Panel de control",
        rows: [
          ["API Gateway", "99.98%", "Activo", true],
          ["Base de datos", "99.95%", "Activo", true],
          ["CDN Global", "100%", "Activo", true],
          ["Servidor de imágenes", "—", "Mantenimiento", false],
        ],
        stamp: "Monitoreo activo 24/7",
      },
      scene5: {
        eyebrow: "Despliegue continuo",
        icon: "cloud",
        deployTitle: "Desplegando a producción…",
        deployUrl: "api.nexo.com",
        successTitle: "Despliegue exitoso",
        successSub: "api.nexo.com",
        docTitle: "Reporte_Arquitectura.pdf",
        docSub: "Generado automáticamente",
      },
      scene6: {
        tagline: "Un equipo. Toda tu infraestructura, en producción.",
      },
    },
  },

  {
    key: "automatizacion",
    icon: "bolt",
    dotLabel: "Automatización",
    captionLabel: "Automatización de procesos",
    ariaLabel:
      "Video promocional vertical de 35 segundos sobre automatización de procesos de Nexo: flujos de trabajo, integraciones, reportes y notificaciones automáticas.",
    scenes: {
      scene0: {
        eyebrow: "Automatización de procesos",
        title: "Nexo",
        subtitle:
          "Flujos de trabajo que conectan tus herramientas y eliminan el trabajo repetitivo.",
      },
      scene1: {
        greetLabel: "Flujo activo",
        greetSub: "Motor de automatización",
        metricLabel: "Horas ahorradas este mes",
        metricValue: "186 h",
        badge: "+65% menos trabajo manual",
      },
      scene2: {
        eyebrow: "Tareas automatizadas por día",
        legend1: "Pico de ejecución",
        legend2: "Resto de la semana",
        row1: {
          icon: "doc",
          title: "Facturas generadas hoy",
          sub: "21 documentos emitidos",
          value: "100% sin errores",
        },
        row2: {
          icon: "bolt",
          title: "Integraciones activas",
          sub: "WhatsApp, Excel y correo",
          value: "3 conectadas",
        },
      },
      scene3: {
        eyebrow: "Flujos en ejecución",
        notif1: {
          icon: "doc",
          tone: "info",
          title: "Factura generada y enviada",
          sub: "Cliente: Distribuidora Sur",
        },
        notif2: {
          icon: "bolt",
          tone: "success",
          title: "Reporte semanal armado",
          sub: "Listo para revisión",
        },
        notif3: {
          icon: "bell",
          tone: "warning",
          title: "Recordatorio de pago enviado",
          sub: "3 clientes notificados",
        },
      },
      scene4: {
        eyebrow: "Flujos automatizados",
        rows: [
          ["Facturación", "Diario", "Activo", true],
          ["Cobranza", "Diario", "Activo", true],
          ["Reportes", "Semanal", "Activo", true],
          ["Inventario", "Config. pendiente", "Pausado", false],
        ],
        stamp: "34 flujos ejecutándose",
      },
      scene5: {
        eyebrow: "Publicación de flujo",
        icon: "bolt",
        deployTitle: "Publicando flujo de automatización…",
        deployUrl: "flujos.nexo.com",
        successTitle: "Flujo activado",
        successSub: "flujos.nexo.com",
        docTitle: "Manual_Proceso.pdf",
        docSub: "Generado automáticamente",
      },
      scene6: {
        tagline: "Menos tareas repetitivas. Más tiempo para tu negocio.",
      },
    },
  },

  {
    key: "corporativo",
    icon: "grid",
    dotLabel: "Paneles corporativos",
    captionLabel: "Sistemas corporativos",
    ariaLabel:
      "Video promocional vertical de 35 segundos sobre sistemas y paneles corporativos de Nexo: módulos internos, reportes ejecutivos y control de accesos.",
    scenes: {
      scene0: {
        eyebrow: "Sistemas corporativos",
        title: "Nexo",
        subtitle: "Paneles y módulos internos que centralizan la operación de tu empresa.",
      },
      scene1: {
        greetLabel: "Panel corporativo",
        greetSub: "Vista general",
        metricLabel: "Usuarios activos hoy",
        metricValue: "482",
        badge: "+18% vs. la semana pasada",
      },
      scene2: {
        eyebrow: "Uso por departamento",
        legend1: "Departamento con más uso",
        legend2: "Resto de la empresa",
        row1: {
          icon: "grid",
          title: "Nuevo módulo publicado",
          sub: "Reportes ejecutivos",
          value: "Disponible",
        },
        row2: {
          icon: "database",
          title: "Roles y permisos",
          sub: "Actualizados hoy",
          value: "12 equipos",
        },
      },
      scene3: {
        eyebrow: "Actividad del sistema",
        notif1: {
          icon: "doc",
          tone: "info",
          title: "Reporte ejecutivo generado",
          sub: "Cierre de mes",
        },
        notif2: {
          icon: "database",
          tone: "success",
          title: "Base de datos respaldada",
          sub: "Sin errores",
        },
        notif3: {
          icon: "bell",
          tone: "warning",
          title: "Nuevo acceso pendiente de aprobar",
          sub: "Equipo de Operaciones",
        },
      },
      scene4: {
        eyebrow: "Módulos del sistema",
        rows: [
          ["Facturación", "1,204 registros", "Activo", true],
          ["Inventario", "386 SKU", "Activo", true],
          ["Recursos Humanos", "48 usuarios", "Activo", true],
          ["Reportes", "Config. pendiente", "Revisión", false],
        ],
        stamp: "Sistema centralizado activo",
      },
      scene5: {
        eyebrow: "Reporte ejecutivo",
        icon: "grid",
        deployTitle: "Generando reporte ejecutivo…",
        deployUrl: "panel.nexo.com",
        successTitle: "Reporte listo",
        successSub: "panel.nexo.com",
        docTitle: "Resumen_Directivo.pdf",
        docSub: "Generado automáticamente",
      },
      scene6: {
        tagline: "Toda tu empresa, organizada en un solo lugar.",
      },
    },
  },
];
