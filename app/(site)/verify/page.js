import { PageBanner } from "@/components/site/banner";
import { VerifyForm } from "@/components/verify-form";

export const metadata = { title: "Verify a certificate" };

export default function VerifyPage() {
  return (
    <div>
      <PageBanner
        image="scenes/law-library.jpg"
        eyebrow="Records"
        title="Certificate verification"
        lede="Enter the department and student ID printed on the certificate."
      />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <VerifyForm />
      </div>
    </div>
  );
}
