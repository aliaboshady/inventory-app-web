import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import getTranslation from "../../../i18n";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = await getTranslation();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full max-w-full">
        <AdminSidebar />
        <main className="w-full min-w-0">
          <Navbar role={t("SUPER_ADMIN")} />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
