import { FileText, ChevronRight } from "lucide-react";

export function TermsAndConditions() {
  return (
    <section className="relative bg-background py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-[#00c2ff]">
            <FileText className="h-8 w-8" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Términos y Condiciones</h2>
            <p className="text-base text-muted-foreground mt-1">Última actualización: Septiembre de 2026</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
          <div className="bg-card border border-border rounded-3xl p-12 space-y-12 shadow-lg">
            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">1</span>
                Aceptación de los Términos
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                El acceso, navegación y utilización del sitio web de NEXO implica la aceptación de los presentes Términos y Condiciones de Uso. Si el usuario no está de acuerdo con alguno de estos términos, deberá abstenerse de utilizar el sitio web y sus funcionalidades. Estos términos regulan el uso general del sitio web y no sustituyen los contratos particulares que puedan celebrarse entre NEXO y sus clientes.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">2</span>
                Información de NEXO
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                NEXO – Soluciones Digitales & Consultoría es una empresa orientada al desarrollo de soluciones tecnológicas y servicios de consultoría empresarial. Entre sus servicios pueden encontrarse:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Desarrollo web a medida",
                  "Desarrollo de plataformas digitales",
                  "CRM personalizados",
                  "Automatización de procesos",
                  "Integración de Inteligencia Artificial",
                  "Analítica de datos",
                  "Inteligencia de negocios",
                  "Consultoría y asesoría tecnológica",
                  "Integración de herramientas digitales"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">3</span>
                Uso Permitido del Sitio Web
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                El usuario podrá utilizar el sitio web para:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Conocer los servicios de NEXO",
                  "Solicitar información",
                  "Contactar a la empresa",
                  "Solicitar cotizaciones",
                  "Programar asesorías",
                  "Consultar contenido informativo",
                  "Conocer proyectos y soluciones ofrecidas"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6 text-base">
                El uso del sitio deberá realizarse de manera lícita, responsable y respetuosa.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500 text-sm font-bold">4</span>
                Usos Prohibidos
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                Está prohibido utilizar el sitio web para:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Realizar actividades ilegales",
                  "Intentar acceder sin autorización a sistemas o servidores",
                  "Introducir virus, malware o código malicioso",
                  "Interferir con el funcionamiento del sitio",
                  "Extraer información mediante mecanismos automatizados no autorizados",
                  "Suplantar la identidad de otra persona o empresa",
                  "Utilizar la información del sitio para actividades fraudulentas",
                  "Copiar, reproducir o distribuir contenido protegido sin autorización",
                  "Intentar vulnerar mecanismos de seguridad",
                  "Utilizar formularios para enviar contenido ofensivo, ilegal o malicioso"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6 text-base">
                NEXO podrá restringir o bloquear el acceso a usuarios que incumplan estos términos.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">5</span>
                Propiedad Intelectual
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                Los contenidos publicados en el sitio web, incluyendo, entre otros:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Logotipos",
                  "Marca NEXO",
                  "Diseños",
                  "Textos",
                  "Gráficos",
                  "Imágenes",
                  "Videos",
                  "Interfaces",
                  "Elementos visuales",
                  "Materiales comerciales"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6 text-base">
                Podrán estar protegidos por las normas aplicables de propiedad intelectual. Salvo autorización expresa, no está permitido copiar, modificar, distribuir, comercializar o utilizar dichos contenidos con fines comerciales.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">6</span>
                Marca NEXO
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                El nombre, logotipo, identidad visual y demás elementos distintivos de NEXO pertenecen a sus respectivos titulares. El uso no autorizado de la marca podrá generar las acciones legales correspondientes.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">7</span>
                Información sobre Servicios y Precios
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                La información publicada en el sitio web tiene carácter informativo y comercial. Las características, funcionalidades, precios, tiempos de desarrollo y condiciones de cada proyecto podrán variar dependiendo de los requerimientos particulares del cliente. Una solicitud de información o cotización no constituye por sí misma la celebración de un contrato. Los servicios serán prestados bajo las condiciones establecidas en la respectiva propuesta comercial, cotización, orden de servicio o contrato.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">8</span>
                Cotizaciones y Propuestas
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                Las cotizaciones elaboradas por NEXO podrán estar sujetas a:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Alcance del proyecto",
                  "Número de funcionalidades",
                  "Integraciones requeridas",
                  "Tiempo de desarrollo",
                  "Infraestructura tecnológica",
                  "Licencias o servicios de terceros",
                  "Número de usuarios",
                  "Requerimientos especiales"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6 text-base">
                Por lo tanto, el precio final de un proyecto podrá diferir de cualquier valor referencial publicado en medios digitales.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">9</span>
                Servicios de Terceros
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                Algunos servicios o soluciones desarrollados por NEXO pueden integrar herramientas, plataformas, APIs, servicios en la nube o tecnologías pertenecientes a terceros. Estas herramientas pueden estar sujetas a sus propias condiciones de uso, políticas de privacidad, precios y limitaciones. NEXO no será responsable por modificaciones, interrupciones o cambios realizados directamente por proveedores externos, sin perjuicio de las obligaciones que NEXO haya asumido contractualmente frente al cliente.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">10</span>
                Disponibilidad del Sitio
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                NEXO procurará mantener disponible y funcionando correctamente su sitio web. Sin embargo, el sitio podría presentar interrupciones debido a:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Mantenimiento",
                  "Actualizaciones",
                  "Fallas técnicas",
                  "Problemas de conectividad",
                  "Ataques informáticos",
                  "Fallas de proveedores tecnológicos",
                  "Situaciones de fuerza mayor o circunstancias fuera del control de NEXO"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6 text-base">
                NEXO procurará restablecer el funcionamiento normal en el menor tiempo razonable posible.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">11</span>
                Enlaces Externos
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                El sitio web podrá contener enlaces hacia páginas, plataformas o servicios de terceros. Estos enlaces se proporcionan como referencia o para facilitar el acceso a determinados servicios. NEXO no controla necesariamente el contenido, políticas, disponibilidad o condiciones de dichos sitios externos. El usuario será responsable de revisar las políticas y términos aplicables al utilizar plataformas de terceros.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">12</span>
                Información Proporcionada por el Usuario
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                El usuario se compromete a suministrar información verdadera, completa y actualizada cuando utilice formularios, solicite cotizaciones o se comunique con NEXO. El usuario será responsable de la información que proporcione y de contar con las autorizaciones necesarias para suministrar información de terceros.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">13</span>
                Protección de Datos Personales
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                El tratamiento de los datos personales recopilados a través del sitio web se realizará de acuerdo con la Política de Privacidad y Tratamiento de Datos Personales de NEXO. Al utilizar formularios o determinados servicios del sitio, el usuario podrá encontrar mecanismos para autorizar expresamente el tratamiento de sus datos cuando sea necesario.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">14</span>
                Limitación de Responsabilidad
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                NEXO procurará que la información publicada en su sitio sea clara y actualizada. No obstante, la información disponible en el sitio puede estar sujeta a cambios y no constituye necesariamente una garantía sobre resultados específicos. Los resultados obtenidos mediante una solución tecnológica dependerán, entre otros factores, de las características del negocio, implementación, información disponible, participación del cliente, infraestructura y condiciones de operación. Las obligaciones específicas de NEXO frente a cada cliente estarán determinadas por el contrato o documento comercial correspondiente.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">15</span>
                Contenido Informativo
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                Los artículos, publicaciones, recomendaciones, ejemplos, casos de uso y demás contenido publicado por NEXO tienen finalidad informativa. La información no constituye necesariamente asesoría jurídica, financiera, contable o profesional especializada, salvo que expresamente se indique lo contrario.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">16</span>
                Modificación de los Términos
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                NEXO podrá modificar estos Términos y Condiciones cuando sea necesario para adaptarlos a cambios legales, tecnológicos, comerciales o funcionales. La versión vigente será la publicada en el sitio web.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">17</span>
                Legislación Aplicable
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                Estos Términos y Condiciones se regirán por las leyes aplicables de la República de Colombia. Cualquier controversia relacionada con el uso del sitio o los servicios de NEXO será atendida inicialmente mediante comunicación directa entre las partes, sin perjuicio de los mecanismos legales que correspondan.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">18</span>
                Contacto
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                Para preguntas, solicitudes o comentarios relacionados con estos Términos y Condiciones:
              </p>
              <div className="bg-muted/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">NEXO – Soluciones Digitales & Consultoría</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Correo:</span>
                    <span className="text-sm text-foreground">nexosolutions5@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Teléfono:</span>
                    <span className="text-sm text-foreground">+57 321 728 6503</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Sitio web:</span>
                    <span className="text-sm text-foreground">https://nexo-digital-growth.vercel.app/</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">País:</span>
                    <span className="text-sm text-foreground">Colombia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}