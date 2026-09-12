import { createFileRoute } from "@tanstack/react-router";
import { TermsAndConditions } from "@/components/TermsAndConditions";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones — Nexo" },
      {
        name: "description",
        content:
          "Términos y Condiciones de uso del sitio web de NEXO – Soluciones Digitales & Consultoría.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Layout>
      <div className="pt-24">
        <TermsAndConditions />
      </div>
    </Layout>
  );
}
