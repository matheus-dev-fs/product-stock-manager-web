import { BackButton } from "@/components/back-button";
import { PageTitle } from "@/components/page-title";
import { MoveForm } from "@/components/moves/move-form";

export default function Page() {
    return (
        <div>
            <PageTitle
                title="Nova Movimentação"
                leftSide={
                    <BackButton fallbackUrl="/moves" />
                }
            />

            <MoveForm />
        </div>
    );
}
