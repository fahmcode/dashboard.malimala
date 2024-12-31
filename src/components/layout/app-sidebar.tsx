"use client";

import * as React from "react";
import {
  Bell,
  ClipboardList,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  MessageSquare,
  MessagesSquare,
  Package,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { MoreNav } from "./more-nav";

const data = {
  user: {
    name: "Alibo Admin",
    email: "alibomarket@gmail.com",
    avatar: "https://ui-avatars.com/api/?name=Alibo+Admin&background=random",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "User Management",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Listings Management",
      url: "/dashboard/listings",
      icon: Package,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: CreditCard,
    },
    {
      title: "Applications",
      url: "/dashboard/applications",
      icon: ClipboardList,
    },
    {
      title: "Subscriptions",
      url: "/dashboard/subscriptions",
      icon: DollarSign,
    },
  ],

  more: [
    {
      title: "Message",
      icon: MessageSquare,
      url: "/dashboard/messages",
    },
    {
      title: "Notifications",
      icon: Bell,
      url: "/dashboard/notifications",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <MoreNav items={data.more} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
