import { Shield, ChevronRight } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <section className="relative bg-background py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-[#00c2ff]">
            <Shield className="h-8 w-8" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Política de Privacidad</h2>
            <p className="text-base text-muted-foreground mt-1">
              Última actualización: Septiembre de 2026
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
          <div className="bg-card border border-border rounded-3xl p-12 space-y-12 shadow-lg">
            <div className="border-b border-border/50 pb-8">
              <p className="text-lg text-foreground font-medium leading-relaxed mb-4">
                En Nexo transformamos la tecnología en resultados reales para tu empresa. No solo
                creamos herramientas, diseñamos el ecosistema digital que tu marca necesita para
                crecer sin límites.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  1
                </span>
                Identificación del Responsable
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                NEXO – Soluciones Digitales & Consultoría, en adelante "NEXO", reconoce la
                importancia de proteger la información personal de sus usuarios, clientes,
                prospectos, proveedores y demás personas que interactúen con sus canales digitales.
                La presente Política establece los lineamientos bajo los cuales NEXO recolecta,
                almacena, utiliza, administra, protege y, cuando corresponda, elimina los datos
                personales suministrados por los usuarios.
              </p>
              <div className="bg-muted/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff]">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      Responsable del tratamiento: NEXO – Soluciones Digitales & Consultoría
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">País:</span>
                    <span className="text-sm text-foreground">Colombia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Correo electrónico:
                    </span>
                    <span className="text-sm text-foreground">nexosolutions5@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Sitio web:</span>
                    <span className="text-sm text-foreground">
                      https://nexo-digital-growth.vercel.app/
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Teléfono:</span>
                    <span className="text-sm text-foreground">+57 3217286503</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  2
                </span>
                Marco Legal
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                Esta política se desarrolla principalmente de acuerdo con la normativa colombiana
                aplicable en materia de protección de datos personales, incluyendo la Ley 1581 de
                2012, sus normas reglamentarias y demás disposiciones que resulten aplicables. La
                normativa colombiana reconoce a los titulares de datos personales, entre otros, el
                derecho a conocer, actualizar, rectificar y solicitar la supresión de la información
                cuando corresponda. La Superintendencia de Industria y Comercio – SIC es la
                autoridad encargada de ejercer funciones de vigilancia sobre esta materia.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  3
                </span>
                Datos Personales que Podemos Recopilar
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                Dependiendo de la interacción que tenga el usuario con NEXO, podremos solicitar o
                recopilar información como:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Nombre y apellido",
                  "Empresa u organización",
                  "Cargo",
                  "Número de teléfono",
                  "Correo electrónico",
                  "Ciudad o país",
                  "Información relacionada con los servicios que desea contratar",
                  "Información suministrada en formularios de contacto",
                  "Información relacionada con proyectos, requerimientos o necesidades empresariales",
                  "Información necesaria para elaborar cotizaciones o propuestas comerciales",
                  "Información proporcionada voluntariamente durante conversaciones por WhatsApp, correo electrónico u otros canales autorizados",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6 text-base">
                Adicionalmente, determinados sistemas tecnológicos pueden recopilar información
                técnica relacionada con la navegación, como dirección IP, tipo de dispositivo,
                navegador, sistema operativo, páginas visitadas y datos de interacción con el sitio
                web, de acuerdo con las configuraciones y tecnologías utilizadas.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  4
                </span>
                Finalidades del Tratamiento
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    4.1 Atención comercial
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                    {[
                      "Responder solicitudes de información",
                      "Contactar a personas interesadas en nuestros servicios",
                      "Elaborar cotizaciones y propuestas comerciales",
                      "Programar reuniones o asesorías",
                      "Realizar seguimiento a oportunidades comerciales",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    4.2 Prestación de servicios
                  </h4>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                    Cuando exista una relación contractual, los datos podrán utilizarse para:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                    {[
                      "Ejecutar los servicios contratados",
                      "Coordinar actividades relacionadas con el proyecto",
                      "Mantener comunicación con el cliente",
                      "Gestionar solicitudes, requerimientos y soporte",
                      "Realizar procesos administrativos, comerciales y de facturación",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    4.3 Comunicaciones comerciales
                  </h4>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                    Cuando el usuario haya otorgado la autorización correspondiente, NEXO podrá
                    enviar:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                    {[
                      "Información sobre servicios",
                      "Promociones",
                      "Nuevos productos o soluciones",
                      "Invitaciones a eventos",
                      "Contenido educativo",
                      "Información relacionada con transformación digital, IA, CRM, desarrollo web y analítica de datos",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4 text-base">
                    El usuario podrá solicitar en cualquier momento dejar de recibir comunicaciones
                    comerciales.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    4.4 Mejoramiento de nuestros servicios
                  </h4>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                    La información podrá utilizarse para:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                    {[
                      "Analizar el comportamiento general de los usuarios",
                      "Mejorar la experiencia del sitio web",
                      "Optimizar procesos comerciales",
                      "Mejorar nuestros productos y servicios",
                      "Identificar necesidades de los clientes",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  5
                </span>
                Tratamiento de Datos a través de Formularios
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                Cuando el usuario diligencie un formulario disponible en el sitio web de NEXO, la
                información será utilizada para atender la solicitud realizada y, cuando exista
                autorización, para establecer comunicaciones comerciales relacionadas con nuestros
                servicios. Los formularios podrán solicitar información como nombre, empresa,
                teléfono, correo electrónico y descripción de la necesidad empresarial. El usuario
                deberá suministrar información verdadera, completa y actualizada.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  6
                </span>
                WhatsApp y Otros Canales de Comunicación
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                NEXO podrá utilizar canales como WhatsApp, correo electrónico, llamadas telefónicas
                y otros medios digitales para atender solicitudes comerciales y prestar servicios.
                La utilización de estos canales implica que determinada información podrá ser
                procesada por los respectivos proveedores tecnológicos de acuerdo con sus propias
                políticas y condiciones. NEXO procurará utilizar estos canales únicamente para las
                finalidades informadas al usuario y de acuerdo con las autorizaciones
                correspondientes.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  7
                </span>
                Cookies y Tecnologías Similares
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                El sitio web de NEXO podrá utilizar cookies y tecnologías similares para facilitar
                la navegación, recordar determinadas preferencias, analizar el funcionamiento del
                sitio y, cuando corresponda, medir campañas de marketing. Las cookies podrán
                utilizarse para:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Garantizar el funcionamiento del sitio",
                  "Mejorar la experiencia de navegación",
                  "Obtener estadísticas de uso",
                  "Analizar campañas publicitarias",
                  "Comprender cómo interactúan los usuarios con nuestros contenidos",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6 text-base">
                El usuario podrá administrar o bloquear las cookies desde la configuración de su
                navegador. Cuando determinadas cookies requieran consentimiento, NEXO implementará
                los mecanismos correspondientes para solicitarlo.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  8
                </span>
                Datos Sensibles
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                NEXO no solicitará datos sensibles salvo que exista una finalidad legítima y una
                autorización o circunstancia que permita su tratamiento conforme a la legislación
                aplicable. Los usuarios deberán abstenerse de suministrar información sensible a
                través de formularios o canales de contacto cuando esta no sea necesaria para la
                prestación del servicio.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  9
                </span>
                Seguridad de la Información
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                NEXO implementará medidas técnicas, administrativas y organizativas razonables
                destinadas a proteger los datos personales contra pérdida, acceso no autorizado,
                alteración, divulgación o tratamiento indebido. Sin embargo, ningún sistema
                conectado a Internet puede garantizar seguridad absoluta. En caso de presentarse un
                incidente de seguridad que pueda afectar los datos personales, NEXO actuará de
                acuerdo con las obligaciones legales aplicables.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  10
                </span>
                Terceros y Proveedores Tecnológicos
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                Para prestar determinados servicios, NEXO podrá utilizar proveedores tecnológicos
                especializados en alojamiento, almacenamiento, automatización, analítica,
                comunicaciones, infraestructura, desarrollo de software y otras herramientas
                digitales. Cuando corresponda, dichos proveedores podrán actuar como encargados del
                tratamiento o procesadores de información, de acuerdo con la relación contractual y
                la legislación aplicable. NEXO procurará que los terceros que tengan acceso a
                información personal adopten medidas adecuadas de seguridad y confidencialidad.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  11
                </span>
                Transferencia o Transmisión Internacional
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                Debido a la naturaleza de los servicios tecnológicos utilizados por NEXO,
                determinada información podría ser almacenada o procesada en servidores ubicados
                fuera de Colombia. Cuando sea aplicable, NEXO realizará dichas transferencias o
                transmisiones de información de acuerdo con las condiciones y requisitos
                establecidos por la legislación colombiana.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  12
                </span>
                Derechos del Titular
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                De acuerdo con la normativa aplicable, el titular de los datos podrá:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Conocer los datos personales que NEXO posee sobre él",
                  "Solicitar la actualización de su información",
                  "Solicitar la rectificación de datos incorrectos o incompletos",
                  "Solicitar información sobre el uso de sus datos",
                  "Solicitar la supresión de sus datos cuando legalmente corresponda",
                  "Revocar la autorización otorgada para el tratamiento cuando sea procedente",
                  "Presentar consultas o reclamos relacionados con el tratamiento de sus datos",
                  "Solicitar copia de la autorización otorgada cuando corresponda",
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
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  13
                </span>
                Procedimiento para Consultas y Reclamos
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                El titular podrá presentar consultas, solicitudes o reclamos relacionados con sus
                datos personales a través del correo:
              </p>
              <div className="bg-muted/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff]">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      nexosolutions5@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                La solicitud deberá contener, como mínimo:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Nombre completo del titular",
                  "Información de contacto",
                  "Descripción de la solicitud",
                  "Documentos o información que permitan identificar la situación, cuando corresponda",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-[#00c2ff] mt-0.5 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6 text-base">
                NEXO atenderá las solicitudes dentro de los términos establecidos por la legislación
                colombiana aplicable.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  14
                </span>
                Conservación de los Datos
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                NEXO conservará los datos personales durante el tiempo que resulte necesario para
                cumplir las finalidades informadas, atender obligaciones legales, contractuales,
                comerciales o administrativas y ejercer o defender derechos. Cuando los datos ya no
                sean necesarios y no exista una obligación legal de conservarlos, se procederá de
                acuerdo con las políticas internas aplicables.
              </p>
            </div>

            <div className="border-b border-border/50 pb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  15
                </span>
                Actualizaciones de esta Política
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                NEXO podrá modificar o actualizar esta Política de Privacidad cuando sea necesario
                por cambios legales, tecnológicos, operativos o comerciales. Las modificaciones
                serán publicadas en el sitio web cuando corresponda. Última actualización:
                Septiembre de 2026.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff] text-sm font-bold">
                  16
                </span>
                Contacto
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                Para cualquier pregunta relacionada con esta Política de Privacidad y Tratamiento de
                Datos Personales, puede comunicarse con:
              </p>
              <div className="bg-muted/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff]">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      NEXO – Soluciones Digitales & Consultoría
                    </p>
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
                    <span className="text-sm text-foreground">
                      https://nexo-digital-growth.vercel.app/
                    </span>
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
