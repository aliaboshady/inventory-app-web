import Filter from "@/components/admin/Admins/Filter";
import Table from "@/components/admin/Admins/Table";
import PageLayout from "@/components/PageLayout";

export default async function Admins() {
  return (
    <PageLayout title="ADMINS">
      <Filter />
      <Table />
    </PageLayout>
  );
}
