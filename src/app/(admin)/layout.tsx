import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import getTranslation from "../../../i18n";
import { getMe } from "@/actions/users/getMe";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = await getTranslation();
  const me = await getMe();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full max-w-full">
        <AdminSidebar me={me} />
        <main className="w-full min-w-0 h-screen overflow-y-auto">
          <Navbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
