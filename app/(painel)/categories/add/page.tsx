import { BackButton } from "@/components/back-button";
import { PageTitle } from "@/components/page-title";
import { CategoryForm } from "@/components/categories/category-form";

export default function Page() {
    return (
        <div>
            <PageTitle
                title="Nova Categoria"
                leftSide={
                    <BackButton fallbackUrl="/categories" />
                }
            />

            <CategoryForm />
        </div>
    );
}
