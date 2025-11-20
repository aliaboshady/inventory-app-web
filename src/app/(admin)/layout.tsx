import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/actions/users/getMe";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full max-w-full">
        <AdminSidebar me={me?.data} />
        <main className="w-full min-w-0 h-screen overflow-y-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
