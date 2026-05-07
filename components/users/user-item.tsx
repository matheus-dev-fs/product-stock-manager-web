"use client"

import { Edit, User as UserIcon } from "lucide-react";
import type { User } from "@/types/user";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import Link from "next/link";
import { deleteUserAction } from "@/actions/user";
import { use, useState } from "react";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";

type Props = {
    user: User;
};

export const UserItem = ({ user }: Props) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const result = await deleteUserAction(user.id);

        if (result.error) {
            alert(result.error);
        }
        setIsDeleting(false);
    };

    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-2">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="size-6 rounded-full object-cover"
                        />
                    ) : (
                        <UserIcon className="size-6" />
                    )}
                    {user.name}
                </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.isAdmin ? "Admin" : "Usuário"}</TableCell>
            <TableCell className="flex items-center gap-2">
                {user.isAdmin ?
                    (
                        <Link href={`/users/${user.id}`}>
                            <Button>
                                <Edit />
                            </Button>
                        </Link>
                    ) :
                    (
                        <Button disabled>
                            <Edit />
                        </Button>
                    )}
                <ConfirmDeleteDialog
                    name={user.name}
                    onConfirm={handleDelete}
                    isDeleting={isDeleting}
                    disabled={!user.isAdmin}
                />
            </TableCell>
        </TableRow>
    );
};
