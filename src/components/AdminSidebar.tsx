"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
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
  SquaresFourIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  {
    title: "DASHBOARD",
    url: "/dashboard",
    icon: SquaresFourIcon,
  },
  {
    title: "BENEFICIARIES",
    url: "/beneficiaries",
    icon: FolderUserIcon,
  },
  {
    title: "ADMINS",
    url: "/admins",
    icon: UsersThreeIcon,
  },
  {
    title: "SESSIONS",
    url: "/sessions",
    icon: ClipboardTextIcon,
  },
  {
    title: "PROJECTS",
    url: "/projects",
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
  const isMobile = useIsMobile();
  const pathname = "/" + usePathname().split("/")[1];

  return (
    <div className="relative bg-transparent">
      {isMobile && (
        <div className="absolute top-24 -end-10 z-10">
          <SideBarButton dir={i18n.dir()} />
        </div>
      )}

      <Sidebar
        className="relative"
        side={i18n.dir() === "ltr" ? "left" : "right"}
        collapsible="icon"
      >
        <div className="absolute top-24 -end-5 z-20">
          <SideBarButton dir={i18n.dir()} />
        </div>

        <SidebarHeader className="items-center py-6">
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
          <SidebarMenuButton
            asChild
            tooltip={t("SETTINGS")}
            className={`py-6 group-data-[collapsible=icon]:p-2 hover:bg-white/10 ${
              pathname === "/settings" && "bg-secondary/30"
            }`}
          >
            <a href="/settings">
              <GearIcon className="!w-8 !h-8 fill-white" />
              <span className="text-xl text-white">{t("SETTINGS")}</span>
            </a>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
