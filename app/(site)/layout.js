import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getSession } from "@/lib/auth";

export default async function SiteLayout({ children }) {
  const { user } = await getSession();

  return (
    <div className="flex min-h-screen flex-col">
      <Header signedIn={Boolean(user)} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
