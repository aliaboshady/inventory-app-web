"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarHeader,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  BrowsersIcon,
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  ClipboardTextIcon,
  FolderUserIcon,
  GearIcon,
  SignOutIcon,
  SquaresFourIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { logout } from "@/actions/auth/logout.action";
import { useTopLoader } from "nextjs-toploader";
import { ROUTES } from "@/lib/staticKeys";

const items = [
  {
    title: ROUTES.root.displayName,
    url: ROUTES.root.url,
    icon: SquaresFourIcon,
  },
  {
    title: ROUTES.beneficiaries.displayName,
    url: ROUTES.beneficiaries.url,
    icon: FolderUserIcon,
  },
  {
    title: ROUTES.users.displayName,
    url: ROUTES.users.url,
    icon: UsersThreeIcon,
  },
  {
    title: ROUTES.sessions.displayName,
    url: ROUTES.sessions.url,
    icon: ClipboardTextIcon,
  },
  {
    title: ROUTES.projects.displayName,
    url: ROUTES.projects.url,
    icon: BrowsersIcon,
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

export function AdminSidebar() {
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
          <Image alt="" src="/images/logo.png" width={50} height={50} />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2 group-data-[collapsible=icon]:gap-2">
                {items.map((item, index) => (
                  <Fragment key={item.title}>
                    <SidebarMenuItem>
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

                    {index === 0 && (
                      <div className="group-data-[collapsible=icon]:px-5">
                        <SidebarSeparator />
                      </div>
                    )}
                  </Fragment>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                tooltip={t("SETTINGS")}
                className={`py-6 group-data-[collapsible=icon]:p-2 hover:bg-white/10 ${
                  pathname === "/settings" && "bg-secondary/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <GearIcon className="!w-8 !h-8 fill-white" />
                  <span className="text-xl text-white">{t("SETTINGS")}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem
                className="p-1 w-full flex gap-1 items-center"
                onClick={handleLogout}
              >
                <SignOutIcon />
                <p>{t("SIGN_OUT")}</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
