import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad — Nexo" },
      {
        name: "description",
        content:
          "Política de Privacidad y Tratamiento de Datos Personales de NEXO – Soluciones Digitales & Consultoría.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Layout>
      <div className="pt-24">
        <PrivacyPolicy />
      </div>
    </Layout>
  );
}
