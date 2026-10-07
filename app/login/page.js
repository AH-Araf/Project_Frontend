import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { media } from "@/lib/media";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/dashboard";

  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="hidden flex-col justify-between bg-ink px-10 py-10 text-white lg:flex xl:px-16">
        <Link href="/" className="flex items-center gap-3">
          <img src={media("Logo/logo.png")} alt="" className="h-12 w-11 object-contain" />
          <span className="text-sm font-semibold tracking-[0.18em]">BAIUST</span>
        </Link>
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/50">Cumilla</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Bangladesh Army International University of Science and Technology
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            Student and staff access to profiles, registration, results, and notices.
          </p>
        </div>
        <p className="text-xs text-white/40">Syedpur, Adarsha Sadar</p>
      </section>

      <section className="flex min-h-screen flex-col bg-white px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between lg:justify-end">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <img src={media("Logo/logo.png")} alt="" className="h-10 w-9 object-contain" />
            <span className="text-sm font-semibold tracking-wide">BAIUST</span>
          </Link>
          <Link href="/" className="text-sm text-mute hover:text-ink">Back to site</Link>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss">Sign in</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Your account</h2>
          <p className="mt-2 mb-8 text-sm leading-relaxed text-mute">
            Use the email and password issued by the registry.
          </p>
          <LoginForm next={next} />
          <div className="mt-6 rounded-lg bg-sand px-3 py-2.5 text-[11px] leading-relaxed text-ink">
            <p><span className="font-semibold text-moss">Staff</span> admin@baiust.ac.bd · Admin@123456</p>
            <p className="mt-1"><span className="font-semibold text-moss">Student</span> student@baiust.ac.bd · Student@123456</p>
          </div>
        </div>
      </section>
    </main>
  );
}
