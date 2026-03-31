import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authService } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function PainelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: user } = await authService.getMe();

    if (!user) {
        redirect("/login");
    }

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <div className="flex-1 relative p-4 pt-10">
                <div className="absolute left-1 top-1">
                    <SidebarTrigger />
                </div>
                {children}
            </div>
        </SidebarProvider>
    );
}
