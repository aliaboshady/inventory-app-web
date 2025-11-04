import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import getTranslation from "../../i18n";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import NextTopLoader from "nextjs-toploader";
import { getTailwindColor } from "@/lib/utils";
import { ToastContainer } from "react-toastify";

const quicksand = localFont({
  src: "../../public/fonts/Quicksand-VariableFont_wght.ttf",
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EGC",
  description: "EGC",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { resources, i18n, locale } = await getTranslation();

  return (
    <html lang={locale} dir={i18n.dir()}>
      <body
        className={`${quicksand.variable} font-quicksand antialiased bg-white`}
      >
        <TranslationsProvider
          resources={resources}
          locale={locale}
          namespaces={["locale"]}
        >
          <NextTopLoader showSpinner color={getTailwindColor("primary")} />
          {children}
          <ToastContainer position="bottom-center" autoClose={2000} />
        </TranslationsProvider>
      </body>
    </html>
  );
}
