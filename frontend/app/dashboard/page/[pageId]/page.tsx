import { PageEditor } from "@/components/editor/page-editor";

interface PageProps {
    params: Promise<{
        pageId: string;
    }>;
}

export default async function Page({
    params,
}: PageProps) {
    const { pageId } = await params;

    return <PageEditor pageId={pageId} />;
}