import Filter from "@/components/admin/Beneficiaries/Filter";
import Table from "@/components/admin/Beneficiaries/Table";
import PageLayout from "@/components/PageLayout";

export default async function Beneficiaries() {
  return (
    <PageLayout title="BENEFICIARIES">
      <Filter />
      <Table />
    </PageLayout>
  );
}
