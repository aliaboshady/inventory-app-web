import Filter from "@/components/admin/Sessions/Filter";
import Table from "@/components/admin/Sessions/Table";
import PageLayout from "@/components/PageLayout";

export default async function Sessions() {
  return (
    <PageLayout title="SESSIONS">
      <Filter />
      <Table />
    </PageLayout>
  );
}
