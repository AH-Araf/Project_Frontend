import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata = {
  title: {
    default: "BAIUST",
    template: "%s · BAIUST",
  },
  description: "Bangladesh Army International University of Science and Technology, Cumilla.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${fraunces.variable} min-h-screen bg-paper font-sans text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
