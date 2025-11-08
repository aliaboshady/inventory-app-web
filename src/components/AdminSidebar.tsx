"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  ClipboardTextIcon,
  SignOutIcon,
  SquaresFourIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { logout } from "@/actions/auth/logout.action";
import { useTopLoader } from "nextjs-toploader";
import { ROUTES } from "@/lib/staticKeys";
import { User } from "@/models/user.model";
import { DropdownLanguage } from "./DropdownLanguage";
import AdminProfileDialog from "./AdminProfileDialog";

const items = [
  {
    title: ROUTES.root.displayName,
    url: ROUTES.root.url,
    icon: SquaresFourIcon,
  },
  {
    title: ROUTES.categories.displayName,
    url: ROUTES.categories.url,
    icon: ClipboardTextIcon,
  },
  {
    title: ROUTES.users.displayName,
    url: ROUTES.users.url,
    icon: UsersThreeIcon,
  },
];

function SideBarButton({ dir }: { dir: "ltr" | "rtl" }) {
  const { toggleSidebar, state, isMobile, openMobile } = useSidebar();

  const Icon = dir === "ltr" ? CaretDoubleRightIcon : CaretDoubleLeftIcon;
  const rotation =
    (!isMobile && state === "expanded") || (isMobile && openMobile)
      ? "rotate-180"
      : "";

  return (
    <button
      onClick={toggleSidebar}
      className="bg-white p-2 w-fit h-fit rounded-full shadow-md shadow-black/50"
    >
      <Icon className={`fill-primary  transition-all ${rotation}`} size={20} />
    </button>
  );
}

export function AdminSidebar({ me }: { me: User }) {
  const { t, i18n } = useTranslation();
  const { start: startTopLoader } = useTopLoader();
  const isMobile = useIsMobile();
  const pathname = "/" + usePathname().split("/")[1];

  const handleLogout = () => {
    startTopLoader();
    logout();
  };

  return (
    <div className="relative bg-transparent">
      {isMobile && (
        <div className="absolute top-4 -end-12 z-10">
          <SideBarButton dir={i18n.dir()} />
        </div>
      )}

      <Sidebar
        className="fixed"
        side={i18n.dir() === "ltr" ? "left" : "right"}
        collapsible="icon"
      >
        <div className="absolute top-4 -end-5 z-20">
          <SideBarButton dir={i18n.dir()} />
        </div>

        <SidebarHeader className="items-center py-4">
          <AdminProfileDialog me={me} />
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2 group-data-[collapsible=icon]:gap-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={t(item.title)}
                      className={`py-6 group-data-[collapsible=icon]:p-2 hover:bg-white/10 active:bg-secondary/30 ${
                        pathname === item.url && "bg-secondary/30"
                      }`}
                    >
                      <a href={item.url}>
                        <item.icon className="!w-8 !h-8 fill-white" />
                        <span className="text-xl text-white">
                          {t(item.title)}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <DropdownLanguage />

          <SidebarMenuButton
            tooltip={t("LOGOUT")}
            className="py-6 group-data-[collapsible=icon]:p-2 hover:bg-white/10 active:bg-primary"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-2">
              <SignOutIcon className="!w-8 !h-8 fill-white" />
              <span className="text-xl text-white">{t("LOGOUT")}</span>
            </div>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
