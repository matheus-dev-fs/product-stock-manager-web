import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
    message: string;
    label: string;
    href: string;
    canManage: boolean;
}

export function EmptyState({ message, label, href, canManage }: Props) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <p className="mb-4">{message}</p>
            {canManage ? (
                <Link href={href}>
                    <Button>{label}</Button>
                </Link>
            ) : (
                <Button disabled>{label}</Button>
            )}
        </div>
    );
}
