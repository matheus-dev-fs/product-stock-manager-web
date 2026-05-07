import { Pagination } from "@/components/pagination";
import { PageTitle } from "@/components/page-title";
import { UserItem } from "@/components/users/user-item";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { userService } from "@/services/user";
import { User } from "@/types/user";
import Link from "next/link";
import { authService } from "@/services/auth";

const pageTitle = (
    <PageTitle
        title="Usuários"
        rightSide={
            <Link href="/users/add">
                <Button>Novo Usuário</Button>
            </Link>
        }
    />
);

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const usersRes = await userService.getUsers(offset, limit + 1);
    const allFetchedUsers = (usersRes.data as User[]) || [];

    const hasMore = allFetchedUsers.length > limit;
    const users = hasMore ? allFetchedUsers.slice(0, limit) : allFetchedUsers;
    const count = hasMore ? (page * limit) + 1 : (page - 1) * limit + users.length;

    const { data: loggedUser } = await authService.getMe();

    if (users.length === 0) {
        return (
            <div>
                {pageTitle}
                <EmptyState
                    message="Nenhum usuário cadastrado."
                    label="Novo Usuário"
                    href="/users/add"
                    canManage={loggedUser?.isAdmin || false}
                />
            </div>
        );
    }

    return (
        <div>
            {pageTitle}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead className="w-[150px]">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((item) => (
                        <UserItem key={item.id} user={item} canManage={loggedUser?.isAdmin || false} />
                    ))}
                </TableBody>
            </Table>

            <Pagination limit={limit} count={count} />
        </div>
    );
}
