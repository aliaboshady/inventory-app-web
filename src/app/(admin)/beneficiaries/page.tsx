import Filter from "@/components/users/Beneficiaries/Filter";
import Table from "@/components/users/Beneficiaries/Table";
import PageLayout from "@/components/PageLayout";

export default async function Beneficiaries() {
  return (
    <PageLayout title="BENEFICIARIES">
      <Filter />
      <Table />
    </PageLayout>
  );
}
