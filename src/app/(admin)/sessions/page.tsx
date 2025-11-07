import Filter from "@/components/users/Sessions/Filter";
import Table from "@/components/users/Sessions/Table";
import PageLayout from "@/components/PageLayout";

export default async function Sessions() {
  return (
    <PageLayout title="SESSIONS">
      <Filter />
      <Table />
    </PageLayout>
  );
}
