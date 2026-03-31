import { Pagination } from "@/components/pagination";
import { PageTitle } from "@/components/page-title";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { moveService } from "@/services/move";
import { Move } from "@/types/move";
import { MoveItem } from "@/components/moves/move-item";
import Link from "next/link";

const pageTitle = (
    <PageTitle
        title="Movimentações"
        rightSide={
            <Link href="/moves/add">
                <Button>Nova Movimentação</Button>
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

    const movesRes = await moveService.getMoves(offset, limit);
    const moves = (movesRes.data as Move[]) || [];

    const currentCount = moves.length;
    const hasMore = currentCount === limit;
    const count = hasMore ? (page * limit + 1) : ((page - 1) * limit + currentCount);

    if (moves.length === 0 && page === 1) {
        return (
            <div>
                {pageTitle}
                <EmptyState
                    message="Nenhuma movimentação registrada."
                    label="Nova Movimentação"
                    href="/moves/add"
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
                        <TableHead>Data</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Produto</TableHead>
                        <TableHead>Qtd</TableHead>
                        <TableHead>Valor Unit.</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {moves.map((item) => (
                        <MoveItem key={item.id} move={item} />
                    ))}
                </TableBody>
            </Table>

            <Pagination limit={limit} count={count} />
        </div>
    );
}
