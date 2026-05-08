"use client"

import { CalendarSearch, Inbox, LayoutDashboard, LogOut, Search, User as UserIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "./logo"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { Button } from "./ui/button"
import { logoutAction } from "@/actions/auth"
import { User } from "@/types/user"

type Props = {
  user: User;
}

export function AppSidebar({ user }: Props) {
  return (
    <Sidebar>
      <SidebarHeader className="text-center">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard">
                  <SidebarMenuButton>
                    <LayoutDashboard /> <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/categories">
                  <SidebarMenuButton>
                    <Search /> <span>Categorias</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/users">
                  <SidebarMenuButton>
                    <UserIcon /> <span>Usuários</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Estoque</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/products">
                  <SidebarMenuButton>
                    <Inbox /> <span>Produtos</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/moves">
                  <SidebarMenuButton>
                    <CalendarSearch /> <span>Entrada/Saída</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <ThemeToggle />
          <Button onClick={logoutAction} size="icon" variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
