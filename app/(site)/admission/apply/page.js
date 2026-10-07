import { AdmissionForm } from "@/components/admission-form";
import { PageBanner } from "@/components/site/banner";

export const metadata = { title: "Apply" };

export default function ApplyPage() {
  return (
    <div>
      <PageBanner
        image="scenes/business-seminar.jpg"
        eyebrow="Admission"
        title="Application"
        lede="Tell us who you are and which programme you want. A photograph is optional."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
          <AdmissionForm />
        </div>
      </div>
    </div>
  );
}
