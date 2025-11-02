import Filter from "@/components/admin/Sessions/Filter";
import Table from "@/components/admin/Sessions/Table";
import PageLayout from "@/components/PageLayout";
import getTranslation from "../../../../../../i18n";

export default async function ProjectSessions({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { t } = await getTranslation();

  return (
    <PageLayout title={`${t("PROJECTS")} - Project Name - ${t("SESSIONS")} - Session Name`}>
      <Filter />
      <Table />
    </PageLayout>
  );
}
