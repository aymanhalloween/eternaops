"use client"

import * as React from "react"
import {
  BarChart3Icon,
  BookOpenIcon,
  BuildingIcon,
  ClockIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Eterna Team",
    email: "team@eterna.com",
    avatar: "/avatars/team.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Upload Files",
      url: "/dashboard/upload",
      icon: UploadIcon,
    },
    {
      title: "Retirement Homes",
      url: "/dashboard/homes",
      icon: BuildingIcon,
    },
    {
      title: "Residents",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "Recent Activity",
      url: "/dashboard/activity",
      icon: ClockIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ],
  documents: [
    {
      name: "Completed Memoirs",
      url: "#",
      icon: BookOpenIcon,
    },
    {
      name: "Operations Analytics",
      url: "#",
      icon: BarChart3Icon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <HeartHandshakeIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Eterna Operations</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
